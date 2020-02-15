(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('editorService', Service);

    function Service(apiService, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';

        var service = {
            createSoloPage: createSoloPage,
            editSoloPage: editSoloPage,
            getMyPages: getMyPages,
            loadMyPage: loadMyPage,
            deleteSoloPage: deleteSoloPage,
            loadTitles: loadTitles,
            loadSubTitles: loadSubTitles,
            uploadFile: uploadFile
        };

        function createSoloPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/AddSoloPage/', editor,
                completed,
                affiliateFailed
            );
        }

        function editSoloPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/EditSoloPage/', editor,
                completed,
                affiliateFailed
            );
        }

        function deleteSoloPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/DeleteSoloPage/', editor,
                completed,
                affiliateFailed
            );
        }

        function getMyPages(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/GetAllSoloPage/', editor,
                completed,
                affiliateFailed
            );
        }

        function loadMyPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/GetDetailSoloPage/', editor,
                completed,
                affiliateFailed
            );
        }

        function loadTitles(editor, completed) {
            apiService.post(baseUrl + '/api/Admin/GetAllTitleTemplate/', editor,
                completed,
                affiliateFailed
            );
        }

        function loadSubTitles(editor, completed) {
            apiService.post(baseUrl + '/api/Admin/GetAllSubTitleTemplate/', editor,
                completed,
                affiliateFailed
            );
        }

        function uploadFile(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/UploadFile/', editor,
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