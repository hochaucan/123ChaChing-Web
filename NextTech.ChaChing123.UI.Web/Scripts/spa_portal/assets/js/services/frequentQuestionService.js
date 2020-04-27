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
            GetAllQuestion: GetAllQuestion
        };

        function GetAllQuestion(entity, completed) {
            apiService.post(baseUrl + '/GetAllQuestion/', entity,
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