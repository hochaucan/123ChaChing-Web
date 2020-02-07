(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("reportResource",
                ["$resource",
                 reportResource]);

    function reportResource($resource) {
        return $resource(virtualDirectory + "api/report/:action/:param",
               { param: '@param' },
               {
                   getFileStatusList: { method: 'GET', params: { action: 'getFileStatusList' } },
                   searchTransactionSummaryReport: { method: 'POST', params: { action: 'searchTransactionSummaryReport' } },
                   getReportFile: { method: 'POST', params: { action: 'getReportFile' } },
                   unprocessingFileReport: { method: 'GET', params: { action: 'unprocessingFileReport' } },
                   fileTransferPaymentReport: { method: 'GET', params: { action: 'fileTransferPaymentReport' } },
                   domesticRemittanceReport: { method: 'POST', params: { action: 'domesticRemittanceReport' } }
               })
    }
}());