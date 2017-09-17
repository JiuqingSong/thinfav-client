module.exports = {
    entry: './dist/favclient/index.js',
    output: {
        filename: 'favclient.js',
        path: __dirname + '/output',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['./dist', './node_modules', './packages']
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['css-loader', 'sass-loader']
            }
        ]
    },
    stats: "minimal",
    devtool: "source-map"
}