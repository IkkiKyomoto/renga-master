// const path = require('path');

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.html$/,
//         use: ['html-loader'],
//         include: [
//           path.resolve(__dirname, 'node_modules/@mapbox/node-pre-gyp/lib/util/nw-pre-gyp'),
//           // pnpmのパス構造に合わせたパスを追加
//           path.resolve(__dirname, 'node_modules/.pnpm/@mapbox+node-pre-gyp@1.0.11_encoding@0.1.13/node_modules/@mapbox/node-pre-gyp/lib/util/nw-pre-gyp')
//         ]
//       }
//     ]
//   },
//   externals: {
//     // npmの設定を見直し、必要に応じて修正
//   },
//   // IgnorePluginの設定例（bcryptの警告対応）
//   plugins: [
//     new webpack.IgnorePlugin({
//       resourceRegExp: /^\.\/locale$/,
//       contextRegExp: /moment$/
//     })
//   ]
// };