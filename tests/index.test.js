import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

import pugPlugin from '../src/index.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const entryFilePath = join(currentDir, 'templates', 'index.html');

test('should work without template tag', () => {
  // ARRANGE
  const html = '<body><p>Hello, World!</p></body>';

  // ACTION
  const result = pugPlugin().transformIndexHtml.transform(html, {});

  // ASSERT
  assert.equal(result, html);
});

test('should ignore tempalate tag without necessary type', () => {
  // ARRANGE
  const html = `
    <body>
      <p>
        Hello, World!
        <template>I'm template</template>
      </p>
    </body>
  `;

  // ACTION
  const result = pugPlugin().transformIndexHtml.transform(html, {});

  // ASSERT
  assert.equal(result, html);
});


test('should throw error when there is no path in template tag', () => {
  // ARRANGE
  const html = `
    <body>
      <p>
        Hello, World!
        <template data-type="pug"></template>
      </p>
    </body>
  `;

  // ACTION
  const transformFn = () => pugPlugin().transformIndexHtml.transform(html, {});

  // ASSERT
  assert.throws(transformFn, 'Template path not specified for <template data-type="pug"></template>');
});

test('should throw error when there is no path in self-closed template tag', () => {
  // ARRANGE
  const html = `
    <body>
      <p>
        Hello, World!
        <template data-type="pug" />
      </p>
    </body>
  `;

  // ACTION
  const transformFn = () => pugPlugin().transformIndexHtml.transform(html, {});

  // ASSERT
  assert.throws(transformFn, 'Template path not specified for <template data-type="pug" />');
});

test('should transform template tag', () => {
  // ARRANGE
  const rawHtml = `
    <body>
      <p>
        Hello, World!
        <template data-type="pug" data-src="./template.pug"></template>
      </p>
    </body>
  `;
  const expectedHtml = `
    <body>
      <p>
        Hello, World!
        <p>Pug</p>
      </p>
    </body>
  `;

  // ACTION
  const result = pugPlugin().transformIndexHtml.transform(rawHtml, { filename: entryFilePath });

  // ASSERT
  assert.equal(result, expectedHtml);
});

test('should transform self-closed template tag', () => {
  // ARRANGE
  const rawHtml = `
    <body>
      <p>
        Hello, World!
        <template data-type="pug" data-src="./template.pug" />
      </p>
    </body>
  `;
  const expectedHtml = `
    <body>
      <p>
        Hello, World!
        <p>Pug</p>
      </p>
    </body>
  `;

  // ACTION
  const result = pugPlugin().transformIndexHtml.transform(rawHtml, { filename: entryFilePath });

  // ASSERT
  assert.equal(result, expectedHtml);
});

test('should work with pug locals', () => {
  // ARRANGE
  const rawHtml = `
    <body>
      <p>
        Hello, World!
        <template data-type="pug" data-src="./locals.pug" />
      </p>
    </body>
  `;
  const expectedHtml = `
    <body>
      <p>
        Hello, World!
        <p>Vite is the best</p>
      </p>
    </body>
  `;

  // ACTION
  const result = pugPlugin({ pugLocals: { bundler: 'Vite' } })
    .transformIndexHtml.transform(rawHtml, { filename: entryFilePath });

  // ASSERT
  assert.equal(result, expectedHtml);
});

test('should work multiple templates', () => {
  // ARRANGE
  const rawHtml = `
    <body>
      <p>
        Hello, World!
        <template data-type="pug" data-src="./template.pug" />
        <template data-type="pug" data-src="./locals.pug" />
      </p>
    </body>
  `;
  const expectedHtml = `
    <body>
      <p>
        Hello, World!
        <p>Pug</p>
        <p>Vite is the best</p>
      </p>
    </body>
  `;

  // ACTION
  const result = pugPlugin({ pugLocals: { bundler: 'Vite' } })
    .transformIndexHtml.transform(rawHtml, { filename: entryFilePath });

  // ASSERT
  assert.equal(result, expectedHtml);
});

test.run();
