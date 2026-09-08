# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Entries are derived from [Conventional Commits](https://www.conventionalcommits.org/). A
commit whose title does not parse produces no release note, which is a defect in the
commit, not in the changelog.

## Commit types

| Type           | Changelog section  | Meaning                                                    |
| -------------- | ------------------ | ---------------------------------------------------------- |
| `feat`         | **Added**          | A new feature.                                             |
| `fix`          | **Fixed**          | A bug fix.                                                 |
| `perf`         | **Changed**        | A code change that improves performance.                   |
| `refactor`     | **Changed**        | A code change that neither fixes a bug nor adds a feature. |
| `docs`         | **Documentation**  | Documentation-only changes.                                |
| `test`         | not released       | Adding or correcting tests.                                |
| `build` / `ci` | **Infrastructure** | Build system, dependencies, or CI changes.                 |
| `chore`        | not released       | Other changes that do not modify source or tests.          |
| `revert`       | **Reverted**       | Reverting a previous commit.                               |

Append `!` after the type or scope, and add a `BREAKING CHANGE:` footer, to mark a
**breaking change**. Breaking changes trigger a major version bump and are called out at
the top of the release section with the migration steps.

## Enforcement

Changelog accuracy is enforced mechanically, not by goodwill:

- **Commits** are validated against the Conventional Commits grammar in CI. A malformed
  title fails the lint job.
- **Releases** are produced by `release-please` from the conventional commit history. It
  opens a release pull request that updates this file and bumps the version; merging it
  creates the tag. Where `release-please` is not enabled on a repository, the manual rule
  applies instead: the release pull request must update this file in the same change that
  bumps the version, and a version header without a date is a review blocker.
- **Every section** below a version header is present, even when empty, marked _None._ This
  makes a missing section visible as an omission rather than invisible as an absence.
- **Security** entries for a vulnerability are published only after the fix is deployed,
  and link the advisory rather than describing the exploit. See
  [SECURITY.md](SECURITY.md).

## Version headers

Format: `## [MAJOR.MINOR.PATCH] - YYYY-MM-DD`, using the UTC release date. The `Unreleased`
section collects changes that have landed on `main` but are not yet tagged.

Compare links for each version are maintained at the bottom of this file.

---

## [Unreleased]

### Added

_None._

### Changed

_None._

### Deprecated

_None._

### Removed

_None._

### Fixed

_None._

### Security

_None._

### Documentation

_None._

### Infrastructure

_None._

### Reverted

_None._

---

[Unreleased]: https://github.com/Via-Vitae/viavitae-demos/compare/v0.1.0...HEAD
