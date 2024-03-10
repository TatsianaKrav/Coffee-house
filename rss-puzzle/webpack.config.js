const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: '.dist',
    },
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/styles', to: 'styles' },
        { from: 'src/static/fonts', to: 'fonts' },
        { from: 'src/static/images', to: 'images' },
      ],
    }),
    new EslingPlugin({ extensions: 'ts' }),
  ],
};
