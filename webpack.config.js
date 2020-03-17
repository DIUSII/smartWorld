const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
 
const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'dist')
};
const common = merge([
    {
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
        ]
    },
    pug(),
    // sass()
]);
module.exports = function(env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS()
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            devserver()
        ]);
    }
};