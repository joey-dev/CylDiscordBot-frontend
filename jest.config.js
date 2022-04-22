module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.svg$": "<rootDir>/svgTransform.js"
    },
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ]
};
