const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './index.html', to: 'index.html' }, // Adjust the paths accordingly
            ],
        }),
    ],
    // ... other configurations ...
};
