'use strict';

angular.module('main')
  .directive('st2RuleValidate', function () {

    return {
      restrict: 'C',
      scope: true,
      templateUrl: 'apps/st2-rules/modules/st2-rule-validate/template.html',
      controller: function () {
        // Postponed, unreachable by the flow. For informational purposes only.
      }
    };

  });