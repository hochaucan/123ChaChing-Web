(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('affiliateService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {

        var baseUrl = 'https://api.123chaching.app';
        //var baseUrl = 'http://localhost:1494';

        var service = {
            getAffiliateComissions: getAffiliateComissions,
            getLinkAffiliate: getLinkAffiliate,
            trackIncome: trackIncome,
            getAffiliateCommission: getAffiliateCommission,
            add: add,
            getWalletInfoByAccount: getWalletInfoByAccount
        };

        function getAffiliateComissions(affiliate, completed) {
            apiService.post(baseUrl + '/api/affiliate/getaffiliatecomission/', affiliate,
                completed,
                affiliateFailed
            );
        }

        function add(affiliate, completed) {
            apiService.post(baseUrl + '/api/withrawalrequest/add/', affiliate,
                completed,
                affiliateFailed
            );
        }

        function affiliateFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        function getLinkAffiliate(affiliate, completed) {
            apiService.post(baseUrl + '/api/affiliate/GetAffiliateCodeByAccount/', affiliate,
                completed,
                affiliateFailed
            );
        }

        function getWalletInfoByAccount(affiliate, completed) {
            apiService.post(baseUrl + '/api/affiliate/GetWalletInfoByAccount/', affiliate,
                completed,
                affiliateFailed
            );
        }

        function trackIncome() {
            console.log("api 3");
        }

        function getAffiliateCommission() {
            console.log("api 4");
        }

        return service;
    }
})();