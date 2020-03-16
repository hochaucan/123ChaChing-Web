(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('documentService', Service);

    function Service(apiService, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';

        var service = {
            GetAllDocuments: GetAllDocuments, // Get all document categories
            GetAllDocument: GetAllDocument, // Get all related documents for a specific category
            GetDocumentInfoByID: GetDocumentInfoByID
        };

        function GetAllDocuments(entity, completed) {
            apiService.post(baseUrl + '/api/Admin/GetAllDocuments/', entity,
                completed,
                entityFailed
            );
        }

        function GetAllDocument(entity, completed) {
            apiService.post(baseUrl + '/api/Admin/GetAllDocument/', entity,
                completed,
                entityFailed
            );
        }

        function GetDocumentInfoByID(entity, completed) {
            apiService.post(baseUrl + '/api/Admin/GetDocumentInfoByID/', entity,
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