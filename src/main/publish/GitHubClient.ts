/**
 * GitHub API client for committing and pushing content
 */

import type { GitHubCommitResponse } from './types';

export class GitHubClient {
  private token: string;
  private baseUrl = 'https://api.github.com';

  constructor(token: string) {
    this.token = token;
  }

  /**
   * Get the latest commit SHA for a branch
   */
  async getLatestCommitSha(repo: string, branch: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/repos/${repo}/git/refs/heads/${branch}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to get latest commit: ${response.statusText}`);
    }

    const data = await response.json();
    return data.object.sha;
  }

  /**
   * Get file content from repository
   */
  async getFileContent(
    repo: string,
    path: string,
    branch: string
  ): Promise<{ content: string; sha: string } | null> {
    console.log('GitHubClient: getFileContent called');
    console.log('  repo:', repo);
    console.log('  path:', path);
    console.log('  branch:', branch);

    const response = await fetch(
      `${this.baseUrl}/repos/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: this.getHeaders()
      }
    );

    console.log('  response status:', response.status);

    if (response.status === 404) {
      console.log('  File not found, returning null');
      return null; // File doesn't exist
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('  GitHub API error:', errorText);
      throw new Error(`Failed to get file content: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('  data keys:', Object.keys(data));
    console.log('  data.content type:', typeof data.content);
    console.log('  data.content length:', data.content?.length);

    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    return {
      content,
      sha: data.sha
    };
  }

  /**
   * Create or update a file in the repository
   */
  async updateFile(
    repo: string,
    path: string,
    content: string,
    message: string,
    branch: string,
    sha?: string
  ): Promise<GitHubCommitResponse> {
    const encodedContent = Buffer.from(content).toString('base64');

    const body: any = {
      message,
      content: encodedContent,
      branch
    };

    if (sha) {
      body.sha = sha; // Required for updates
    }

    const response = await fetch(`${this.baseUrl}/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update file: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      sha: data.commit.sha,
      url: data.commit.html_url,
      contentSha: data.content?.sha  // File blob SHA for subsequent updates
    };
  }

  /**
   * Delete a file from the repository
   */
  async deleteFile(
    repo: string,
    path: string,
    message: string,
    branch: string,
    sha: string
  ): Promise<GitHubCommitResponse> {
    const response = await fetch(`${this.baseUrl}/repos/${repo}/contents/${path}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({
        message,
        sha,
        branch
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to delete file: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      sha: data.commit.sha,
      url: data.commit.html_url
    };
  }

  /**
   * Get repository information
   */
  async getRepository(repo: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/repos/${repo}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to get repository: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * List directory contents from repository
   */
  async listDirectory(
    repo: string,
    path: string,
    branch: string
  ): Promise<Array<{ name: string; path: string; sha: string; type: 'file' | 'dir' }>> {
    const response = await fetch(
      `${this.baseUrl}/repos/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: this.getHeaders()
      }
    );

    if (response.status === 404) {
      return []; // Directory doesn't exist
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to list directory: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    // If path points to a file, not a directory
    if (!Array.isArray(data)) {
      throw new Error(`Path "${path}" is not a directory`);
    }

    return data.map((item: any) => ({
      name: item.name,
      path: item.path,
      sha: item.sha,
      type: item.type === 'dir' ? 'dir' : 'file'
    }));
  }

  /**
   * Batch fetch multiple files from repository
   * Uses individual requests (could be optimized with GraphQL later)
   */
  async batchGetFiles(
    repo: string,
    paths: string[],
    branch: string
  ): Promise<Map<string, { content: string; sha: string }>> {
    const results = new Map<string, { content: string; sha: string }>();

    // Fetch files in parallel with concurrency limit
    const concurrencyLimit = 5;
    for (let i = 0; i < paths.length; i += concurrencyLimit) {
      const batch = paths.slice(i, i + concurrencyLimit);
      const promises = batch.map(async (path) => {
        try {
          const result = await this.getFileContent(repo, path, branch);
          if (result) {
            results.set(path, result);
          }
        } catch (error) {
          console.error(`Failed to fetch ${path}:`, error);
        }
      });
      await Promise.all(promises);
    }

    return results;
  }

  /**
   * Rename a file in the repository using Git Trees API (single commit)
   * Returns the new file's SHA
   */
  async renameFile(
    repo: string,
    oldPath: string,
    newPath: string,
    branch: string,
    _sha: string
  ): Promise<{ newSha: string; commitSha: string }> {
    // Get the content of the old file
    const fileData = await this.getFileContent(repo, oldPath, branch);
    if (!fileData) {
      throw new Error(`File not found: ${oldPath}`);
    }

    // Get the latest commit SHA and its tree
    const latestCommitSha = await this.getLatestCommitSha(repo, branch);
    const commitResponse = await fetch(
      `${this.baseUrl}/repos/${repo}/git/commits/${latestCommitSha}`,
      { headers: this.getHeaders() }
    );
    if (!commitResponse.ok) {
      throw new Error(`Failed to get commit: ${commitResponse.statusText}`);
    }
    const commitData = await commitResponse.json();
    const baseTreeSha = commitData.tree.sha;

    // Create a blob for the file content
    const blobResponse = await fetch(`${this.baseUrl}/repos/${repo}/git/blobs`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        content: fileData.content,
        encoding: 'utf-8'
      })
    });
    if (!blobResponse.ok) {
      throw new Error(`Failed to create blob: ${blobResponse.statusText}`);
    }
    const blobData = await blobResponse.json();
    const newBlobSha = blobData.sha;

    // Create a new tree with the rename (add new file, delete old file)
    const treeResponse = await fetch(`${this.baseUrl}/repos/${repo}/git/trees`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: [
          // Add the new file
          {
            path: newPath,
            mode: '100644',
            type: 'blob',
            sha: newBlobSha
          },
          // Delete the old file (sha: null removes it)
          {
            path: oldPath,
            mode: '100644',
            type: 'blob',
            sha: null
          }
        ]
      })
    });
    if (!treeResponse.ok) {
      const error = await treeResponse.json();
      throw new Error(`Failed to create tree: ${error.message || treeResponse.statusText}`);
    }
    const treeData = await treeResponse.json();

    // Create the commit
    const newCommitResponse = await fetch(`${this.baseUrl}/repos/${repo}/git/commits`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        message: `Rename ${oldPath.split('/').pop()} to ${newPath.split('/').pop()}`,
        tree: treeData.sha,
        parents: [latestCommitSha]
      })
    });
    if (!newCommitResponse.ok) {
      throw new Error(`Failed to create commit: ${newCommitResponse.statusText}`);
    }
    const newCommitData = await newCommitResponse.json();

    // Update the branch reference
    const refResponse = await fetch(
      `${this.baseUrl}/repos/${repo}/git/refs/heads/${branch}`,
      {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({
          sha: newCommitData.sha
        })
      }
    );
    if (!refResponse.ok) {
      throw new Error(`Failed to update ref: ${refResponse.statusText}`);
    }

    return {
      newSha: newBlobSha,
      commitSha: newCommitData.sha
    };
  }

  /**
   * Get latest workflow run for a commit
   */
  async getWorkflowRunsForCommit(repo: string, commitSha: string): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}/repos/${repo}/actions/runs?head_sha=${commitSha}`,
      {
        headers: this.getHeaders()
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get workflow runs: ${response.statusText}`);
    }

    const data = await response.json();
    return data.workflow_runs || [];
  }

  private getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
  }
}
