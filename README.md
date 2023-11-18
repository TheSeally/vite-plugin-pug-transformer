[![Test](https://github.com/TheSeally/vite-plugin-pug-transformer/actions/workflows/test.yml/badge.svg)](https://github.com/TheSeally/vite-plugin-pug-transformer/actions/workflows/test.yml)

# Vite plugin pug transformer
This plugin adds support for pug template engine in vite html entrypoint.

Plugin uses Vite specific hook (`transformIndexHtml`) for transforming pug into html.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Plugin options](#plugin-options)
- [Example](#example)


## Requirements
- Vite v2+
- Node.js version depends on Vite version:
  - Vite v2 requires Node.js v12.22 or higher;
  - Vite v3, v4 requires Node.js v14.18 or higher;
  - Vite v5 requires Node.js v18 or higher;

## Installation
You can use any package manager to install plugin:

```
npm install vite-plugin-pug-transformer

// OR
yarn add vite-plugin-pug-transformer

// OR
pnpm install vite-plugin-pug-transformer
```

Then it can be added to vite config:

```js
// vite.config.js
import vitePugPlugin from 'vite-plugin-pug-transformer';

export default {
  plugins: [vitePugPlugin()],
};
```

## Usage
Plugin syntax don't break html semantics.
It uses `template` tag with two attributes `data-type` and `data-src`.
Pass `pug` to `data-type` attribute and path to pug template to `data-src` attribute.

```html
<template data-type="pug" data-src="./template.pug"></template>

<!-- OR with self-closed tag -->
<template data-type="pug" data-src="./template.pug" />
```

Also you can use multiple `template` tags on page

## Plugin options
Plugin supports additional options

| Parameter  | Default | Description
| ---------- | ------- | -----------
| pugOptions | `{}`    | [Pug options](https://pugjs.org/api/reference.html#options)
| pugLocals  | `{}`    | Variables that can be used in pug template. Can be used to pass env variables

## Example
Vite entrypoint:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pug Plugin</title>
</head>
<body>
  <template data-type="pug" data-src="./template.pug"></template>
</body>
</html>
```
Pug template:
```
<!-- template.pug -->
p #{bundler} is the best
```

Vite config:
```js
// vite.config.js
import vitePugPlugin from 'vite-plugin-pug-transformer';

const locals = { bundler: 'Vite' };

export default {
  plugins: [vitePugPlugin({ pugLocals: locals })],
};
```

The result would be:
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pug Plugin</title>
</head>
<body>
  <p>Vite is the best</p>
</body>
</html>
```
