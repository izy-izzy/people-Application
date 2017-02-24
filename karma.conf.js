module.exports = function(config) {
	config.set({
		basePath: './',
		frameworks: ['jasmine'],
		files: [
			'./public/js/app.js',
			'./public/js/app.tpls.js',
			'./node_modules/angular-mocks/angular-mocks.js',
			'./node_modules/rx-jasmine-testscheduler-injector/rxjs-testscheduler-injector.js',
			'./devel/**/*.spec.js'
		],
		exclude: [
		],
		reporters: ['spec'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_ERROR,
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false,
		concurrency: Infinity
	});
};
