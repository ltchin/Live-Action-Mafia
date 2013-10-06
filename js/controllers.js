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


function initModel($scope, ref) {
	if(!$scope.model.day) {
		$scope.model.day = 1;
	}
}

function SignupCtrl($scope, $location, angularFire, angularFireAuth) {
	var ref = new Firebase('https://hackmit-mafia.firebaseio.com/');
	$scope.model = {};
	angularFire(ref, $scope, "model").then(function() { initModel($scope); });
	angularFireAuth.initialize(ref, {scope: $scope, name: "user"});
  $scope.$on("angularFireAuth:login", function(evt, user) {
		$location.path("/home");
  });
	$scope.signup = function() {
		angularFireAuth.createUser($scope.email, $scope.password, function(error, user) {
			if(error) {
				alert(error);
			} else {
				var obj = {};
				obj[user.id] = {'username':$scope.username, 'email':$scope.email};
				ref.child('players').update(obj);
				$location.path("/home");
			}
		});
	}
}

function HomeCtrl($scope, $location, angularFire, angularFireAuth) {
	var ref = new Firebase('https://hackmit-mafia.firebaseio.com/');
	$scope.model = {};
	angularFire(ref, $scope, "model").then(function() { initModel($scope); });
	angularFireAuth.initialize(ref, {scope: $scope, name: "user"});
  $scope.$on("angularFireAuth:login", function(evt) {
		if(!ref.child('players')[$scope.user.id]) {
			var obj = {};
			obj[$scope.user.id] = {'username':$scope.user.email.split('@')[0], 'email':$scope.user.email};
			ref.child('players').update(obj);
		}
		ref.child('day').on('value', function(day) {
			//alert($scope.user.id);
			ref.child('lynchVotes').child(day.val()).child($scope.user.id).on('value', function(vote) {
				if(!vote.val()) {
					var obj1 = {};
					obj1[$scope.user.id] = -1;
					ref.child('lynchVotes').child(day.val()).update(obj1);
				}
			});
		});
  });
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

