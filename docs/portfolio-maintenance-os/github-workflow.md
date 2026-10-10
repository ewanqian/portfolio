# GitHub Task Workflow

This is the working loop for portfolio changes:

`Issue → local branch → pull request → review → merge → publish check`

## What each item does

- **Issue** records one intended outcome, its scope, and its acceptance checks.
- **Branch** is the isolated local workspace for that Issue.
- **Pull request (PR)** contains the actual changes and verification evidence.

An Issue is planning and accountability; a PR is a proposed implementation. Link them in both directions. A PR that fully completes an Issue should say `Closes #<number>`.

## Start a task

1. Create an Issue from **Portfolio task** on GitHub, or use the local form at `.github/ISSUE_TEMPLATE/task.yml` as the checklist.
2. Update the local checkout and create a descriptive branch:

   ```bash
   git switch main
   git pull --ff-only
   git switch -c issue-<number>-short-description
   ```

3. Make the change. Keep private or unapproved material in `.codex-local/`; never put credentials or tokens in files, Issues, PRs, commits, or command history.
4. Run the relevant checks. For normal website changes:

   ```bash
   npm ci
   npm run audit:public
   npm run build
   ```

5. Commit, push, and open a PR. Reference the Issue in the PR description.
6. Before merging, review the rendered page and follow `publish-checklist.md`.

## GitHub CLI authentication

Use the GitHub CLI's secure, system-managed login flow:

```bash
gh auth login
gh auth status
```

Choose `github.com`, HTTPS, and browser login when prompted. The CLI stores credentials in the operating system keychain. Do not paste a token from a chat, document, screenshot, or shell history. If a token was exposed anywhere, revoke it in GitHub and sign in again with `gh auth login`.

## Practical commands

```bash
# Create a task from a prepared Markdown body
gh issue create --repo ewanqian/portfolio --title "[Area] outcome" --body-file path/to/task.md

# See active work
gh issue list --repo ewanqian/portfolio --state open
gh pr list --repo ewanqian/portfolio --state open

# Open a PR for the current branch
gh pr create --repo ewanqian/portfolio --fill
```

Use a new Issue for a new outcome. Update an existing Issue when the outcome is unchanged.
