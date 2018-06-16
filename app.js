// var sc2 = require('sc2-sdk');
// var api = sc2.Initialize({
//   app: 'steemkar',
//   callbackURL: 'https://swapnachippagi.github.io/index.html',
//   scope: ['vote', 'comment']
// });

// var link = api.getLoginURL(state);
// console.log(link)


var api = sc2.Initialize({
 app: 'steemkar',
  callbackURL: 'https://swapnachippagi.github.io/iop/index.html',
  scope: ['vote', 'comment']
});
 

angular.module('app', [])
  .config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);
  }])
  .controller('Main', function($scope, $location, $http) {
    
   
    $scope.accessToken = $location.search().access_token;
    $scope.parentAuthor = 'chaithanya97';
    $scope.parentPermlink = 'new';
    $scope.expiresIn = $location.search().expires_in;
    $scope.loginURL = api.getLoginURL();

    if ($scope.accessToken) {
      api.setAccessToken($scope.accessToken);
     
      api.me(function (err, result) {
        console.log('/me', err, result);
       console.log("%%%%%%%%%%%%%%%%%%"+$scope.accessToken);
        if (!err) {
          $scope.user = result.account;
          $scope.metadata = JSON.stringify(result.user_metadata, null, 2);
          $scope.$apply();
        }
      });
    }

    $scope.isAuth = function() {
     console.log("############");
     console.log($scope.user);
     console.log(!!$scope.user);
     console.log("############");
      return !!$scope.user;
    };
 
 
 $scope.comment = function() {
 var permlink = steem.formatter.commentPermlink($scope.parentAuthor, $scope.parentPermlink);
 api.broadcast.comment('',$scope.parentAuthor, $scope.parentPermlink , $scope.user.name ,
permlink, 'new title', 'hai',
JSON.stringify({
tags: 'steem-versary',
app: 'steem-versary'
}),
function(err, result) {
console.log("Comment function called");
console.log(result);
console.log(err);
});
  };

    $scope.logout = function() {
      api.revokeToken(function (err, result) {
        console.log('You successfully logged out', err, result);
        delete $scope.user;
        delete $scope.accessToken;
        $scope.$apply();
      });
    };
  });
