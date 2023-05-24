# Changelog

Error: Command failed with exit code 128: git describe --abbrev=0 --tags
fatal: No names found, cannot describe anything.
    at makeError (/opt/hostedtoolcache/node/16.20.0/x64/lib/node_modules/lerna-changelog/node_modules/execa/lib/error.js:60:11)
    at Function.module.exports.sync (/opt/hostedtoolcache/node/16.20.0/x64/lib/node_modules/lerna-changelog/node_modules/execa/index.js:194:17)
    at Object.lastTag (/opt/hostedtoolcache/node/16.20.0/x64/lib/node_modules/lerna-changelog/lib/git.js:31:18)
    at Changelog.<anonymous> (/opt/hostedtoolcache/node/16.20.0/x64/lib/node_modules/lerna-changelog/lib/changelog.js:31:56)
    at Generator.next (<anonymous>)
    at /opt/hostedtoolcache/node/16.20.0/x64/lib/node_modules/lerna-changelog/lib/changelog.js:8:71
    at new Promise (<anonymous>)
    at __awaiter (/opt/hostedtoolcache/node/16.20.0/x64/lib/node_modules/lerna-changelog/lib/changelog.js:4:12)
    at Changelog.createMarkdown (/opt/hostedtoolcache/node/16.20.0/x64/lib/node_modules/lerna-changelog/lib/changelog.js:30:16)
    at Object.<anonymous> (/opt/hostedtoolcache/node/16.20.0/x64/lib/node_modules/lerna-changelog/lib/cli.js:77:64)


## 0.1.0 (2023-05-24)

#### :rocket: Release
* first release

#### Committers: 1
- Patrick Pircher ([@patricklx](https://github.com/patricklx))
