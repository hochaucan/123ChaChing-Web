(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('subtitleTemplateService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {

        var baseUrl = 'https://api.123chaching.app/api/Admin/';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';

        var service = {
            GetAllSubTitleTemplate: GetAllSubTitleTemplate,
            AddSubTitleTemplate: AddSubTitleTemplate,
            EditSubTitleTemplate: EditSubTitleTemplate,
            DeleteSubTitleTemplate: DeleteSubTitleTemplate
        };

        function GetAllSubTitleTemplate(entity, completed) {
            apiService.post(baseUrl + '/GetAllSubTitleTemplate/', entity,
                completed,
                getEntityFailed);
        }

        function AddSubTitleTemplate(entity, completed) {
            apiService.post(baseUrl + '/AddSubTitleTemplate/', entity,
                completed,
                getEntityFailed);
        }

        function EditSubTitleTemplate(entity, completed) {
            apiService.post(baseUrl + '/EditSubTitleTemplate/', entity,
                completed,
                getEntityFailed);
        }

        function DeleteSubTitleTemplate(entity, completed) {
            apiService.post(baseUrl + '/DeleteSubTitleTemplate/', entity,
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