
let host = "";
let loginHost = "";
switch (process.env.NODE_ENV) {
    case "development":
        host = "http://123.59.17.189:17055";
        loginHost = "http://123.59.17.189:7621";
        break
    case "test":
        host = "";
        loginHost = "";
        break
    case "gray":
        host = "";
        loginHost = "";
        break
    case "production":
        host = "";
        loginHost = "";
        break
    default:
        break
}
export {
    host,
    loginHost
}
