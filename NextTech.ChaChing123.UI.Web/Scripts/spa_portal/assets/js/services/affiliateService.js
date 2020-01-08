(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('affiliateService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {

        //var baseUrl = 'https://api.123chaching.app';
        var baseUrl = 'http://localhost:1494/';

        var service = {
            getAffiliate: getAffiliate,
            getLinkAffiliate: getLinkAffiliate,
            trackIncome: trackIncome,
            getAffiliateCommission: getAffiliateCommission
        }

        function getAffiliate() {
            console.log("api 1");
        }

        function getLinkAffiliate() {
            console.log("api 2");
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