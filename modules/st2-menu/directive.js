'use strict';

angular.module('main')
  .directive('st2Menu', function ($window, st2api) {

    return {
      restrict: 'C',
      scope: true,
      templateUrl: 'modules/st2-menu/template.html',
      link: function postLink(scope) {
        scope.isMain = function (e) {
          return !!e.title;
        };

        scope.isActive = function (e) {
          return scope.state.includes(e);
        };

        st2api.$watch('token.user', function (user) {
          scope.user = user;
        });

        scope.logout = function () {
          st2api.logout();
          $window.location.reload();
        };
      }
    };

  });
