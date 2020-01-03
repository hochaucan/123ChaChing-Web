
/* -------------------------------
   CONTROLLER: settlementAccountNumberController
   Author: Application Framework Generateor
------------------------------- */
app.controller('bankMappingController', function ($scope, $rootScope, $state, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, bankMappingResource, $filter, commonfunctions, $compile) {

    var appResource = new bankMappingResource();
    $scope.files = [];
    $scope.importFileManuals = [];
    $scope.currentDate = $filter('date')(new Date(), "dd/MM/yyyy");
    $scope.widgetShow = true;
    $scope.sectionShow = true;
    $scope.isLoading = true;
    $scope.IsEmptyData = false;
    $scope.SearchObject = {};

    $scope.bankMappingList = [];
    $scope.matchedBankCodeManagementSearch = {};
    $scope.uploadedBy = "";
    $scope.uploadedDate = "";
    $scope.checkedBy = "";
    $scope.checkedDate = "";

    $scope.selectedBankMappingIndex = null;

    //initialize server pagging
    $scope.pagingOptions = { start: 0, length: 10, orderColumn: 0, orderDir: 'asc', draw: 1 };
    $scope.totalItems = 0;
    $scope.numPages = 0;

    $scope.isCheckDisable = false;
    $scope.objBankCode = {};
    $scope.selectedIndex = null;
    $scope.submitted = false;
    $scope.pristine = true;

    $scope.searchCusBankCodeHistory = "";
    $scope.searchCusBankNameHistory = "";
    $scope.searchInActiveHistory = false;
    $scope.cleanMatchedBankCode = false;
    // data tables option configuration
    $scope.dtOptions = DTOptionsBuilder.newOptions()
                         .withOption('select', false)
                         .withOption('select.style', 'single')
                         .withOption('searching', false)
                         .withOption('paging', false)

                         //.withOption('deferRender', true)
                         //.withOption('scroller', true)
                         //.withOption('scroller.loadingIndicator', true)
                         //.withOption('scroller.displayBuffer', '20')
                         //.withOption('scrollX', '2000')
                         //.withOption('scrollY', '400')
                         //.withOption('bInfo', false)
                         //.withOption('autoWidth', 'false')
                         //.withOption('responsive', true)
    ;

    $scope.isOfficer = false;
    $scope.isApprover = false;
    $scope.isAdmin = false;

    $scope.$watch(function () {
        return $rootScope.setting.userProfile.user.ID;
    }, function () {

        if ($rootScope.setting.userProfile.user.ID != null && $rootScope.setting.userProfile.user.ID != "" && $rootScope.setting.userProfile.user.ID != undefined) {

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

    $scope.reloadDatagridview = function () {
        $scope.isLoading = true;
        appResource.PageIndex = $scope.pagingOptions.pageIndex;
        appResource.PageSize = $scope.pagingOptions.pageSize;

        appResource.$get({ PageIndex: $scope.pagingOptions.pageIndex, PageSize: $scope.pagingOptions.pageSize, SortBy: "", sortDirection: 0 }).then(function (data) {
            // if success
            if (data.success) {
                // set the textbox values
                $scope.getBankMappings(data);
                $scope.totalItems = data.TotalItems;
                $scope.numPages = data.PageCount;
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
    };

    // init the datatable
    //$('#alertErrorMessageSearchContainer').hide();
    //$scope.reloadDatagridview();

    $scope.getBankMappings = function (data) {
        $scope.bankMappingList = [];

        for (i = 0; i < data.obj.length; i++) {
            var item = data.obj[i];
            $scope.bankMappingList.push(item);
        }

        if (data.obj.length > 0) {
            var bankMapping = data.obj[0];
            $scope.uploadedBy = bankMapping.CreatedBy;
            $scope.uploadedDate = bankMapping.CreatedDate;
            $scope.checkedBy = $.trim(bankMapping.UserCHK);
            $scope.checkedDate = bankMapping.CHKDate;
        }
        else{
            $scope.uploadedBy = "";
            $scope.uploadedDate = "";
            $scope.checkedBy = "";
            $scope.checkedDate = "";
        }

        $scope.isCheckDisable = !($scope.checkedBy == "");
    };

    $scope.pageChanged = function () {
        $scope.reloadDatagridview();
    };
    $scope.changedPageSize = function () {
        $scope.reloadDatagridview();
    };
    
    $scope.exportBankMappings = function () {
        $scope.isLoading = true;
        appResource.CusBankCode = $scope.SearchObject.CusBankCode;
        appResource.CusBankName = $scope.SearchObject.CusBankName;
        appResource.InActive = $scope.SearchObject.InActive;

        appResource.$exportBankMappings().then(function (data) {
            // if success
            if (data.success) {
                var sucMsg = 'Matched Bank Code are exported successfully.';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];

                var file = commonfunctions.base64ToBlob(data.obj.FileReportData);
                window.navigator.msSaveOrOpenBlob(file, data.obj.FileReportName);
            } else {
                var errMsg = data.obj.StatusMsg;
                $scope.alerts = [{
                    type: 'danger',
                    msg: errMsg
                }];
                $scope.isLoading = false;

            }
            //$rootScope.scrollTop();
            $scope.isLoading = false;
        }, function errorCallback(response) {
            var errMsg = "System fails to proceed. Please contact System Administrator for more information.";
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;
        });
    };

    $scope.checkBankMappings = function () {
        $scope.isLoading = true;

        appResource.$checkBankMappings().then(function (data) {
            // if success
            if (data.success) {
                $scope.pagingOptions.pageIndex = 1;
                var sucMsg = 'Matched Bank Code are checked successfully.';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];

                $scope.searchBankMapping();
            } else {
                var errMsg = data.obj.StatusMsg;
                $scope.alerts = [{
                    type: 'danger',
                    msg: errMsg
                }];
                $scope.isLoading = false;

            }
            //$rootScope.scrollTop();
            $scope.isLoading = false;
        }, function errorCallback(response) {

            var errMsg = "System fails to proceed. Please contact System Administrator for more information.";
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            //$rootScope.scrollTop();
            $scope.isLoading = false;
        });
    };

    $scope.importDataByFile = function () {
        if (!$scope.files || $scope.files.length <= 0) {
            var errMsg = "Please choose files to import.";
            $scope.importAlerts = [{
                type: 'danger',
                msg: errMsg
            }];
          
            $scope.isLoading = false;

            return;
        }
        if (confirm("Do you want to clean data before import matched bank code?")) {
            $scope.cleanMatchedBankCode = true;
        }
        else {
            $scope.cleanMatchedBankCode = false;
        }
        appResource.CleanMatchedBankCode = $scope.cleanMatchedBankCode;
        appResource.SelectedFile = $scope.files;
        $("#btnImportFile").prop('disabled', true);
        $("#errorMessageDetails").text("");
        $("#alertMessage").text("");
        $scope.closeModalImportFile();
        $('#alertErrorMessageContainer').hide();
        
        appResource.$importDataByFiles({ Id: $scope.cleanMatchedBankCode }).then(function (data) {
            $scope.files = undefined;
            angular.element("input[type='file']").val(null);
            $("#btnImportFile").prop('disabled', false);

            // if success
            if (data.success) {

                //$scope.pagingOptions.pageIndex = 1;

                //$scope.reloadDatagridview();
                $scope.searchBankMapping();
                var sucMsg = 'Files are imported successfully.';
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

                $scope.isLoading = false;

                for (var i = 0; i < data.obj.ErrorModels.length; i++) {
                    var item = data.obj.ErrorModels[i];
                    var html = "No" + item.RowNumber + ": " + item.ErrorMessage;

                    $scope.alerts.push({
                        type: 'danger',
                        msg: html
                    });
                }

                $("#alertMessage").text(errMsg);
                $('#alertErrorMessageContainer').show();
            }
            //$rootScope.scrollTop();
            $scope.isLoading = false;
        }, function errorCallback(response) {
            $("#btnImportFile").prop('disabled', false);
            if (response.status == "400") {
                $scope.isLoading = false;
                var errMsg = "The security session is timeout. System need refresh the page to continue.";
                alert(errMsg);
                window.location.reload();
            }
            var errMsg = "System fails to proceed. Please contact System Administrator for more information.";
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            //$rootScope.scrollTop();
            $scope.isLoading = false;

            $("#alertMessage").text(errMsg);
            $('#alertErrorMessageContainer').show();
        });
    };

    $scope.importFiles = function () {
        $scope.isLoading = true;
        
        appResource.$initialIP().then(function () {
            $scope.importDataByFile();
        }, function errorCallback(response) {
            setTimeout($scope.importDataByFile(), 1000);
        });
    };

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    $scope.openModalImportFile = function () {
        $('#alertErrorMessageContainer').hide();
        $("#errorMessageDetails").text("");
        $('#modal-import').modal('toggle');
        $("#btnImportFile").prop('disabled', false);
    }

    $scope.closeModalImportFile = function () {
        $('#modal-import').modal('hide');
    }


    var index = 1;
    countIndex = function () {
        return index++;
    }

    //initialize server pagging
    $scope.pagingOptions = { start: 0, length: 10, orderColumn: 0, orderDir: 'asc', draw: 1 };
    $scope.totalItems = 0;
    $scope.numPages = 0;

    // this function used to get all leads
    var get = function (sSource, aoData, fnCallback, oSettings) {

        $scope.pagingOptions.start = aoData[3].value;
        $scope.pagingOptions.length = aoData[4].value;
        $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
        $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
        index = $scope.pagingOptions.start + 1;

        //POST Parameters search condition

        //POST Parameters pagination result search
        appResource.start = $scope.pagingOptions.start;
        appResource.length = $scope.pagingOptions.length;
        appResource.orderColumn = $scope.pagingOptions.orderColumn;
        appResource.orderDir = $scope.pagingOptions.orderDir;

        appResource.CusBankCode = $scope.SearchObject.CusBankCode;
        appResource.CusBankName = $scope.SearchObject.CusBankName;
        appResource.InActive = $scope.SearchObject.InActive;

        appResource.$searchBankMapping().then(function (data) {
            var records = {
                'draw': 0,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': []
            };
            if (data) {
                records = {
                    'draw': aoData[0].value,
                    'recordsTotal': data.TotalItems,
                    'recordsFiltered': data.TotalItems,
                    'data': data.obj
                };

                if (data.obj.length > 0) {
                    var bankMapping = data.obj[0];
                    $scope.uploadedBy = bankMapping.CreatedBy;
                    $scope.uploadedDate = $filter('date')(bankMapping.CreatedDate, 'dd/MM/yyyy hh:mm:ss');
                    $scope.checkedBy = $.trim(bankMapping.UserCHK);
                    $scope.checkedDate = $filter('date')(bankMapping.CHKDate, 'dd/MM/yyyy hh:mm:ss');
                    $scope.IsEmptyData = false;
                }
                else {
                    $scope.uploadedBy = "";
                    $scope.uploadedDate = "";
                    $scope.checkedBy = "";
                    $scope.checkedDate = "";
                    $scope.IsEmptyData = true;
                }

                $scope.isCheckDisable = !data.isCheckMapping;
            } else {
                $scope.IsEmptyData = true;
            }

            $scope.pageData.total = data.TotalItems;
            fnCallback(records);
            $scope.isLoading = false;
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

    $scope.dtColumns = [
        DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
        DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").notSortable(),
        DTColumnBuilder.newColumn('CusBankCode', 'Cus.BankCode').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('CusBankName', 'Cus.BankName').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('BTMUBankCode', 'Bank Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('BTMUBankNameEN', 'Bank Name (EN)').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('BankNameVN', 'Bank Name (VN)').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('IntBankCode', 'Int Bank Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('IntBankName', 'Int Bank Name').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('Province', 'Province').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('BankNote', 'Bank Note').withOption('defaultContent', "")
    ];

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
            .withOption('scrollX', true)
            .withOption('scrollCollapse', true)
            //.withOption('responsive', true)
            .withOption('rowCallback', rowCallback)
            .withOption('drawCallback', function drawCallback() {
                $("#data-table > tbody").on('click', 'tr', function () {
                    var footerRow = $("#data-table_info > span:first-child");
                    footerRow.html('    ' + footerRow.text());
                });
            })
            .withDisplayLength(10);
    $scope.pageData = {
        total: 0,
    };

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $(nRow).attr("id", aData["ID"]);
        $compile(nRow)($scope);
    }

    $scope.searchBankMapping = function () {
        $scope.SearchObject.CusBankCode = $scope.matchedBankCodeManagementSearch.CusBankCode;
        $scope.SearchObject.CusBankName = $scope.matchedBankCodeManagementSearch.CusBankName;
        $scope.SearchObject.InActive = $scope.matchedBankCodeManagementSearch.InActive;
        $('#data-table').dataTable().fnClearTable();
    }

     // function to delete after row selected   
    $scope.submitDeleteForm = function () {
        $scope.isLoading = true;
        $scope.buttonDeleteDisabled = true;

        $scope.selectedIndex = getDataTableSelectedIndex();
        var _ID = getDataTableSelectedID();

        // http delete
        appResource.$delete({ Id: _ID }).then(function (data) {
            // if success
            if (data.success) {
                $('#data-table').dataTable().fnClearTable();
                $scope.closeModalDelete();
                var sucMsg = 'You have successfully delete a Matched Bank Code item!';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];
                $scope.selectedIndex = null;
            } else {
                // assign the error  messgae
                $scope.closeModalDelete();
                var errMsg = data.obj.StatusMsg;

                $scope.alerts = [{
                    type: 'danger',
                    msg: errMsg
                }];

            }
            $scope.buttonDeleteDisabled = false;
            $scope.isLoading = false;

        }, function errorCallback(response) {
            //code for what happens when there's an error
            // assign the error  messgae
            var errMsg = "E0003B: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;

            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];

            $scope.buttonDeleteDisabled = false;
            $scope.isLoading = false;

        });

    }

    // -----------------------------------------------------------
    // ------------------------ Clear Form() ---------------------
    // -----------------------------------------------------------

    $scope.clearForm = function () {
        $scope.matchedBankCodeManagementSearch.CusBankCode = "";
        $scope.matchedBankCodeManagementSearch.CusBankName = "";
        $scope.matchedBankCodeManagementSearch.InActive = false;
    }

    // -----------------------------------------------------------
    // ------------------------ ADD FORM ------------------------
    // -----------------------------------------------------------

    // function to submit the add form after all validation has occurred            
    $scope.submitNewForm = function () {
        $scope.submitted = true;
        // check to make sure the form is completely valid
        if ($scope.matchedBankCodeManagementNewForm.$valid) { 
            // disabled button to prevent double click
            $scope.isLoading = true;
            $scope.buttonAddDisabled = true;

            // assign input form data to appResource
            appResource.ID = $scope.matchedBankCodeManagementNew.ID;
            appResource.CusBankCode = $scope.matchedBankCodeManagementNew.CusBankCode;
            appResource.CusBankName = $scope.matchedBankCodeManagementNew.CusBankName;
            appResource.BTMUBankCode = $scope.matchedBankCodeManagementNew.BTMUBankCode;
            appResource.BTMUBankNameEN = $scope.matchedBankCodeManagementNew.BTMUBankNameEN;
            appResource.BankNameVN = $scope.matchedBankCodeManagementNew.BankNameVN;
            appResource.IntBankCode = $scope.matchedBankCodeManagementNew.IntBankCode;
            appResource.IntBankName = $scope.matchedBankCodeManagementNew.IntBankName;
            appResource.Province = $scope.matchedBankCodeManagementNew.Province;
            appResource.BankNote = $scope.matchedBankCodeManagementNew.BankNote;

            appResource.CreatedBy = $scope.matchedBankCodeManagementNew.CreatedBy;
            appResource.CreatedDate = $scope.matchedBankCodeManagementNew.CreatedDate;
            appResource.UpdatedBy = $scope.matchedBankCodeManagementNew.UpdatedBy;
            appResource.UpdatedDate = $scope.matchedBankCodeManagementNew.UpdatedDate;

            // http post add
            appResource.$add().then(function (data) {
                // if success
                if (data.success) {
                    $('#data-table').dataTable().fnClearTable();      /* add to lstBankCode */
                    $scope.toggleModalAddForm();
                    sucMsg = 'You have successfully create a Matched Bank Code item!';
                    $scope.alerts = [{
                        type: 'success',
                        msg: sucMsg
                    }];
                } else {
                    // assign the error  messgae
                    var errMsg = data.obj.StatusMsg;
                    $("#alertMessage").text(errMsg);
                    // show the alert error message panel
                    $('#alertErrorMessageContainer').show();
                }
                $scope.buttonAddDisabled = false;
                $scope.isLoading = false;

            }, function errorCallback(response) {
                //code for what happens when there's an error
                // assign the error  messgae
                var errMsg = "E0003C: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
                $scope.alerts = [{
                    type: 'danger',
                    msg: errMsg
                }];
                $("#alertMessage").text(errMsg);
                // show the alert error message panel
                $('#alertErrorMessageContainer').show();
                $scope.buttonAddDisabled = false;
                $scope.isLoading = false;

            });
        } else {
            //alert("E0004: There are invalid entries. Please check again.")
        }
    }

    // -----------------------------------------------------------
    // ------------------------ EDIT FORM ------------------------
    // -----------------------------------------------------------

    // function to submit the edit form after all validation has occurred            
    $scope.submitEditForm = function () {
        $scope.submitted = true;
        // check to make sure the form is completely valid
        if ($scope.matchedBankCodeManagementEditForm.$valid) {
            $scope.isLoading = true;
            $scope.buttonEditDisabled = true;

            // assign input form data to appResource
            appResource.ID = $scope.matchedBankCodeManagementEdit.ID;
            appResource.CusBankCode = $scope.matchedBankCodeManagementEdit.CusBankCode;
            appResource.CusBankName = $scope.matchedBankCodeManagementEdit.CusBankName;
            appResource.BTMUBankCode = $scope.matchedBankCodeManagementEdit.BTMUBankCode;
            appResource.BTMUBankNameEN = $scope.matchedBankCodeManagementEdit.BTMUBankNameEN;
            appResource.BankNameVN = $scope.matchedBankCodeManagementEdit.BankNameVN;
            appResource.IntBankCode = $scope.matchedBankCodeManagementEdit.IntBankCode;
            appResource.IntBankName = $scope.matchedBankCodeManagementEdit.IntBankName;
            appResource.Province = $scope.matchedBankCodeManagementEdit.Province;
            appResource.BankNote = $scope.matchedBankCodeManagementEdit.BankNote;

            appResource.CreatedBy = $scope.matchedBankCodeManagementEdit.CreatedBy;
            appResource.CreatedDate = $scope.matchedBankCodeManagementEdit.CreatedDate;
            appResource.UpdatedBy = $scope.matchedBankCodeManagementEdit.UpdatedBy;
            appResource.UpdatedDate = $scope.matchedBankCodeManagementEdit.UpdatedDate;


            // http post edit
            appResource.$edit().then(function (data) {
                // if success
                if (data.success) {
                    $scope.selectedIndex = getDataTableSelectedIndex();

                    $('#data-table').dataTable().fnClearTable();
                    $scope.closeModalEditForm();
                    var sucMsg = 'You have successfully edit a Matched Bank Code item!';
                    $scope.alerts = [{
                        type: 'success',
                        msg: sucMsg
                    }];

                } else {
                    // assign the error  messgae
                    var errMsg = data.obj.StatusMsg;
                    $("#alertMessageEdit").text(errMsg);
                    // show the alert error message panel
                    $('#alertErrorMessageEditContainer').show();
                }
                $scope.buttonEditDisabled = false;
                $scope.isLoading = false;
            }, function errorCallback(response) {
                //code for what happens when there's an error
                // assign the error  messgae
                var errMsg = "E0003D: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
                $("#alertMessageEdit").text(errMsg);
                //show the alert error message panel
                $('#alertErrorMessageEditContainer').show();
                $scope.buttonEditDisabled = false;
                $scope.isLoading = false;
            });
        } else {
            //alert("E0004: There are invalid entries. Please check again.")
        }
    };




    // -----------------------------------
    // ADD BUTTON EVENT
    // -----------------------------------

    $scope.toggleModalAddForm = function () {
        $('#alertErrorMessageContainer').hide();
        $scope.submitted = false;
        $scope.buttonAddDisabled = false;

        $scope.matchedBankCodeManagementNew = {};
        $("#matchedBankCodeManagementNewForm")[0].reset();
        $scope.matchedBankCodeManagementNewForm.$valid = false; // default to invalid

        $scope.matchedBankCodeManagementNewForm.ID.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.ID.$pristine = true;

        $scope.matchedBankCodeManagementNewForm.CusBankCode.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.CusBankCode.$pristine = true;
        $scope.matchedBankCodeManagementNewForm.CusBankCode.$dirty = false;

        $scope.matchedBankCodeManagementNewForm.CusBankName.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.CusBankName.$pristine = true;
        $scope.matchedBankCodeManagementNewForm.CusBankName.$dirty = false;

        $scope.matchedBankCodeManagementNewForm.BTMUBankCode.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.BTMUBankCode.$pristine = true;
        $scope.matchedBankCodeManagementNewForm.BTMUBankCode.$dirty = false;

        $scope.matchedBankCodeManagementNewForm.BTMUBankNameEN.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.BTMUBankNameEN.$pristine = true;
        $scope.matchedBankCodeManagementNewForm.BTMUBankNameEN.$dirty = false;

        $scope.matchedBankCodeManagementNewForm.BankNameVN.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.BankNameVN.$pristine = true;
        $scope.matchedBankCodeManagementNewForm.BankNameVN.$dirty = false;

        $scope.matchedBankCodeManagementNewForm.IntBankCode.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.IntBankCode.$pristine = true;
        $scope.matchedBankCodeManagementNewForm.IntBankCode.$dirty = false;

        $scope.matchedBankCodeManagementNewForm.IntBankName.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.IntBankName.$pristine = true;
        $scope.matchedBankCodeManagementNewForm.IntBankName.$dirty = false;

        $scope.matchedBankCodeManagementNewForm.Province.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.Province.$pristine = true;
        $scope.matchedBankCodeManagementNewForm.Province.$dirty = false;

        $scope.matchedBankCodeManagementNewForm.BankNote.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.BankNote.$pristine = true;
        $scope.matchedBankCodeManagementNewForm.BankNote.$dirty = false;

        $scope.matchedBankCodeManagementNewForm.CreatedBy.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.CreatedBy.$pristine = true;

        $scope.matchedBankCodeManagementNewForm.CreatedDate.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.CreatedDate.$pristine = true;

        $scope.matchedBankCodeManagementNewForm.UpdatedBy.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.UpdatedBy.$pristine = true;

        $scope.matchedBankCodeManagementNewForm.UpdatedDate.$invalid = false;
        $scope.matchedBankCodeManagementNewForm.UpdatedDate.$pristine = true;
        $('#modal-add').modal('toggle');
        
        // cursor focus on first field after about 1 seconds
        setTimeout(function () {
            $("#matchedBankCodeManagementNewForm .form-group").each(function (index, element) {
                $(element).removeClass('has-error');
            });
        }, 100);
    }

    // ------------------------------------------------
    // EDIT BUTTON EVENT
    // ------------------------------------------------
    
    $scope.openModalEditForm = function () {       

        $scope.buttonEditDisabled = false;
        $('#alertErrorMessageEditContainer').hide();
        var _ID = getDataTableSelectedID();

        if (_ID != null) {
            $scope.matchedBankCodeManagementEdit = {};
            $scope.matchedBankCodeManagementEditForm.$valid = true; // default to valid 

            
            $('#modal-edit').modal('show');

            // go to server to retrieve the latest data 
            $scope.objBankCode.ID = _ID;
            appResource.$get({ Id: $scope.objBankCode.ID }).then(function (data) {
                // if success
                if (data.success) {
                    // set the textbox values
                    $scope.matchedBankCodeManagementEdit.ID = data.obj.ID;
                    $scope.matchedBankCodeManagementEdit.CusBankCode = data.obj.CusBankCode;
                    $scope.matchedBankCodeManagementEdit.CusBankName = data.obj.CusBankName;
                    $scope.matchedBankCodeManagementEdit.BTMUBankCode = data.obj.BTMUBankCode;
                    $scope.matchedBankCodeManagementEdit.BTMUBankNameEN = data.obj.BTMUBankNameEN;
                    $scope.matchedBankCodeManagementEdit.BankNameVN = data.obj.BankNameVN;
                    $scope.matchedBankCodeManagementEdit.IntBankCode = data.obj.IntBankCode;
                    $scope.matchedBankCodeManagementEdit.IntBankName = data.obj.IntBankName;
                    $scope.matchedBankCodeManagementEdit.Province = data.obj.Province;
                    $scope.matchedBankCodeManagementEdit.BankNote = data.obj.BankNote;

                    $scope.matchedBankCodeManagementEdit.CreatedBy = data.obj.CreatedBy;
                    $scope.matchedBankCodeManagementEdit.CreatedDate = data.obj.CreatedDate;
                    $scope.matchedBankCodeManagementEdit.UpdatedBy = data.obj.UpdatedBy;
                    $scope.matchedBankCodeManagementEdit.UpdatedDate = data.obj.UpdatedDate;
                    // cursor focus on first field after about 1 seconds
                    //setTimeout(function () { document.getElementById("editForm" + firstFieldID).focus(); }, 1000);

                } else {
                    // assign the error  messgae
                    var errMsg = data.obj.StatusMsg;
                    /*
                            $scope.alerts = [{
                                type: 'danger',
                                msg: errMsg
                            }];*/
                    $("#alertMessageEdit").text(errMsg);
                    // show the alert error message panel
                    $('#alertErrorMessageEditContainer').show();
                }
            }, function errorCallback(response) {
                //code for what happens when there's an error
                // assign the error  messgae
                var errMsg = "GEN001: Error occured while calling the web service. Please try again.";
                // show the alert error message panel
                $('#alertErrorMessageEditContainer').show();
                /*
                        $scope.alerts = [{
                            type: 'danger',
                            msg: errMsg
                        }];*/

            });


        } else {
            alert("Please choose item that you want update!");
        }
    }

    function getDataTableSelectedID() {
        var table = $('#data-table').DataTable();
        var selectRow = table.row('.selected');
        var result = null;
        if (selectRow.length > 0) {
            //var selectedRowNo = selectRow[0][0];
            //var data = table.cell(selectedRowNo, 0).data(); // ID is at column 0
            //result = data;

            result = selectRow.data().ID;
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

    $scope.closeModalEditForm = function () {
        $scope.objBankCode = {};
        $('#modal-edit').modal('hide');
    }


    // -----------------------------------
    // DELETE BUTTON EVENT
    // -----------------------------------

    $scope.openModalDelete = function () {
        $scope.buttonDeleteDisabled = false;

        $scope.selectedIndex = getDataTableSelectedID();
        if ($scope.selectedIndex != null) {
            $('#modal-alert-delete').modal('show');
        } else {
            alert("Please choose item that you want delete!");
        }
    }

    $scope.closeModalDelete = function () {
        $scope.objBankCode = {};
        $('#modal-alert-delete').modal('toggle');
    }



    $scope.openModalImportFile = function () {
        $('#alertErrorMessageContainer').hide();
        $('#modal-import').modal('toggle');
    }

    $scope.closeModalImportFile = function () {
        $('#modal-import').modal('hide');
    }
});