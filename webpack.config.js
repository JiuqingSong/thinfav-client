var path = require('path');

module.exports = {
    entry: './dist/favclient/index.js',
    output: {
        filename: 'favclient.js',
        path: __dirname + '/output',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['./dist', './node_modules']
    },
    stats: "minimal",
    devtool: "source-map"
}