app.controller('bankCodeManagementController', function ($scope, $rootScope, $state, DTOptionsBuilder,
    bankCodeManagementResource, commonfunctions, $compile, DTColumnBuilder) {
    
    $scope.widgetShow = true;
    $scope.sectionShow = true;
    $scope.isLoading = true;

    $scope.lstBankCode = [];
    $scope.objBankCode = {};
    $scope.selectedIndex = null;
    $scope.submitted = false;
    $scope.pristine = true;
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

    $scope.StateTreasuryCodeHistory = "";
    $scope.BankCodeHistory = "";
    $scope.IntermedBankCodeHistory = "";

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

        // POST Parameters search condition
        appResource.SearchStateTreasuryCode = $scope.StateTreasuryCodeHistory;
        appResource.SearchBankCode = $scope.BankCodeHistory;
        appResource.SearchIntermedBankCode = $scope.IntermedBankCodeHistory;

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
                    'recordsTotal': data.obj.TotalRows,       // (filtered from ... total entries)
                    'recordsFiltered': data.obj.TotalRows,    // Showing 1 to 50 of ... entries
                    'data': data.obj.lstDto

                };
            }
            $scope.pageData.total = data.obj.TotalRows;
            fnCallback(records);
        });
    }

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('ID', 'ID').withOption('defaultContent', "").withClass('hide'),
        DTColumnBuilder.newColumn('StateTreasuryCode', 'State Treasury Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('BankCode1', 'Bank Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('IntermedBankCode', 'Intermed Bank Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('BankNoteValue', 'Bank Note Value').withOption('defaultContent', ""),       
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

    var appResource = new bankCodeManagementResource();
    
    $scope.bankCodeManagementSearch = {};
    

    $scope.search = function () {   // When user click to search button

        $scope.isLoading = true;

        // POST Parameters
        appResource.SearchStateTreasuryCode = $scope.bankCodeManagementSearch.StateTreasuryCode;
        appResource.SearchBankCode = $scope.bankCodeManagementSearch.BankCode1;
        appResource.SearchIntermedBankCode = $scope.bankCodeManagementSearch.IntermedBankCode;

        //Save search condition for server pagination
        $scope.StateTreasuryCodeHistory = $scope.bankCodeManagementSearch.StateTreasuryCode;
        $scope.BankCodeHistory = $scope.bankCodeManagementSearch.BankCode1;
        $scope.IntermedBankCodeHistory = $scope.bankCodeManagementSearch.IntermedBankCode;

        
        // http post search ... return value
        appResource.$Search().then(function (data) {
            // if success
            if (data.success) {

                $('#data-table').dataTable().fnClearTable();
                $scope.isLoading = false;
            } else {

                // Assign the error  message
                var errMsg = data.obj.StatusMsg;
                $scope.alerts = [{
                    type: 'danger',
                    msg: errMsg
                }];
                $scope.isLoading = false;
            }
        }, function errorCallback(response) {
            // Code for what happens when there's an error
            // assign the error  messgae
            var errMsg = "E0003A: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;

        });
    }

    $scope.isLoading = false;
   
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
                var sucMsg = 'You have successfully delete a Bank Code item!';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];
                $scope.selectedIndex = null;
            } else {
                // assign the error  messgae
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
        $scope.bankCodeManagementSearch.StateTreasuryCode = "";
        $scope.bankCodeManagementSearch.BankCode1 = "";
        $scope.bankCodeManagementSearch.IntermedBankCode = "";
    }

    // -----------------------------------------------------------
    // ------------------------ ADD FORM ------------------------
    // -----------------------------------------------------------

    // function to submit the add form after all validation has occurred            
    $scope.submitNewForm = function () {
        $scope.submitted = true;
        // check to make sure the form is completely valid
        if ($scope.bankCodeManagementNewForm.$valid) { 
            // disabled button to prevent double click
            $scope.isLoading = true;
            $scope.buttonAddDisabled = true;

            // assign input form data to appResource
            appResource.ID = $scope.bankCodeManagementNew.ID;
            appResource.StateTreasuryCode = $scope.bankCodeManagementNew.StateTreasuryCode;
            appResource.BankCode1 = $scope.bankCodeManagementNew.BankCode1;
            appResource.IntermedBankCode = $scope.bankCodeManagementNew.IntermedBankCode;
            appResource.BankNoteValue = $scope.bankCodeManagementNew.BankNoteValue;   // from HTML

            appResource.CreatedBy = $scope.bankCodeManagementNew.CreatedBy;
            appResource.CreatedDate = $scope.bankCodeManagementNew.CreatedDate;
            appResource.UpdatedBy = $scope.bankCodeManagementNew.UpdatedBy;
            appResource.UpdatedDate = $scope.bankCodeManagementNew.UpdatedDate;

            // http post add
            appResource.$add().then(function (data) {
                // if success
                if (data.success) {
                    $('#data-table').dataTable().fnClearTable();      /* add to lstBankCode */
                    $scope.toggleModalAddForm();
                    sucMsg = 'You have successfully create a Bank Code item!';
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
        if ($scope.bankCodeManagementEditFrom.$valid) {
            $scope.isLoading = true;
            $scope.buttonEditDisabled = true;

            // assign input form data to appResource
            appResource.ID = $scope.bankCodeManagementEdit.ID;
            appResource.StateTreasuryCode = $scope.bankCodeManagementEdit.StateTreasuryCode;
            appResource.BankCode1 = $scope.bankCodeManagementEdit.BankCode1;
            appResource.IntermedBankCode = $scope.bankCodeManagementEdit.IntermedBankCode;
            appResource.BankNoteValue = $scope.bankCodeManagementEdit.BankNoteValue;
            
            appResource.CreatedBy = $scope.bankCodeManagementEdit.CreatedBy;
            appResource.CreatedDate = $scope.bankCodeManagementEdit.CreatedDate;
            appResource.UpdatedBy = $scope.bankCodeManagementEdit.UpdatedBy;
            appResource.UpdatedDate = $scope.bankCodeManagementEdit.UpdatedDate;


            // http post edit
            appResource.$edit().then(function (data) {
                // if success
                if (data.success) {
                    $scope.selectedIndex = getDataTableSelectedIndex();

                    $('#data-table').dataTable().fnClearTable();
                    $scope.closeModalEditForm();
                    var sucMsg = 'You have successfully edit a Bank Code item!';
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
        $scope.bankCodeManagementNew = {};
        $scope.bankCodeManagementNewForm.$valid = false; // default to invalid

        $scope.bankCodeManagementNewForm.ID.$invalid = false;
        $scope.bankCodeManagementNewForm.ID.$pristine = true;

        $scope.bankCodeManagementNewForm.StateTreasuryCode.$invalid = false;
        $scope.bankCodeManagementNewForm.StateTreasuryCode.$pristine = true;
        $scope.bankCodeManagementNewForm.StateTreasuryCode.$dirty = false;

        $scope.bankCodeManagementNewForm.BankCode1.$invalid = false;
        $scope.bankCodeManagementNewForm.BankCode1.$pristine = true;
        $scope.bankCodeManagementNewForm.BankCode1.$dirty = false;

        $scope.bankCodeManagementNewForm.IntermedBankCode.$invalid = false;
        $scope.bankCodeManagementNewForm.IntermedBankCode.$pristine = true;
        $scope.bankCodeManagementNewForm.IntermedBankCode.$dirty = false;

        $scope.bankCodeManagementNewForm.BankNoteValue.$invalid = false;
        $scope.bankCodeManagementNewForm.BankNoteValue.$pristine = true;
        $scope.bankCodeManagementNewForm.BankNoteValue.$dirty = false;

        $scope.bankCodeManagementNewForm.CreatedBy.$invalid = false;
        $scope.bankCodeManagementNewForm.CreatedBy.$pristine = true;

        $scope.bankCodeManagementNewForm.CreatedDate.$invalid = false;
        $scope.bankCodeManagementNewForm.CreatedDate.$pristine = true;

        $scope.bankCodeManagementNewForm.UpdatedBy.$invalid = false;
        $scope.bankCodeManagementNewForm.UpdatedBy.$pristine = true;

        $scope.bankCodeManagementNewForm.UpdatedDate.$invalid = false;
        $scope.bankCodeManagementNewForm.UpdatedDate.$pristine = true;
        $('#modal-add').modal('toggle');
        // cursor focus on first field after about 1 seconds
        //setTimeout(function () { document.getElementById("newForm" + firstFieldID).focus(); }, 1000);
    }

    // ------------------------------------------------
    // EDIT BUTTON EVENT
    // ------------------------------------------------
    
    $scope.openModalEditForm = function () {       

        $scope.buttonEditDisabled = false;
        $('#alertErrorMessageEditContainer').hide();
        var _ID = getDataTableSelectedID();

        if (_ID != null) {
            $scope.bankCodeManagementEdit = {};
            $scope.bankCodeManagementEditFrom.$valid = true; // default to valid 

            
            $('#modal-edit').modal('show');

            // go to server to retrieve the latest data 
            $scope.objBankCode.ID = _ID;
            appResource.$get({ Id: $scope.objBankCode.ID }).then(function (data) {
                // if success
                if (data.success) {
                    // set the textbox values
                    $scope.bankCodeManagementEdit.ID = data.obj.ID;
                    $scope.bankCodeManagementEdit.StateTreasuryCode = data.obj.StateTreasuryCode;
                    $scope.bankCodeManagementEdit.BankCode1 = data.obj.BankCode1;
                    $scope.bankCodeManagementEdit.IntermedBankCode = data.obj.IntermedBankCode;
                    $scope.bankCodeManagementEdit.BankNoteValue = data.obj.BankNoteValue;
                    $scope.bankCodeManagementEdit.CreatedBy = data.obj.CreatedBy;
                    $scope.bankCodeManagementEdit.CreatedDate = data.obj.CreatedDate;
                    $scope.bankCodeManagementEdit.UpdatedBy = data.obj.UpdatedBy;
                    $scope.bankCodeManagementEdit.UpdatedDate = data.obj.UpdatedDate;
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


    // -------------------------------------------------------
    // IMPORT FILE - When user click into Import File button
    // -------------------------------------------------------
    $scope.submitImportFile = function () {
        appResource.$initialIP().then(function () {
            if (confirm("Do you want to clean data before import Bank Code Management?")) {
                $scope.Clean = true;  // yes
            }
            else {
                $scope.Clean = false;
            }

            $scope.isLoading = true;
            appResource.SelectedFile = $scope.files;
            appResource.Clean = $scope.Clean;

            appResource.$import({ Id: $scope.Clean }).then(function (data) {
                if (data.success) {
                    $scope.closeModalImportFile();
                    $scope.clearForm();
                    // $scope.search();
                    $('#data-table').dataTable().fnClearTable();    // recall paging function: var get = function (sSource, aoData, fnCallback, oSettings) {

                    sucMsg = 'Import Bank Code Management Successfully.';
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
                $scope.isLoading = false;

            }, function errorCallback(response) {
                //code for what happens when there's an error
                // assign the error  messgae
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
        }, function errorCallback(response) {
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

    // ---------------------------------------------------
    // Export BankCodeManagement file
    // ---------------------------------------------------
    $scope.exportFile = function () {
        $scope.isLoading = true;

        appResource.SearchStateTreasuryCode = $scope.StateTreasuryCodeHistory;
        appResource.SearchBankCode = $scope.BankCodeHistory;
        appResource.SearchIntermedBankCode = $scope.IntermedBankCodeHistory;


        appResource.$export().then(function (data) {
            if (data.success) {
                var file = commonfunctions.base64ToBlob(data.obj.FileReportData);
                window.navigator.msSaveOrOpenBlob(file, data.obj.FileReportName);
                sucMsg = 'Export Bank Code Management successfully.';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];
            } else {
                // assign the error  message
                var errMsg = data.obj.StatusMsg;
                $("#alertMessage").text(errMsg);

                // show the alert error message panel
                $('#alertErrorMessageContainer').show();
            }
            $scope.isLoading = false;

        }, function errorCallback(response) {
            //code for what happens when there's an error
            // assign the error  messgae
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