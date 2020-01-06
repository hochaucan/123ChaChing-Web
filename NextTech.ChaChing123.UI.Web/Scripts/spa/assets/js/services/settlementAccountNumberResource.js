(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("settlementAccountNumberResource",
                ["$resource",
                 settlementAccountNumberResource]);

    function settlementAccountNumberResource($resource) {
        return $resource(virtualDirectory + "api/settlementAccountNumber/:action/:Id",
               { Id: '@id' },
               {
                   get: { method: 'GET' },
                   add: { method: 'POST', params: { action: 'add' } },
                   edit: { method: 'POST', params: { action: 'edit' } },
                   delete: { method: 'DELETE' }
               })
    }
}());