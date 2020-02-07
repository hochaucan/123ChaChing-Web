(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("importedFileResource",
                ["$resource",
                 importedFileResource]);

    function importedFileResource($resource) {
        return $resource(virtualDirectory + "api/importedfile/:action/:Id",
                { Id: '@id' },
                {
                    getFileDetail: { method: 'GET' },
                    getFileDetailRemain: { method: 'GET', params: { action: 'getFileDetailRemain' } },
                    getFileDetailExported: { method: 'GET', params: { action: 'getFileDetailExported' } },
                    getTransactionByAccountBalance: { method: 'GET', params: { action: 'getTransactionByAccountBalance' } },
                    exportTransactionToFile: { method: 'POST', params: { action: 'exportTransactionToFile' } },
                    printReportToExcel: { method: 'POST', params: { action: 'printReportToExcel' } },
                    getFileReports: { method: 'GET', params: { action: 'getFileReports' } },
                    getReportFile: { method: 'POST', params: { action: 'getReportFile' } }
                })
    }
}());