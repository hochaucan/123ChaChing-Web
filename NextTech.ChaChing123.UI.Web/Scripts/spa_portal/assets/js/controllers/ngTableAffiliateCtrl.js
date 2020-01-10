'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */
var data = [{
    id: 1,
    date: "12/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 2,
    date: "11/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 3,
    date: "10/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 4,
    date: "09/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 5,
    date: "08/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 6,
    date: "07/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 7,
    date: "06/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 8,
    date: "05/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 9,
    date: "04/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 10,
    date: "03/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 11,
    date: "02/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}, {
    id: 12,
    date: "01/2019",
    commission: "8,997,000",
    commissionthank: "8,997,000"
}];
app.controller('ngTableAffiliateCtrl', ["$scope", "ngTableParams", function ($scope, ngTableParams) {
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 10 // count per page
    }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
}]);
