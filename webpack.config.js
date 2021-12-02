const HtmlWebPack       = require('html-webpack-plugin');
const MiniCssExtract    = require("mini-css-extract-plugin");
const CopyPlugin        = require("copy-webpack-plugin");

module.exports = {

    mode: 'development',
    
    output: {
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    //attributes: false,
                    sources: false,
                    minimize: false,
                },  
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: [ 'style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    optimization: {

    },
    plugins: [
        new HtmlWebPack({
            title: 'Mi Webpack App',
            template: './src/index.html',
            filename: './index.html', // en automatico le pone index.html
            inject: 'body',
        }),
        new MiniCssExtract({
            filename: '[name].css', // filename: '[name].[fullhash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns:[
                { from: 'src/assets/', to: 'assets/'},
            ],
        }),
    ]
}