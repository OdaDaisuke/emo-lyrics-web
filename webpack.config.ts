import * as DotEnv from 'dotenv-webpack'
import { watch } from 'fs';
import * as path from 'path'
import * as webpack from 'webpack'
import * as BrowserSyncPlugin from 'browser-sync-webpack-plugin'

const PROJECT_ROOT = __dirname
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public')
const SRC_DIR = path.resolve(PROJECT_ROOT, 'src')
const OUT_DIR = path.resolve(PUBLIC_DIR, 'assets')

function getEntries() {
    return [
        'react-hot-loader/patch',
        './index.tsx',
    ]
}

const config: webpack.Configuration = {
    context: SRC_DIR,
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
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3131,
            server: {
                baseDir: [PUBLIC_DIR],
            },
            single: true,
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};

export default config;


