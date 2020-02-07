(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("paramSettingResource",
                ["$resource",
                 paramSettingResource]);

    function paramSettingResource($resource) {
        return $resource(virtualDirectory + "api/parametersetting/:action/:Id",
               { Id: '@id' },
               {
                   getGroup: { method: 'GET', params: { action: 'getGroup' } },
                   getParamSettingByGroup: { method: 'GET', params: { action: 'getParamSettingByGroup' } },
                   get: { method: 'GET' },
                   add: { method: 'POST', params: { action: 'add' } },
                   edit: { method: 'POST', params: { action: 'edit' } },
                   delete: { method: 'POST', params: { action: 'delete' } },
                   searchParameterSettings: { method: 'POST', params: { action: 'searchParameterSettings' } }
               })
    }
}());