
/* -------------------------------
   CONTROLLER: importFileController
   Author: Unified Tool
------------------------------- */
app.controller('transactionController', function ($scope, $rootScope, $state, $stateParams, $compile, DTOptionsBuilder,
                                                   DTColumnBuilder, transactionResource, $filter, commonfunctions) {
    $scope.widgetShow = true;
    $scope.sectionShow = true;
    $scope.isLoading = true;
    $scope.SearchObject = {};

    $scope.fileStatusList = [];
    $scope.fileTypeList = [];

    $scope.TotalTransaction = 0;
    $scope.Imported = 0;
    $scope.Approved = 0;
    $scope.Rejected = 0;
    $scope.Exported = 0;
    $scope.ISOExported = 0;
    $scope.SendToARHFailed = 0;
    $scope.SendToARHSucceed = 0;

    $scope.searchAccountNumber = "";
    $scope.searchAmount = "";
    $scope.searchTransactionType = "";
    $scope.searchFileName = "";
    $scope.searchFromDate = "";
    $scope.searchToDate = "";

    $scope.isCheckDisable = false;

    //$scope.searchAccountNumberPrintReport = "";
    //$scope.searchAmountPrintReport = "";
    //$scope.searchTransactionTypePrintReport = "";
    //$scope.searchFileNamePrintReport = "";
    //$scope.searchFromDatePrintReport = "";
    //$scope.searchToDatePrintReport = "";

    var index = 1;
    countIndex = function () {
        return index++;
    }

    $scope.pageData = {
        total: 0,
    };

    // init the datatable
    $('#alertErrorMessageSearchContainer').hide();
    $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
    $scope.isLoading = false;
    //initialize server pagging
    $scope.pagingOptions = { start: 0, length: 10, orderColumn: 2, orderDir: 'asc', draw: 1 };
    $scope.totalItems = 0;
    $scope.numPages = 0;

    var appResource = new transactionResource();

    appResource.$getTransactionTypeList().then(function (data) {
        // if success
        if (data.success) {
            $scope.transactionTypeList = [];
            for (i = 0; i < data.obj.length; i++) {
                var item = data.obj[i];
                $scope.transactionTypeList.push(item);
            }
            $scope.isLoading = false;
        } else {
            // assign the error  message
            var errMsg = data.obj.StatusMsg;
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;
        }
    }, function errorCallback(response) {
        //code for what happens when there's an error
        // assign the error  messgae
        var errMsg = "E0003: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
        $scope.alerts = [{
            type: 'danger',
            msg: errMsg
        }];
        $scope.isLoading = false;

    });

    // this function used to get all leads
    var get = function (sSource, aoData, fnCallback, oSettings) {

        $scope.pagingOptions.start = aoData[3].value;
        $scope.pagingOptions.length = aoData[4].value;
        $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
        $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
        index = $scope.pagingOptions.start + 1;

        //POST Parameters search condition
        appResource.AccountNumber = $scope.SearchObject.AccountNumber;
        appResource.Amount = $scope.SearchObject.Amount;
        appResource.TransactionType = $scope.SearchObject.TransactionType;
        appResource.FileName = $scope.SearchObject.FileName;
        appResource.FromDate = $scope.SearchObject.FromDate;
        appResource.ToDate = $scope.SearchObject.ToDate;

        //POST Parameters pagination result search
        appResource.start = $scope.pagingOptions.start;
        appResource.length = $scope.pagingOptions.length;
        appResource.orderColumn = $scope.pagingOptions.orderColumn;
        appResource.orderDir = $scope.pagingOptions.orderDir;

        appResource.$search().then(function (data) {
            var records = {
                'draw': 0,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': []
            };
            if (data) {
                $scope.TotalTransaction = data.obj.TotalTransaction;
                $scope.Imported = data.obj.Imported;
                $scope.Approved = data.obj.Approved;
                $scope.Rejected = data.obj.Rejected;
                $scope.Exported = data.obj.Exported;
                $scope.ISOExported = data.obj.ISOExported;
                $scope.SendToARHFailed = data.obj.SendToARHFailed;
                $scope.SendToARHSucceed = data.obj.SendToARHSucceed;
                $scope.isLoading = false;
                records = {
                    'draw': aoData[0].value,
                    'recordsTotal': data.obj.TotalTransaction,
                    'recordsFiltered': data.obj.TotalTransaction,
                    'data': data.obj.lstTransactionDto
                };

                if (!$scope.TotalTransaction) {
                    $scope.isCheckDisable = true;
                } else {
                    $scope.isCheckDisable = false;
                }
            } else {
                $scope.isCheckDisable = true;
            }
            $scope.pageData.total = data.obj.TotalTransaction;
            fnCallback(records);
        }, function errorCallback(response) {
            //code for what happens when there's an error
            // assign the error  messgae
            if (response.status == 408) {
                var errMsg = "Data is processing. Please try again later.";
            }
            else {
                var errMsg = "E0003: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
            }
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;

        });
    }

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $compile(nRow)($scope);
    }

    //Debit == '0001' -> Multiple Debit
    //Debit == '0002' -> Normal Debit
    //Debit == '0003' -> BookTransfer Multiple Debit
    //Debit == '0004' -> Single Debit
    function GetDebitMethodByCode(debitCode) {
        var debitMethod = "";

        switch (debitCode) {
            case "0001":
                debitMethod = "Multiple Debit";
                break;

            case "0002":
                debitMethod = "Normal Debit";
                break;

            case "0003":
                debitMethod = "Multiple Debit";
                break;

            case "0004":
                debitMethod = "Single Debit";
                break;
        }

        return debitMethod;
    }

    $scope.dtNewOptions = DTOptionsBuilder.newOptions()
            .withFnServerData(get) // method name server call
            .withDataProp('data')// parameter name of list use in getLeads Fuction
            .withOption('processing', true) // required
            .withOption('serverSide', true)// required
            .withOption('paging', true)// required
            .withPaginationType('full_numbers')
            .withOption('searching', false)
            //.withOption('responsive', true)
            .withOption('scrollX', true)
            .withOption('scrollCollapse', true)
            .withOption('rowCallback', rowCallback)
            .withDisplayLength(10);

    $scope.dtColumns = [
         DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
         DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").notSortable(),
         DTColumnBuilder.newColumn("ValueDate", "Value Date").withOption('defaultContent', "").renderWith(function (data, type) {
             return $filter('date')(data, 'dd/MM/yyyy');
         }),
         DTColumnBuilder.newColumn(null, "Entry No").withOption('defaultContent', "").renderWith(function (data, type) {
             return '<a ui-sref="transaction.detailtransaction({id: ' + data.ID + '})">' + data.EntryNo + '</a>'
         }),
         DTColumnBuilder.newColumn('DebitAC', 'Debit A/C').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('Currency', 'Currency').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('Amount', 'Transaction Amount').withOption('defaultContent', "").renderWith(function (data, type) {
             if ($scope.Currency == "VND" || $scope.Currency == "JPY") {
                 return $filter('currency')(data, "", "0");
             }
             else {
                 return $filter('currency')(data, "", "2");
             }
         }),
         DTColumnBuilder.newColumn('BeneficiaryName', 'Beneficiary Name').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('BeneficiaryBank', 'Beneficiary Bank').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('PartitionID', 'Single/Multiple Debit').withOption('defaultContent', "").renderWith(function (data, type) {
             return GetDebitMethodByCode(data);
         }),
          DTColumnBuilder.newColumn(null, 'File Name').withOption('defaultContent', "").renderWith(function (data, type) {
              return data.FileType == 'CTD' ?
                '<a ui-sref="importfile.vibadetail({ id:' + data.FileImportID + '})">' + data.FileName + '</a>'
              : ' <a ui-sref="importfile.detail({ id: ' + data.FileImportID + '})">' + data.FileName + '</a>';
          }),
         DTColumnBuilder.newColumn('Status', 'Status').withOption('defaultContent', ""),
    ];

    $scope.search = function () {
        //POST Parameters search condition
        $scope.SearchObject.AccountNumber = $scope.searchAccountNumber;

        if (!$scope.searchAmount) {
            $scope.SearchObject.Amount = $scope.searchAmount;
        }
        else if (!angular.isNumber($scope.searchAmount)) {
            $scope.SearchObject.Amount = Number($scope.searchAmount.replace(/[^0-9\.]+/g, ""));
        }
        else {
            $scope.SearchObject.Amount = $scope.searchAmount;
        }

        $scope.SearchObject.TransactionType = $scope.searchTransactionType;
        $scope.SearchObject.FileName = $scope.searchFileName;
        var searchFromDate = moment($('#searchFromDate').val(), 'DD/MM/YYYY hh:mm A').format('MM/DD/YYYY hh:mm a');
        var searchToDate = moment($('#searchToDate').val(), 'DD/MM/YYYY hh:mm A').format('MM/DD/YYYY hh:mm a');
        $scope.SearchObject.FromDate = searchFromDate;
        $scope.SearchObject.ToDate = searchToDate;

        $('#data-table').dataTable().fnClearTable();
    }

    $scope.summaryReport = function () {
        $scope.isLoading = true;

        appResource.AccountNumberPrintReport = $scope.SearchObject.AccountNumber;
        appResource.AmountPrintReport = $scope.SearchObject.Amount;
        appResource.TransactionTypePrintReport = $scope.SearchObject.TransactionType;
        appResource.FileNamePrintReport = $scope.SearchObject.FileName;
        appResource.FromDatePrintReport = $scope.SearchObject.FromDate;
        appResource.ToDatePrintReport = $scope.SearchObject.ToDate;

        appResource.confirmExport = false;
        appResource.$summaryReport().then(function (data) {
            // if success
            if (data.response.success) {
                if (data.response.TotalTransaction * 1.0 > 0) {

                    var blob = data.response.blob;
                    saveAs(blob, data.response.fileName);
                    sucMsg = 'Export transaction summary report successfully.';
                    $scope.alerts = [{
                        type: 'success',
                        msg: sucMsg
                    }];
                    $scope.isLoading = false;
                }
                else {
                    errMsg = 'Does not exist record in search result.';
                    $scope.alerts = [{
                        type: 'danger',
                        msg: errMsg
                    }];
                    $scope.isLoading = false;
                }
            } else {
                // assign the error  message
                var errMsg = data.obj.StatusMsg;
                $scope.alerts = [{
                    type: 'danger',
                    msg: errMsg
                }];
                $scope.isLoading = false;
            }

        }, function errorCallback(response) {
            //code for what happens when there's an error
            // assign the error  messgae
            var errMsg = "E0003: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;
        });
    }

    $scope.clearForm = function () {
        $scope.searchAccountNumber = "";
        $scope.searchAmount = "";
        $scope.searchTransactionType = "";
        $scope.searchFileName = "";
        $("#searchFromDate").val("");
        $("#searchToDate").val("");
    }

    var id = $stateParams.id;
    if (id) {
        $('.modal-backdrop').remove();
        appResource.$getDetailTransaction({ id: id }).then(function (data) {
            // if success
            if (data.success) {
                $scope.TransactionDetail = data.obj;
                $scope.isLoading = false;
            } else {
                // assign the error  message
                var errMsg = data.StatusMsg;
                $scope.alerts = [{
                    type: 'danger',
                    msg: errMsg
                }];
                $scope.isLoading = false;
            }
        }, function errorCallback(response) {
            //code for what happens when there's an error
            // assign the error  messgae
            var errMsg = "E0003: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;
        });

        $scope.printTaxReceipt = function () {
            $scope.isLoading = true;

            appResource.$printTaxReceipt({ id: id }).then(function (data) {
                // if success
                if (data.success) {
                    //sucMsg = 'Files is exported to iso file successfully.';
                    //$scope.alerts = [{
                    //    type: 'success',
                    //    msg: sucMsg
                    //}];

                } else {
                    // assign the error  messgae
                    var errMsg = data.obj.StatusMsg;
                    $scope.alerts = [{
                        type: 'danger',
                        msg: errMsg
                    }];
                    $("#alertMessage").text(errMsg);
                    // show the alert error message panel
                    $('#alertErrorMessageContainer').show();
                }

                if (data.obj && data.obj.length) {
                    var i;
                    for (i = 0; i < data.obj.length; ++i) {
                        var file = commonfunctions.base64ToBlob([data.obj[i].FileReportData]);
                        window.navigator.msSaveOrOpenBlob(file, data.obj[i].FileReportName);
                    }
                }
                $scope.isLoading = false;

            }, function errorCallback(response) {
                //code for what happens when there's an error
                // assign the error  messgae
                var errMsg = "E0003: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
                $scope.alerts = [{
                    type: 'danger',
                    msg: errMsg
                }];

                $("#alertMessage").text(errMsg);
                // show the alert error message panel
                $('#alertErrorMessageContainer').show();
                $scope.isLoading = false;
            });
        }
    }



    commonfunctions.hasDateTimepicker();
});