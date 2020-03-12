(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('responseService', Service);

    function Service(apiService, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';

        var service = {
            GetAllDocuments: GetAllDocuments,
            AddDocuments: AddDocuments,
            UpdateDocumentsByID: UpdateDocumentsByID,
            DeleteDocumentsByID: DeleteDocumentsByID
        };

        function GetAllDocuments(entity, completed) {
            apiService.post(baseUrl + '/api/Admin/GetAllDocuments/', entity,
                completed,
                entityFailed
            );
        }

        function AddDocuments(entity, completed) {
            apiService.post(baseUrl + '/api/Admin/AddDocuments/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateDocumentsByID(entity, completed) {
            apiService.post(baseUrl + '/api/Admin/UpdateDocumentsByID/', entity,
                completed,
                leadsFailed
            );
        }

        function DeleteDocumentsByID(entity, completed) {
            apiService.post(baseUrl + '/api/Admin/DeleteDocumentsByID/', entity,
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