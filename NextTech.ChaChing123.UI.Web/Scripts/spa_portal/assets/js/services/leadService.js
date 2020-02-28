(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('leadService', Service);

    function Service(apiService, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';

        var service = {
            GetAllLeads: GetAllLeads,
            AddLeadsByAccount: AddLeadsByAccount,
            UpdateLeadsByAccount: UpdateLeadsByAccount,
            UpdateLeadsTypeByAccount: UpdateLeadsTypeByAccount,
            GetLeadsDetailByAccount: GetLeadsDetailByAccount,
            SummaryLeadsReportByAccount: SummaryLeadsReportByAccount
        };

        function GetAllLeads(leads, completed) {
            apiService.post(baseUrl + '/api/Admin/GetAllLeads/', leads,
                completed,
                leadsFailed
            );
        }

        function AddLeadsByAccount(leads, completed) {
            apiService.post(baseUrl + '/api/AddLeadsByAccount/', leads,
                completed,
                leadsFailed
            );
        }

        function UpdateLeadsByAccount(leads, completed) {
            apiService.post(baseUrl + '/api/Account/UpdateLeadsByAccount/', leads,
                completed,
                leadsFailed
            );
        }

        function UpdateLeadsTypeByAccount(leads, completed) {
            apiService.post(baseUrl + '/api/Account/UpdateLeadsTypeByAccount/', leads,
                completed,
                leadsFailed
            );
        }

        function GetLeadsDetailByAccount(leads, completed) {
            apiService.post(baseUrl + '/api/Account/GetLeadsDetailByAccount/', leads,
                completed,
                leadsFailed
            );
        }

        function SummaryLeadsReportByAccount(leads, completed) {
            apiService.post(baseUrl + '/api/Account/SummaryLeadsReportByAccount/', leads,
                completed,
                leadsFailed
            );
        }

        function AddFunnalPage(editor, completed) {
            apiService.post(baseUrl + '/api/LandingPage/AddFunnalPage/', editor,
                completed,
                funnelsFailed
            );
        }

        function leadsFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        return service;
    }
})();