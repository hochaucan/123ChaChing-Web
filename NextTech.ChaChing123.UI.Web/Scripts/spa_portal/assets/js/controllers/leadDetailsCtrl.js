'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */

var leadID = "";
var sessionKey = "";



app.controller('TabController', function () {
    this.tab = 1;

    this.setTab = function (tabId) {
        this.tab = tabId;
    };

    this.isSet = function (tabId) {
        return this.tab === tabId;
    };
});

app.controller('MasterLeadDetailsCtrl', ["$scope", "$localStorage", "$location", "$timeout", "membershipService", "notificationService",
    function ($scope, $localStorage, $location, $timeout, membershipService, notificationService) {
        function initCommonInfoProcessing() {
            sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";

            var parts = $location.url().split('/');
            var len = parts.length;
            if (len > 0)
                leadID = parts[len - 1];
        }

        $scope.MemberDetailsManager = {
            init: function () {
                initCommonInfoProcessing();
            }
        };

        $scope.MemberDetailsManager.init();

    }]);

app.controller('LeadDetailsCtrl', ["$scope", "$rootScope", "$window", "$localStorage", "$timeout", "$uibModal", "leadService", "membershipService", "notificationService",
    function ($scope, $rootScope, $window, $localStorage, $timeout, $uibModal, leadService, membershipService, notificationService) {
        $scope.lead = {};

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
                    var funnelURL = result.data.Details.FunnalLink;
                    var funnelID = 0;
                    var soloURL = result.data.Details.SoloLink;
                    var soloID = 0;
                    if (funnelURL.length > 0) {
                        var parts = funnelURL.split('/');
                        if (parts.length > 0) {
                            funnelID = parts[parts.length - 1];
                        }
                    }

                    if (soloURL.length > 0) {
                        var partSoloUrls = soloURL.split('/');
                        if (partSoloUrls.length > 0) {
                            soloID = partSoloUrls[partSoloUrls.length - 1];
                        }
                    }

                    var entity = {
                        "Year": "2020",
                        "FunnalID": funnelID > 0 ? funnelID.toString() : "0",
                        "SoloID": soloID > 0 ? soloID.toString() : "0",
                        "SessionKey": sessionKey
                    };

                    loadLeadChart(entity);

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

        function loadLeadChart(entity) {
            var coldDataPerYear = [];
            var warmDataPerYear = [];
            var hotDataPerYear = [];

            $scope.showSpinner = true;
            leadService.SummaryLeadsChartByAccount(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    //$scope.titles = result.data.Details;
                    var leadRecords = result.data.Details;
                    var leadColdDataPerYear = leadRecords.ColdItems;
                    var leadWarmDataPerYear = leadRecords.WarmItems;
                    var leadHotDataPerYear = leadRecords.HotItems;

                    // build data for cold lead per year
                    angular.forEach(leadColdDataPerYear, function (item, index) {
                        coldDataPerYear.push(item.LeadsCount);
                    });

                    // build data for warm lead per year
                    angular.forEach(leadWarmDataPerYear, function (item, index) {
                        warmDataPerYear.push(item.LeadsCount);
                    });

                    // build data for hot lead per year
                    angular.forEach(leadHotDataPerYear, function (item, index) {
                        hotDataPerYear.push(item.LeadsCount);
                    });

                    $scope.data = {
                        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                        datasets: [
                            {
                                label: 'Lạnh',
                                fillColor: 'rgba(6,162,227,0.2)',
                                strokeColor: 'rgba(6,162,227,1)',
                                pointColor: 'rgba(6,162,227,1)',
                                pointStrokeColor: '#06a2e3',
                                pointHighlightFill: '#06a2e3',
                                pointHighlightStroke: 'rgba(6,162,227,1)',
                                //data: [65, 59, 80, 81, 56, 55, 40, 22, 33, 44, 55, 66]
                                data: coldDataPerYear
                            },
                            {
                                label: 'Ấm',
                                fillColor: 'rgba(225,133,27,0.2)',
                                strokeColor: 'rgba(225,133,27,1)',
                                pointColor: 'rgba(225,133,27,1)',
                                pointStrokeColor: '#ff851b',
                                pointHighlightFill: '#ff851b',
                                pointHighlightStroke: 'rgba(225,133,27,1)',
                                //data: [28, 48, 40, 19, 86, 27, 90, 100, 200, 115, 225, 335]
                                data: warmDataPerYear
                            },
                            {
                                label: 'Nóng',
                                fillColor: 'rgba(221,47,13,0.2)',
                                strokeColor: 'rgba(221,47,13,1)',
                                pointColor: 'rgba(221,47,13,1)',
                                pointStrokeColor: '#dd2f0d',
                                pointHighlightFill: '#dd2f0d',
                                pointHighlightStroke: 'rgba(221,47,13,1)',
                                //data: [18, 38, 80, 49, 56, 37, 30, 49, 20, 100, 243, 23]
                                data: hotDataPerYear
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

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        $scope.LeadDetailsManager = {
            init: function () {
                loadLeadsDetails();
            }
        };

        $scope.LeadDetailsManager.init();
    }]);

app.controller('LeadHistoryCtrl', ["$scope", "$rootScope", "$window", "$localStorage", "$timeout", "$uibModal", "leadService", "membershipService", "notificationService",
    function ($scope, $rootScope, $window, $localStorage, $timeout, $uibModal, leadService, membershipService, notificationService) {
        sessionKey = ($localStorage.currentUser) ? $localStorage.currentUser.token : "";
        $scope.lead = {};

        function loadLeadChart() {
            var leadDataPerYear = [];

            var entity = {
                "Year": "2020",
                "SessionKey": sessionKey
            };

            $scope.showSpinner = true;
            leadService.SummaryLeadsReportByAccount(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    //$scope.titles = result.data.Details;
                    var leadRecords = result.data.Details;

                    // build data for cold lead per year
                    angular.forEach(leadRecords, function (item, index) {
                        leadDataPerYear.push(item.LeadsCount);
                    });

                    $scope.data = {
                        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                        datasets: [
                            {
                                label: 'Lạnh',
                                fillColor: 'rgba(6,162,227,0.2)',
                                strokeColor: 'rgba(6,162,227,1)',
                                pointColor: 'rgba(6,162,227,1)',
                                pointStrokeColor: '#06a2e3',
                                pointHighlightFill: '#06a2e3',
                                pointHighlightStroke: 'rgba(6,162,227,1)',
                                //data: [65, 59, 80, 81, 56, 55, 40, 22, 33, 44, 55, 66]
                                data: leadDataPerYear
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

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
                else {
                    notificationService.displayError(result.data.StatusMsg);

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        $scope.LeadDetailsManager = {
            init: function () {
                loadLeadChart();
            }
        };

        $scope.LeadDetailsManager.init();
    }]);