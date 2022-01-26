const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { node } = require('webpack');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: { path: path.resolve(__dirname, 'build'), filename: 'bundle.js' },
  devServer: { 
    static: { directory: '/home/kirk/solo-app/client' },
    //proxy : { '/signUp': 'http://localhost:3000/signUp'}
  },
  module: { rules: [ 
    { 
    test: /\.jsx?/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets:['@babel/preset-env', '@babel/preset-react']
                }
            },
          
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }] },
  plugins: [new HtmlWebpackPlugin({ template: path.join(__dirname, 'client', 'index.html')})],
}