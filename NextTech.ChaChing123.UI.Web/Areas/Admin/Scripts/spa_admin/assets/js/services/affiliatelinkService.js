(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('affiliatelinkService', Service);

    function Service(apiService, $rootScope, notificationService) {
        //var baseUrl = 'https://api.123chaching.app/api/Admin/';
        var baseUrl = $rootScope.baseUrl.urlWebApi + '/api/Admin';

        var service = {
            //document only
            GetAllAffiliateLink: GetAllAffiliateLink, // Get all document categories
            AddAffiliateLink: AddAffiliateLink,
            UpdateAffiliateLinkByID: UpdateAffiliateLinkByID,
            DeleteAffiliateLinkByID: DeleteAffiliateLinkByID,
            GetAffiliateLinkInfoByID: GetAffiliateLinkInfoByID
        };

        function GetAllAffiliateLink(entity, completed) {
            apiService.post(baseUrl + '/GetAllAffiliateLink/', entity,
                completed,
                entityFailed
            );
        }

        function GetAffiliateLinkInfoByID(entity, completed) {
            apiService.post(baseUrl + '/GetAffiliateLinkInfoByID/', entity,
                completed,
                entityFailed
            );
        }

        function AddAffiliateLink(entity, completed) {
            apiService.post(baseUrl + '/AddAffiliateLink/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateAffiliateLinkByID(entity, completed) {
            apiService.post(baseUrl + '/UpdateAffiliateLinkByID/', entity,
                completed,
                entityFailed
            );
        }

        function DeleteAffiliateLinkByID(entity, completed) {
            apiService.post(baseUrl + '/DeleteAffiliateLinkByID/', entity,
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