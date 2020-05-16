'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

app.controller('HomePricingManagerCtrl', ["$scope", "$location", "$uibModal", "$localStorage", "$timeout", "homePricingService", "notificationService",
    function ($scope, $location, $uibModal, $localStorage, $timeout, homePricingService, notificationService) {
        $scope.pricing = {};
        $scope.isAdvancedPackage = false;
        $scope.showSpinner = true;

        function loadDocumentsWithNgTable() {
            var entity = {};

            // Load the data from the API
            $scope.showSpinner = true;
            homePricingService.getall(entity, function (result) {
                if (result.status === 200) {
                    //var data = result.data.Details.Items;
                    $scope.pricing = result.data;

                    angular.forEach($scope.pricing, function (item, index) {
                        var pricingTitle = item.Title;
                        if (pricingTitle.indexOf('Nâng Cao') !== -1) {
                            $scope.isAdvancedPackage = true;
                            return;
                        }
                    });

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                    notificationService.displayError(result.data.StatusMsg);
                }
            });
        }

        $scope.DocumentManager = {
            init: function () {
                loadDocumentsWithNgTable();
            }
        };

        $scope.DocumentManager.init();
    }]);