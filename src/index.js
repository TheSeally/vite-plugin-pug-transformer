import { join } from 'path';
import { compileFile } from 'pug';

export default function ({ pugOptions = {}, pugLocals = {} } = {}) {
  return {
    name: 'vite-plugin-pug-transformer',

    handleHotUpdate({ file, server }) {
      if (file.endsWith('.pug')) {
        server.ws.send({
          type: 'full-reload',
        });

        return [];
      }
    },

    transformIndexHtml: {
      enforce: 'pre',
      transform(html, { filename }) {
        const updatedHtml = html.replace(/<template.*?data-type="pug".*?(\/>|<\/template>)/g, (matchedString) => {
          const [, rawTemplatePath] = matchedString.match(/data-src=["'](.*?)["']/) || [];

          if (!rawTemplatePath) {
            throw new Error(`Template path not specified for ${matchedString}`);
          }

          const entryFileDir = filename.replace(/(.*)\/.*\.html$/, '$1');
          const templateFilePath = join(entryFileDir, rawTemplatePath);

          return compileFile(templateFilePath, pugOptions)(pugLocals);
        });

        return updatedHtml;
      },
    },
  };
}
