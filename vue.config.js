module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  publicPath: '/',
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://192.168.1.1:80',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
