(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('soloPageService', Service);

    function Service(apiService, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';

        var service = {
            loadSoloPage: loadSoloPage
        };

        function loadSoloPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/GetDetailSoloPage/', editor,
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