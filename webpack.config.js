const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'client', 'index.js'),
  output: { path: path.resolve(__dirname, 'build') },
  module: { rules: [ 
    { 
    test: /\.?js$/, 
    exclude: /node_modules/, 
    use: { 
      loader: "babel-loader",
      options: { presets: ['@babel/preset-env', '@babel/preset-react']}
    }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }] },
  plugins: [new HtmlWebpackPlugin({ template: path.join(__dirname, 'client', 'index.html')})],
  // proxy : { '/api': 'http://localhost:3000'}
}