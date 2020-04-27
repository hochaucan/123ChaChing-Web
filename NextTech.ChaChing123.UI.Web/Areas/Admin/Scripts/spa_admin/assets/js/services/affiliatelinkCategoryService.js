(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('affiliatelinkCategoryService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {
        //var baseUrl = 'https://api.123chaching.app/api/Admin/';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';
        var baseUrl = $rootScope.baseUrl.urlWebApi + '/api/Admin';

        var service = {
            GetAllAffiliateLinks: GetAllAffiliateLinks,
            AddAffiliateLinks: AddAffiliateLinks,
            UpdateAffiliateLinksByID: UpdateAffiliateLinksByID,
            DeleteAffiliateLinksByID: DeleteAffiliateLinksByID
        };

        function GetAllAffiliateLinks(entity, completed) {
            apiService.post(baseUrl + '/GetAllAffiliateLinks/', entity,
                completed,
                getEntityFailed);
        }

        function AddAffiliateLinks(entity, completed) {
            apiService.post(baseUrl + '/AddAffiliateLinks/', entity,
                completed,
                getEntityFailed);
        }

        function UpdateAffiliateLinksByID(entity, completed) {
            apiService.post(baseUrl + '/UpdateAffiliateLinksByID/', entity,
                completed,
                getEntityFailed);
        }

        function DeleteAffiliateLinksByID(entity, completed) {
            apiService.post(baseUrl + '/DeleteAffiliateLinksByID/', entity,
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