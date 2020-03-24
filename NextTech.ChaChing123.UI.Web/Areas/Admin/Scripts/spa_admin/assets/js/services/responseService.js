(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('responseService', Service);

    function Service(apiService, notificationService) {
        var baseUrl = 'https://api.123chaching.app/api/Admin/';

        var service = {
            // Quick Reply
            GetAllQuickReplies: GetAllQuickReplies,
            AddQuickReplies: AddQuickReplies,
            GetQuickRepliesByID: GetQuickRepliesByID,
            UpdateQuickRepliesByID: UpdateQuickRepliesByID,
            DeleteQuickRepliesByID: DeleteQuickRepliesByID,

            // Scritp
            GetAllScript: GetAllScript,
            AddScript: AddScript,
            GetScriptByID: GetScriptByID,
            UpdateScriptByID: UpdateScriptByID,
            DeleteScriptByID: DeleteScriptByID,

            // Rebuttal
            GetAllRebuttals: GetAllRebuttals,
            AddRebuttals: AddRebuttals,
            GetRebuttalsByID: GetRebuttalsByID,
            UpdateRebuttalsByID: UpdateRebuttalsByID,
            DeleteRebuttalsByID: DeleteRebuttalsByID
        };

        function GetAllQuickReplies(entity, completed) {
            apiService.post(baseUrl + '/GetAllQuickReplies/', entity,
                completed,
                entityFailed
            );
        }

        function AddQuickReplies(entity, completed) {
            apiService.post(baseUrl + '/AddQuickReplies/', entity,
                completed,
                entityFailed
            );
        }

        function GetQuickRepliesByID(entity, completed) {
            apiService.post(baseUrl + '/GetQuickRepliesByID/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateQuickRepliesByID(entity, completed) {
            apiService.post(baseUrl + '/UpdateQuickRepliesByID/', entity,
                completed,
                entityFailed
            );
        }

        function DeleteQuickRepliesByID(entity, completed) {
            apiService.post(baseUrl + '/DeleteQuickRepliesByID/', entity,
                completed,
                entityFailed
            );
        }

        function GetAllScript(entity, completed) {
            apiService.post(baseUrl + '/GetAllScript/', entity,
                completed,
                entityFailed
            );
        }

        function AddScript(entity, completed) {
            apiService.post(baseUrl + '/AddScript/', entity,
                completed,
                entityFailed
            );
        }

        function GetScriptByID(entity, completed) {
            apiService.post(baseUrl + '/GetScriptByID/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateScriptByID(entity, completed) {
            apiService.post(baseUrl + '/UpdateScriptByID/', entity,
                completed,
                entityFailed
            );
        }

        function DeleteScriptByID(entity, completed) {
            apiService.post(baseUrl + '/DeleteScriptByID/', entity,
                completed,
                entityFailed
            );
        }

        function GetAllRebuttals(entity, completed) {
            apiService.post(baseUrl + '/GetAllRebuttals/', entity,
                completed,
                entityFailed
            );
        }

        function AddRebuttals(entity, completed) {
            apiService.post(baseUrl + '/AddRebuttals/', entity,
                completed,
                entityFailed
            );
        }

        function GetRebuttalsByID(entity, completed) {
            apiService.post(baseUrl + '/GetRebuttalsByID/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateRebuttalsByID(entity, completed) {
            apiService.post(baseUrl + '/UpdateRebuttalsByID/', entity,
                completed,
                entityFailed
            );
        }

        function DeleteRebuttalsByID(entity, completed) {
            apiService.post(baseUrl + '/DeleteRebuttalsByID/', entity,
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