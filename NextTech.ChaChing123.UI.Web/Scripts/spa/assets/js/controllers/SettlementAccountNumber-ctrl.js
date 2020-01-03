
/* -------------------------------
   CONTROLLER: settlementAccountNumberController
   Author: Application Framework Generateor
------------------------------- */
app.controller('settlementAccountNumberController', function ($scope, $rootScope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, settlementAccountNumberResource) {

    $scope.widgetShow = true;
    $scope.sectionShow = true;
    $scope.isLoading = true;
    $scope.isApprover = false;
    $scope.isAdmin = false;
    $scope.isOfficer = false;
    $scope.settlementAccountList = [];
    $scope.settlementAccountNumber = {};
    $scope.selectedSettlementAccountIndex = null;
    //initialize server pagging
    $scope.pagingOptions = { start: 0, length: 10, orderColumn: 2, orderDir: 'asc', draw: 1 };
    $scope.totalItems = 0;
    $scope.numPages = 0;
    $scope.submitted = false;
    $scope.pristine = true;
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

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $compile(nRow)($scope);
    }

    var appResource = new settlementAccountNumberResource();
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

        appResource.$get({
            Start: $scope.pagingOptions.start, Length: $scope.pagingOptions.length,
            OrderColumn: $scope.pagingOptions.orderColumn, OrderDir: $scope.pagingOptions.orderDir,
        }).then(function (data) {
            //
            var records = {
                'draw': 0,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': []
            };
            // if success
            if (data.success) {
                records = {
                    'draw': aoData[0].value,
                    'recordsTotal': data.obj.totalItems,
                    'recordsFiltered': data.obj.totalItems,
                    'data': data.obj.data
                };
                
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
            fnCallback(records);
        });
    }
    // init the datatable
    $('#alertErrorMessageSearchContainer').hide();
    $scope.isLoading = false;
    $scope.dtNewOptions = DTOptionsBuilder.newOptions()
            .withFnServerData(get) // method name server call
            .withDataProp('data')// parameter name of list use in getLeads Fuction
            .withOption('processing', true) // required
            .withOption('serverSide', true)// required
            .withOption('paging', true)// required
            .withPaginationType('full_numbers')
            .withOption('select', true)
            .withOption('select', 'single')
            .withOption('searching', false)
            .withOption('responsive', true)
            .withOption('rowCallback', rowCallback)
            .withDisplayLength(10)
            .withOption('drawCallback', function drawCallback(e) {
                $("#data-table > tbody").on('click', 'tr', function (e) {
                    var footerRow = $('#data-table_info span[class^="select-info"]');
                    footerRow.html('    ' + footerRow.text());
                });
            });


    var index = 1;
    countIndex = function () {
        return index++;
    }
    
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('ID', 'ID').withClass('hide'),
        DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").notSortable(),
        DTColumnBuilder.newColumn('ValueAccount', 'Account Value').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('TransactionType', 'Transaction Type').withOption('defaultContent', "")
    ];
    // function to delete after row selected   
    $scope.submitDeleteForm = function () {
    	$scope.isLoading=true;
    	$scope.buttonDeleteDisabled = true;

    	$scope.selectedSettlementAccountIndex = getDataTableSelectedIndex();
    	var settlementAccountNumberID = getDataTableSelectedID();

        // http delete
    	appResource.$delete({ Id: settlementAccountNumberID }).then(function (data) {
            // if success
            if (data.success) {
                $('#data-table').dataTable().fnClearTable();
                $scope.closeModalDelete();
                var sucMsg = 'You have deleted a Settlement Account Number item successfully.';
            	$scope.alerts = [{
                	type: 'success',
                	msg: sucMsg
            	}];
            	$scope.selectedSettlementAccountIndex = null;
            } else {
            	// assign the error  messgae
            	var errMsg = data.obj.StatusMsg;
            	$scope.closeModalDelete();
            	$scope.alerts = [{
                	type: 'danger',
                	msg: errMsg
            	}];

            }
            $scope.buttonDeleteDisabled = false;
            $scope.isLoading=false;

        }, function errorCallback(response) {
        	//code for what happens when there's an error
        	// assign the error  messgae
        	var errMsg = "E0003BB: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;

        	$scope.alerts = [{
            	type: 'danger',
            	msg: errMsg
        	}];

        	$scope.buttonDeleteDisabled = false;
        	$scope.isLoading=false;

        });

    }
   
    // function to submit the add form after all validation has occurred            
    $scope.submitNewForm = function () {
        $scope.submitted = true;
        // check to make sure the form is completely valid
        if ($scope.settlementAccountNumberNewForm.$valid) {
            // disabled button to prevent double click
	        $scope.isLoading=true;
            $scope.buttonAddDisabled = true;

            // assign input form data to appResource
            appResource.ID = $scope.settlementAccountNumberNew.ID;
            appResource.ValueAccount = $scope.settlementAccountNumberNew.ValueAccount;
            appResource.TransactionType = $scope.settlementAccountNumberNew.TransactionType;
            appResource.CreatedBy = $scope.settlementAccountNumberNew.CreatedBy;
            appResource.CreatedDate = $scope.settlementAccountNumberNew.CreatedDate;
            appResource.UpdatedBy = $scope.settlementAccountNumberNew.UpdatedBy;
            appResource.UpdatedDate = $scope.settlementAccountNumberNew.UpdatedDate;
            // http post add
            appResource.$add().then(function (data) {
                // if success
                if (data.success) {
                    $('#data-table').dataTable().fnClearTable();
                    $scope.toggleModalAddForm();
                    sucMsg = 'You have created a Settlement Account Number item successfully.';
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
            	$scope.isLoading=false;

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
            	$scope.isLoading=false;

            });
        }else {
            
            $scope.pristine = false;
        }
    }

    // function to submit the edit form after all validation has occurred            
    $scope.submitEditForm = function () {
        $scope.submitted = true;
        // check to make sure the form is completely valid
        if ($scope.settlementAccountNumberEditForm.$valid) {
        	$scope.isLoading=true;
            $scope.buttonEditDisabled = true;

            // assign input form data to appResource
            appResource.ID = $scope.settlementAccountNumberEdit.ID;
            appResource.ValueAccount = $scope.settlementAccountNumberEdit.ValueAccount;
            appResource.TransactionType = $scope.settlementAccountNumberEdit.TransactionType;
            appResource.CreatedBy = $scope.settlementAccountNumberEdit.CreatedBy;
            appResource.CreatedDate = $scope.settlementAccountNumberEdit.CreatedDate;
            appResource.UpdatedBy = $scope.settlementAccountNumberEdit.UpdatedBy;
            appResource.UpdatedDate = $scope.settlementAccountNumberEdit.UpdatedDate;
            // http post edit
            appResource.$edit().then(function (data) {
                // if success
                if (data.success) {
                    $scope.selectedSettlementAccountIndex = getDataTableSelectedIndex();
                    $('#data-table').dataTable().fnClearTable();
                    $scope.closeModalEditForm();
                    $('#modal-add').modal('hide');
                    $scope.submitted = false;
                    var sucMsg = 'You have edited a Settlement Account Number item successfully.';
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
            	$scope.isLoading=false;
            }, function errorCallback(response) {
            	//code for what happens when there's an error
            	// assign the error  messgae
            	var errMsg = "E0003DD: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
            	$("#alertMessageEdit").text(errMsg);
            	//show the alert error message panel
            	$('#alertErrorMessageEditContainer').show();
            	$scope.buttonEditDisabled = false;
            	$scope.isLoading=false;
            });
        }else {
            //alert("E0004: There are invalid entries. Please check again.")
        }
    };


    $scope.toggleModalAddForm = function () {
        $('#alertErrorMessageContainer').hide();
        $scope.pristine = true;
        $scope.submitted = false;
        $scope.buttonAddDisabled = false;
        $("#settlementAccountNumberNewForm input").each(function (index, element) {
            $(element).val("");
        });
        $scope.settlementAccountNumberNew = {};
        $("#settlementAccountNumberNewForm")[0].reset();
        $scope.settlementAccountNumberNewForm.$valid = false; // default to invalid
       
        $scope.settlementAccountNumberNewForm.ID.$invalid = false;
        $scope.settlementAccountNumberNewForm.ID.$pristine = true;
        $scope.settlementAccountNumberNewForm.ValueAccount.$invalid = false;
        $scope.settlementAccountNumberNewForm.ValueAccount.$dirty = false;
        $scope.settlementAccountNumberNewForm.ValueAccount.$pristine = true;
        
        $scope.settlementAccountNumberNewForm.TransactionType.$invalid = false; 
        $scope.settlementAccountNumberNewForm.TransactionType.$pristine = true;
        $scope.settlementAccountNumberNewForm.TransactionType.$dirty = false;

        $scope.settlementAccountNumberNewForm.CreatedBy.$invalid = false; 
        $scope.settlementAccountNumberNewForm.CreatedBy.$pristine = true;
        $scope.settlementAccountNumberNewForm.CreatedDate.$invalid = false; 
        $scope.settlementAccountNumberNewForm.CreatedDate.$pristine = true;
        $scope.settlementAccountNumberNewForm.UpdatedBy.$invalid = false; 
        $scope.settlementAccountNumberNewForm.UpdatedBy.$pristine = true;
        $scope.settlementAccountNumberNewForm.UpdatedDate.$invalid = false; 
        $scope.settlementAccountNumberNewForm.UpdatedDate.$pristine = true;
        $('#modal-add').modal('toggle');
        // cursor focus on first field after about 1 seconds
        setTimeout(function () {
            $("#settlementAccountNumberNewForm .form-group").each(function (index, element) {
                $(element).removeClass('has-error');
            });
        }, 100);
    }

    $scope.openModalEditForm = function () {
        $scope.buttonEditDisabled = false;
        $('#alertErrorMessageEditContainer').hide();
        var settlementAccountNumberID = getDataTableSelectedID();

        if (settlementAccountNumberID != null) {
            $scope.settlementAccountNumberEdit = {};
            $scope.settlementAccountNumberEditForm.$valid = true; // default to valid
            $('#modal-edit').modal('show');

            // go to server to retrieve the latest data 
            $scope.settlementAccountNumber.ID = settlementAccountNumberID;
            appResource.$get({ Id: $scope.settlementAccountNumber.ID }).then(function (data) {
                // if success
                if (data.success) {
                    // set the textbox values
                    $scope.settlementAccountNumberEdit.ID = data.obj.ID;
                    $scope.settlementAccountNumberEdit.ValueAccount = data.obj.ValueAccount;
                    $scope.settlementAccountNumberEdit.TransactionType = data.obj.TransactionType;
                    $scope.settlementAccountNumberEdit.CreatedBy = data.obj.CreatedBy;
                    $scope.settlementAccountNumberEdit.CreatedDate = data.obj.CreatedDate;
                    $scope.settlementAccountNumberEdit.UpdatedBy = data.obj.UpdatedBy;
                    $scope.settlementAccountNumberEdit.UpdatedDate = data.obj.UpdatedDate;
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
                	var errMsg=  "GEN001: Error occured while calling the web service. Please try again.";
                	// show the alert error message panel
                	$('#alertErrorMessageEditContainer').show();

            });


        } else {
            alert("Please choose an item that you want to update!");
        }
    }

    function getDataTableSelectedID()
    {
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
        $scope.settlementAccountNumber = {};
        $('#modal-edit').modal('hide');
    }

    $scope.closeModalAddForm = function () {
        $scope.settlementAccountNumber = {};
        $('#modal-add').modal('hide');
    }

    $scope.openModalDelete = function () {
        $scope.buttonDeleteDisabled = false;

        $scope.selectedSettlementAccountIndex = getDataTableSelectedID();
        if ($scope.selectedSettlementAccountIndex != null) {
            $('#modal-alert-delete').modal('show');
        } else {
            alert("Please choose an item that you want to delete!");
        }
    }

    $scope.closeModalDelete = function () {
        $scope.settlementAccountNumber = {};
        $('#modal-alert-delete').modal('toggle');
    }
});