---
name: commit
description: Use when the user says commit, commit and push, /commit, or anything about committing and pushing code. Follows the git conventions defined in AGENTS.md.
---

# /commit — Commit and push code

Trigger phrases: "commit", "commit and push", "/commit", "push", "stage".

## Workflow

1. Run `git status` to see what's changed
2. Run `git diff --stat` to understand the scope of changes
3. Run `git log --oneline -3` to see recent commit style
4. Stage only the intended files with `git add <file>`
5. Verify all related assets (images, fonts, etc.) are staged alongside the code
6. Commit with a message following the format: `<scope>: <short description>`
7. Push to `origin/main` with `git push`

## Rules

- One logical change per commit — do not bundle unrelated changes
- Never commit secrets or API keys
- Never amend pushed commits, force-push, or skip hooks
- If a commit is rejected, fix the issue and create a fresh commit
