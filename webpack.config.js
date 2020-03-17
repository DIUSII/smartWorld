const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'dist')
};
 
// module.exports = {
//     entry: PATHS.source + '/index.js',
//     output: {
//         path: PATHS.build,
//         filename: '[name].js'
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: PATHS.source + '/index.pug',
//         })
//     ],
//     module: {
//         rules: [{
//             test: /\.pug$/,
//             loader: 'pug-loader',
//             options: {
//                 pretty: true
//             }
//         }]
//     }
// };
const common = {
    entry: {
        'faqPage': PATHS.source + '/pages/faqPage/faqPage.js',
        'homePage': PATHS.source + '/pages/homePage/homePage.js'
    },
    output: {
        path: PATHS.build,
        filename: './js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'pages/faqPage.html',
            chunks: ['faqPage'],
            template: PATHS.source + '/pages/faqPage/faqPage.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['homePage'],
            template: PATHS.source + '/pages/homePage/index.pug'
        })
    ],
    module: {
        rules: [{
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
                pretty: true
            }
        }]
    }
};
const developmentConfig = {
    devServer: {
        // stats: 'errors-only',
        port: 9000
    }
};
module.exports = function(env) {
    if (env === 'production') {
        return common;
    }
    if (env === 'development') {
        return Object.assign(
            {},
            common,
            developmentConfig
        );
    }
};
