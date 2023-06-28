# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- `Router` to support routes with and without trailing slash

## [0.2.0] - 2023-06-24

### Added

- A `teaser` control for collapsing/expanding text with `Read more` and `Show less` functionality

## [0.1.0] - 2023-02-26

### Added

- An opinionated styled button to fit branding
- A `link-to` control to redirect in the application
- A `titled-paragraph` control for creating header and paragraph
- A `checkbox-list` control for creating a list of checkbox interconnected
- An `email` control for allowing user to input email with validation and label
- A `password` control for allowing user to input password with validation and label
- A `textarea` control for allowing user to input multi line which grow as text is entered with label
- A `textbox` control for allowing user to input single line with label
- Include parser `parseLiterals` to parse HTML containing template variable
- The `registerControl` function to register custom element based on a class into the DOM
- A `navigator` helpers for actions done outside of the application (e.g browser, mobile)
- A `router` to help routing implementation in the application easier

[Unreleased]: https://github.com/keonnie/korenie/compare/0.2.0...HEAD
[0.2.0]: https://github.com/keonnie/korenie/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/keonnie/korenie/releases/tag/0.1.0
