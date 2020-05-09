// set the virtual directory for the application
// in production, the url will start from /OLS....
// set the application virtual directory here
var virtualDirectory = angular.element('input[name="__virtualDirectory"]').attr('value');

(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('commonService', Service);

    function Service(apiService, $rootScope, notificationService) {

        var service = {
            getURLVar: getURLVar,
            groupBy: groupBy,
            removeDuplicates: removeDuplicates
        };

        function getURLVar(key, query) {
            var value = [];

            if (query !== undefined && query.length > 0) {
                var part = query.split('&');

                for (var i = 0, j = part.length; i < j; i++) {
                    var data = part[i].split('=');

                    if (data[0] && data[1]) {
                        value[data[0]] = data[1];
                    }
                }

                if (value[key]) {
                    return value[key];
                } else {
                    return '';
                }
            }
        }

        function groupBy(xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        }

        function removeDuplicates(originalArray, prop) {
            var newArray = [];
            var lookupObject = {};

            for (var i in originalArray) {
                lookupObject[originalArray[i][prop]] = originalArray[i];
            }

            for (i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
            return newArray;
        }

        return service;
    }
})();