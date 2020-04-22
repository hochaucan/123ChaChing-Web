(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('autoResponderService', Service);

    function Service(apiService, $rootScope, notificationService) {
        var baseUrl = $rootScope.baseUrl.urlWebApi + 'api/Account';

        var service = {
            // Quick Reply
            AddGetResponseInfoByAccount: AddGetResponseInfoByAccount,
            UpdateGetResponseInfoByID: UpdateGetResponseInfoByID,
            GetAllGetResponseInfoByAccount: GetAllGetResponseInfoByAccount,
            DeleteGetResponseInfoByID: DeleteGetResponseInfoByID
        };

        function AddGetResponseInfoByAccount(entity, completed) {
            apiService.post(baseUrl + '/AddGetResponseInfoByAccount/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateGetResponseInfoByID(entity, completed) {
            apiService.post(baseUrl + '/UpdateGetResponseInfoByID/', entity,
                completed,
                entityFailed
            );
        }

        function GetAllGetResponseInfoByAccount(entity, completed) {
            apiService.post(baseUrl + '/GetAllGetResponseInfoByAccount/', entity,
                completed,
                entityFailed
            );
        }

        function DeleteGetResponseInfoByID(entity, completed) {
            apiService.post(baseUrl + '/DeleteGetResponseInfoByID/', entity,
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