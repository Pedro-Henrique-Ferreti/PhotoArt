const path = require('path');

module.exports = {
    mode: 'production',
    entry: './public/assets/scripts/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/assets/js')
    },
    devServer: {
        publicPath: "/assets/js/",
    },
    devtool: 'source-map'
}