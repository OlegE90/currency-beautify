const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => ({
    target: 'web',
    context: path.resolve('src'),
    entry: env.prod ? './currencyBeautify.ts' : './index.tsx',
    output: {
        path: path.resolve('dist'),
        libraryTarget: 'umd',
        filename: env.prod ? 'currencyBeautify.js' : 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        modules: ['node_modules', 'src'],
    },
    module: {
        rules: [
            // Rules for JS
            {
                test: /\.(jsx|js|tsx?)$/,
                rules: [
                    {
                        loader: 'babel-loader',
                        include: [
                            path.resolve('src')
                        ],
                        options: {
                            babelrc: false,
                            presets: [
                                'es2015',
                                'react'
                            ]
                        }
                    },
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        loader: 'ts-loader'
                    }
                ]
            },
            // Rules for Style Sheets
            {
                test: /\.(css|less)$/,
                rules: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader',
                        }
                    ]

                })
            }]
    },
    externals: {
        ...(env.prod ? {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
                umd: 'react',
            }
        } : {})
    },
    plugins: [
        ...(env.prod ? [] : [
            new HtmlWebpackPlugin({
                template: path.resolve('src/assets/index.html'),
                filename: 'index.html',
                inject: 'body'
            })
        ])
    ],
    devServer: {
        host: 'localhost',
        port: process.env.npm_package_config_port || 8090,
    }
});