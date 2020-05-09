(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('affiliatelinkCategoryService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {
        var baseUrl = $rootScope.baseUrl.urlWebApi + '/api/Admin';

        var service = {
            GetAllAffiliateLinks: GetAllAffiliateLinks
        };

        function GetAllAffiliateLinks(entity, completed) {
            apiService.post(baseUrl + '/GetAllAffiliateLinks/', entity,
                completed,
                getEntityFailed);
        }

        function getEntityFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        return service;
    }
})();