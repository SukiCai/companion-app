module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
	roots: [
		'<rootDir>',
	],
   	testMatch: [
        '<rootDir>/__tests__/*.spec.ts',
    ],
	moduleNameMapper: {
		'^common/(.*)': '<rootDir>/../../common/$1',
		'^server/(.*)': '<rootDir>/src/$1',
		// add mappings if needed
	},
	moduleDirectories: [
		'<rootDir>/src',
		'<rootDir>/node_modules',
		'<rootDir>/../../dashboard/node_modules',
		// add additional modules if needed
	],
};
