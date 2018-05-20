import * as DotEnv from 'dotenv-webpack'
import { watch } from 'fs';
import * as path from 'path'
import * as webpack from 'webpack'

const PROJECT_ROOT = __dirname
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public')
const SRC_DIR = path.resolve(PROJECT_ROOT, 'src')
const OUT_DIR = path.resolve(PUBLIC_DIR, 'assets')
const WEBPACK_DEV_SERVER = process.argv.filter(
    (v) => {
        return v.indexOf('webpack-dev-server') !== -1
    }).length > 0

if (WEBPACK_DEV_SERVER) {
    console.log("setup for webpack-dev-server")
} else {
    console.log(`building for ${process.env.NODE_ENV}...`)
}

function getEntries() {
    if (WEBPACK_DEV_SERVER) {
        return [
            'webpack-dev-server/client?http://localhost:3131',
            'react-hot-loader/patch',
            'webpack/hot/dev-server',
            './index.tsx',
        ]
    } else {
        return ["./index.tsx"]
    }
}

const config: webpack.Configuration = {
    context: SRC_DIR,
    devServer: {
        contentBase: [PUBLIC_DIR],
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 3131,
        publicPath: '/assets/',
        watchContentBase: true,
    },
    devtool: 'source-map',
    entry: getEntries(),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
            },
        ],
    },
    output: {
        path: OUT_DIR,
        filename: 'app.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new DotEnv({
            safe: true,
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};

export default config;
