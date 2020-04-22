(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('checkoutService', Service);

    function Service(apiService, $rootScope, notificationService) {
        var baseUrl = $rootScope.baseUrl.urlWebApi + 'api/Account';

        var service = {
            SubmitPaymentToNL: SubmitPaymentToNL
        };

        function SubmitPaymentToNL(entity, completed) {
            apiService.post(baseUrl + '/SubmitPaymentToNL/', entity,
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