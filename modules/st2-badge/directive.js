'use strict';

angular.module('main')
.directive('st2Badge', function () {

  var states = {
    'complete': {
      class: 'st2-badge--success'
    },
    'error': {
      class: 'st2-badge--danger'
    },
    'enabled': {
      class: 'st2-badge--success'
    },
    'disabled': {
      class: 'st2-badge--danger'
    },
    'succeeded': {
      class: 'st2-badge--succeeded'
    },
    'failed': {
      class: 'st2-badge--failed'
    },
    'running': {
      class: 'st2-badge--progress'
    },
    'scheduled': {
      class: 'st2-badge--progress'
    }
  };

  return {
    restrict: 'C',
    priority: 1,
    scope: {
      'status': '='
    },
    templateUrl: 'modules/st2-badge/template.html',
    link: function postLink(scope, element) {
      scope.$watch('status', function (current, previous) {
        scope.state = states[scope.status] || {};

        element.removeClass(states[previous] && states[previous].class);
        element.addClass(states[current] && states[current].class);
      });
    }
  };

});
