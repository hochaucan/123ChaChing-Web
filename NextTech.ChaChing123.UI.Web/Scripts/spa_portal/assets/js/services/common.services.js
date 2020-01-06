// set the virtual directory for the application
// in production, the url will start from /OLS....
// set the application virtual directory here
var virtualDirectory = angular.element('input[name="__virtualDirectory"]').attr('value');

(function () {
    "use strict";
    angular
        .module("common.services",
                ["ngResource"])

}());