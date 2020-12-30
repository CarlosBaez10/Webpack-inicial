
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {

    mode: 'development', // Modo desarrollo, al pasar a produccion minimiza con los plugins
    optimization: { //Este plugin es para miniizar el css en produccion
        minimizer: [ new OptimizeCssAssetsPlugin() ] 
    },
    module: {
        rules: [
            { // estos para usar css en cada archivo css
                test: /\.css$/,
                exclude: /styles\.css$/,
                use : [
                    'style-loader',
                    'css-loader'
                ]
            },
            { //estilos css globales
                test: /styles\.css$/,
                use : [
                    MiniExtractPlugin.loader,
                    'css-loader'
                ]
            },
            { // Este plugin es para utilizar el html
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false,
                },
            },
            { // este es para imagenes
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // plugin para linpiar webpack
        new HtmlWebPackPlugin({ // Este plugin es para utilizar el html
            template:'./src/index.html',
            filename: './index.html',
            title: 'Development',
        }),
        new MiniExtractPlugin({ //estilos css globales
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({ // Este plugin es para poder visuaizar y copiar la imagenes en DIST
            patterns: [
                { from: 'src/assets', to: 'assets/' }
            ]
        })
    ],
    devServer: { /* ESTO ES PARA CUANDO EL PUERTO 8080 ESTE OCUPADO SE CAMBIA DE PUERTO*/
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
}