const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { node } = require('webpack');

// module.exports = {
//   mode: 'development',
//   entry: './client/index.js',
//   output: { path: path.resolve(__dirname, 'build'), filename: 'bundle.js' },
//   devServer: { 
//     static: { directory: '/home/kirk/solo-app/client' },
//     proxy : { '/': 'http://localhost:3000/'}
//   },
//   module: { rules: [ 
//     { 
//     test: /\.jsx?/,
//             exclude: /(node_modules)/,
//             use: {
//                 loader: 'babel-loader',
//                 options: {
//                     presets:['@babel/preset-env', '@babel/preset-react']
//                 }
//             },
          
//       test: /\.s[ac]ss$/i,
//       use: ['style-loader', 'css-loader', 'sass-loader'],
//     }] },
//   plugins: [new HtmlWebpackPlugin({ template: path.join(__dirname, 'client', 'index.html')})],
// }
module.exports = {
  mode: 'development',
  entry: './client/index.js',
  // output: {
  //   publicPath: '/serve-localhost:3000'
  // },
  devServer: {
    static: {
      directory: '/home/kirk/solo-app/client',
    },
    // compress: true,
    // port: 8080
    proxy: {'/post': 'http://localhost:3000'}
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html',
    // publicPath: 'index.js',
    // publicPath: '/serve-localhost:3000',
  })],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }
      },
      {
        test: /\.s[ac]ss$/i, 
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
}