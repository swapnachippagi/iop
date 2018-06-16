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
  
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  
 var permlink = steem.formatter.commentPermlink($scope.parentAuthor, $scope.parentPermlink);
  console.log(permlink);
     
   
api.comment(
  '', 
  'dtube', // Parent Permlink
  'chaithanya97', // Your username
  permlink, // Your post permlink
  'Demo', // Title
  'This is a test!', // Body
 // { tags: ['demo'],app:'steemjs/steemkar'}, 
{ tags: ['funny']},

  function(err, result) {
    console.log(err, result);
  }
);
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
