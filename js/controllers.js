'use strict';

function LoginCtrl($scope, $location, angularFire, angularFireAuth) {
	var ref = new Firebase('https://hackmit-mafia.firebaseio.com/');
	$scope.model = {};
	angularFire(ref, $scope, "model");
	angularFireAuth.initialize(ref, {scope: $scope, name: "user"});
  $scope.$on("angularFireAuth:login", function(evt, user) {
		$location.path("/home");
  });
  $scope.$on("angularFireAuth:error", function(evt, err) {
    console.log(err);
  });
	$scope.login = function() {
		angularFireAuth.login('password', { email: $scope.email, password: $scope.password });
	}
}

function SignupCtrl($scope, $location, angularFire, angularFireAuth) {
	var ref = new Firebase('https://hackmit-mafia.firebaseio.com/');
	$scope.model = {};
	angularFire(ref, $scope, "model");
	angularFireAuth.initialize(ref, {scope: $scope, name: "user"});
  $scope.$on("angularFireAuth:login", function(evt, user) {
		$location.path("/home");
  });

	$scope.signup = function() {
		angularFireAuth.createUser($scope.email, $scope.password, function(error, user) {
			if(error) {
				alert(error);
			} else {
				$location.path("/home");
			}
		});
	}
}

function HomeCtrl($scope, $location, angularFire, angularFireAuth) {
	var ref = new Firebase('https://hackmit-mafia.firebaseio.com/');
	$scope.model = {};
	angularFire(ref, $scope, "model");
	angularFireAuth.initialize(ref, {scope: $scope, name: "user"});
  $scope.$on("angularFireAuth:logout", function(evt) {
		$location.path("/"); 
  });
  $scope.$on("angularFireAuth:error", function(evt, err) {
    console.log(err);
  });

	$scope.logout = function() {
		angularFireAuth.logout();
	}
}

function MainCtrl($scope, $location, angularFire, angularFireAuth) {
	var ref = new Firebase('https://hackmit-mafia.firebaseio.com/');
	$scope.model = {};
	angularFire(ref, $scope, "model");
	angularFireAuth.initialize(ref, {scope: $scope, name: "user"});
  $scope.$on("angularFireAuth:login", function(evt, user) {
		$location.path("/home");
  });
	$scope.login = function() {
		$location.path("/login");
	}
	$scope.signup = function() {
		$location.path("/signup");
	}
}

