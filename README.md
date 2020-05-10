# HappUI

[![Glitch Badge](https://badge.glitch.me/gfio-happui)](https://gfio-happui.glitch.me/)

WebComponent ‹Sentir—Comprendre—Connaître›, following Enrique Pardo's
requirements and concept (described at https://happui.org/app/).

## Current status

```html
    <happ-ui title="Color Wheel 1"
             sentir="0.75" connaitre="0.75" comprendre="0.75"></happ-ui>
    <happ-ui title="Color Wheel 2"
             sentir="0.8" connaitre="0.45" comprendre="0.57"></happ-ui>
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

## Usage variants

```html
<script type="module">
  import 'happ-ui/happ-ui-dragme.js';
</script>

<happ-ui-dragme title="Color Wheel with Draggable Pistils"
         sentir="0.75" comprendre="0.75" connaitre="0.75"></happ-ui-dragme>


<div id="happ-contactsheet" title="Contact sheet with 8x5 happ-ui + happ-ui-dragme">
  <happ-contactsheet></happ-contactsheet>
</div>

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