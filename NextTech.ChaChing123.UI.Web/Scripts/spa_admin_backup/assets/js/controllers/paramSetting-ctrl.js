
/* -------------------------------
   CONTROLLER: parametersettingController
   Author: Application Framework Generateor
------------------------------- */
app.controller('paramSettingController', function ($scope, $rootScope, $state, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $filter, commonfunctions, $compile, paramSettingResource, config) {

    $scope.widgetShow = true;
    $scope.sectionShow = true;
    $scope.isLoading = true;

    $scope.groups = [];
    $scope.groupedits = [];
    $scope.groupnews = [];
    $scope.parameters = [];
    $scope.groupselected = [];
    $scope.parameter = {};

    $scope.selectedParamIndex = null;
    $scope.submitted = false;
    // data tables option configuration
    $scope.dtOptions = DTOptionsBuilder.newOptions()
                        //.withOption('select', true)
                        //.withOption('select.style', 'single')
                        .withOption('select', 'single')
                        .withOption('searching', false)
                        .withOption('paging', true)
                        .withOption('responsive', true);


    var appResource = new paramSettingResource();

    // Watch section

    $scope.$watch(function () {
        return $rootScope.setting.userProfile.user.ID;
    }, function () {

        if ($rootScope.setting.userProfile.user.ID != null && $rootScope.setting.userProfile.user.ID != "" && $rootScope.setting.userProfile.user.ID != undefined) {

            // set authorization for application
            // Enable/Disable/Hide/Show resources here
            try {

                var hasAccess = false;
                hasAccess = $rootScope.isAuthorizedRole("Officer"); // TODO: Change to your correct role or resource
                if (hasAccess) {

                }
                hasAccess = false;
                hasAccess = $rootScope.isAuthorizedRole("Approver");  // TODO: Change to your correct role or resource
                if (hasAccess) {

                }

            } catch (ex) {

            }
            // end authorization

        }
    });

    // END Watch section


    appResource.$getGroup().then(function (data) {
        $scope.isLoading = true;
        if (data.success) {

            $scope.groups = [];

            if (data.obj.length > 0) {
                for (i = 0; i < data.obj.length; i++) {
                    var item = data.obj[i];
                    $scope.groups.push(item);

                }
                if ($scope.groups.length > 0) {
                    $scope.groupselected = $scope.groups[0];
                    $scope.changegroup();
                }

                $scope.isLoading = false;

            }
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

        var errMsg = "Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
        $scope.alerts = [{
            type: 'danger',
            msg: errMsg
        }];
        $scope.isLoading = false;

    });

    $scope.changegroup = function () {

        appResource.$getParamSettingByGroup({ Id: $scope.groupselected.ID }).then(function (data) {

            if (data.success) {

                //$scope.parameters = [];

                //if (data.obj.length > 0) {
                //    for (i = 0; i < data.obj.length; i++) {
                //        var item = data.obj[i];
                //        item["No"] = i + 1;
                //        item["Name"] = $scope.groupselected.Name;
                //        $scope.parameters.push(item);
                //    }

                //    $scope.isLoading = false;

                //}

                $scope.searchParameterSettings();
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

            var errMsg = "Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;

        });
    };


    $scope.newKeyPress = function (keyEvent) {
        if (keyEvent.which == 13) {
            $scope.submitNewForm(); // invoke submitAddForm function
        }
    }

    $scope.editKeyPress = function (keyEvent) {
        if (keyEvent.which == 13) {
            $scope.submitEditForm(); // invoke submitEditForm function
        }
    }
    // function to delete after row selected   
    $scope.submitDeleteForm = function () {
        $scope.isLoading = true;
        $scope.buttonDeleteDisabled = true;

        $scope.selectedParamIndex = getDataTableSelectedIndex();
        //  var paramID = getDataTableSelectedID();
        appResource.ID = getDataTableSelectedID();
        // http delete
        appResource.$delete().then(function (data) {
            // if success
            if (data.success) {
                $scope.parameters.splice($scope.selectedParamIndex, 1);
                $scope.closeModalDelete();
                var sucMsg = 'You have deleted a parameter setting item successfully.';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];
                $scope.selectedParamIndex = null;
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
            var errMsg = "Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;

            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];

            $scope.buttonDeleteDisabled = false;
            $scope.isLoading = false;


        });

    }

    // function to submit the add form after all validation has occurred            
    $scope.submitNewForm = function () {

        // check to make sure the form is completely valid
        if ($scope.paramNewForm.$valid) {
            // disabled button to prevent double click
            $scope.isLoading = true;
            $scope.buttonAddDisabled = true;

            appResource.GroupID = $scope.groupnewselected.ID;
            appResource.FieldName = $scope.paramNew.FieldName;
            appResource.Code = $scope.paramNew.Code
            appResource.DataType = "N";
            appResource.DataLength = "13";
            appResource.IsActive = "True";
            appResource.Value = $scope.paramNew.Value;


            // http post add
            appResource.$add().then(function (data) {

                if (data.success) {

                    var additem = data.obj;
                    additem["No"] = $scope.parameters.length + 1;
                    additem["Name"] = $scope.groupselected.Name;
                    $scope.parameters.push(additem);
                    $scope.closeModalNewForm();
                    sucMsg = 'You have created a parameter setting item successfully.';
                    $scope.alerts = [{
                        type: 'success',
                        msg: sucMsg
                    }];
                } else {
                    // assign the error  messgae
                    var errMsg = data.obj.StatusMsg;
                    /*
                            $scope.alerts = [{
                                type: 'danger',
                                msg: errMsg
                            }];*/

                    $("#alertMessage").text(errMsg);
                    // show the alert error message panel
                    $('#alertErrorMessageContainer').show();
                }
                $scope.buttonAddDisabled = false;
                $scope.isLoading = false;

            }, function errorCallback(response) {
                //code for what happens when there's an error
                // assign the error  messgae
                var errMsg = "Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
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
            alert(" There are invalid entries. Please check again.")
        }
    }
    // function to submit the edit form after all validation has occurred            
    $scope.submitEditForm = function () {
        $scope.submitted = true;
        // check to make sure the form is completely valid
        if ($scope.paramEditForm.$valid) {
            $scope.isLoading = true;
            $scope.buttonEditDisabled = true;

            // assign input form data to appResource
            appResource.ID = $scope.paramEdit.ID;
            appResource.GroupID = $scope.groupeditselected.ID;
            appResource.FieldName = $scope.paramEdit.FieldName;
            appResource.Code = $scope.paramEdit.Code
            appResource.Value = $scope.paramEdit.Value
            appResource.CreatedBy = $scope.paramEdit.CreatedBy;
            appResource.CreatedDate = $scope.paramEdit.CreatedDate;
            appResource.UpdatedBy = $scope.paramEdit.UpdatedBy;
            appResource.UpdatedDate = $scope.paramEdit.UpdatedDate;

            // http post edit
            appResource.$edit().then(function (data) {
                // if success
                if (data.success) {
                    $scope.submitted = false;
                    $scope.selectedParamIndex = getDataTableSelectedIndex();

                    var table = $('#data-table').DataTable();
                    var info = table.page.info();

                    // alert(info.page);

                    //var edititem = data.obj;
                    //edititem["No"] = $scope.parameters[$scope.selectedParamIndex]["No"];
                    //edititem["Name"] = $scope.groupeditselected.Name;
                    //$scope.parameters[$scope.selectedParamIndex] = edititem;

                    $scope.closeModalEditForm();
                    //    table.page(info.page).draw(false);

                    var sucMsg = 'You have edited a parameter setting item successfully.';

                    $scope.alerts = [{
                        type: 'success',
                        msg: sucMsg
                    }];

                    $('#data-table').dataTable().fnDraw(false);

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

                $scope.buttonEditDisabled = false;
                $scope.isLoading = false;
            }, function errorCallback(response) {
                //code for what happens when there's an error
                // assign the error  messgae
                var errMsg = "Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
                /*
                        $scope.alerts = [{
                            type: 'danger',
                            msg: errMsg
                        }];*/
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

    var firstFieldID = "FieldName";

    $scope.toggleModalAddForm = function () {
        $('#alertErrorMessageContainer').hide();
        $scope.buttonAddDisabled = false;
        $scope.paramNew = {};
        $scope.paramNewForm.$valid = false; // default to invalid

        $scope.groupnews = [];
        $scope.groupnews = $scope.groups;
        //  $scope.groupnewselected = $scope.groupselected;

        $scope.paramNewForm.ID.$invalid = false;
        $scope.paramNewForm.ID.$pristine = true;
        $scope.paramNewForm.FieldName.$invalid = false;
        $scope.paramNewForm.FieldName.$pristine = true;
        $scope.paramNewForm.Code.$invalid = false;
        $scope.paramNewForm.Code.$pristine = true;
        $scope.paramNewForm.Value.$invalid = false;
        $scope.paramNewForm.Value.$pristine = true;

        $('#modal-add').modal('toggle');

        // cursor focus on first field after about 1 seconds
        setTimeout(function () { document.getElementById("newForm" + firstFieldID).focus(); }, 1000);

    }


    $scope.openModalEditForm = function () {

        $scope.buttonEditDisabled = false;
        $('#alertErrorMessageEditContainer').hide();

        var paramID = getDataTableSelectedID();

        if (paramID != null) {

            $scope.paramEdit = {};

            $scope.paramEditForm.$valid = true; // default to valid

            $scope.groupedits = [];
            $scope.groupedits = $scope.groups;
            $scope.groupeditselected = $scope.groupselected;

            $('#modal-edit').modal('show');

            // go to server to retrieve the latest data 
            appResource.$get({ Id: paramID }).then(function (data) {
                // if success
                if (data.success) {
                    // set the textbox values

                    $scope.paramEdit.ID = data.obj.ID;
                    $scope.paramEdit.FieldName = data.obj.FieldName;
                    $scope.paramEdit.Code = data.obj.Code;
                    $scope.paramEdit.Value = data.obj.Value;
                    $scope.paramEdit.CreatedBy = data.obj.CreatedBy;
                    $scope.paramEdit.CreatedDate = data.obj.CreatedDate;
                    $scope.paramEdit.UpdatedBy = data.obj.UpdatedBy;
                    $scope.paramEdit.UpdatedDate = data.obj.UpdatedDate;


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
            alert("Please select a row to edit");
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
        $scope.parameter = {};
        $('#modal-edit').modal('hide');
    }

    $scope.closeModalNewForm = function () {
        $scope.parameter = {};
        $('#modal-add').modal('hide');
    }

    $scope.openModalDelete = function () {
        $scope.buttonDeleteDisabled = false;

        $scope.selectedParamIndex = getDataTableSelectedID();
        if ($scope.selectedParamIndex != null) {
            $('#modal-alert-delete').modal('show');
        } else {
            alert("Please select a row to delete");
        }
    }

    $scope.closeModalDelete = function () {
        $scope.parameter = {};
        $('#modal-alert-delete').modal('toggle');
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

        appResource.GroupID = $.trim($scope.groupselected.ID);

        if (appResource.GroupID != "") {
            appResource.$searchParameterSettings().then(function (data) {
                var records = {
                    'draw': 0,
                    'recordsTotal': 0,
                    'recordsFiltered': 0,
                    'data': []
                };
                if (data) {
                    records = {
                        'draw': aoData[0].value,
                        'recordsTotal': data.obj.totalItems,
                        'recordsFiltered': data.obj.totalItems,
                        'data': data.obj.data
                    };
                }

                $scope.pageData.total = data.obj.totalItems;
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
        else
        {
            var records = {
                'draw': 0,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': []
            };

            $scope.pageData.total = 0;
            fnCallback(records);

            $scope.isLoading = false;
        }
    }

    $scope.dtColumns = [
        DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
        DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").notSortable(),
        DTColumnBuilder.newColumn("GroupID", 'GroupID').withOption('defaultContent', "").withClass('hide'),
        DTColumnBuilder.newColumn("FieldName", 'Field Name').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn("Code", 'Code').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn("Value", 'Value').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn("Description", 'Description').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn("CreatedBy", 'CreatedBy').withOption('defaultContent', "").withClass('hide'),
        DTColumnBuilder.newColumn("CreatedDate", 'CreatedDate').withOption('defaultContent', "").withClass('hide'),
        DTColumnBuilder.newColumn("UpdatedBy", 'UpdatedBy').withOption('defaultContent', "").withClass('hide'),
        DTColumnBuilder.newColumn("UpdatedDate", 'UpdatedDate').withOption('defaultContent', "").withClass('hide')
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
            .withDisplayLength(10)
            .withOption('select', 'single')
            .withOption('select.info', false) 
            .withOption('drawCallback', function drawCallback(e) {

                $('#data-table tbody').on('click', 'tr', function (e) {
                    var footerRow = $('#data-table_info span[class^="select-info"]');
                    footerRow.html('    ' + footerRow.text());
                });
            });

    $scope.pageData = {
        total: 0,
    };

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $compile(nRow)($scope);
        return nRow;
    }

    $scope.searchParameterSettings = function () {
        $('#data-table').dataTable().fnClearTable();
    }

    //$('#data-table').dataTable().select.info(false);
});