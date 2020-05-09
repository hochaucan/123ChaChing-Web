(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('affiliatelinkService', Service);

    function Service(apiService, $rootScope, notificationService) {
        //var baseUrl = 'https://api.123chaching.app/api/Admin/';
        var baseUrl = $rootScope.baseUrl.urlWebApi + '/api/Admin';

        var service = {
            GetAllAffiliateLink: GetAllAffiliateLink // Get all document categories
        };

        function GetAllAffiliateLink(entity, completed) {
            apiService.post(baseUrl + '/GetAllAffiliateLink/', entity,
                completed,
                entityFailed
            );
        }

        function entityFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        return service;
    }
})();