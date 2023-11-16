module.exports = {
  "extends": [
    "next/core-web-vitals"
  ],
  "plugins": [
    "unused-imports"
  ],
  "rules": {
    "@next/next/no-img-element": 0,
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  },
  "env": {
    "jest": true
  }
}