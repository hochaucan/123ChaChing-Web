
/* -------------------------------
   CONTROLLER: importedFileController
   Author: Unified Tool
------------------------------- */
app.controller('importedFileController', function ($scope, $rootScope, $state, $compile, DTOptionsBuilder, DTColumnBuilder,
                                                    importedFileResource, importFileResource, reportResource, transactionResource, $filter, $stateParams, commonfunctions) {
    $scope.thisScope = $scope;
    $scope.widgetShow = true;
    $scope.sectionShow = true;
    $scope.isLoading = true;
    $scope.showErrorMax = true;
    var appResource = new importedFileResource();
    var importFileResource = new importFileResource();
    var reportResource = new reportResource();
    var transactionResource = new transactionResource();
    $scope.amountFilter = {};
    $scope.importFileDetails = {
        Status: 'Imported'
    };
    $scope.importFileTransactions = [];
    $scope.exportTransactions = [];
    $scope.remainTransactions = [];
    $scope.exportedTransactions = [];
    $scope.amountFilter = "";
    $scope.UpdatedDate = $filter("date")(new Date(), "dd/MM/yyyy");
    $scope.currentFileId = 0;
    $scope.isChangeValueDate = false;
    $scope.isHightValuePayment = false;
    $scope.Remarks = '';
    $scope.newValueDate = {};
    $scope.fileReports = [];
    $scope.accountbalance = -1;
    $scope.isOfficer = false;
    $scope.isApprover = false;
    $scope.isFilterClicked = false;
    $scope.filterInfo = "";
    $scope.isValueDateFutureDate = false;
    $scope.futureDateFileName = '';
    $scope.isNormalDebit = false;
    $scope.debitLabel = 'Normal Debit'; // In case debit value is 0002
    $scope.currencyNumberOfFractions = 2; // Get two decimals from total amounts
    $scope.isDisabledTotalRemain = false;
    $scope.isDisabledTotalExport = false;

    $scope.$watch(function () {
        return $rootScope.setting.userProfile.user.ID;
    }, function () {

        if ($rootScope.setting.userProfile.user.ID != null && $rootScope.setting.userProfile.user.ID != "" && $rootScope.setting.userProfile.user.ID != undefined) {

            // set authorization for application
            // Enable/Disable/Hide/Show resources here
            try {

                var hasAccess = false;
                hasAccess = $rootScope.isAuthorizedRole("UNF - Approver");
                if (hasAccess) {
                    $scope.isApprover = true;
                }
                hasAccess = false;
                hasAccess = $rootScope.isAuthorizedRole("UNF - Officer");
                if (hasAccess) {
                    $scope.isOfficer = true;
                }

            } catch (ex) {

            }
            // end authorization

        }
    });

    var index = 1;
    countIndex = function () {
        return index++;
    }

    $scope.pageData = {
        total: 0,
    };

    // init the datatable
    $('#alertErrorMessageSearchContainer').hide();
    //$('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
    $scope.isLoading = false;
    $scope.showErrorMax = false;
    var id = $stateParams.id;
    $scope.currentFileId = id;

    //initialize server pagging
    $scope.pagingOptions = { start: 0, length: 10, orderColumn: 2, orderDir: 'asc', draw: 1 };
    $scope.totalItems = 0;
    $scope.numPages = 0;

    // this function used to get all leads
    {
        var get = function (sSource, aoData, fnCallback, oSettings) {
            $scope.pagingOptions.start = aoData[3].value;
            $scope.pagingOptions.length = aoData[4].value;
            $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
            $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
            index = $scope.pagingOptions.start + 1;
            appResource.$getFileDetail({
                Id: $scope.currentFileId, accountbalance: $scope.accountbalance, Start: $scope.pagingOptions.start, Length: $scope.pagingOptions.length,
                OrderColumn: $scope.pagingOptions.orderColumn, OrderDir: $scope.pagingOptions.orderDir,
            })
            .then(function (data) {
                var records = {
                    'draw': 0,
                    'recordsTotal': 0,
                    'recordsFiltered': 0,
                    'data': []
                };
                if (data && data.obj) {
                    $scope.importFileDetails = data.obj;
                    $scope.Transactions = $scope.importFileDetails.Transactions;
                    //Display detail imported file
                    $scope.FileName = $scope.importFileDetails.FileName;
                    $scope.Status = $scope.importFileDetails.Status;
                    $scope.ImportedDate = $rootScope.formatLocalDate($scope.importFileDetails.CreatedDate);
                    $scope.TotalAmount = $scope.importFileDetails.TotalAmount;
                    $scope.Currency = $scope.importFileDetails.Currency;
                    $scope.TotalTransaction = $scope.importFileDetails.TotalTransaction;
                    $scope.Debit = $scope.importFileDetails.Debit;
                    $scope.UpdatedDate = $scope.importFileDetails.UpdatedDate;

                    //Debit == '0001' -> Multiple Debit
                    //Debit == '0003' -> Multiple Debit
                    //Debit == '0004' -> Single Debit
                    //Debit == '0002' -> Normal Debit

                    // If debit is not normal method then total amount should be shown up
                    if ($scope.TotalAmount != 0) {
                        if ($scope.importFileDetails.Debit == "0001" || $scope.importFileDetails.Debit == "0003")
                            $scope.debitLabel = "Multiple Debit";
                        else if ($scope.importFileDetails.Debit == "0004")
                            $scope.debitLabel = "Single Debit";
                    } else {
                        // Total amount should not shown up
                        if ($scope.importFileDetails.Debit == "0002") {
                            $scope.TotalAmount = "N/A";
                            $scope.isNormalDebit = true;
                        }
                    }

                    // Remove decimals from actual total amount
                    if ($scope.Currency == "VND" || $scope.Currency == "JPY")
                        $scope.currencyNumberOfFractions = 0;

                    $scope.Phase2 = $scope.importFileDetails.Phase2;

                    ////////// channel ///////////// ==>  get data from business classs
                    $scope.FileType = $scope.importFileDetails.FileType; //$scope.importFileDetails.Debit;



                    if ($scope.importFileDetails.IsFileExported) {
                        $scope.amountFilter = $scope.importFileDetails.AmountFilter;
                    }
                    else {
                        $scope.amountFilter = $scope.importFileDetails.TotalExportExactlyAmount;
                    }
                    $scope.newValueDate = new Date($filter('date')($scope.importFileDetails.ValueDate, "yyyy-MM-dd"));

                    if ($scope.importFileDetails.IsNeedUpdateRemarks)
                    {
                        var warningMsg = 'File ' + $scope.importFileDetails.FileName + ' exists transaction have Remarks field greater than 210 characters.';
                        $scope.alerts = [{
                            type: 'warning',
                            msg: warningMsg
                        }];
                    }
                    

                    records = {
                        'draw': aoData[0].value,
                        'recordsTotal': data.obj.TotalTransaction,
                        'recordsFiltered': data.obj.TotalTransaction,
                        'data': data.obj.Transactions
                    };
                }
                //$scope.pageData.total = data.TotalItems;
                fnCallback(records);
            });
        }
        var getViba = function (sSource, aoData, fnCallback, oSettings) {
            $scope.pagingOptions.start = aoData[3].value;
            $scope.pagingOptions.length = aoData[4].value;
            $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
            $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
            index = $scope.pagingOptions.start + 1;
            appResource.$getFileDetail({
                Id: $scope.currentFileId, accountbalance: $scope.accountbalance, Start: $scope.pagingOptions.start, Length: $scope.pagingOptions.length,
                OrderColumn: $scope.pagingOptions.orderColumn, OrderDir: $scope.pagingOptions.orderDir,
            })
            .then(function (data) {
                var records = {
                    'draw': 0,
                    'recordsTotal': 0,
                    'recordsFiltered': 0,
                    'data': []
                };
                if (data) {

                    $scope.importFileDetails = data.obj;
                    $scope.Transactions = $scope.importFileDetails.Transactions;
                    //Display detail imported file
                    $scope.FileName = $scope.importFileDetails.FileName;
                    $scope.Status = $scope.importFileDetails.Status;
                    $scope.ImportedDate = $rootScope.formatLocalDate($scope.importFileDetails.CreatedDate);
                    $scope.TotalAmount = $scope.importFileDetails.TotalAmount;
                    $scope.Currency = $scope.importFileDetails.Currency;
                    $scope.TotalTransaction = $scope.importFileDetails.TotalTransaction;
                    $scope.Debit = $scope.importFileDetails.Debit;
                    if ($scope.importFileDetails.IsFileExported) {
                        $scope.amountFilter = $scope.importFileDetails.AmountFilter;
                    }
                    else {
                        if ($scope.isFilterClicked) {
                            $scope.amountFilter = $scope.accountbalance;
                        }
                        else {
                            $scope.amountFilter = $scope.importFileDetails.TotalExportExactlyAmount;
                        }
                    }
                    $scope.newValueDate = new Date($filter('date')($scope.importFileDetails.ValueDate, "yyyy-MM-dd"));
                    $scope.totalExportExactlyAmount = $scope.importFileDetails.TotalExportExactlyAmount;
                    $scope.totalExportTrans = $scope.importFileDetails.TotalExportTrans;
                    if ($scope.isFilterClicked && $scope.totalExportTrans == 0) {
                        var info = "The first transaction doesn't have amount <= account balance";
                        $scope.filterInfo = info;
                    }
                    else {
                        $scope.filterInfo = "";
                    }
                    $scope.pageData.total = $scope.importFileDetails.TotalExportTrans;

                    $scope.totalRemainAmount = $scope.importFileDetails.TotalAmount - $scope.importFileDetails.TotalExportExactlyAmount - $scope.importFileDetails.TotalExportedAmount - $scope.importFileDetails.TotalUnderApprovalAmount - $scope.importFileDetails.TotalUnderRejectAmount;
                    $scope.countRemainTransactions = $scope.importFileDetails.TotalTransaction - $scope.totalExportTrans - $scope.importFileDetails.TotalExportedTransactions - $scope.importFileDetails.TotalUnderApprovalTransactions - $scope.importFileDetails.TotalUnderRejectTransactions;
                    if ($scope.countRemainTransactions == 0)
                        $scope.isDisabledTotalRemain = true;
                    else
                        $scope.isDisabledTotalRemain = false;

                    if ($scope.importFileDetails.TotalExportedTransactions == 0)
                        $scope.isDisabledTotalExport = true;
                    else
                        $scope.isDisabledTotalExport = false;
                    //$scope.remainTransactions = data.obj.RemainTransactions;
                    records = {
                        'draw': aoData[0].value,
                        'recordsTotal': $scope.importFileDetails.TotalExportTrans,
                        'recordsFiltered': $scope.importFileDetails.TotalExportTrans,
                        'data': $scope.importFileDetails.ExportTransactions
                    };

                    fnCallback(records);
                }
            });
        }
        var getVibaRemain = function (sSource, aoData, fnCallback, oSettings) {
            $scope.pagingOptions.start = aoData[3].value;
            $scope.pagingOptions.length = aoData[4].value;
            $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
            $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
            index = $scope.pagingOptions.start + 1;
            appResource.$getFileDetailRemain({
                Id: $scope.currentFileId, accountbalance: $scope.accountbalance, Start: $scope.pagingOptions.start, Length: $scope.pagingOptions.length,
                OrderColumn: $scope.pagingOptions.orderColumn, OrderDir: $scope.pagingOptions.orderDir,
            })
            .then(function (data) {
                var records = {
                    'draw': 0,
                    'recordsTotal': 0,
                    'recordsFiltered': 0,
                    'data': []
                };
                if (data) {
                    records = {
                        'draw': aoData[0].value,
                        'recordsTotal': data.obj.TotalTransRemain,
                        'recordsFiltered': data.obj.TotalTransRemain,
                        'data': data.obj.TransactionsRemain
                    };
                }
                ///$scope.pageData.total = data.TotalItems;
                fnCallback(records);
            });
        }
        var getVibaExported = function (sSource, aoData, fnCallback, oSettings) {
            $scope.pagingOptions.start = aoData[3].value;
            $scope.pagingOptions.length = aoData[4].value;
            $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
            $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
            index = $scope.pagingOptions.start + 1;
            appResource.$getFileDetailExported({
                Id: $scope.currentFileId, accountbalance: $scope.accountbalance, Start: $scope.pagingOptions.start, Length: $scope.pagingOptions.length,
                OrderColumn: $scope.pagingOptions.orderColumn, OrderDir: $scope.pagingOptions.orderDir,
            })
            .then(function (data) {
                var records = {
                    'draw': 0,
                    'recordsTotal': 0,
                    'recordsFiltered': 0,
                    'data': []
                };
                if (data) {
                    records = {
                        'draw': aoData[0].value,
                        'recordsTotal': data.obj.TotalExportedTransactions,
                        'recordsFiltered': data.obj.TotalExportedTransactions,
                        'data': data.obj.ExportedTransactions
                    };
                }
                //$scope.pageData.total = data.TotalItems;
                fnCallback(records);
            });
        }
    }
    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        if (aData["IsNeedUpdateRemarks"]) {
            $(nRow).css('background-color', '#FEEFB3');
        }

        $compile(nRow)($scope);
    }

    // Define Data Table Column
    {
        $scope.dtColumns = [
             DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
             DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").notSortable(),
             DTColumnBuilder.newColumn("ValueDate", "Value Date").renderWith(function (data, type) {
                 return $filter('date')(data, 'dd/MM/yyyy');
             }),
             DTColumnBuilder.newColumn(null, "Entry No").renderWith(function (data, type) {
                 return '<a ui-sref="transaction.detailtransaction({id: ' + data.ID + '})">' + data.EntryNo + '</a>'
             }),
             DTColumnBuilder.newColumn('DebitAC', 'Debit A/C').withOption('defaultContent', ""),
             DTColumnBuilder.newColumn('Currency', 'Currency').withOption('defaultContent', ""),
             DTColumnBuilder.newColumn('Amount', 'Amount').renderWith(function (data, type) {
                 if ($scope.Currency == "VND" || $scope.Currency == "JPY") {
                     return $filter('currency')(data, "", "0");
                 }
                 else {
                     return $filter('currency')(data, "", "2");
                 }
             }),
             DTColumnBuilder.newColumn('BeneficiaryName', 'Beneficiary name').withOption('defaultContent', ""),
             DTColumnBuilder.newColumn('BeneficiaryBank', 'Beneficiary bank').withOption('defaultContent', ""),
             DTColumnBuilder.newColumn('PaymentInstructionContent', 'Remark').withOption('defaultContent', ""),
        ];
        $scope.dtVibaColumns = [
           DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
           DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").withOption('width', '25px').notSortable(),
           DTColumnBuilder.newColumn("ValueDate", "Value Date").withOption('width', '60px').renderWith(function (data, type) {
               return $filter('date')(data, 'dd/MM/yyyy');
           }).notSortable(),
           DTColumnBuilder.newColumn(null, "Entry No").withOption('width', '100px').renderWith(function (data, type) {
               return '<a ui-sref="transaction.detailtransaction({id: ' + data.ID + '})">' + data.EntryNo + '</a>'
           }).notSortable(),
           DTColumnBuilder.newColumn('DebitAC', 'Debit A/C').withOption('defaultContent', "").withOption('width', '100px').notSortable(),
           DTColumnBuilder.newColumn('Currency', 'Currency').withOption('defaultContent', "").withOption('width', '60px').notSortable(),
           DTColumnBuilder.newColumn('Amount', 'Amount').withOption('width', '100px').renderWith(function (data, type) {
               if ($scope.Currency == "VND" || $scope.Currency == "JPY") {
                   return $filter('currency')(data, "", "0");
               }
               else {
                   return $filter('currency')(data, "", "2");
               }
           }).notSortable(),
           DTColumnBuilder.newColumn('BeneficiaryName', 'Beneficiary name').withOption('defaultContent', "").notSortable(),
           DTColumnBuilder.newColumn('BeneficiaryBank', 'Beneficiary bank').withOption('defaultContent', "").notSortable(),
        ];
        $scope.dtVibaRemainColumns = [
          DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
          DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").withOption('width', '30px').notSortable(),
          DTColumnBuilder.newColumn("ValueDate", "Value Date").renderWith(function (data, type) {
              return $filter('date')(data, 'dd/MM/yyyy');
          }),
          DTColumnBuilder.newColumn(null, "Entry No").renderWith(function (data, type) {
              return '<a ui-sref="transaction.detailtransaction({id: ' + data.ID + '})">' + data.EntryNo + '</a>'
          }),
          DTColumnBuilder.newColumn('DebitAC', 'Debit A/C').withOption('defaultContent', ""),
          DTColumnBuilder.newColumn('Currency', 'Currency').withOption('defaultContent', ""),
          DTColumnBuilder.newColumn('Amount', 'Amount').renderWith(function (data, type) {
              if ($scope.Currency == "VND" || $scope.Currency == "JPY") {
                  return $filter('currency')(data, "", "0");
              }
              else {
                  return $filter('currency')(data, "", "2");
              }
          }),
          DTColumnBuilder.newColumn('BeneficiaryName', 'Beneficiary name').withOption('defaultContent', ""),
          DTColumnBuilder.newColumn('BeneficiaryBank', 'Beneficiary bank').withOption('defaultContent', ""),
        ];
        $scope.dtVibaExportedColumns = [
         DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
         DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").withOption('width', '30px').notSortable(),
         DTColumnBuilder.newColumn("ValueDate", "Value Date").renderWith(function (data, type) {
             return $filter('date')(data, 'dd/MM/yyyy');
         }),
         DTColumnBuilder.newColumn(null, "Entry No").renderWith(function (data, type) {
             return '<a ui-sref="transaction.detailtransaction({id: ' + data.ID + '})">' + data.EntryNo + '</a>'
         }),
         DTColumnBuilder.newColumn('DebitAC', 'Debit A/C').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('Currency', 'Currency').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('Amount', 'Amount').renderWith(function (data, type) {
             if ($scope.Currency == "VND" || $scope.Currency == "JPY") {
                 return $filter('currency')(data, "", "0");
             }
             else {
                 return $filter('currency')(data, "", "2");
             }
         }),
         DTColumnBuilder.newColumn('BeneficiaryName', 'Beneficiary name').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('BeneficiaryBank', 'Beneficiary bank').withOption('defaultContent', ""),
        ];
    }
    // data tables option configuration
    {
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                               .withOption('select', true)
                               .withOption('select.style', 'single')
                               .withOption('searching', false)
                               .withOption('paging', false)
                               .withOption('responsive', true);

        $scope.dtNewOptions = DTOptionsBuilder.newOptions()
                .withFnServerData(get) // method name server call
                .withDataProp('data')// parameter name of list use in getLeads Fuction
                .withOption('processing', true) // required
                .withOption('serverSide', true)// required
                .withOption('paging', true)// required
                .withPaginationType('full_numbers')
                .withOption('searching', false)
                .withOption('scrollX', true)
                .withOption('scrollCollapse', true)
                //.withOption('responsive', true)
                .withOption('select', 'single')
                .withOption('select.info', false)
                .withOption('rowCallback', rowCallback)
                .withDisplayLength(10);

        $scope.dtVibaOptions = DTOptionsBuilder.newOptions()
                .withFnServerData(getViba) // method name server call
                .withDataProp('data')// parameter name of list use in getLeads Fuction
                .withOption('processing', true) // required
                .withOption('serverSide', true)// required
                .withOption('paging', true)// required
                .withPaginationType('full_numbers')
                .withOption('searching', false)
                .withOption('scrollX', true)
                .withOption('scrollCollapse', true)
                .withOption('rowCallback', rowCallback)
                .withDisplayLength(10);

        $scope.dtVibaRemainOptions = {}; 
        $scope.dtVibaExportedOptions = {};
    }

    $scope.filter = function () {
        $('#alertErrorMessageSearchContainer').hide();
        $scope.isFilterClicked = true;
        $scope.remainTransactions = [];
        var total = 0;
        $scope.exportTransactions = [];
        var amountFilterNumber = 0;

        if (!angular.isNumber($scope.amountFilter)) {
            amountFilterNumber = Number($scope.amountFilter.replace(/[^0-9\.]+/g, ""));
        }
        else {
            amountFilterNumber = $scope.amountFilter;
        }
        if (amountFilterNumber == 0) {
            amountFilterNumber = 1;
        }
        $scope.accountbalance = amountFilterNumber;
        $('#data-tableViba').dataTable().fnClearTable();

    }

    $scope.viewRemainTransactionDetail = function () {
        $scope.dtVibaRemainOptions = DTOptionsBuilder.newOptions()
                .withFnServerData(getVibaRemain) // method name server call
                .withDataProp('data')// parameter name of list use in getLeads Fuction
                .withOption('processing', true) // required
                .withOption('serverSide', true)// required
                .withOption('paging', true)// required
                .withPaginationType('full_numbers')
                .withOption('searching', false)
                .withOption('scrollX', true)
                .withOption('scrollCollapse', true)
                //.withOption('responsive', true)
                .withOption('rowCallback', rowCallback)
                .withDisplayLength(10);
        $('#data-tableVibaRemain').dataTable().fnClearTable();
        $('#modal-ViewRemainTransactions').modal('toggle');
    }
    $scope.closeRemainTransactionDetail = function () {
        $('#data-tableViba').dataTable().fnClearTable();
    }
    $scope.viewExportedTransactionDetail = function () {
        $scope.dtVibaExportedOptions = DTOptionsBuilder.newOptions()
               .withFnServerData(getVibaExported) // method name server call
               .withDataProp('data')// parameter name of list use in getLeads Fuction
               .withOption('processing', true) // required
               .withOption('serverSide', true)// required
               .withOption('paging', true)// required
               .withPaginationType('full_numbers')
               .withOption('searching', false)
               .withOption('scrollX', true)
               .withOption('scrollCollapse', true)
               //.withOption('responsive', true)
               .withOption('rowCallback', rowCallback)
               .withDisplayLength(10);
        $('#data-tableVibaExported').dataTable().fnClearTable();
        $('#modal-ViewExportedTransactions').modal('toggle');
    }

    $scope.approve = function () {
        $scope.alerts = [];
        if ($scope.Remarks.length > 500) {
            $scope.showErrorMax = true;
            return;
        }

        $scope.isLoading = true;
        $scope.buttonApproveDisabled = true;


        var listFileIds = [];
        listFileIds.push($scope.currentFileId);
        importFileResource.ListFileIds = listFileIds;
        if ($scope.isChangeValueDate) {
            var dateParts = commonfunctions.convertDateToDateStr($scope.newValueDate).split("/");
            var dateObject = new Date(Date.UTC(dateParts[2], dateParts[1] - 1, dateParts[0]))
            importFileResource.NewValueDate = dateObject;
        }
        else {
            importFileResource.NewValueDate = null;
        }
        importFileResource.IsHightValuePayment = $scope.isHightValuePayment;
        importFileResource.Remarks = $scope.Remarks;
        importFileResource.UpdatedDate = $scope.UpdatedDate;
        $scope.closeModalApprove();
        importFileResource.$approve().then(function (data) {
            // if success
            if (data.success) {
                sucMsg = 'File is approved.';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];
                $scope.importFileDetails.Status = 'Approved';
                $('#data-table').dataTable().fnClearTable();
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
            $scope.buttonApproveDisabled = false;
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
            $scope.buttonApproveDisabled = false;

        });
    }

    $scope.exportTransactionToFile = function () {


        if ($scope.totalExportTrans <= 0) {
            var errMsg = "No transaction to report!";
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            return;
        }

        // disabled button to prevent double click
        $scope.isLoading = true;
        // http post export

        if (!angular.isNumber($scope.amountFilter)) {
            appResource.accountbalance = $scope.amountFilter.replace(/[^0-9\.]+/g, "");
        }
        else {
            appResource.accountbalance = $scope.amountFilter;
        }
        appResource.FileId = id;
        appResource.AmountFilter = $scope.amountFilter;
        appResource.$exportTransactionToFile().then(function (data) {
            // if success
            if (data.success) {
                sucMsg = 'Transactions were exported to new file successfully.';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];
                window.setTimeout(function () {
                    $state.reload();
                }, 1000);

            } else {
                var errMsg;
                if (data.obj) {
                    // assign the error  messgae
                    errMsg = data.obj.StatusMsg;
                }
                else {
                    errMsg = 'File is fully exported by other user!';
                }

                $scope.alerts = [{
                    type: 'warning',
                    msg: errMsg
                }];

                $("#alertMessage").text(errMsg);
                // show the alert error message panel
                $('#alertErrorMessageContainer').show();
            }
            if (data.obj && data.obj.length) {
                var file = commonfunctions.base64ToBlob([data.obj[0].FileReportData]);
                window.navigator.msSaveOrOpenBlob(file, data.obj[0].FileReportName);
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

    function getDataTableSelectedID() {
        var table = $('#data-table').DataTable();
        var selectRow = table.row('.selected');
        var result = null;
        if (selectRow.length > 0) {
            var selectedRowNo = selectRow[0][0];
            var data = table.cell(selectedRowNo, 0).data(); // ID is at column 0
            result = data;
        }

        return result;
    }

    function getDataTableSelectedIndex() {
        var table = $('#data-table').DataTable();
        var selectRow = table.row('.selected');
        var result = null;
        if (selectRow.length > 0) {
            result = selectRow[0][0];
        }

        return result;
    }

    $scope.printReport = function () {
        appResource.ID = id;
        $scope.isLoading = true;
        appResource.$printReportToExcel().then(function (data) {
            // if success
            if (data.success) {
                var a = document.createElement('a');
                var blob = commonfunctions.base64ToBlob(data.obj.FileReportData);
                if (window.URL && window.Blob && ('download' in a) && window.atob) {
                    // Do it the HTML5 compliant way

                    var url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = data.obj.FileReportName;
                    a.click();
                    window.URL.revokeObjectURL(url);

                    var sucMsg = "Print report file successfully";

                    $scope.alerts = [{
                        type: 'success',
                        msg: sucMsg
                    }];
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
    }

    //Enum ReportType:
    //SummaryReport = 0
    //DetailReport_All = 1
    //DetailReport_Domestic = 2
    //DetailReport_BookTransfer = 3
    //DetailReport_InterBranch = 4
    //FileTransferPaymentReport = 9

    $scope.printFileReports = function () {
        $scope.fileReports = [];
        var item = [];

        if ($scope.importFileDetails.FileType == 'EXL' || $scope.importFileDetails.FileType == 'EXM') {
            // item = { No: 1, ReportFileName: "+ File Transfer Payment Request Report", ReportType: 9 };
            item = { No: 1, ReportFileName: "+ Transaction Summary Report", ReportType: 0 };
            $scope.fileReports.push(item);
        }
        else {
            item = { No: 1, ReportFileName: "+ Transaction Summary Report", ReportType: 0 };
            $scope.fileReports.push(item);
            if ($scope.importFileDetails.FileType == 'CTD' || $scope.importFileDetails.FileType == 'VTB') {
                item = { No: 2, ReportFileName: "+ Transaction Detail Report (All)", ReportType: 1 };
                $scope.fileReports.push(item);
                item = { No: 3, ReportFileName: "+ Transaction Detail Report (Domestic-EBANK)", ReportType: 2 };
                $scope.fileReports.push(item);
                item = { No: 4, ReportFileName: "+ Transaction Detail Report (Domestic-CITAD)", ReportType: 14 };
                $scope.fileReports.push(item);
                item = { No: 4, ReportFileName: "+ Transaction Detail Report (BookTransfer)", ReportType: 3 };
                $scope.fileReports.push(item);
                item = { No: 5, ReportFileName: "+ Transaction Detail Report (InterBranch)", ReportType: 4 };
                $scope.fileReports.push(item);
            }
        }
        $('#modal-ViewFileReports').modal('toggle');
    }

    $scope.openfilereport = function ($index) {

        appResource.ReportFileName = $scope.fileReports[$index].ReportFileName;
        appResource.ReportType = $scope.fileReports[$index].ReportType;
        appResource.FileImportID = $scope.currentFileId;
        var reportfilename = $scope.fileReports[$index].ReportFileName;
        $('#modal-ViewFileReports').modal('toggle');
        $scope.isLoading = true;
        appResource.$getReportFile().then(function (data) {

            if (data.success) {
                if (data.obj.FileReportName != null) {
                    var blob = commonfunctions.base64ToBlob([data.obj.FileReportData]);
                    navigator.msSaveOrOpenBlob(blob, data.obj.FileReportName);
                }
                else {
                    alert("No Data For Report. Please export another ReportType!")
                }
                $scope.isLoading = false;

            }
            else {
                // assign the error  message
                var errMsg = data.obj.StatusMsg;
                $scope.alerts = [{
                    type: 'danger',
                    msg: errMsg
                }];
                $scope.isLoading = false;
            }
        }, function errorCallback(response) {
            var errMsg = "Error occured while calling REST API. Please try again or contact the Administrator.";
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;
        });

    };

    $scope.openModalApprove = function () {
        $scope.buttonApproveDisabled = false;
        $scope.isValueDateFutureDate = false;
        $scope.futureDateFileName = '';
        
        if ($scope.importFileDetails.IsValueDateFutureDate) {
            $scope.isValueDateFutureDate = true;
            if ($scope.futureDateFileName.length > 0) {
                $scope.futureDateFileName = $scope.futureDateFileName + ", " + $scope.importFileDetails.FileName;
            }
            else {
                $scope.futureDateFileName = $scope.importFileDetails.FileName;
            }
        }

        if ($scope.isChangeValueDate) {
            var dateParts = commonfunctions.convertDateToDateStr($scope.newValueDate).split("/");
            var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
            var currentDateParts = commonfunctions.convertDateToDateStr(new Date()).split("/");
            var currentDate = new Date(currentDateParts[2], currentDateParts[1] - 1, currentDateParts[0])
            if (dateObject > currentDate)
            {
                $scope.isValueDateFutureDate = true;
                if ($scope.futureDateFileName.length > 0) {
                    $scope.futureDateFileName = $scope.futureDateFileName + ", " + $scope.importFileDetails.FileName;
                }
                else {
                    $scope.futureDateFileName = $scope.importFileDetails.FileName;
                }
            }
        }

        $('#modal-alert-approve').modal('show');
    }

    $scope.closeModalApprove = function () {
        $scope.showErrorMax = false;
        $scope.Remarks = '';
        $('#modal-alert-approve').modal('toggle');
    }

    /* start: Process date - date-picker */

    $scope.openCalendar = function () {
        $scope.popupCalendar.opened = true;
    }

    $scope.altInputFormats = ['d!/M!/yyyy'];    // Vietnamese

    $scope.popupCalendar = {
        opened: false
    };

    /* end: Process date - date-picker */

    $scope.openModalEditForm = function () {

        $scope.buttonEditDisabled = false;
        $('#alertErrorMessageEditContainer').hide();

        var transactionID = getDataTableSelectedID();

        if (transactionID != null) {

            $scope.transactionEdit = {};
            $scope.transactionEditForm.$valid = true; // default to valid

            // go to server to retrieve the latest data 
            transactionResource.$getDetailTransaction({ id: transactionID }).then(function (data) {
                // if success
                if (data.success) {
                    // set the textbox values
                    $scope.transactionEdit.ID = data.obj.ID;
                    $scope.transactionEdit.Remarks = data.obj.PaymentInstructionContent;
                    $scope.transactionEdit.CreatedBy = data.obj.CreatedBy;
                    $scope.transactionEdit.CreatedDate = data.obj.CreatedDate;
                    $scope.transactionEdit.UpdatedBy = data.obj.UpdatedBy;
                    $scope.transactionEdit.UpdatedDate = data.obj.UpdatedDate;

                } else {
                    // assign the error  messgae
                    var errMsg = data.obj.StatusMsg;
                    $("#alertMessageEdit").text(errMsg);
                    // show the alert error message panel
                    $('#alertErrorMessageEditContainer').show();
                }
            }, function errorCallback(response) {
                var errMsg = "GEN001: Error occured while calling the web service. Please try again.";
                // show the alert error message panel
                $('#alertErrorMessageEditContainer').show();

            });

            $('#modal-edit').modal('show');

        } else {
            alert("Please select a row to edit");
        }

    }

    $scope.closeModalEditForm = function () {
        $scope.parameter = {};
        $('#modal-edit').modal('hide');
    }

    $scope.editKeyPress = function (keyEvent) {
        if (keyEvent.which == 13) {
            $scope.submitEditForm(); // invoke submitEditForm function
        }
    }

    // function to submit the edit form after all validation has occurred            
    $scope.submitEditForm = function () {
        $scope.submitted = true;
        // check to make sure the form is completely valid
        if ($scope.transactionEditForm.$valid) {
            $scope.isLoading = true;
            $scope.buttonEditDisabled = true;

            // assign input form data to appResource
            transactionResource.ID = $scope.transactionEdit.ID;
            transactionResource.PaymentInstructionContent = $scope.transactionEdit.Remarks;
            transactionResource.CreatedBy = $scope.transactionEdit.CreatedBy;
            transactionResource.CreatedDate = $scope.transactionEdit.CreatedDate;
            transactionResource.UpdatedBy = $scope.transactionEdit.UpdatedBy;
            transactionResource.UpdatedDate = $scope.transactionEdit.UpdatedDate;

            // http post edit
            transactionResource.$editTransaction().then(function (data) {
                // if success
                if (data.success) {
                    $scope.submitted = false;
                    $scope.selectedParamIndex = getDataTableSelectedIndex();

                    var table = $('#data-table').DataTable();
                    var info = table.page.info();

                    $scope.closeModalEditForm();
                    
                    var sucMsg = 'You have edited remarks successfully.';

                    $scope.alerts = [{
                        type: 'success',
                        msg: sucMsg
                    }];

                    $('#data-table').dataTable().fnDraw(false);

                } else {
                    // assign the error  messgae
                    var errMsg = data.obj;//.StatusMsg;
                    $("#alertMessageEdit").text(errMsg);
                    // show the alert error message panel
                    $('#alertErrorMessageEditContainer').show();
                }

                $scope.buttonEditDisabled = false;
                $scope.isLoading = false;
            }, function errorCallback(response) {
                //code for what happens when there's an error
                // assign the error  messgae
                var errMsg = "Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
               
                $("#alertMessageEdit").text(errMsg);
                //show the alert error message panel
                $('#alertErrorMessageEditContainer').show();
                $scope.buttonEditDisabled = false;
                $scope.isLoading = false;
            });
        } else {
            //alert("There are invalid entries. Please check again.")
        }

    };
});