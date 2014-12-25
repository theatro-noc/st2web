'use strict';
angular.module('main')
  .directive('st2FormTextarea', function () {
    return {
      restrict: 'C',
      scope: {
        'name': '=',
        'spec': '=',
        'result': '='
      },
      templateUrl: 'modules/st2-auto-form/modules/st2-form-textarea/template.html'
    };

  })

  ;
