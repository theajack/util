// let version = require('../helper/version.json').version;

const path = require('path');
let pkg = require('../package.json');
let config = require('../ebuild.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// if config.name not exist, use package name
let name = ((name) => {
    let res = '';
    for (var i = 0; i < name.length; i++) {
        if (name[i] === '-') {
            if (i < name.length - 1) {
                i++;
                res += name[i].toUpperCase();
            }
        } else {
            res += name[i];
        }
    }
    return res;
})(pkg.name);

let libraryName = config.libraryName || name;
let cdnFileName = config.cdnFileName || name;

let version = config.version;

let index = 'src/index.js';

module.exports = (env) => {
    let npm = env.mode === 'npm';
    return {
        mode: 'production',
        entry: path.resolve('./', index),
        output: {
            path: path.resolve('./', npm ? 'npm' : 'cdn'),
            filename: npm ? 'index.js' : (cdnFileName + '.' + version + '.min.js'),
            library: libraryName,
            libraryTarget: 'umd',
            libraryExport: 'default',
        },
        externals: npm ? config.npmExternals : {},
        module: {
            rules: [
                {
                    test: /(.js)$/,
                    use: [{
                        loader: 'babel-loader',
                    }]
                }, {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/,
                    options: {
                        configFile: './.eslintrc.js'
                    }
                }, {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                }, {
                    test: /\.less$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                }, {
                    test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                    },
                }, {
                    test: /\.html$/,
                    loader: 'html-loader',
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].min.css',
            }),
            new HtmlWebpackPlugin({
                template: './helper/index.tpl.html',
                filename: 'index.html',
            }),
            new OptimizeCssAssetsPlugin()
        ]
    };
};
