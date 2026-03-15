# Security Policy

## Supported Versions

Please visit ["Releases" page](https://github.com/7dvq6yrkgs-stack/playwright/releases) to see recent releases. 

We only support resolving security issues in the **recentmost release**.

## Reporting a Vulnerability

**DO NOT report security vulnerabilities via public GitHub issues.**

If you believe you have found a security vulnerability in Playwright, please report it to us by clicking ["Report a vulnerability" button](https://github.com/7dvq6yrkgs-stack/playwright/security/advisories/new) on the [security advisories page](https://github.com/7dvq6yrkgs-stack/playwright/security/advisories). Give us at least 48 hours to process it.

If you don't hear from us in 48 hours, please reach out to the core team members on our [Discord](https://aka.ms/playwright/discord).

## What constitutes a security vulnerability?

Any vulnerability that allows for arbitrary code execution on the machine running Playwright tests or inside the tested browser is considered a security vulnerability.

As a general rule, we only consider vulnerabilities that can be exploited without user intervention. Examples:
- A malicious website that Playwright tests are run against can execute arbitrary code on the machine running Playwright.
- A malicious website that Playwright tests are run against can steal credentials or other sensitive information from the Playwright test process.

We **do not** consider the following to be security vulnerabilities:
- Bugs that cause Playwright to crash.
- Bugs that cause Playwright to leak memory.
- Social engineering attacks ("persuade user to paste code into Playwright test").
