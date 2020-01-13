'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */
var dataCom = [{
    id: 1,
    Date: "12/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 2,
    Date: "11/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 3,
    Date: "10/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 4,
    Date: "09/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 5,
    Date: "08/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 6,
    Date: "07/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 7,
    Date: "06/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 8,
    Date: "05/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 9,
    Date: "04/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 10,
    Date: "03/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 11,
    Date: "02/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}, {
    id: 12,
    Date: "01/2019",
    Comission: "8,997,000",
    ComissionThank: "8,997,000"
}];
app.controller('ngTableAffiliateCtrl', ["$scope", "$localStorage", "ngTableParams", "affiliateService", function ($scope, $localStorage, ngTableParams, affiliateService) {
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 10 // count per page
    }, {
            total: dataCom.length, // length of data
            getData: function ($defer, params) {
                //var comissionData = dataCom
                //$defer.resolve(comissionData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                var affiliate = {};
                var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
                var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

                affiliate = {
                    "username": username,
                    "sessionkey": sessionkey,
                    "pageno": params.page(),
                    "pagesize": params.count()
                };

                // Load the data from the API
                affiliateService.getAffiliateComissions(affiliate, function (result) {
                    var data = result.data.Items;
                    var totalRecordCount = result.data.TotalRecordCount;

                    // Tell ngTable how many records we have (so it can set up paging)
                    params.total(totalRecordCount);

                    // Return the customers to ngTable
                    $defer.resolve(data);
                });
            }
        });
}]);
