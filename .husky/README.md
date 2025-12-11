# Husky Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) to run pre-commit checks that prevent build errors from being committed.

## What Runs on Commit

Before each commit, the following checks are automatically run:

1. **ESLint** - Lints your code for errors and warnings
2. **TypeScript Type Check** - Ensures there are no type errors
3. **Build** - Verifies the project compiles successfully

If any of these checks fail, the commit will be blocked and you'll need to fix the errors before committing.

## Manual Testing

You can manually test the pre-commit hook by running:

```bash
bash .husky/pre-commit
```

Or run the checks individually:

```bash
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript type check
npm run build       # Run build
```

## Bypassing Hooks (Not Recommended)

If you absolutely need to bypass the pre-commit hook (not recommended), you can use:

```bash
git commit --no-verify
```

**Warning:** This should only be used in emergencies, as it defeats the purpose of having pre-commit checks.

## Troubleshooting

If the hook isn't running:
1. Make sure Husky is installed: `npm install`
2. Ensure the hook is executable: `chmod +x .husky/pre-commit`
3. Check that the `prepare` script is in `package.json`

