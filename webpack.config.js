module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,  // Match all JavaScript and JSX files
          exclude: /node_modules/, // Exclude node_modules unless needed
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'  // Ensure JSX is handled
              ]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']  // Ensure React JSX files are processed correctly
    }
  };
  