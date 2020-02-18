(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('funnelsService', Service);

    function Service(apiService, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';

        var service = {
            AddFunnalPage: AddFunnalPage,
            EditFunnalPage: EditFunnalPage,
            DeleteFunnalPage: DeleteFunnalPage,
            GetAllFunnalPage: GetAllFunnalPage,
            GetDetailFunnalPage: GetDetailFunnalPage,
            GetAllSoloPage: GetAllSoloPage
        };

        function AddFunnalPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/AddFunnalPage/', editor,
                completed,
                funnelsFailed
            );
        }

        function EditFunnalPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/EditFunnalPage/', editor,
                completed,
                funnelsFailed
            );
        }

        function DeleteFunnalPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/DeleteFunnalPage/', editor,
                completed,
                funnelsFailed
            );
        }

        function GetAllFunnalPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/GetAllFunnalPage/', editor,
                completed,
                funnelsFailed
            );
        }

        function GetDetailFunnalPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/GetDetailFunnalPage/', editor,
                completed,
                funnelsFailed
            );
        }

        function GetAllSoloPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/GetAllSoloPage/', editor,
                completed,
                funnelsFailed
            );
        }

        function funnelsFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        return service;
    }
})();