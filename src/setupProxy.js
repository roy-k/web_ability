const proxy = require("http-proxy-middleware")

// 49.235.138.131/ecapi/user/login.do

module.exports = function(app) {
    app.use(
        "/api",
        proxy({
            target: "http://localhost:3880",
            changeOrigin: true,
        })
    )
}
