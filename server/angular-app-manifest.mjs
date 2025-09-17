
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://mfahd7.github.io/Angular-E-commerce/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-LHFTTVLC.js",
      "chunk-D45XOFRW.js",
      "chunk-XBAZ7QRV.js",
      "chunk-EDOPA5EH.js",
      "chunk-J7GH3H2L.js",
      "chunk-LLKP4264.js",
      "chunk-4CCPFO7F.js",
      "chunk-JHWFBJCD.js"
    ],
    "route": "/Angular-E-commerce"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-CBFY4EOL.js",
      "chunk-4CCPFO7F.js"
    ],
    "route": "/Angular-E-commerce/brands"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BTJWKKYM.js",
      "chunk-DAXPEHMZ.js",
      "chunk-KDAZZI2D.js",
      "chunk-JHWFBJCD.js"
    ],
    "route": "/Angular-E-commerce/cart"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HGUL6R2S.js",
      "chunk-D45XOFRW.js"
    ],
    "route": "/Angular-E-commerce/categories"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-X6UOUHVG.js",
      "chunk-KDAZZI2D.js"
    ],
    "route": "/Angular-E-commerce/login"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HJAOZCFL.js",
      "chunk-XBAZ7QRV.js",
      "chunk-KDAZZI2D.js",
      "chunk-J7GH3H2L.js",
      "chunk-LLKP4264.js",
      "chunk-4CCPFO7F.js",
      "chunk-JHWFBJCD.js"
    ],
    "route": "/Angular-E-commerce/product"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QMQPLN4T.js",
      "chunk-EDOPA5EH.js",
      "chunk-J7GH3H2L.js",
      "chunk-LLKP4264.js",
      "chunk-4CCPFO7F.js",
      "chunk-JHWFBJCD.js"
    ],
    "route": "/Angular-E-commerce/product-details/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-Q6WNSFBI.js",
      "chunk-KDAZZI2D.js"
    ],
    "route": "/Angular-E-commerce/register"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-H4RJEOC5.js",
      "chunk-KDAZZI2D.js"
    ],
    "route": "/Angular-E-commerce/reset-password"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-2BWVRHTX.js",
      "chunk-DAXPEHMZ.js",
      "chunk-LLKP4264.js",
      "chunk-4CCPFO7F.js",
      "chunk-JHWFBJCD.js"
    ],
    "route": "/Angular-E-commerce/wishlist"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-PEY6VWWK.js"
    ],
    "route": "/Angular-E-commerce/allorders"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-Q2X2562F.js"
    ],
    "route": "/Angular-E-commerce/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 11492, hash: 'c4e86c934385c79b6318fe3a0f49cbb6b13a5998e7450cf3382cc8e2d17d7a67', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1412, hash: '3ddba1f80d140e632b51e73b62aa9d1a33f977770f3480f7098a45d688af6f7c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-QV5Y2Y7T.css': {size: 192107, hash: 'tOdIG681Yzk', text: () => import('./assets-chunks/styles-QV5Y2Y7T_css.mjs').then(m => m.default)}
  },
};
