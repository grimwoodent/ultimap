/* eslint-env node */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const DEBUG = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const EXAMPLES_PATH = path.join(__dirname, 'examples');
const LIB_PATH = path.join(__dirname, 'dist');

const resultConfig = {
    context: EXAMPLES_PATH,

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            ultimap: path.join(LIB_PATH, '')
        }
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            })
        }, {
            test: /\.twig$/,
            use: [
                'twig-loader'
            ]
        }, {
            test: /\.png$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: '30000',
                    name: 'images/[name]-[hash].[ext]',
                },
            }],
        }, {
            test: /\.jpg$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name]-[hash].[ext]',
                },
            }],
        }, {
            test: /\.gif$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name]-[hash].[ext]',
                },
            }],
        }, {
            test: /\.ts(x?)$/,
            use: [{
                loader: 'babel-loader'
            }, {
                loader: 'ts-loader'
            }],
        }, {
            test: /\.ts$/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                emitErrors: true,
                fix: false,
                tsConfigFile: 'tsconfig.json'
            }
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            __DEBUG__: JSON.stringify(DEBUG),
            'process.env': {
                NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production')
            },
        }),
        new ExtractTextPlugin('./css/[name].css'),
        new CommonsChunkPlugin({
            name: 'common'
        })
    ],

    watch: DEBUG,

    devtool: DEBUG ? 'source-map' : false
};

if (!DEBUG) {
    resultConfig.plugins.push(
        new UglifyJsPlugin()
    );
}

module.exports = [
    { name: 'basic', path: 'basic', entry: '/js/index.js' },
    { name: 'marker', path: 'marker', entry: '/js/index.js' },
    { name: 'polygon', path: 'polygon', entry: '/js/index.js' },
    { name: 'events', path: 'events', entry: '/js/index.js' },
    { name: 'controls', path: 'controls', entry: '/js/index.js' },
].map((m) => Object.assign({}, resultConfig, {
    name: m.name,
    entry: `./${m.path}${m.entry}`,
    output: {
        path: path.resolve(EXAMPLES_PATH, `${m.path}/dist`),
        filename: "[name].js",
        library: '[name]',
        libraryTarget: 'this'
    },
}));
