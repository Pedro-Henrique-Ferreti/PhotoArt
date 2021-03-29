const path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/assets/scripts/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [{ test: /\.css$/, use: 'raw-loader' }],
    },
    devtool: 'eval-source-map'
}