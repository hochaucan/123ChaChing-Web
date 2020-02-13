(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('editorService', Service);

    function Service(apiService, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';

        var service = {
            createSoloPage: createSoloPage
        };

        function createSoloPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/AddSoloPage/', editor,
                completed,
                affiliateFailed
            );
        }

        function affiliateFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        return service;
    }
})();