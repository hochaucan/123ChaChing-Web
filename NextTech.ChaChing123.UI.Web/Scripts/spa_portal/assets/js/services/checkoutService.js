(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('checkoutService', Service);

    function Service(apiService, $rootScope, notificationService) {
        var baseUrl = $rootScope.baseUrl.urlWebApi + 'api/Account';

        var service = {
            SubmitPaymentToNL: SubmitPaymentToNL,
            UpdateCashInfoByNL: UpdateCashInfoByNL
        };

        function SubmitPaymentToNL(entity, completed) {
            apiService.post(baseUrl + '/SubmitPaymentToNL/', entity,
                completed,
                entityFailed
            );
        }

        function UpdateCashInfoByNL(entity, completed) {
            apiService.post(baseUrl + '/UpdateCashInfoByNL/', entity,
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