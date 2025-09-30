module.exports = {
    apps: [
        {
            name: "TwinBackend-REST",
            script: "./dist/rest/index.js",
            env: {
                REST_PORT: process.env.REST_PORT || 3000
            }
        },
        {
            name: "TwinBackend-WS",
            script: "./dist/ws/index.js",
            env: {
                WSS_PORT: process.env.WSS_PORT || 4000
            }
        }
    ]
};
