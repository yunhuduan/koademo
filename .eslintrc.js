module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
	"parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
	    "allowImportExportEverywhere": false,
	    "codeFrame": false
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],

	    "no-console": 0,

    }
};
