'use strict';
/** 
  * controllers for tc-angular-chartjs
  * tc-angular-chartjs provides you with directives for all chartjs chart types.
*/

var sessionKey = "";
var _startDate = "";
var _endDate = "";

app.controller('masterRevenueReport', ["$scope", "$localStorage",
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

app.controller('BarChartRevenueCtrl', ["$scope", "$localStorage", "$timeout", "revenueService", "membershipService", "notificationService",
    function ($scope, $localStorage, $timeout, revenueService, membershipService, notificationService) {

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        function loadBarChartRevenue(filter) {
            var entity = {};
            var revenueAmount = [];
            var commissionAmount = [];
            var dateRangeReport = [];

            if (filter === undefined) {
                entity = {
                    "StartDate": "20200115",
                    "EndDate": "20200119",
                    "SessionKey": sessionKey
                };
            } else {
                entity = {
                    "StartDate": filter.StartDate.toString(),
                    "EndDate": filter.EndDate.toString(),
                    "SessionKey": sessionKey
                };
            }

            $scope.showSpinner = true;
            revenueService.GetSummaryReport(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    //$scope.titles = result.data.Details;
                    var itemRecords = result.data.Details;

                    // build labels
                    angular.forEach(itemRecords, function (item, index) {
                        dateRangeReport.push(item.Date);
                    });

                    // build data for revenue
                    angular.forEach(itemRecords, function (item, index) {
                        revenueAmount.push(item.RevenueAmount);
                    });

                    // build data for commssion
                    angular.forEach(itemRecords, function (item, index) {
                        commissionAmount.push(item.CommissionAmount);
                    });

                    // Chart.js Data
                    $scope.data = {
                        labels: dateRangeReport, //['Tháng 1','Tháng 2','Tháng 3','Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                        datasets: [
                            {
                                label: 'Doanh Thu',
                                fillColor: 'rgba(0,194,254,0.5)',
                                strokeColor: 'rgba(0,194,254,0.8)',
                                highlightFill: 'rgba(0,194,254,0.75)',
                                highlightStroke: 'rgba(0,194,254,1)',
                                data: revenueAmount //[65, 59, 80, 81, 56, 55, 40, 100, 120, 82, 35, 90]
                            },
                            {
                                label: 'Hoa Hồng',
                                fillColor: 'rgba(220,220,220,0.5)',
                                strokeColor: 'rgba(220,220,220,0.8)',
                                highlightFill: 'rgba(220,220,220,0.75)',
                                highlightStroke: 'rgba(220,220,220,1)',
                                data: commissionAmount //[28, 48, 40, 19, 86, 27, 90, 200, 100, 300, 76, 50]
                            }
                        ]
                    };

                    // Chart.js Options
                    $scope.options = {

                        // Sets the chart to be responsive
                        responsive: true,

                        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                        scaleBeginAtZero: true,

                        //Boolean - Whether grid lines are shown across the chart
                        scaleShowGridLines: true,

                        //String - Colour of the grid lines
                        scaleGridLineColor: "rgba(0,0,0,.05)",

                        //Number - Width of the grid lines
                        scaleGridLineWidth: 1,

                        //Boolean - If there is a stroke on each bar
                        barShowStroke: true,

                        //Number - Pixel width of the bar stroke
                        barStrokeWidth: 2,

                        //Number - Spacing between each of the X value sets
                        barValueSpacing: 5,

                        //Number - Spacing between data sets within X values
                        barDatasetSpacing: 1,

                        //String - A legend template
                        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
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

        function initForm() {
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
                        if (_startDate.length > 0 && _endDate.length > 0) {
                            var filter = {
                                "StartDate": _startDate,
                                "EndDate": _endDate,
                                "SessionKey": sessionKey
                            };

                            loadBarChartRevenue(filter);
                        }
                    }
                }
            };
        }

        $scope.changed = function (date) {
            // here you will get updated date
            console.log(date);
        };

        $scope.BarChartRevenueManager = {
            init: function () {
                initForm();
                loadBarChartRevenue();
            }
        };

        $scope.BarChartRevenueManager.init();

    }]);

app.controller('DatepickerChaChingCtrl', ["$scope", "$log",
    function ($scope, $log) {
        //$scope.today = function () {
        //    $scope.dt = new Date();
        //};
        //$scope.today();
        //$scope.start = $scope.minDate;
        //$scope.end = $scope.maxDate;

        //$scope.clear = function () {
        //    $scope.dt = null;
        //};
        //$scope.datepickerOptions = {
        //    showWeeks: false,
        //    startingDay: 1
        //};
        //$scope.dateDisabledOptions = {
        //    dateDisabled: disabled,
        //    showWeeks: false,
        //    startingDay: 1
        //};
        $scope.startOptions = {
            showWeeks: false,
            startingDay: 1,
            minDate: $scope.minDate,
            maxDate: $scope.maxDate
        };
        $scope.endOptions = {
            showWeeks: false,
            startingDay: 1,
            minDate: $scope.minDate,
            maxDate: $scope.maxDate
        };

        $scope.open = function () {
            $scope.opened = !$scope.opened;
        };


        $scope.endOpen = function () {
            $scope.endOptions.minDate = $scope.start;
            $scope.startOpened = false;
            $scope.endOpened = !$scope.endOpened;
        };
        $scope.startOpen = function () {
            $scope.startOptions.maxDate = $scope.end;
            $scope.endOpened = false;
            $scope.startOpened = !$scope.startOpened;
        };

        $scope.changed = function (date) {
            $log.log('Time changed to: ' + $scope.date);
        };

        $scope.selectStartDate = function (startDate) {
            //$log.log('Time changed to: ' + $scope.date);
            var startDateTime = startDate;
            var currentYear = startDateTime.getFullYear();
            var currentMonth = startDateTime.getMonth() + 1;
            var currentDay = startDateTime.getDate();

            if (currentMonth <= 9)
                currentMonth = '0' + currentMonth;

            if (currentDay <= 9)
                currentDay = '0' + currentDay;

            _startDate = currentYear + '' + currentMonth + '' + currentDay;
        };

        $scope.selectEndDate = function (endDate) {
            var endDateTime = endDate;
            var currentYear = endDateTime.getFullYear();
            var currentMonth = endDateTime.getMonth() + 1;
            var currentDay = endDateTime.getDate();

            if (currentMonth <= 9)
                currentMonth = '0' + currentMonth;

            if (currentDay <= 9)
                currentDay = '0' + currentDay;

            _endDate = currentYear + '' + currentMonth + '' + currentDay;
        };

        $scope.clear = function () {
            $scope.dt = null;
        };

    }]);

app.controller('ngTableRevenueReportCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "revenueService", "orderService", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, revenueService, orderService, membershipService, notificationService) {
        $scope.members = {};
        $scope.totalAffiliateAmount = 0; // total amount
        $scope.pendingAffiliateAmount = 0; // the amount that is waiting for approval
        $scope.approvedAffilateAmount = 0; // the amount that is already approved

        function loadOrderList() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var filterObj = {
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        revenueService.SummaryRevenueReport(filterObj, function (result) {
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data.StatusCode === 0 && result.data.Details) {
                                //var data = result.data.Details.Items;

                                $scope.members = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

                                $scope.totalAffiliateAmount = result.data.Details.TotalAmount;
                                $scope.pendingAffiliateAmount = result.data.Details.PendingAmount;
                                $scope.approvedAffilateAmount = result.data.Details.ApprovedAmount;

                                // Tell ngTable how many records we have (so it can set up paging)
                                params.total(totalRecordCount);

                                // Return the customers to ngTable
                                $defer.resolve($scope.members);

                                $scope.getClassForPayMentStatus = function (PaymentStatus) {
                                    if (PaymentStatus === 1) // Chưa thanh toán
                                        return "badge badge-inverse label label-inverse";
                                    else if (PaymentStatus === 2) // Ðã thanh toán
                                        return "badge badge-default label label-default";
                                    else if (PaymentStatus === 3) // Hoàn tiền
                                        return "badge badge-danger label label-danger";
                                };

                                $scope.getClassForAffiliateStatus = function (AffiliateStatus) {
                                    if (AffiliateStatus === 1) // Đang Duyệt
                                        return "badge badge-inverse label label-inverse";
                                    else if (AffiliateStatus === 2) // Đã Duyệt
                                        return "badge badge-success label label-success";
                                    else if (AffiliateStatus === 3) // Hủy
                                        return "badge badge-inverse label label-inverse";
                                };
                            } else {
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);
                                notificationService.displayError(result.data.StatusMsg);
                            }
                        });
                    }
                });
        }

        function manageOrderList() {
            $scope.updatePaymentStatus = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalUpdatePaymentStatusRevenueReport.html',
                    controller: 'ModalUpdatePaymentStatusRevenueReportCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.orderID = size.target.attributes.data.value;
                            return $scope.orderID;
                        }
                    }
                });
            };

            $scope.editOrder = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalUpdateAffiliatePaymentStatusRevenueReport.html',
                    controller: 'ModalUpdateAffiliatePaymentStatusRevenueReportCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            $scope.orderID = size.target.attributes.data.value;
                            return $scope.orderID;
                        }
                    }
                });
            };
        }

        $scope.OrderManage = {
            init: function () {
                loadOrderList();
                manageOrderList();
            }
        };

        $scope.OrderManage.init();
    }]);

app.controller('ModalUpdatePaymentStatusRevenueReportCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "orderService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, orderService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.order = {};
        $scope.PaymentStatusList = {};
        $scope.AccountTypeList = {};
        $scope.CustomerAccount = "";
        $scope.CustomerName = "";
        $scope.ContractNo = "";
        $scope.PaymentState = "";

        var customerInfo = items ? items : "";
        var customerSplit = customerInfo.split('|');
        if (customerSplit.length > 0) {
            $scope.CustomerAccount = customerSplit[0];
            $scope.CustomerName = customerSplit[1];
            $scope.ContractNo = customerSplit[2];
            $scope.PaymentState = customerSplit[3];
        }

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function updatePaymentStatusForm() {
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
                        var entity = {
                            "UserName": $scope.CustomerAccount,
                            "PaymentState": $scope.order.PaymentStatus,
                            "ContractNo": $scope.ContractNo,
                            "SessionKey": sessionKey
                        };

                        $scope.showSpinner = true;
                        // Load the data from the API
                        orderService.UpdatePaymentState(entity, function (result) {
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                notificationService.displaySuccess(result.data.StatusMsg);
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                    $uibModalInstance.dismiss('cancel');
                                    $window.location.reload();
                                }, 1000);
                            } else {
                                notificationService.displayError(result.data.StatusMsg);
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                    $uibModalInstance.dismiss('cancel');
                                }, 1000);
                            }
                        });
                    }
                }
            };
        }


        function loadOrderDetails() {
            $scope.showSpinner = true;

            if ($scope.CustomerAccount && $scope.CustomerAccount.length > 0) {
                $timeout(function () {
                    $scope.order = {
                        "CustomerAccount": $scope.CustomerAccount,
                        "CustomerName": $scope.CustomerName,
                        "PaymentStatus": $scope.PaymentState,
                        "ContractNo": $scope.ContractNo
                    };

                    $scope.showSpinner = false;
                }, 1000);

            }
        }

        function loadPaymentStatus() {
            $scope.PaymentStatusList = [
                { PaymentStatus: "1", PaymentStatusName: 'Chưa thanh toán' },
                { PaymentStatus: "2", PaymentStatusName: 'Ðã thanh toán' },
                { PaymentStatus: "3", PaymentStatusName: 'Hoàn Tiền' }
            ];
        }

        function loadAccountTypeList() {
            $scope.AccountTypeList = [
                { AccountType: "1", AccountTypeName: 'Cơ Bản' },
                { AccountType: "2", AccountTypeName: 'Nâng Cao' }
            ];
        }

        $scope.ModalUpdatePaymentStatusManager = {
            init: function () {
                loadPaymentStatus();
                loadAccountTypeList();
                loadOrderDetails();
            },
            edit: function () {
                updatePaymentStatusForm();
            }
        };

        $scope.ModalUpdatePaymentStatusManager.init();
        $scope.ModalUpdatePaymentStatusManager.edit();
    }]);

app.controller('ModalUpdateAffiliatePaymentStatusRevenueReportCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "orderService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, orderService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.order = {};
        $scope.orderAffiliate = {};
        $scope.PaymentStatusList = {};
        $scope.AccountTypeList = {};
        $scope.AffiliateStatusList = {};
        $scope.AffiliateAccount = "";
        $scope.AffiliateName = "";
        $scope.ContractNo = "";
        $scope.AffiliateStatus = 0;
        $scope.PaymentState = 0;
        $scope.PaymentStateName = "";

        var customerInfo = items ? items : "";
        var customerSplit = customerInfo.split('|');
        if (customerSplit.length > 0) {
            $scope.AffiliateAccount = customerSplit[0];
            $scope.AffiliateName = customerSplit[1];
            $scope.ContractNo = customerSplit[2];
            $scope.AffiliateStatus = customerSplit[3];
            $scope.PaymentState = parseInt(customerSplit[4]);
            $scope.PaymentStateName = customerSplit[5];
        }

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function approveOrderForm() {
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
                        /* Background
                         * Dai Su must not be approved when Customer has not settled payment yet
                         * 
                         * Payment Type Details
                         * PaymentStatus = 1 : Chua Thanh Toan
                         * PaymentStatus = 2: Da Thanh Toan
                         * PaymentStatus = 3: Hoan Tien
                         */

                        if ($scope.PaymentState !== 2) { // not proceed the payment yet
                            notificationService.displayWarning('Đại sứ chưa được phê duyệt đơn hàng này. Trạng thái của đơn hàng là ' + $scope.PaymentStateName);

                            $timeout(function () {
                                $uibModalInstance.dismiss('cancel');
                            }, 1000);

                            return;
                        }


                        var entity = {
                            "UserName": $scope.AffiliateAccount,
                            "ContractNo": $scope.ContractNo,
                            "AffiliateState": $scope.order.AffiliateStatus,
                            "SessionKey": sessionKey
                        };

                        $scope.showSpinner = true;
                        // Load the data from the API
                        orderService.UpdatePaymentAffiliateState(entity, function (result) {
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                notificationService.displaySuccess(result.data.StatusMsg);
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                    $uibModalInstance.dismiss('cancel');
                                    $window.location.reload();
                                }, 1000);
                            } else {
                                notificationService.displayError(result.data.StatusMsg);
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                    $uibModalInstance.dismiss('cancel');
                                }, 1000);
                            }
                        });
                    }
                }
            };
        }


        function loadOrderDetails() {
            $scope.showSpinner = true;
            if ($scope.AffiliateAccount && $scope.AffiliateAccount.length > 0) {

                $timeout(function () {
                    $scope.order = {
                        "AffiliateAccount": $scope.AffiliateAccount,
                        "AffiliateName": $scope.AffiliateName,
                        "AffiliateStatus": $scope.AffiliateStatus,
                        "ContractNo": $scope.ContractNo
                    };

                    $scope.showSpinner = false;
                }, 1000);
            }
        }

        function loadAffiliateStatus() {
            $scope.AffiliateStatusList = [
                { AffiliateStatus: "1", AffiliateStatusName: 'Đang Duyệt' },
                { AffiliateStatus: "2", AffiliateStatusName: 'Đã Duyệt' },
                { AffiliateStatus: "3", AffiliateStatusName: 'Hủy' }
            ];
        }

        $scope.ModalEditOrderManager = {
            init: function () {
                loadAffiliateStatus();
                loadOrderDetails();
            },
            edit: function () {
                approveOrderForm();
            }
        };

        $scope.ModalEditOrderManager.init();
        $scope.ModalEditOrderManager.edit();
    }]);

app.controller('ngTableCommissionReportCtrl', ["$scope", "$rootScope", "$window", "$localStorage", "$timeout", "$uibModal", "ngTableParams", "revenueService", "membershipService", "notificationService",
    function ($scope, $rootScope, $window, $localStorage, $timeout, $uibModal, ngTableParams, revenueService, membershipService, notificationService) {
        $scope.member = {};
        $scope.affiliates = {};
        $scope.totalAffiliateAmount = 0; // total amount
        $scope.pendingAffiliateAmount = 0; // the amount that is waiting for approval
        $scope.mustReturnAffilateAmount = 0; // the amount that is already approved

        function loadComissionReport() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var entity = {
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        $scope.showSpinner = true;
                        revenueService.SummaryCommissionReport(entity, function (result) {
                            // Later when working on member authentication and authorization, then we will use the following comment
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                //var data = result.data.Details.Items;
                                $scope.affiliates = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

                                $scope.totalAffiliateAmount = result.data.Details.TotalAmount;
                                $scope.pendingAffiliateAmount = result.data.Details.PendingAmount;
                                $scope.mustReturnAffilateAmount = result.data.Details.Amount;

                                // Tell ngTable how many records we have (so it can set up paging)
                                params.total(totalRecordCount);

                                // Return the customers to ngTable
                                $defer.resolve(result.data.Details.Items);
                                $scope.getClass = function (StatusOfAccount) {
                                    if (StatusOfAccount === 1) // Chờ duyệt
                                        return "badge badge-warning label label-warning";
                                    else if (StatusOfAccount === 2) // Ðã thanh toán
                                        return "badge badge-default label label-default";
                                    else if (StatusOfAccount === 3) // Dùng thử
                                        return "badge badge-info label label-info";
                                    else if (StatusOfAccount === 4) // Đang hoạt động
                                        return "badge badge-success label label-success";
                                    else if (StatusOfAccount === 5) // Ngừng hoạt động
                                        return "badge badge-inverse label label-inverse";
                                    else if (StatusOfAccount === 6) // Hoàn trả
                                        return "badge badge-danger label label-danger";
                                };
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
                });
        }

        $scope.lockOrUnlockAffiliateAccount = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalLockOrUnlockAffiliateAccount.html',
                controller: 'ModalLockOrUnlockAffiliateAccountRevenueReportCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return size.target.attributes.data.value;
                    }
                }
            });
        };

        $scope.RevenueComissionReportManager = {
            init: function () {
                loadComissionReport();
            }
        };

        $scope.RevenueComissionReportManager.init();

    }]);

app.controller('ModalLockOrUnlockAffiliateAccountRevenueReportCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, membershipService, notificationService) {
        var username = "";
        var isLock = 0;

        var memberInfo = items ? items : "";
        var memberSplit = memberInfo.split('|');
        if (memberSplit.length > 0) {
            username = memberSplit[0];
            isLock = memberSplit[1];
        }

        $scope.ok = function () {
            var entity = {
                "UserName": username,
                "SessionKey": sessionKey,
                "IsLock": isLock === "0" ? 1 : 0
            };

            $scope.showSpinner = true;
            // Load the data from the API
            membershipService.LockAccount(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    notificationService.displaySuccess(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                        $uibModalInstance.dismiss('cancel');
                        $window.location.reload();
                    }, 1000);
                } else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                        $uibModalInstance.dismiss('cancel');
                    }, 1000);
                }
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('ngTableRequestWithDrawRevenueReportCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "ngTableParams", "membershipService", "notificationService",
    function ($scope, $uibModal, $localStorage, $timeout, ngTableParams, membershipService, notificationService) {
        $scope.withdrawals = {};

        function loadRequestWithDrawal() {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                    getData: function ($defer, params) {
                        var entity = {
                            "PageIndex": params.page(),
                            "PageCount": params.count(),
                            //"UserName": username, // DON'T have such username here
                            "SessionKey": sessionKey
                        };

                        // Load the data from the API
                        membershipService.GetWithDrawallInfoByAccount(entity, function (result) {
                            // Later when working on member authentication and authorization, then we will use the following comment
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                //var data = result.data.Details.Items;
                                $scope.withdrawals = result.data.Details.Items;
                                var totalRecordCount = result.data.Details.Total;

                                // Tell ngTable how many records we have (so it can set up paging)
                                params.total(totalRecordCount);

                                // Return the customers to ngTable
                                $defer.resolve(result.data.Details.Items);
                                $scope.getClass = function (StatusOfAccount) {
                                    if (StatusOfAccount === 1) // Chờ duyệt
                                        return "badge badge-warning label label-warning";
                                    else if (StatusOfAccount === 2) // Ðã thanh toán
                                        return "badge badge-default label label-default";
                                    else if (StatusOfAccount === 3) // Dùng thử
                                        return "badge badge-info label label-info";
                                    else if (StatusOfAccount === 4) // Đang hoạt động
                                        return "badge badge-success label label-success";
                                    else if (StatusOfAccount === 5) // Ngừng hoạt động
                                        return "badge badge-inverse label label-inverse";
                                    else if (StatusOfAccount === 6) // Hoàn trả
                                        return "badge badge-danger label label-danger";
                                };
                            } else {
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                }, 1000);
                                notificationService.displayError(result.data.StatusMsg);
                            }
                        });
                    }
                });
        }

        $scope.requestWithDrawall = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalRequestWithDrawalRevenueReport.html',
                controller: 'ModalRequestWithDrawalRevenueReportCtrl',
                size: size,
                resolve: {
                    items: function () {
                        $scope.orderID = size.target.attributes.data.value;
                        return $scope.orderID;
                    }
                }
            });
        };

        $scope.MemberDetailsManager = {
            init: function () {
                loadRequestWithDrawal();
            }
        };

        $scope.MemberDetailsManager.init();

    }]);

app.controller('ModalRequestWithDrawalRevenueReportCtrl', ["$scope", "$window", "$localStorage", "$timeout", "$uibModalInstance", "items", "orderService", "membershipService", "notificationService",
    function ($scope, $window, $localStorage, $timeout, $uibModalInstance, items, orderService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUserAdmin ? $localStorage.currentUserAdmin.token : "";
        $scope.member = {};
        $scope.orderAffiliate = {};
        $scope.PaymentStatusList = {};
        $scope.AccountTypeList = {};
        $scope.AffiliateStatusList = {};

        $scope.AffiliateName = "";
        $scope.AffiliateAccount = "";
        $scope.AffiliateStatus = 0;

        var customerInfo = items ? items : "";
        var customerSplit = customerInfo.split('|');
        if (customerSplit.length > 0) {
            $scope.AffiliateName = customerSplit[0];
            $scope.AffiliateAccount = customerSplit[1];
            $scope.AffiliateStatus = customerSplit[2];
        }

        $scope.ok = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function approveOrderForm() {
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
                        var entity = {
                            "AccountName": $scope.AffiliateName,
                            "AccountAccount": $scope.AffiliateAccount,
                            "Status": $scope.member.AffiliateStatus,
                            "SessionKey": sessionKey
                        };

                        $scope.showSpinner = true;
                        // Load the data from the API
                        membershipService.ApprovetWithDrawallInfoByAccount(entity, function (result) {
                            if (result.data && result.data.StatusCode === 17) {
                                membershipService.checkMemberAuthorization();
                            }

                            if (result.data && result.data.StatusCode === 0) {
                                notificationService.displaySuccess(result.data.StatusMsg);
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                    $uibModalInstance.dismiss('cancel');
                                    $window.location.reload();
                                }, 1000);
                            } else {
                                notificationService.displayError(result.data.StatusMsg);
                                $timeout(function () {
                                    $scope.showSpinner = false;
                                    $uibModalInstance.dismiss('cancel');
                                }, 1000);
                            }
                        });
                    }
                }
            };
        }


        function loadWithDrawalDetails() {
            $scope.showSpinner = true;
            if ($scope.AffiliateAccount && $scope.AffiliateAccount.length > 0) {

                $timeout(function () {
                    $scope.member = {
                        "AffiliateName": $scope.AffiliateName,
                        "AffiliateAccount": $scope.AffiliateAccount,
                        "AffiliateStatus": $scope.AffiliateStatus
                    };

                    $scope.showSpinner = false;
                }, 1000);
            }
        }

        function loadAffiliateStatus() {
            $scope.AffiliateStatusList = [
                { AffiliateStatus: "1", AffiliateStatusName: 'Đang Duyệt' },
                { AffiliateStatus: "2", AffiliateStatusName: 'Hoàn Tất' }
            ];
        }

        $scope.ModalRequestWithDrawRevenuReportManager = {
            init: function () {
                loadAffiliateStatus();
                loadWithDrawalDetails();
            },
            edit: function () {
                approveOrderForm();
            }
        };

        $scope.ModalRequestWithDrawRevenuReportManager.init();
        $scope.ModalRequestWithDrawRevenuReportManager.edit();
    }]);