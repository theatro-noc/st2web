'use strict';

angular.module('main')
  .service('st2api', function ($window, st2Client, $rootScope) {
    var key = 'st2AuthToken'
      , token = JSON.parse($window.localStorage.getItem(key));

    var scope = $rootScope.$new(true);

    scope.token = token;

    if (token) {
      scope.client = st2Client(token.url).setToken(token);
    }

    scope.login = function (url, user, password, remember) {
      if (this.isAuthenticated()) {
        throw {
          name: 'Error',
          message: 'Another user is already authenticated'
        };
      }

      return st2Client(url).authenticate(user, password).then(function (token) {
        token.url = url;
        if (remember) {
          $window.localStorage.setItem(key, JSON.stringify(token));
        }
        this.token = token;
        scope.$apply();
      }.bind(this));

    };

    scope.logout = function () {
      $window.localStorage.removeItem(key);
      scope.token = null;
    };

    scope.isAuthenticated = function () {
      return !!this.token;
    };

    return scope;
  });
