/**
 * Created by Administrator on 16-5-2.
 */

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TransferWebpackPlugin = require('transfer-webpack-plugin');
//const px2rem = require('postcss-plugin-px2rem');
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

const config = {
    entry: {
        manage: path.resolve(__dirname, 'app/manage.js'),
        vender:['swiper'],//第三方库
    },
    resolve:{
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions:["",".js",'.json'],
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
            containers:srcDir+"js/containers",
        }
    },
    devServer:{
        contentBase: 'app/www',  //Relative directory for base of server
        devtool:'eval',
        hot:true,//Live-reload
        inline:true,
        port:3001,//Port Number
        host:'0.0.0.0'//Change to '0.0.0.0' for external facing server
    },
    devtool: 'eval',
    output:{
        path:buildPath,
        filename:'[name].build.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            Swiper:"swiper",
        }),
        //Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("jcx.css"),
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, "app")),
    ],
    module:{
        loaders:[
            {
                test:/\.js$/, //All .js files
                loaders:['react-hot','babel-loader'],
                exclude:[nodeModulesPath],
            },
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.less$/,
                loader:ExtractTextPlugin.extract("style-loader", "css-loader!"+`less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`)
            },
            {
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
            }
        ],
    },
    eslint:{
        configFile:'.eslintrc',
    },
    //postcss: [px2rem()],
};

module.exports = config;

