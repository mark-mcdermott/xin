---
description: Testing standards, quality criteria, and best practices for E2E tests
alwaysApply: false
---

# Testing Guidelines

## Purpose
Defines testing standards, quality criteria, and best practices for E2E tests using Playwright.

See @.llm/context/testing-strategy.md for test file organization and when to write tests.

## Core Testing Principles

### Test Separation
- **TEST.SEP-1 (MUST)**: Focus on E2E tests for user-visible behavior

### Test Coverage
- **TEST.COV-1 (SHOULD)**: Cover critical user flows with E2E tests
- **TEST.COV-2 (SHOULD)**: Test edge cases and error handling

## Test Quality Checklist

When evaluating test quality, check:

### Parameterization
- **TEST.Q-1 (SHOULD)**: Parameterize inputs; never embed unexplained literals

### Meaningful Tests
- **TEST.Q-2 (SHOULD NOT)**: Add a test unless it can fail for a real defect

### Clear Descriptions
- **TEST.Q-3 (SHOULD)**: Ensure test description states exactly what the expect verifies

### Independent Expectations
- **TEST.Q-4 (SHOULD)**: Compare results to independent expectations

### Style Consistency
- **TEST.Q-5 (SHOULD)**: Follow the same lint and style rules as prod code

### Assertion Strength
- **TEST.Q-6 (SHOULD)**: Use strong assertions over weaker ones
- **TEST.Q-7 (MUST)**: Use `expect(x).toEqual(1)` instead of `expect(x).toBeGreaterThanOrEqual(1)`

### Structure Testing
- **TEST.Q-8 (SHOULD)**: Test the entire structure in one assertion if possible

## Test Organization

### Grouping
- **TEST.ORG-1 (MUST)**: Group related tests under `test.describe` blocks
- **TEST.ORG-2 (SHOULD)**: Use clear test names describing behavior

### Named Subjects
- **TEST.ORG-3 (SHOULD)**: Use descriptive variable names over generic names

## Test Strategy

### E2E Focus
- **TEST.STRAT-1 (SHOULD)**: Use Playwright for E2E testing
- **TEST.STRAT-2 (SHOULD)**: Test critical user journeys
- **TEST.STRAT-3 (SHOULD)**: Use data-testid attributes for reliable selectors

### Mocking Guidelines
- **TEST.MOCK-1 (SHOULD NOT)**: Mock Electron internals in E2E tests
- **TEST.MOCK-2 (SHOULD)**: Test against actual app behavior

## Test Coverage Strategy

### What to Test
- **TEST.COVER-1 (SHOULD)**: Test critical user flows
- **TEST.COVER-2 (SHOULD)**: Test file operations (create, save, delete)
- **TEST.COVER-3 (SHOULD)**: Test navigation and UI interactions
- **TEST.COVER-4 (SHOULD NOT)**: Test framework or library internals
- **TEST.COVER-5 (SHOULD NOT)**: Duplicate tests for same behavior
- **TEST.COVER-6 (SHOULD NOT)**: Test implementation details

### Test Optimization
- **TEST.OPT-1 (SHOULD)**: Optimize for fast execution
- **TEST.OPT-2 (SHOULD)**: Optimize for ease of maintenance
- **TEST.OPT-3 (SHOULD)**: Focus on behavioral correctness

## Test Readability

### Helper Methods
- **TEST.READ-1 (SHOULD)**: Use helper methods to keep test bodies readable

### Descriptive Names
- **TEST.READ-2 (MUST)**: Use descriptive test names that explain what is being tested

## Development Workflow

### Local Testing
- **TEST.FLOW-1 (MUST)**: Run tests locally before pushing
- **TEST.FLOW-2 (SHOULD)**: Use `npm run test:e2e` to run all E2E tests
- **TEST.FLOW-3 (SHOULD)**: Use `npm run test:e2e:ui` for interactive debugging

### Verification
- **TEST.FLOW-4 (SHOULD)**: Use Playwright MCP to verify scenarios manually
- **TEST.FLOW-5 (MUST)**: Verify tests pass before every push
