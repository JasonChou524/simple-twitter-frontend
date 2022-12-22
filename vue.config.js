module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/simple-twitter-frontend/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/variable.scss";
        `
      }
    }
  }
}
