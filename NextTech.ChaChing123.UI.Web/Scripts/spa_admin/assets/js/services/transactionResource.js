(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("transactionResource",
                ["$resource",
                 transactionResource]);

    function transactionResource($resource) {
        return $resource(virtualDirectory + "api/transaction/:action/:Id",
                { Id: '@id' },
                {
                    getTransactionTypeList: { method: 'GET', params: { action: 'getTransactionTypeList' } },
                    search: { method: 'POST', params: { action: 'search' } },
                    //summaryReport: { method: 'POST', params: { action: 'summaryReport' } },
                    getDetailTransaction: { method: 'GET', params: { action: 'getDetailTransaction' } },
                    printTaxReceipt: { method: 'GET', params: { action: 'printTaxReceipt' } },
                    editTransaction: { method: 'POST', params: { action: 'editTransaction' } },

                    summaryReport: {
                        method: 'POST', params: { action: 'summaryReport' },
                        headers: {
                            accept: 'application/octet-stream' //or whatever you need
                        }, responseType: 'arraybuffer', cache: false
                       , transformRequest: function (data, headersGetter) {
                           //modify data and return it 
                           return angular.toJson(data);
                       }
                       , transformResponse: function (data, headers)
                       {

                           function getFileNameFromHeader(header)
                           {
                               if (!header) return null;

                               var result = header.split(";")[1].trim().split("=")[1];

                               return result.replace(/"/g, '');
                           }

                           var result = null;
                           var file = null;
                           var success = headers('Status');
                           var message = headers('Msg');
                           var totalTransaction = headers('TotalTransaction');

                           //server should sent content-disposition header 
                           var fileName = getFileNameFromHeader(headers('content-disposition'));


                           if (fileName != 'null' && fileName != null) {
                               file = new Blob([data], {
                                   type: 'application/octet-stream' //or whatever you need, should match the 'accept headers' above
                               });
                               result = {
                                   blob: file,
                                   fileName: fileName,
                                   success: success,
                                   Msg: message,
                                   TotalTransaction: totalTransaction
                               };
                           } else {
                               result = {
                                   blob: JSON.parse(data),
                                   fileName: fileName,
                                   success: success,
                                   Msg: message,
                                   TotalTransaction: totalTransaction
                               }
                           }
                           return {
                               response: result
                           };
                       }

                    }
                
                })
    }
}());