(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('frequentQuestionService', Service);

    function Service(apiService, $rootScope, notificationService) {
        //var baseUrl = 'https://api.123chaching.app/api/Admin/';
        var baseUrl = $rootScope.baseUrl.urlWebApi + '/api/Admin'; 

        var service = {
            // Quick Reply
            GetAllQuestion: GetAllQuestion,
            AddQuestion: AddQuestion,
            UpdateQuestionByID: UpdateQuestionByID,
            DeleteQuestionByID: DeleteQuestionByID
        };

        function GetAllQuestion(entity, completed) {
            apiService.post(baseUrl + '/GetAllQuestion/', entity,
                completed,
                entityFailed
            );
        }

        function AddQuestion(entity, completed) {
            apiService.post(baseUrl + '/AddQuestion/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateQuestionByID(entity, completed) {
            apiService.post(baseUrl + '/UpdateQuestionByID/', entity,
                completed,
                entityFailed
            );
        }

        function DeleteQuestionByID(entity, completed) {
            apiService.post(baseUrl + '/DeleteQuestionByID/', entity,
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