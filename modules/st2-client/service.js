/*global st2client:true*/
// ^^ we should not use st2client global variable anywhere else outside the module
'use strict';

angular.module('main')
  .constant('st2Client', function (url) {
    var parser = document.createElement('a');
    parser.href = url;

    return st2client({
      protocol: parser.protocol.split(':')[0],
      host: parser.hostname,
      port: parser.port
    });
  });
