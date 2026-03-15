# Contributing to Playwright

We'd love to accept your patches and contributions to this project. There are just a few small guidelines you need to follow.

## How to Contribute

### Reporting Issues

If you have found what you think is a bug, please [file an issue](https://github.com/7dvq6yrkgs-stack/playwright/issues/new?template=bug_report.md).

**Make sure to include:**
- Playwright version
- Browser name and version
- Operating system
- A minimal reproduction

### Suggesting Enhancements

Feature requests are welcome! Please [file a feature request](https://github.com/7dvq6yrkgs-stack/playwright/issues/new?template=feature_request.md) and explain:

- The problem you want to solve
- How the feature would work
- Why the feature would be useful

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue the pull request!

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9

### Getting Started

```bash
# Clone the repository
git clone https://github.com/7dvq6yrkgs-stack/playwright.git
cd playwright

# Install dependencies
npm install

# Install browser binaries  
npx playwright install

# Run tests
npm test
```

### Code Style

- We use [ESLint](https://eslint.org/) for linting
- We use [Prettier](https://prettier.io/) for formatting
- Run `npm run lint` before submitting your PR
- Run `npm run format` to auto-format your code

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Reference issues and pull requests in the commit body

## Contributor License Agreement

Contributions to this project must be accompanied by a Contributor License Agreement (CLA). You (or your employer) retain the copyright to your contribution; this gives us permission to use and redistribute your contributions as part of the project.

## Code of Conduct

This project has adopted the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). For more information, see our [Code of Conduct FAQ](https://www.contributor-covenant.org/faq/) or contact the maintainers with any additional questions.

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).
