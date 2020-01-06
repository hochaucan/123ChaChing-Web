
/* -------------------------------
   CONTROLLER: importFileController
   Author: Unified Tool
------------------------------- */
app.controller('stateTreasuryController', function ($scope, $rootScope, $state, $compile, DTOptionsBuilder, DTColumnBuilder,
                                                                stateTreasuryResource, $filter, commonfunctions) {
    $scope.widgetShow = true;
    $scope.searchCodeHistory = "";
    $scope.searchNameHistory = "";
    $scope.searchInvalidHistory = false;
    $scope.files = [];
    $scope.cleanStateTreasury = false;
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
    $scope.submitted = false;
    $scope.pristine = true;
    var appResource = new stateTreasuryResource();

    // this function used to get all leads
    var get = function (sSource, aoData, fnCallback, oSettings) {

        $scope.pagingOptions.start = aoData[3].value;
        $scope.pagingOptions.length = aoData[4].value;
        $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
        $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
        index = $scope.pagingOptions.start + 1;

        //POST parameter search condition
        appResource.SearchCode = $scope.searchCode;
        appResource.SearchName = $scope.searchName;
        appResource.SearchInvalid = $scope.searchInvalid;
        //Save search condition for server pagination
        $scope.searchCodeHistory = $scope.searchCode;
        $scope.searchNameHistory = $scope.searchName;
        $scope.searchInvalidHistory = $scope.searchInvalid;

        //POST Parameters pagination result search
        appResource.start = $scope.pagingOptions.start;
        appResource.length = $scope.pagingOptions.length;
        appResource.orderColumn = $scope.pagingOptions.orderColumn;
        appResource.orderDir = $scope.pagingOptions.orderDir;

        appResource.$searchstatetreasury().then(function (data) {
            var records = {
                'draw': 0,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': []
            };
            if (data) {
                records = {
                    'draw': aoData[0].value,
                    'recordsTotal': data.obj.TotalStateTreasury,
                    'recordsFiltered': data.obj.TotalStateTreasury,
                    'data': data.obj.lstStateTreasuryDto
                };
            }
            $scope.pageData.total = data.obj.TotalStateTreasury;
            fnCallback(records);
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

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $compile(nRow)($scope);
    }

    $scope.dtColumns = [
         DTColumnBuilder.newColumn('Code', 'Code').withClass('hide'),
         DTColumnBuilder.newColumn('Code', 'Code').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('Name', 'Name').withOption('defaultContent', ""),
    ];

    $scope.dtNewOptions = DTOptionsBuilder.newOptions()
            .withFnServerData(get) // method name server call
            .withDataProp('data')// parameter name of list use in getLeads Fuction
            .withOption('processing', true) // required
            .withOption('serverSide', true)// required
            .withOption('paging', true)// required
            .withPaginationType('full_numbers')
            .withOption('searching', false)
            .withOption('responsive', true)
            .withOption('rowCallback', rowCallback)
            .withOption('select', true)
            .withOption('select.style', 'single')
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



    $scope.searchstatetreasury = function () {
        $('#data-table').dataTable().fnClearTable();
    }

    //$scope.searchstatetreasury();

    $scope.clearForm = function () {
        $scope.searchCode = "";
        $scope.searchName = "";
        $scope.searchInvalid = false;
    }

    $scope.toggleModalAddForm = function () {
        $('#alertErrorMessageContainer').hide();
        $scope.submitted = false;
        $scope.buttonAddDisabled = false;
        $scope.stateTreasuryNew = {};
        $scope.stateTreasuryNewForm.$valid = false;

        $scope.stateTreasuryNewForm.ID.$invalid = false;
        $scope.stateTreasuryNewForm.ID.$pristine = true;
        $scope.stateTreasuryNewForm.Code.$invalid = false;
        $scope.stateTreasuryNewForm.Code.$pristine = true;
        $scope.stateTreasuryNewForm.Code.$dirty = false;

        $scope.stateTreasuryNewForm.Name.$invalid = false;
        $scope.stateTreasuryNewForm.Name.$pristine = true;
        $scope.stateTreasuryNewForm.Name.$dirty = false;

        $('#modal-add').modal('toggle');

    }

    $scope.openModalEditForm = function () {
        $scope.submitted = true;
        $scope.buttonEditDisabled = false;
        $('#alertErrorMessageEditContainer').hide();
        var stateTreasuryID = getDataTableSelectedID();
        if (stateTreasuryID != null) {
            $scope.stateTreasuryEdit = {};
            $('#modal-edit').modal('show');
            appResource.$get({ Id: stateTreasuryID }).then(function (data) {
                if (data.success) {
                    $scope.stateTreasuryEdit.ID = data.obj.ID;
                    $scope.stateTreasuryEdit.Code = data.obj.Code;
                    $scope.stateTreasuryEdit.Name = data.obj.Name;
                } else {
                    var errMsg = data.obj.StatusMsg;
                    $("#alertMessageEdit").text(errMsg);
                    $('#alertErrorMessageEditContainer').show();
                }
            }, function errorCallback(response) {
                var errMsg = "GEN001: Error occured while calling the web service. Please try again.";
                $('#alertErrorMessageEditContainer').show();
            });
        } else {
            alert("Please Select a row to edit");
        }
    }

    $scope.closeModalEditForm = function () {
        $scope.stateTreasuryEdit = {};
        $('#modal-edit').modal('hide');
    }

    $scope.openModalImportFile = function () {
        $('#alertErrorMessageContainer').hide();
        $('#modal-import').modal('toggle');
    }

    $scope.closeModalImportFile = function () {
        $('#modal-import').modal('hide');
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

    $scope.openModalDelete = function () {
        $scope.buttonDeleteDisabled = false;

        $scope.selectedParamIndex = getDataTableSelectedID();
        if ($scope.selectedParamIndex != null) {
            $('#modal-alert-delete').modal('show');
        } else {
            alert("Please Select a row to delete");
        }
    }

    $scope.closeModalDeleteForm = function () {
        $scope.stateTreasuryEdit = {};
        $('#modal-alert-delete').modal('toggle');
    }

    $scope.closeModalAddForm = function () {
        $scope.stateTreasuryNew = {};
        $('#modal-add').modal('hide');
    }

    // function to submit the add form after all validation has occurred            
    $scope.submitNewForm = function () {
        $scope.submitted = true;
        // check to make sure the form is completely valid
        if ($scope.stateTreasuryNewForm.$valid) {
            // disabled button to prevent double click
            $scope.isLoading = true;
            $scope.buttonAddDisabled = true;

            // assign input form data to appResource
            appResource.Code = $scope.stateTreasuryNew.Code;
            appResource.Name = $scope.stateTreasuryNew.Name;
            // http post add
            appResource.$add().then(function (data) {
                // if success
                if (data.success) {
                    $scope.closeModalAddForm();
                    $scope.clearForm();
                    $scope.searchstatetreasury();
                    sucMsg = 'You have successfully create an State Treasury item.';
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
                var errMsg = "E0003CC: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
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

    // function to submit the edit form after all validation has occurred            
    $scope.submitEditForm = function () {
        // check to make sure the form is completely valid
        if ($scope.stateTreasuryEditForm.$valid) {
            $scope.isLoading = true;
            $scope.buttonEditDisabled = true;

            // assign input form data to appResource
            appResource.ID = $scope.stateTreasuryEdit.ID;
            appResource.Code = $scope.stateTreasuryEdit.Code;
            appResource.Name = $scope.stateTreasuryEdit.Name;
            // http post edit
            appResource.$edit().then(function (data) {
                // if success
                if (data.success) {
                    $scope.closeModalEditForm();
                    $scope.clearForm();
                    $scope.searchstatetreasury();
                    var sucMsg = 'You have successfully edit an State Treasury.';
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
                var errMsg = "E0003DD: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
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

    // function to delete after row selected   
    $scope.submitDeleteForm = function () {
        $scope.isLoading = true;
        $scope.buttonDeleteDisabled = true;

        var stateTreasuryID = getDataTableSelectedID();

        // http delete
        appResource.$delete({ Id: stateTreasuryID }).then(function (data) {
            // if success
            if (data.success) {
                $scope.closeModalDeleteForm();
                $scope.clearForm();
                $scope.searchstatetreasury();
                var sucMsg = 'You have successfully delete an State Treasury.';
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

            }
            $scope.buttonDeleteDisabled = false;
            $scope.isLoading = false;

        }, function errorCallback(response) {
            //code for what happens when there's an error
            // assign the error  messgae
            var errMsg = "E0003BB: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;

            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];

            $scope.buttonDeleteDisabled = false;
            $scope.isLoading = false;

        });
    }

    //Import state treasury by selected file
    $scope.submitImportFile = function () {
        appResource.$initialIP().then(function () {
            if (confirm("Do you want to clean data before import state treasury?")) {
                $scope.cleanStateTreasury = true;
            }
            else {
                $scope.cleanStateTreasury = false;
            }
            $scope.isLoading = true;
            appResource.SelectedFile = $scope.files;
            appResource.CleanStateTreasury = $scope.cleanStateTreasury;
            appResource.$import({ Id: $scope.cleanStateTreasury }).then(function (data) {
                if (data.success) {
                    $scope.closeModalImportFile();
                    $scope.clearForm();
                    $scope.searchstatetreasury();
                    if (data.success.ErrorMessage == null || data.success.ErrorMessage == "") {
                        sucMsg = 'Import state treasury successfully.';
                        $scope.alerts = [{
                            type: 'success',
                            msg: sucMsg
                        }];
                    }
                    else {
                        $scope.alerts = [{
                            type: 'danger',
                            msg: data.success.ErrorMessage
                        }];
                    }
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

    //Export list state treasury
    $scope.exportStateTreasury = function () {
        $scope.isLoading = true;
        //POST parameter search condition
        appResource.SearchCode = $scope.searchCodeHistory;
        appResource.SearchName = $scope.searchNameHistory;
        appResource.SearchInvalid = $scope.searchInvalidHistory;
        appResource.$export().then(function (data) {
            if (data.success) {
                if (data.obj.TotalRecords > 0) {
                    var file = commonfunctions.base64ToBlob(data.obj.FileReportData);
                    window.navigator.msSaveOrOpenBlob(file, data.obj.FileReportName);
                    sucMsg = 'Export state treasury successfully.';
                    $scope.alerts = [{
                        type: 'success',
                        msg: sucMsg
                    }];
                }
                else
                {
                    errMsg = 'Does not exist state treasury in search result.';
                    $scope.alerts = [{
                        type: 'danger',
                        msg: errMsg
                    }];
                }
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
    }
});