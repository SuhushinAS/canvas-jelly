const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = 'production' === nodeEnv;
const paths = {
    dist: path.join(__dirname, 'www/evrone-jelly/'),
    public: path.join(__dirname, 'public'),
};
const stats = {
    colors: true,
    errorDetails: true,
    reasons: false,
};

const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = function() {
    return {
        devServer: {
            contentBase: paths.public,
            host: '0.0.0.0',
            hot: true,
            port: 8000,
            stats,
            writeToDisk: false,
        },
        devtool: isProd ? false : 'eval',
        entry: './src/index.js',
        module: {
            rules: [
                {
                    test: /\.html$/u,
                    use: {
                        loader: 'html-loader',
                        options: {minimize: false},
                    },
                },
                {
                    exclude: /node_modules/u,
                    test: /\.js$/u,
                    use: {
                        loader: 'babel-loader',
                        options: {cacheDirectory: true},
                    },
                },
                {
                    test: /\.css$/u,
                    use: [styleLoader, 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.less$/u,
                    use: [styleLoader, 'css-loader', 'postcss-loader', 'less-loader'],
                },
                {
                    test: /\.(ttf|eot|woff|woff2)(\?[a-z0-9]+)?$/u,
                    use: {
                        loader: 'file-loader',
                        options: {name: 'fonts/[name].[hash:5].[ext]'},
                    },
                },
                {
                    test: /.*\.(png|jpg|jpeg|gif)$/iu,
                    use: {
                        loader: 'file-loader',
                        options: {name: 'img/[name].[hash:5].[ext]'},
                    },
                },
            ],
        },
        node: {
            child_process: 'empty',
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
        },
        optimization: {
            minimize: isProd,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                }),
                new OptimizeCSSAssetsPlugin({
                    canPrint: true,
                    cssProcessorPluginOptions: {preset: ['default', {discardComments: {removeAll: true}}]},
                }),
            ],
            namedModules: !isProd,
            noEmitOnErrors: isProd,
        },
        output: {
            filename: '[name].min.js',
            library: ['htmlLayoutKit'],
            path: paths.dist,
            publicPath: '/evrone-jelly/',
        },
        plugins: [
            ...getPrePlugins(),
            new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}}),
            new webpack.IgnorePlugin(/^\.\/locale$/u, /moment$/u),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: true,
                minify: false,
                template: 'src/index.tpl',
            }),
            new CopyPlugin({patterns: [{from: paths.public, to: paths.dist}]}),
            ...getPostPlugins(),
        ],
        resolve: {
            extensions: ['.js'],
            modules: ['src', 'node_modules'],
        },
        stats,
        watchOptions: {aggregateTimeout: 100},
    };
};

function getPrePlugins() {
    if (isProd) {
        return [
            new CleanWebpackPlugin({
                dry: false,
                verbose: true,
            }),
            new webpack.LoaderOptionsPlugin({
                debug: false,
                minimize: true,
                options: {customInterpolateName: (url) => url.toLowerCase()},
            }),
            // new BundleAnalyzerPlugin(),
        ];
    }

    return [new webpack.HotModuleReplacementPlugin()];
}

function getPostPlugins() {
    if (isProd) {
        return [
            new MiniCssExtractPlugin({filename: '[name].min.css'}),
        ];
    }

    return [];
}
