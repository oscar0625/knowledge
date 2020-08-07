module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/preset-env", {
            useBuiltIns: "usage",
            corejs: { version: 3, proposals: true }
        }]
    ];

    const plugins = [
        ["@babel/plugin-proposal-class-properties", {
            "loose": true
        }],
        "@babel/plugin-transform-runtime",
        ["./myPlugin", {
            "bad": "good",
            "dead": "alive"
        }]
    ];

    return {
        presets,
        plugins
    };
}