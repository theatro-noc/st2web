'use strict';
angular.module('main')
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        controller: 'st2LoginCtrl',
        templateUrl: 'apps/st2-login/template.html'
      })
      ;

    $urlRouterProvider.deferIntercept();

  })
  .run(function ($rootScope, $urlRouter, st2api, $state) {

    $rootScope.$on('$locationChangeSuccess', function(e) {
      if (st2api.isAuthenticated()) {
        return;
      }

      e.preventDefault();

      $state.go('login');
    });

    $urlRouter.listen();

  });


angular.module('main')
  .controller('st2LoginCtrl', function ($scope, st2api, $rootScope, $window) {

    $scope.submit = function (url, user, password, remember) {
      st2api.login(url, user, password, remember).then(function () {
        $window.location.reload();
      }).catch(function (err) {
        if (err.status === 0) {
          $scope.error = 'Unknown error. Possible SSL voliation.';
        } else {
          $scope.error = err.message;
        }
        $scope.$apply();
      });
    };

    $scope.remember = true;

    $scope.servers = [{
      name: 'Dev Env',
      url: '//172.168.50.50:9101'
    }, {
      name: 'Stage 1',
      url: '//st2stage001.stackstorm.net:9101'
    }, {
      name: 'Stage 2',
      url: '//st2stage002.stackstorm.net:9101'
    }, {
      name: 'Stage 3',
      url: '//st2stage003.stackstorm.net:9101'
    }, {
      name: 'Stage 4',
      url: '//st2stage004.stackstorm.net:9101'
    }];

    $scope.server = $scope.servers[0];

  });
