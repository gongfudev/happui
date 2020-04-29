# HappUI

[![Glitch Badge](https://badge.glitch.me/gfio-happui)](https://gfio-happui.glitch.me/)

WebComponent ‹Sentir—Comprendre—Connaître›, following Enrique Pardo's
requirements and concept (described at https://happui.org/app/).

## Current status

```html
<happ-ui title="First" sentir="0.75" connaitre="0.75" comprendre="0.75"></happ-ui>
<happ-ui title="Second" sentir="0.75" connaitre="0.75" comprendre="0.75"></happ-ui>
```

![Two sample ‹happ-ui› web components](docs/happ-ui-components-sample.png)

## Our \<happ-ui> Web Component

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i happ-ui
```

## Usage

```html
<script type="module">
  import 'happ-ui/happ-ui.js';
</script>

<happ-ui title="Color Wheel"
         sentir="0.75" comprendre="0.75" connaitre="0.75"></happ-ui>
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
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
