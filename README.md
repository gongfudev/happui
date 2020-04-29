# HappUI

[![Glitch Badge](https://badge.glitch.me/gfio-happui)](https://gfio-happui.glitch.me/)

WebComponent ‹Sentir—Comprendre—Connaître›, following Enrique Pardo's
requirements and concept (described at https://happui.org/app/).

## Current status

```html
    <happ-contactsheet></happ-contactsheet>
```

## Our \<happ-contactsheet> Web Component

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i happ-ui
```

## Usage

```html
  <script type="module">
    import './happ-contactsheet.js';
  </script>

  <happ-contactsheet></happ-contactsheet>

```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`

```bash
npm run watch
```

To run a local development server that serves the basic demo located in `index.html`.