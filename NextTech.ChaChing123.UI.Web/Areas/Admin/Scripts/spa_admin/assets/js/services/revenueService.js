(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('revenueService', Service);

    function Service(apiService, $http, $rootScope, $localStorage, notificationService) {

        //var baseUrl = 'https://api.123chaching.app/api/Admin';
        //var baseUrl = 'http://localhost:1494';
        //var baseUrl = 'http://localhost:8002';
        var baseUrl = $rootScope.baseUrl.urlWebApi + '/api/Admin'; 

        var service = {
            GetOrderList: GetOrderList,
            EditOrderDetails: EditOrderDetails,
            DeleteOrderDetails: DeleteOrderDetails,

            GetAccountInfo: GetAccountInfo,
            UpdatePaymentState: UpdatePaymentState,
            UpdatePaymentAffiliateState: UpdatePaymentAffiliateState,
            GetAffialateList: GetAffialateList,

            SummaryRevenueReport: SummaryRevenueReport,
            SummaryCommissionReport: SummaryCommissionReport,
            GetSummaryReport: GetSummaryReport,
            GetConfigValueByKeys: GetConfigValueByKeys,
            UpdateConfigValueByKey: UpdateConfigValueByKey
        };

        function GetConfigValueByKeys(orderObj, completed) {
            apiService.post(baseUrl + '/GetConfigValueByKeys/', orderObj,
                completed,
                getOrderListFailed);
        }

        function UpdateConfigValueByKey(orderObj, completed) {
            apiService.post(baseUrl + '/UpdateConfigValueByKey/', orderObj,
                completed,
                getOrderListFailed);
        }

        function GetSummaryReport(orderObj, completed) {
            apiService.post(baseUrl + '/GetSummaryReport/', orderObj,
                completed,
                getOrderListFailed);
        }

        function SummaryCommissionReport(orderObj, completed) {
            apiService.post(baseUrl + '/SummaryCommissionReport/', orderObj,
                completed,
                getOrderListFailed);
        }

        function SummaryRevenueReport(orderObj, completed) {
            apiService.post(baseUrl + '/SummaryRevenueReport/', orderObj,
                completed,
                getOrderListFailed);
        }

        function GetAffialateList(orderObj, completed) {
            apiService.post(baseUrl + '/GetAffialateList/', orderObj,
                completed,
                getOrderListFailed);
        }

        function GetOrderList(orderObj, completed) {
            apiService.post(baseUrl + '/GetOrderList/', orderObj,
                completed,
                getOrderListFailed);
        }

        function GetAccountInfo(orderObj, completed) {
            apiService.post(baseUrl + '/GetAccountInfo/', orderObj,
                completed,
                getOrderListFailed);
        }

        function UpdatePaymentState(orderObj, completed) {
            apiService.post(baseUrl + '/UpdatePaymentState/', orderObj,
                completed,
                getOrderListFailed);
        }

        function UpdatePaymentAffiliateState(orderObj, completed) {
            apiService.post(baseUrl + '/UpdatePaymentAffiliateState/', orderObj,
                completed,
                getOrderListFailed);
        }

        function EditOrderDetails(orderObj, completed) {
            apiService.post(baseUrl + '/EditOrderDetails/', orderObj,
                completed,
                getOrderListFailed);
        }

        function DeleteOrderDetails(memberObj, completed) {
            apiService.post(baseUrl + '/DeleteOrderDetails/', orderObj,
                completed,
                getOrderListFailed);
        }

        function getOrderListFailed(response) {
            if (response.data) {
                notificationService.displayError(response.data.Message);
            }
        }

        return service;
    }
})();