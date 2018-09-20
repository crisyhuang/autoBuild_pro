const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    // devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "src"),
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                include: path.resolve(__dirname, "src"),
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
        new ExtractTextWebpackPlugin({
            filename: '[name].css'
        }),
        new webpack.HashedModuleIdsPlugin()
        // new UglifyJSPlugin({sourceMap: true}), //启用了mode:production,会自动引入该插件
        // new webpack.optimize.CommonsChunkPlugin({name: 'manifest'}) //web4+已删除该插件，改用splitChunks
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor'
                }
            }
        }
    }
});