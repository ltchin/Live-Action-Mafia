'use strict';

/**
 * The main mafia app module
 *
 * @type {angular.Module}
 */
var mafiaApp = angular.module('mafiaApp', ['firebase'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'})
		.when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignupCtrl'})
		.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'})
		.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'})
		.otherwise({redirectTo: '/home'})
	}]);

