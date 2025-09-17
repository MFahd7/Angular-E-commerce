
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Angular-E-commerce/',
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
    'index.csr.html': {size: 11468, hash: '6da62d6540b0b5df02dbaf9990b79ce1b6cbb892f8e4d4c4125157226a2b3762', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1388, hash: '2d6f2e00086761b3a2e0e896b48c24bc7056715311f47b3efeaf9dc377a500b5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-QV5Y2Y7T.css': {size: 192107, hash: 'tOdIG681Yzk', text: () => import('./assets-chunks/styles-QV5Y2Y7T_css.mjs').then(m => m.default)}
  },
};
