app.controller('newAccountStructureCrossRefController', function ($scope, $rootScope, $state, DTOptionsBuilder, 
    //newAccountStructureCrossRefResource, commonfunctions, $compile, DTColumnBuilder, $filter, $stateParams) {
    newAccountStructureCrossRefResource, commonfunctions, $compile, DTColumnBuilder) {

 
    $scope.widgetShow = true;
    $scope.sectionShow = true;
    $scope.isLoading = true;

    $scope.lstNewAccountStructureCrossRef = [];
    $scope.objNewAccountStructureCrossRef = {};
    $scope.selectedIndex = null;

    $scope.isApprover = false;
    $scope.isAdmin = false;
    $scope.isOfficer = false;
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
                hasAccess = false;
                hasAccess = $rootScope.isAuthorizedRole("UNF - Admin");
                if (hasAccess) {
                    $scope.isAdmin = true;
                }

            } catch (ex) {

            }
            // end authorization

        }
    });
   
    // -----------------------------------------------------------
    // ----------------------- PAGING ----------------------------
    // -----------------------------------------------------------

    // Initialize server pagging
    $scope.pagingOptions = { start: 0, length: 10, orderColumn: 2, orderDir: 'asc', draw: 1 };
    $scope.totalItems = 0;
    $scope.numPages = 0;

    $scope.pageData = {
        total: 0,
    };

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $compile(nRow)($scope);
    }

  

    // this function used to get all leads
    var get = function (sSource, aoData, fnCallback, oSettings) {

        $scope.pagingOptions.start = aoData[3].value;
        $scope.pagingOptions.length = aoData[4].value;
        $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
        $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
        index = $scope.pagingOptions.start + 1;
               

        //POST Parameters pagination result search
        appResource.start = $scope.pagingOptions.start;
        appResource.length = $scope.pagingOptions.length;
        appResource.orderColumn = $scope.pagingOptions.orderColumn;
        appResource.orderDir = $scope.pagingOptions.orderDir;



        appResource.$Search().then(function (data) {
            var records = {
                'draw': 0,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': []
            };
            if (data) {
                records = {
                    'draw': aoData[0].value,
                    'recordsTotal': data.obj.TotalRows, // (filtered from ... total entries)
                    'recordsFiltered': data.obj.TotalRows,    // Showing 1 to 50 of ... entries
                    'data': data.obj.lstDto
                    
                };
            }
            $scope.pageData.total = data.obj.TotalRows;
            fnCallback(records);
        });
    }


    $scope.dtColumns = [
        DTColumnBuilder.newColumn('OfficeCode', 'Office Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('CCYCode', 'CCY Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('GLCode', 'GL Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('SubGLCode', 'SubGL Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('AccountNo', 'AccountNo').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('BookingOfficeCode', 'Booking Office').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('CurrencyCode', 'Currency Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('TransactionTypeCode', 'Transaction Type').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('CustomerAccountNumber', 'Cust Account No').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('CustomerCode', 'Customer Code').withOption('defaultContent', ""),        
    ];



    // data tables option configuration
    $scope.dtNewOptions = DTOptionsBuilder.newOptions()
                         .withFnServerData(get) // method name server call
                         .withDataProp('data')// parameter name of list use in getLeads Fuction
                         .withOption('processing', true) // required
                         .withOption('serverSide', true)// required
                         .withOption('paging', true)// required
                         .withPaginationType('full_numbers')
                         .withOption('select', true)
                         .withOption('select.style', 'single')
                         .withOption('searching', false)
                         .withOption('responsive', true)
                         .withOption('rowCallback', rowCallback)
                         .withOption('drawCallback', function drawCallbank() {
                             $("#data-table > tbody").on('click', 'tr', function () {
                                 var footerRow = $("#data-table_info > span:first-child");
                                 footerRow.html('    ' + footerRow.text());
                             });
                         })
                         .withDisplayLength(10);

    // -----------------------------------------------------------
    // --------------- Show UI With Permission -------------------
    // -----------------------------------------------------------
    $scope.isOfficer = false;
    $scope.isApprover = false;
    $scope.isAdmin = false;
    $scope.$watch(function () {
        return $rootScope.setting.userProfile.user.ID;
    }, function () {

        if ($rootScope.setting.userProfile.user.ID != null &&
            $rootScope.setting.userProfile.user.ID != "" &&
            $rootScope.setting.userProfile.user.ID != undefined) {

            // set authorization for application
            // Enable/Disable/Hide/Show resources here
            try {

                $scope.isApprover = $rootScope.isAuthorizedRole("UNF - Approver");
                $scope.isOfficer = $rootScope.isAuthorizedRole("UNF - Officer");
                $scope.isAdmin = $rootScope.isAuthorizedRole("UNF - Admin");

                if ($scope.isAdmin) {
                    $scope.isOfficer = true;
                    $scope.isApprover = true;
                }

            } catch (ex) {

            }
            // end authorization
        }
    });

    var appResource = new newAccountStructureCrossRefResource();


    // init the datatable
    $('#alertErrorMessageSearchContainer').hide();


    $scope.isLoading = true;

    //appResource.$Search().then(function (data) {
    //    $scope.isLoading = true;
    //    // if success
    //    if (data.success) {
    //        // set the textbox values
    //        for (i = 0; i < data.obj.length; i++) {
    //            var item = data.obj[i];
    //            $scope.lstNewAccountStructureCrossRef.push(item);
    //        }
    //        $scope.isLoading = false;

    //    } else {
    //        // assign the error  message
    //        var errMsg = data.obj.StatusMsg;
    //        $scope.alerts = [{
    //            type: 'danger',
    //            msg: errMsg
    //        }];
    //        $scope.isLoading = false;
    //    }
    //}, function errorCallback(response) {
    //    //code for what happens when there's an error
    //    // assign the error  messgae

    //    var errMsg = "E0003A: Error occured while calling REST API. Please try again or contact the Administrator: ";
    //    $scope.alerts = [{
    //        type: 'danger',
    //        msg: errMsg
    //    }];
    //    $scope.isLoading = false;
    //});
   



    $scope.isLoading = false;


    $scope.openModalImportFile = function () {
        $('#alertErrorMessageContainer').hide();
        $('#modal-import').modal('toggle');
    }

    $scope.closeModalImportFile = function () {
        $('#modal-import').modal('hide');
    }

    // -------------------------------------------------------
    // IMPORT FILE - When user click into Import File button
    // -------------------------------------------------------

    $scope.importFiles = function () {
        $scope.isLoading = true;

        appResource.$initialIP().then(function () {
            $scope.submitImportFile();
        }, function errorCallback(response) {
            setTimeout($scope.submitImportFile(), 1000);
        });
    };

    $scope.submitImportFile = function () {

        if (!$scope.files || $scope.files.length <= 0) {
            var errMsg = "Please choose files to import.";
            $scope.importAlerts = [{
                type: 'danger',
                msg: errMsg
            }];

            $scope.isLoading = false;

            return;
        }

        if (confirm("Do you want to clean data before import New Account Structure Cross Ref data?")) {
            $scope.Clean = true;  // yes
        }
        else {
            $scope.Clean = false;
        }

        $scope.isLoading = true;
        appResource.SelectedFile = $scope.files;
        appResource.Clean = $scope.Clean;
        $scope.closeModalImportFile();
        appResource.$import({ Id: $scope.Clean }).then(function (data) {
            $scope.files = undefined;
            angular.element("input[type='file']").val(null);
            if (data.success) {                
                $('#data-table').dataTable().fnClearTable();    // recall paging function: var get = function (sSource, aoData, fnCallback, oSettings) {

                sucMsg = 'Import data of New Account Structure Cross Ref Successfully.';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];
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
            $scope.isLoading = false;

        }, function errorCallback(response) {
            //code for what happens when there's an error
            // assign the error  messgae

            if (response.status == "400") {
                $scope.isLoading = false;
                var errMsg = "The security session is timeout. System need refresh the page to continue.";
                alert(errMsg);
                window.location.reload();
            }
            var errMsg = "E0003CC: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
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
});

