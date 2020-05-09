(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('affiliatelinkBannerService', Service);

    function Service(apiService, $rootScope, notificationService) {
        //var baseUrl = 'https://api.123chaching.app/api/Admin/';
        var baseUrl = $rootScope.baseUrl.urlWebApi + '/api/Account';

        var service = {
            GetBannerLink: GetBannerLink,
            UpdateBanner: UpdateBanner
        };

        function GetBannerLink(entity, completed) {
            apiService.post(baseUrl + '/GetBannerLink/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateBanner(entity, completed) {
            apiService.post(baseUrl + '/UpdateBanner/', entity,
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