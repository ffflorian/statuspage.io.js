# statuspage.io.js [![Build Status](https://api.travis-ci.org/ffflorian/statuspage.io.js.svg?branch=master)](https://travis-ci.org/ffflorian/statuspage.io.js/) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/statuspage.io.js)](https://dependabot.com)

A [statuspage.io](https://statuspage.io) API client. For a documentation on the API see https://doers.statuspage.io/.

## Usage

A complete documentation is available at https://ffflorian.github.io/statuspage.io.js/.

### Installation

Run `yarn add statuspage.io` or `npm install statuspage.io`.

### Example

```ts
import {StatusPage} from 'statuspage.io';

const statusPage = new StatusPage('my-api-key');

statusPage.api.project.getProject('npm', 'grunt')
  .then(response => {
    //
  })

statusPage.api.project.search('grunt', {
    filter: {
      platforms: ['npm'],
      licenses: ['MIT']
    }
  })
  .then(projects => {
    // ...
  })

statusPage.api.github.user.getUser('ffflorian')
  .then(user => {
    // ...
  })

statusPage.api.platform.getPlatforms({page: 2, perPage: 5})
  .then(platforms => {
    // ...
  })

statusPage.api.user.subscribe('npm', 'grunt')
  .then(subscription => {
    // ...
  })
```

## Build and test

```
yarn
yarn test
```
