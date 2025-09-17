
export default {
  basePath: 'https://mfahd7.github.io/Angular-E-commerce',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
