# Changelog

All notable changes to this plugin are documented in this file: what changes for the people who use it.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). Each pull request adds its line under « Unreleased »; a
release pull request raises `version` and moves the lines under it, then the tag `v<version>` publishes it.

<!--
Keep only the headings a version needs, in this order:
Added (new features), Changed (what works differently), Deprecated (what will go), Removed (what went),
Fixed (bugs), Security (what was unsafe).
-->

## [Unreleased]

### Added

- The plugin's name and description in each of its languages, so people who use Hodi in English see them in English.

### Changed

- Built with `@hodi-app/plugin-sdk` 1.0.0-beta.7, which writes its version into the package: Hodi 1.0.0-beta.14 or
  later runs only plugins built with an SDK it accepts, 1.0.0-beta.7 at least and never newer than its own.

### Fixed

## [0.1.0] - YYYY-MM-DD

### Added

- The first version of the plugin.

[unreleased]: https://github.com/OWNER/REPO/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/OWNER/REPO/releases/tag/v0.1.0
