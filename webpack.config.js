const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//抽离css
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: __dirname + '/src/main.js',
	output: {
		filename: 'scripts/[name].js',
        publicPath: __dirname + '/dist/',
		path: __dirname + '/dist',
	},
	module: {
		rules: [
			{
            	test: /\.js$/,
            	exclude: /(node_modules|bower_components)/,
            	use: {
        			loader: 'babel-loader',
        			options: {
        			  presets: ['es2015']
        			}
      			}
        	},
        	{
        		test: /\.css$/,
        		use: ExtractTextPlugin.extract({
                	fallback: 'style-loader',
                	use: [
                        {loader:'css-loader',options:{minimize: true,importLoaders:1}},
                        {
                            loader: 'postcss-loader',
                            // options: { sourceMap: false, config: { path: 'postcss.config.js' } }
                            options: { config: { path: 'postcss.config.js' } }
                        }
                    ]
            	})
        	},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            name: 'images/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            }
        ]
	},
	plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            }
        }),
		new ExtractTextPlugin('styles/[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            // inject: true
        })
	]
}