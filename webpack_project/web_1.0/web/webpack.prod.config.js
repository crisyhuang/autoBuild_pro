const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/components/my-component/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new WebpackManifestPlugin(),
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            title: 'my-component'
        }),
        new ExtractTextWebpackPlugin({
            filename: '[name].css'
        })
    ]
};