/**
 * Auto-setup blog configurations from a .env file in the vault root.
 *
 * Supports multiple blogs via numbered prefixes:
 *   XIN_BLOG_1_NAME, XIN_BLOG_1_GITHUB_REPO, etc.
 *   XIN_BLOG_2_NAME, XIN_BLOG_2_GITHUB_REPO, etc.
 */

import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { ConfigManager } from './ConfigManager';
import type { BlogTarget } from './types';

export interface EnvSetupResult {
  imported: { name: string }[];
  skipped: { blogNumber: number; reason: string }[];
  errors: { blogNumber: number; messages: string[] }[];
}

interface EnvGroup {
  [key: string]: string;
}

const REQUIRED_KEYS = [
  'NAME',
  'GITHUB_REPO',
  'GITHUB_BRANCH',
  'GITHUB_TOKEN',
  'CONTENT_PATH',
  'CONTENT_FORMAT',
] as const;

/**
 * Read and parse a .env file, filtering for XIN_BLOG_<N>_* keys,
 * grouped by blog number.
 */
export async function parseEnvFile(
  envPath: string
): Promise<Map<number, EnvGroup>> {
  const content = await fs.readFile(envPath, 'utf-8');
  const groups = new Map<number, EnvGroup>();

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    const match = key.match(/^XIN_BLOG_(\d+)_(.+)$/);
    if (!match) continue;

    const blogNumber = parseInt(match[1], 10);
    const field = match[2];

    if (!groups.has(blogNumber)) {
      groups.set(blogNumber, {});
    }
    groups.get(blogNumber)![field] = value;
  }

  return groups;
}

/**
 * Convert an env key group into a BlogTarget, validating required fields.
 * Returns null with error messages if validation fails.
 */
export function envGroupToBlogTarget(
  group: EnvGroup,
  blogNumber: number
): { blog: BlogTarget | null; errors: string[] } {
  const errors: string[] = [];

  // Check required fields
  for (const key of REQUIRED_KEYS) {
    if (!group[key]) {
      errors.push(`Missing required field: XIN_BLOG_${blogNumber}_${key}`);
    }
  }

  // Validate CONTENT_FORMAT
  const format = group['CONTENT_FORMAT'];
  if (format && format !== 'single-file' && format !== 'multi-file') {
    errors.push(
      `Invalid CONTENT_FORMAT "${format}" — must be "single-file" or "multi-file"`
    );
  }

  if (errors.length > 0) {
    return { blog: null, errors };
  }

  const blog: BlogTarget = {
    id: crypto.randomUUID(),
    name: group['NAME'],
    github: {
      repo: group['GITHUB_REPO'],
      branch: group['GITHUB_BRANCH'],
      token: group['GITHUB_TOKEN'],
    },
    content: {
      path: group['CONTENT_PATH'],
      format: group['CONTENT_FORMAT'] as 'single-file' | 'multi-file',
    },
  };

  // Optional fields
  if (group['SITE_URL']) {
    blog.siteUrl = group['SITE_URL'];
  }

  if (group['CONTENT_FILENAME']) {
    blog.content.filename = group['CONTENT_FILENAME'];
  }

  if (group['CONTENT_LIVE_POST_PATH']) {
    blog.content.livePostPath = group['CONTENT_LIVE_POST_PATH'];
  }

  if (
    group['CLOUDFLARE_ACCOUNT_ID'] &&
    group['CLOUDFLARE_PROJECT_NAME'] &&
    group['CLOUDFLARE_TOKEN']
  ) {
    blog.cloudflare = {
      accountId: group['CLOUDFLARE_ACCOUNT_ID'],
      projectName: group['CLOUDFLARE_PROJECT_NAME'],
      token: group['CLOUDFLARE_TOKEN'],
    };
  }

  return { blog, errors: [] };
}

/**
 * Orchestrate env-based blog setup:
 * 1. Check if .env exists in vaultPath
 * 2. Parse and group by blog number
 * 3. Load existing blogs and skip duplicates (matched by github.repo)
 * 4. Save new blogs
 * 5. Return summary
 */
export async function runEnvSetup(
  vaultPath: string,
  configManager: ConfigManager
): Promise<EnvSetupResult> {
  const result: EnvSetupResult = { imported: [], skipped: [], errors: [] };
  const envPath = path.join(vaultPath, '.env');

  // Check if .env exists
  try {
    await fs.access(envPath);
  } catch {
    // No .env file — nothing to do
    return result;
  }

  // Parse env file
  const groups = await parseEnvFile(envPath);
  if (groups.size === 0) {
    return result;
  }

  // Load existing blogs for duplicate detection
  const existingBlogs = await configManager.getBlogs();
  const existingRepos = new Set(
    existingBlogs.map((b) => b.github.repo.toLowerCase())
  );

  // Process each blog group
  const sortedNumbers = Array.from(groups.keys()).sort((a, b) => a - b);

  for (const blogNumber of sortedNumbers) {
    const group = groups.get(blogNumber)!;

    // Validate and convert
    const { blog, errors } = envGroupToBlogTarget(group, blogNumber);

    if (!blog) {
      result.errors.push({ blogNumber, messages: errors });
      continue;
    }

    // Check for duplicate by repo
    if (existingRepos.has(blog.github.repo.toLowerCase())) {
      result.skipped.push({
        blogNumber,
        reason: `Blog for repo "${blog.github.repo}" already exists`,
      });
      continue;
    }

    // Save the new blog
    await configManager.saveBlog(blog);
    existingRepos.add(blog.github.repo.toLowerCase());
    result.imported.push({ name: blog.name });
  }

  return result;
}
