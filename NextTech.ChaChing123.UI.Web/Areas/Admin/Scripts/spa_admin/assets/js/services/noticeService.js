(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('noticeService', Service);

    function Service(apiService, notificationService) {
        var baseUrl = 'https://api.123chaching.app/api/Admin/';

        var service = {
            // Quick Reply
            GetAllNotification: GetAllNotification,
            AddNotification: AddNotification,
            UpdateNotificationByID: UpdateNotificationByID,
            DeleteNotificationByID: DeleteNotificationByID
        };

        function GetAllNotification(entity, completed) {
            apiService.post(baseUrl + '/GetAllNotification/', entity,
                completed,
                entityFailed
            );
        }

        function AddNotification(entity, completed) {
            apiService.post(baseUrl + '/AddNotification/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateNotificationByID(entity, completed) {
            apiService.post(baseUrl + '/UpdateNotificationByID/', entity,
                completed,
                entityFailed
            );
        }

        function DeleteNotificationByID(entity, completed) {
            apiService.post(baseUrl + '/DeleteNotificationByID/', entity,
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