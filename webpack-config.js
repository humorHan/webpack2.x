/**
 * Created by humorHan on 2017/2/4.
 */
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var jsDir = path.resolve(__dirname, 'src', 'js');
var htmlDir = path.resolve(__dirname, 'src', 'html');
var node_modules = path.resolve(__dirname, 'node_modules');

//入口文件
var entries = (function () {
    var entryJs = glob.sync(jsDir + '/*.js'),
        map = {};
    entryJs.forEach(function (filePath) {
        var fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[fileName] = filePath;
    });
    map['vendor'] = [
        path.join(__dirname, '/src/dep/jquery-3.1.1.min.js')
    ];
    return map;
})();

// html TODO 也可以增加对版本化的支持
var htmlPlugin = (function () {
    var entryHtml = glob.sync(htmlDir + '/**/*.html');
    var tempArr = [];
    entryHtml.forEach(function (filePath) {
        var fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var conf = {
            template: filePath,
            filename: './html/' + fileName + '.html'
        };
        if (fileName in entries) {
            conf.inject = 'body';
            conf.chunks = ['vendor', fileName];
        } else {
            conf.inject = 'body';
            conf.chunks = ['vendor'];
            console.error('没有匹配到和html相同文件名的js,请检查!');
            //throw new Error('没有匹配到和html相同文件名的js,请检查!');
        }
        conf.chunksSortMode = function (chunk1, chunk2) {
            var orders = ['vendor', fileName];
            var order1 = orders.indexOf(chunk1.names[0]);
            var order2 = orders.indexOf(chunk2.names[0]);
            if (order1 > order2) {
                return 1;
            } else if (order1 < order2) {
                return -1;
            } else {
                return 0;
            }
        };
        tempArr.push(new HtmlWebpackPlugin(conf));
    });
    return tempArr;
})();

/**
 * webpack 配置
 * @param isWatch 监听模式包括watch和cache参数
 * @param isDev   调试模式 vs 线上
 */
module.exports = function (isWatch, isDev) {
    var cssName = isDev ? 'css/[name].css' : 'css/[name]-[contenthash].css';
    var cssExtractTextPlugin = new ExtractTextPlugin({
        filename: cssName,
        disable: false,
        allChunks: false //不将所有的文件都打包到一起
    });
    return {
        watch: isWatch,
        cache: isWatch,
        devtool: isDev ? "#inline-source-map" : false,//eval-source-map / source-map
        entry: entries,
        output: {
            path: path.join(__dirname, 'dist'),
            //publicPath: '/webpack2.x/dist/',
            filename: isDev ? "js/[name].js" : "js/[name]-[chunkhash].js",
            chunkFilename: isDev ? "js/[name]-chunk.js" : "js/[name]-chunk-[chunkhash].js"
        },
        resolve: {
            modules: [
                path.join(__dirname, 'src', 'dep'),
                path.join(__dirname, 'src', 'scss'),
                path.join(__dirname, 'src', 'tpl'),
                path.join(__dirname, 'node_modules')
            ],
            extensions: ['.js', '.tpl', '.scss', '.json'],
            alias: {
                //'mock': path.join(__dirname, 'src', 'dep', 'mock.js'),
                'jquery': path.join(__dirname, 'src', 'dep', 'jquery-3.1.1.js')
            }
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: [
                        path.join(__dirname, 'src', '/scss'),
                        path.join(__dirname, '/src/dep/components')
                    ],
                    use: isDev ?
                        cssExtractTextPlugin.extract({
                            //fallbackLoader: 'style-loader',
                            use: [
                                "css-loader?sourceMap",
                                'postcss-loader?sourceMap',
                                "sass-loader?sourceMap"
                            ]
                        }) : cssExtractTextPlugin.extract({
                            //fallbackLoader: 'style-loader',
                            use: [
                                "css-loader",
                                'postcss-loader',
                                "sass-loader"
                            ]
                        })
                }, {
                    test: /\.tpl$/,
                    include: [
                        path.join(__dirname, 'src', 'tpl'),
                        path.join(__dirname, '/src/dep/components')
                    ],
                    loader: 'tmodjs-loader'
                }, {
                    test: /\.(png|jpeg|jpg|gif)$/,
                    //loader: 'url?limit=8192&name=img/[hash:8]-[name].[ext]'
                    loader: 'url-loader?limit=8192&name=img/[name].[ext]'
                }, {
                    test: /^es5-sham\.min\.js|es5-shim\.min\.js$/,
                    include: [
                        path.join(__dirname, 'src', 'js'),
                        path.join(__dirname, 'src', 'dep')
                    ],
                    loader: 'babel-loader',
                    exclude: node_modules
                }, {
                    test: /\.html$/,
                    include: [
                        path.join(__dirname, 'src', 'html')
                    ],
                    //loader: 'html?minimize=false&interpolate=true',
                    loader: 'html-loader'
                }
            ]
        },
        plugins: (function () {
            var pluginsArr = [];
            if (isDev) {
                pluginsArr.push(
                    new webpack.optimize.CommonsChunkPlugin({
                        name: "vendor",
                        filename: "js/vendor.js",
                        minChunks: Infinity
                    }), cssExtractTextPlugin);
            } else {
                pluginsArr.push(
                    new webpack.optimize.UglifyJsPlugin({
                        output: {
                            comments: false
                        },
                        mangle: {
                            except: ['$', 'exports', 'require']
                        }
                    }),
                    new webpack.optimize.CommonsChunkPlugin({
                        name: "vendor",
                        filename: "js/vendor-[hash].js",
                        minChunks: 5,
                        hash: true
                    }), 
                    cssExtractTextPlugin,
                    //正式环境下压缩css(当然gulp压缩也ok) 注： 开发环境不可以压缩--会影响sourceMap文件
                    new OptimizeCssAssetsPlugin({
                        assetNameRegExp: /\.css$/g,
                        cssProcessor: require('cssnano'),
                        cssProcessorOptions: { discardComments: {removeAll: true } },
                        canPrint: true
                    })
                );
            }
            return pluginsArr.concat(htmlPlugin);
        })(),

        externals: {
            'jquery': '$'
        }
    }
};