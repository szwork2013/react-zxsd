/**
 * Created by Administrator on 16-5-2.
 */
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const px2rem = require('postcss-plugin-px2rem');
const path = require('path');
const buildPath = path.resolve(__dirname,'build');
const nodeModulesPath = path.resolve(__dirname,'node_modules');
const srcDir = path.resolve(__dirname,'app');
const pkgPath = path.resolve(__dirname, 'package.json');//package.json文件路径
const pkg = require(pkgPath);


let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}


const config  = {
    entry: {
        wxsd: path.resolve(__dirname, 'app/wxsd.js'),
        vender:['swiper'],//第三方库
    },
    resolve:{
        //When require, do not have to add these extensions to file's name
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions:["",'.web.js',".js",'.json'],
        alias: {
            core: srcDir + "/js/core",
            ui:srcDir+"/js/ui",
            model:srcDir+"/js/model",
            component:srcDir+"/js/component",
            modules:srcDir+"/js/modules",
            css:srcDir+"/css",
            img:srcDir+"/images",
            actions:srcDir+"/js/actions",
            reducers:srcDir+"/js/reducers",
            store:srcDir+"/js/store",
        }
    },
    //Render source-map file for final build
    devtool: false,
    output:{
        path:buildPath,
        filename:'[name].build.js',
    },
    plugins: [
        //提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            Swiper:"swiper",
            // nie: "nie"
        }),
        //Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false,
            },
        }),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        /*开发环境*/
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        /*css单独打包*/
        new ExtractTextPlugin("jcx.css"),
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, "app")),
    ],
    module:{
        loaders:[
            {
                test:/\.js$/,
                loaders:['babel-loader'],
                exclude:[nodeModulesPath],
            },
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.less$/,
                loader:ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!"+`less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`)
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
            }
        ],
    },
    eslint:{
        configFile:'.eslintrc',
    },
    postcss: [px2rem()],
};

module.exports = config;
