(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('contactUsService', Service);

    function Service(apiService, $rootScope, notificationService) {
        var baseUrl = $rootScope.baseUrl.urlWebApi + 'api/Admin';

        var service = {
            AddContactInfo: AddContactInfo,
            GetAllContactInfo: GetAllContactInfo
        };

        function AddContactInfo(entity, completed) {
            apiService.post(baseUrl + '/AddContactInfo/', entity,
                completed,
                entityFailed
            );
        }

        function GetAllContactInfo(entity, completed) {
            apiService.post(baseUrl + '/GetAllContactInfo/', entity,
                completed,
                leadsFailed
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