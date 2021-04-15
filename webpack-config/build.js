// let version = require('../helper/version.json').version;

const path = require('path');
const pkg = require('../package.json');
const config = require('../ebuild.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// if config.name not exist, use package name
const name = ((name) => {
    let res = '';
    for (let i = 0; i < name.length; i++) {
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
 
const libraryName = config.libraryName || name;
const cdnFileName = config.cdnFileName || name;

const version = config.version;

const index = 'src/index.ts';

module.exports = (env) => {
    const npm = env.mode === 'npm';
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
        resolve: {
            extensions: [ '.tsx', '.ts', '.d.ts', '.js' ]
        },
        module: {
            rules: [
                {
                    test: /(.ts)$/,
                    use: {
                        loader: 'ts-loader'
                    }
                }, {
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
