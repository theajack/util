const path = require('path');
require('../helper/generate-export');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RunNodeWebpackPlugin = require('run-node-webpack-plugin');
const fileConfig = require('./_build_config.json');

const fs = require('fs');
const version = require('../package.json').version;

fs.writeFileSync(path.resolve('./', 'src/version.ts'), `export default '${version}';`, 'utf8');

function generateEntrys (fileConfig) {
    const entrys = {};
    for (const k in fileConfig) {
        entrys[k] = path.resolve('./', fileConfig[k].path);
    }
    return entrys;
}

function clearDir (name, root = true) {
    let files = [];
    if (fs.existsSync(name)) {
        files = fs.readdirSync(name);
        files.forEach((file) => {
            const curPath = name + '/' + file;
            if (fs.statSync(curPath).isDirectory()) {
                clearDir(curPath, false); // 递归删除文件夹
            } else {
                fs.unlinkSync(curPath); // 删除文件
            }
        });
        if (!root)
            fs.rmdirSync(name);
    }
}

clearDir(path.resolve('./', 'npm'));

module.exports = () => {
    return {
        mode: 'production',
        entry: generateEntrys(fileConfig),
        output: {
            path: path.resolve('./', 'npm'),
            filename: (chunkData) => {
                const name = chunkData.chunk.name;
                return `${fileConfig[name].file}.js`;
            },
            library: '[name]',
            libraryTarget: 'umd',
            libraryExport: 'default',
            globalObject: 'this',
        },
        externals: {
            'tc-event': 'tc-event',
            'easy-dom-util': 'easy-dom-util',
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        externals: {},
        module: {
            rules: [{
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
                test: /(.js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/,
                options: {
                    configFile: './.eslintrc.js'
                }
            }]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {from: 'src/type/main.d.ts', to: 'tc-util.min.d.ts'},
                    {from: 'src/type/*.d.ts', flatten: true},
                    {from: 'README.cn.md'},
                    {from: 'README.md'},
                    {from: 'src/LICENSE'},
                    {from: 'src/package.json'}
                ]
            }),
            new RunNodeWebpackPlugin({scriptToRun: './helper/sync-npm-version.js'})
        ]
    };
};