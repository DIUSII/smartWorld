const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const images = require('./webpack/images');
 
const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'dist')
};
const common = merge([
    {
        entry: {
            'faqPage': PATHS.source + '/pages/faqPage/faqPage.js',
            'homePage': PATHS.source + '/pages/homePage/homePage.js',
            'rightSidebarBlog': PATHS.source + '/pages/rightSidebarBlog/rightSidebarBlog.js',
            'rightSidebarBlogDetails': PATHS.source + '/pages/rightSidebarBlogDetails/rightSidebarBlogDetails.js',
            'signIn': PATHS.source + '/pages/signIn/signIn.js',
            'signUp': PATHS.source + '/pages/signUp/signUp.js'
        },
        output: {
            path: PATHS.build,
            filename: './js/[name]/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'pages/faqPage/faqPage.html',
                chunks: ['faqPage'],
                template: PATHS.source + '/pages/faqPage/faqPage.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['homePage'],
                template: PATHS.source + '/pages/homePage/index.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'pages/rightSidebarBlog/rightSidebarBlog.html',
                chunks: ['homePage'],
                template: PATHS.source + '/pages/rightSidebarBlog/rightSidebarBlog.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'pages/rightSidebarBlogDetails/rightSidebarBlogDetails.html',
                chunks: ['homePage'],
                template: PATHS.source + '/pages/rightSidebarBlogDetails/rightSidebarBlogDetails.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'pages/signIn/signIn.html',
                chunks: ['homePage'],
                template: PATHS.source + '/pages/signIn/signIn.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'pages/signUp/signUp.html',
                chunks: ['homePage'],
                template: PATHS.source + '/pages/signUp/signUp.pug'
            })
            
        ],
        optimization: {
            splitChunks: {
              chunks: "all",
              minSize: 1,
              minChunks: 2
            }
        }
    },
    pug(),
    images()
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