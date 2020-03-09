(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('titleTemplateService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {

        var baseUrl = 'https://api.123chaching.app/api/Admin/';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';

        var service = {
            GetAllTitleTemplate: GetAllTitleTemplate,
            AddTitleTemplate: AddTitleTemplate,
            EditTitleTemplate: EditTitleTemplate,
            DeleteTitleTemplate: DeleteTitleTemplate
        };

        function GetAllTitleTemplate(entity, completed) {
            apiService.post(baseUrl + '/GetAllTitleTemplate/', entity,
                completed,
                getEntityFailed);
        }

        function AddTitleTemplate(entity, completed) {
            apiService.post(baseUrl + '/AddTitleTemplate/', entity,
                completed,
                getEntityFailed);
        }

        function EditTitleTemplate(entity, completed) {
            apiService.post(baseUrl + '/EditTitleTemplate/', entity,
                completed,
                getEntityFailed);
        }

        function DeleteTitleTemplate(entity, completed) {
            apiService.post(baseUrl + '/DeleteTitleTemplate/', entity,
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