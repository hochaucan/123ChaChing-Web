﻿'use strict';
/** 
  * controller for User Profile Example
*/

var sessionKey = "";

app.controller('MasterMailChipConfigurationCtrl', ["$scope", "$localStorage",
    function ($scope, $localStorage) {
        function initCommonInfoProcessing() {
            sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        }

        $scope.RevenueReportManager = {
            init: function () {
                initCommonInfoProcessing();
            }
        };

        $scope.RevenueReportManager.init();

    }]);

app.controller('MailChipConfigurationCtrl', ["$scope", "$window", "$location", "$timeout", "$localStorage", "mailChipService", "membershipService", "notificationService",
    function ($scope, $window, $location, $timeout, $localStorage, mailChipService, membershipService, notificationService) {
        $scope.leads = {};

        $scope.ok = function () {

        };

        $scope.showSpinner = false;
        $scope.form = {
            submit: function (form) {
                var firstError = null;
                if (form.$invalid) {

                    var field = null, firstError = null;
                    for (field in form) {
                        if (field[0] != '$') {
                            if (firstError === null && !form[field].$valid) {
                                firstError = form[field].$name;
                            }

                            if (form[field].$pristine) {
                                form[field].$dirty = true;
                            }
                        }
                    }

                    angular.element('.ng-invalid[name=' + firstError + ']').focus();
                    //SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");

                    return;

                } else {
                    var lead = {};
                    var username = ($localStorage.currentUser) ? $localStorage.currentUser.username : "";
                    var sessionkey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

                    lead = {
                        "APIKey": $scope.config.APIKey,
                        "ListID": $scope.config.ListID,
                        "SessionKey": sessionKey
                    };

                    $scope.showSpinner = true;
                    // Load the data from the API
                    mailChipService.AddLeadsByAccount(lead, function (result) {
                        if (result.data && result.data.StatusCode == 17) {
                            membershipService.checkMemberAuthorization();
                        }

                        if (result.data && result.data.StatusCode == 0) {
                            notificationService.displaySuccess(result.data.StatusMsg);
                            $window.location.reload();
                        } else {
                            notificationService.displayError(result.data.StatusMsg);
                            $timeout(function () {
                                $scope.showSpinner = false;
                            }, 1000);
                        }
                        $uibModalInstance.dismiss('cancel');
                    });
                }
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function loadLeadsType() {
            $scope.items = ['Item 1', 'Item 2', 'Item 3'];
        }

        $scope.LeadsManager = {
            init: function () {
                loadLeadsType();
            }
        };

        $scope.LeadsManager.init();
    }]);

app.controller('ModalViewLeadDetailsCtrl', ["$scope", "$window", "$location", "$timeout", "$localStorage", "$uibModalInstance", "items", "ngTableParams", "leadService", "membershipService", "notificationService",
    function ($scope, $window, $location, $timeout, $localStorage, $uibModalInstance, items, ngTableParams, leadService, membershipService, notificationService) {
        var sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        var leadID = 0;
        leadID = items;
        $scope.leads = {};

        $scope.ok = function () {

        };

        $scope.showSpinner = false;

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function loadLeadsDetails() {
            $scope.lead = {};
            $scope.showSpinner = true;
            // Load the data from the API
            var lead = {
                "ID": leadID,
                "SessionKey": sessionKey
            };

            leadService.GetLeadsDetailByAccount(lead, function (result) {
                if (result.data && result.data.StatusCode == 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode == 0) {
                    $scope.lead = result.data.Details;

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        function loadLeadChart() {
            $scope.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        fillColor: 'rgba(220,220,220,0.2)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        fillColor: 'rgba(151,187,205,0.2)',
                        strokeColor: 'rgba(151,187,205,1)',
                        pointColor: 'rgba(151,187,205,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(151,187,205,1)',
                        data: [28, 48, 40, 19, 86, 27, 90]
                    },
                    {
                        label: 'My Third dataset',
                        fillColor: 'rgba(100,130,200,0.2)',
                        strokeColor: 'rgba(100,130,200,1)',
                        pointColor: 'rgba(100,130,200,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(100,130,200,1)',
                        data: [18, 38, 80, 49, 56, 37, 30]
                    }
                ]
            };

            $scope.options = {
                // Sets the chart to be responsive
                responsive: true,

                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,

                //String - Colour of the grid lines
                scaleGridLineColor: 'rgba(0,0,0,.05)',

                //Number - Width of the grid lines
                scaleGridLineWidth: 1,

                //Boolean - Whether the line is curved between points
                bezierCurve: true,

                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,

                //Boolean - Whether to show a dot for each point
                pointDot: true,

                //Number - Radius of each point dot in pixels
                pointDotRadius: 4,

                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,

                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 20,

                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,

                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,

                //Boolean - Whether to fill the dataset with a colour
                datasetFill: true,

                // Function - on animation progress
                onAnimationProgress: function () { },

                // Function - on animation complete
                onAnimationComplete: function () { },

                //String - A legend template
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            };
        }

        $scope.LeadsManager = {
            init: function () {
                loadLeadsDetails();
                loadLeadChart();
            }
        };

        $scope.LeadsManager.init();
    }]);