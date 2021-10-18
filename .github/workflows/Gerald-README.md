# Gerald Usage Documentation

NOTE: Some of these links point to documents that external users aren't able to access.

Gerald is the project described under [Architectural Decision Record #356](https://docs.google.com/document/d/1TDE_nmrV3vuGi54HtC8X7irSMwTTcc9p83cuhH4kB6Y/edit#heading=h.zcx77itbdtis). The goal of this project is to create a GitHub replacement for Phabricator's Herald functionality.

The code for the project exists in the [Gerald repository](https://github.com/Khan/gerald).

## Overview

Gerald is the name given to the custom GitHub Actions and code that reads in and handles **Notification Rules** and **Reviewer Rules** from the `.github/NOTIFIED` and `.github/REVIEWERS` files, respectively.

Every rule has a condition and a list of GitHub usernames or team slugs. Every time a pull request is made, Gerald will test the files changed, and the squashed diff of the pull request, against all of the rules in the NOTIFIED and REVIEWERS files. Rules that test positive against the pull request are pulled into a list of notifyees and reviewers, depending on the file that the rule exists in. People in this list will be mentioned on the pull request, and reviews will be requested from the list of reviewers.

Every time the pull request is updated, Gerald will rerun and update the pull request comments with a new list of notifyees and reviewers. Commenting #removeme on the pull request will stop Gerald from tagging you in the pull request.

## Adding a Rule

Rules should be added to `.github/NOTIFIED` or `.github/REVIEWERS`. Similar to the [Github CODEOWNERS syntax](https://docs.github.com/en/enterprise/2.15/user/articles/about-code-owners#:~:text=CODEOWNERS%20syntax,org%2Fteam%2Dname%20format.), rules are split by new lines, and comments are made with #. Unlike the CODEOWNERS syntax, the order of a rule does not matter; no rules take precedence over others. Gerald also supports Regular Expressions and suffixing usernames and team slugs with an exclamation point to denote a required reviewer.

Rules are made in the format of:
`<pattern> @<username or Organization/team-slug>`

Make sure that you escape any '@'s that you're using for anything other than a Github username, so that it doesn't read it as a Github username!

### File matching with Glob patterns

Adding yourself to these files will notify you or make you a reviewer of any pull-requests to the current working branch that affect the files/folders matched.

These files support typical [glob functionality](https://www.npmjs.com/package/fast-glob#pattern-syntax) with [dot](https://www.npmjs.com/package/fast-glob#dot) turned on.

### Diff matching with Regular Expressions

In addition to glob patterns, Gerald rules also support Regular Expressions. Regular Expressions will be tested against the `diff` of a file. Regular Expressions should be surrounded with double quotes.
`"/^find me!$/ig" @<username or Organization/team-slug>`

## On Pull Request vs. On Push Without Pull Request

In `.github/REVIEWERS`, all rules are run when a pull request is created, because only pull requests can have reviewers. In `.github/NOTIFIED`, rules under the `[ON PULL REQUEST]` section will be run when a pull request is made. Rules under the `[ON PUSH WITHOUT PULL REQUEST]` section will be run whenever someone pushes directly to a list of protected branches. By default, that list is `master`, `main`, and `develop`.

## Required Reviewers

Developers using Gerald in conjunction with [Khan's custom command line tools](https://github.com/Khan/our-lovely-cli) can also specify if someone is a required reviewer. In the `.github/REVIEWERS` file, adding an exclamation point to the end of a username or team slug will make them a required reviewer. This is enforced in OLC's `git land` command, which will check for approval from required reviewers before landing pull requests.
`important-file.js @<username or Organization/team-slug>!`

## Pattern Examples

### Matching a single file

The most efficient way of matching a single file would be to provide entire path relative to the root directory of the workspace.
`./src/packages/important-file.js @<username or Organization/team-slug>`

### Matching an entire directory

There are three ways to match for files in a directory.

1. `./src` will match only the `./src` directory and no files in the directory.
2. `./src/*` will match all files and directories in the `./src` folder, but it will not match `./src/directory/file.js`, for example.
3. `./src/**` will match all files in the `./src` directory, however deeply nested.

## Testing Gerald Rules

If you've set up the [`git gerald-tester` command](./Setup-README.md), you can test out a Gerald rule by running `git gerald-tester --glob` or `git gerald-tester --regex`. Doing so will prompt you for a Glob pattern or Regular Expression, based on the flag you passed in, allowing you to test out patterns before adding them to the Gerald files.