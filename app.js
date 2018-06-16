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
    $scope.parentPermlink = 'd';
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
  ///$scope.parentAuthor, $scope.parentPermlink,permlink
  
      api.comment('chaithanya97','kungufu-panda', $scope.user.name,'f-1', 'I dont know ',{tags : ['ABC']}, function(err, result) {
        console.log(err, result);
         
        
        $scope.$apply();
        
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
