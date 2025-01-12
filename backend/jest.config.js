module.exports = {
    transform: {
        '^.+\\.mjs$': 'babel-jest', // Use babel-jest to transform .mjs files
        '^.+\\.js$': 'babel-jest',  // Optional: in case you also use .js files
    },
    testEnvironment: 'node', // Use Node environment for tests
    moduleFileExtensions: ['js', 'json'], // Ensure .mjs files are handled
};