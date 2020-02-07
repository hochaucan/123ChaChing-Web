
/* -------------------------------
   CONTROLLER: importFileController
   Author: Unified Tool
------------------------------- */
app.controller('importFileApprovalController', function ($scope, $rootScope, $state, DTOptionsBuilder,
    importFileResource, commonfunctions, $filter, DTColumnBuilder, $compile) {

    $scope.widgetShow = true;
    $scope.isCheckedAll = false;
    $scope.sectionShow = true;
    $scope.isLoading = true;
    $scope.isValueDateFutureDate = false;
    $scope.futureDateFileName = '';
    var rows_selected = [];

    var appResource = new importFileResource();
    var selectedItem = {};
    $scope.files = [];

    $scope.currentDate = $filter('date')(new Date(), "dd/MM/yyyy");
    
    // Init current date
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth(); 
    var year = today.getFullYear();
    $scope.CalendarInputDate = new Date(year, month, day);
    //var oldCalendarInputDate = $scope.CalendarInputDate;
    // When user change the date on calendar
    $scope.dateChange = function () {
        //if ($scope.CalendarInputDate)
        //{
        //    oldCalendarInputDate = $scope.CalendarInputDate;
        //}
        //else
        //{
        //    $scope.CalendarInputDate = oldCalendarInputDate;
        //}
        $scope.alerts = [];
        $scope.currentDate = commonfunctions.convertDateToDateStr($scope.CalendarInputDate);         
        $('#data-table').dataTable().fnClearTable();    // recall paging
    }

    $scope.Remarks = '';

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }


    $scope.importFileDetails = [];
    $scope.importFileManuals = [];
    $scope.importedFiles = [];
    $scope.logFileLists = [];
    $scope.importFilesFail = [];
  
    $scope.accountpayment = {};
    $scope.searchFilter = {};
    $scope.selectedAccountPayment = {};
    $scope.selectedAccountPaymentIndex = null;

    $scope.SelectedLogFileID = "";
    $scope.selectedLogFileName = "";
    $scope.Imported = 0;
    $scope.ImportedFailed = 0;
    $scope.Approved = 0;
    $scope.Rejected = 0;
    $scope.Exported = 0;
    $scope.SendToARHFailed = 0;
    $scope.SendToARHSucceed = 0;

    // ------------------------------------------------------------
    // --------------------------- PAGING -------------------------
    // ------------------------------------------------------------

    // Initialize server pagging
    $scope.pagingOptions = { start: 0, length: 10, orderColumn: 2, orderDir: 'asc', draw: 1 };
    $scope.totalItems = 0;
    $scope.numPages = 0;

    $scope.pageData = {
        total: 0,
    };

    var index = 1;
    countIndex = function () {
        return index++;
    }

    // this function used to get all leads
    var get = function (sSource, aoData, fnCallback, oSettings) {

        $scope.pagingOptions.start = aoData[3].value;
        $scope.pagingOptions.length = aoData[4].value;
        $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
        $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
        index = $scope.pagingOptions.start + 1;


        
        // POST Parameters search condition
        var dateParts = $scope.currentDate.split("/");
        var dateObject = new Date(Date.UTC(dateParts[2], dateParts[1] - 1, dateParts[0]))
        appResource.searchdate = dateObject;

        // POST Parameters pagination result search
        appResource.start = $scope.pagingOptions.start;
        appResource.length = $scope.pagingOptions.length;
        appResource.orderColumn = $scope.pagingOptions.orderColumn;
        appResource.orderDir = $scope.pagingOptions.orderDir;

        appResource.$getImportedFilesApprovalByBranch().then(function (data) {
            var records = {
                'draw': 0,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': []
            };
            if (data) {
                $scope.importFileManuals = [];
                for (i = 0; i < data.obj.lstImportFile.length; i++) {
                    var item = data.obj.lstImportFile[i];
                    $scope.importFileManuals.push(item);
                }
                rows_selected = [];
                $("#selectedAll").prop('checked', false);
                records = {
                    'draw': aoData[0].value,
                    'recordsTotal': data.obj.TotalImportFile,
                    'recordsFiltered': data.obj.TotalImportFile,
                    'data': data.obj.lstImportFile
                };
            }
           

            $scope.Imported = data.obj.Imported;
            $scope.ImportedFailed = data.obj.ImportedFailed;
            $scope.Exported = data.obj.Exported;
            $scope.Approved = data.obj.Approved;
            $scope.Rejected = data.obj.Rejected;
            $scope.SendToARHFailed = data.obj.SendToARHFailed;
            $scope.SendToARHSucceed = data.obj.SendToARHSucceed;
            $scope.pageData.total = data.obj.TotalImportFile;
            fnCallback(records);
            updateReloadGrid();

        });
    }



    function updateReloadGrid() {
        $('#data-table > tbody > tr').each(function () {
            var $row = $(this).closest('tr');
            var table = $('#data-table').DataTable();
            // Get row data
            var data = table.row($row).data();
            if (data) {
                // Get row ID
                var rowId = data.ID;
                var index = $.inArray(rowId, rows_selected);
                if (index !== -1) {
                    $row.addClass('selected');
                    $td = $row.find('input[type="checkbox"]');
                    $td.prop('checked', true);
                }
            }
        })
        var table = $('#data-table').DataTable();
        updateDataTableSelectAllCtrl(table);
    }

    function updateDataTableSelectAllCtrl(table) {
        var $table = table.table().node();
        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
        var chkbox_select_all = $('#SearchResultList input[name="select_all"]').get(0);

        // If none of the checkboxes are checked
        if ($chkbox_checked.length === 0) {
            if (chkbox_select_all) {
                chkbox_select_all.checked = false;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = false;
                }
            }

            // If all of the checkboxes are checked
        } else if ($chkbox_checked.length === $chkbox_all.length) {
            if (chkbox_select_all) {
                chkbox_select_all.checked = true;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = false;
                }
            }
            // If some of the checkboxes are checked
        } else {
            if (chkbox_select_all) {
                chkbox_select_all.checked = true;
                if ('indeterminate' in chkbox_select_all) {
                    chkbox_select_all.indeterminate = true;
                }
            }
        }
    }

    function performCheckboxEvent(element) {
        var $row = $(element).closest('tr');
        if ($row.hasClass('child')) {
            $row = $(element).closest('tr').prev();
        }
        var table = $('#data-table').DataTable();
        // Get row data
        var data = table.row($row).data();
        if (data) {
            // Get row ID
            var rowId = data.ID;
            var updatedDate = data.UpdatedDate;

            // Determine whether row ID is in the list of selected row IDs
            var index = $.inArray(rowId, rows_selected);

            // If checkbox is checked and row ID is not in list of selected row IDs
            if (element.checked && index === -1) {
                rows_selected.push(rowId);
                selectedItem[rowId] = updatedDate;

                // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
            } else if (!element.checked && index !== -1) {
                rows_selected.splice(index, 1);
                selectedItem[rowId] = null;
            }

            if (element.checked) {
                $row.addClass('selected');
            } else {
                $row.removeClass('selected');
            }
        }
        else {
            if (element.checked) {
                $('#data-table tbody input[type="checkbox"]:not(:checked)').trigger('click');
            } else {
                $('#data-table tbody input[type="checkbox"]:checked').trigger('click');
            }
        }
        // Update state of "Select all" control
        updateDataTableSelectAllCtrl(table);
    }

    $('#data-table').on('click', 'input[type="checkbox"]', function (e) {
        performCheckboxEvent(this);
        e.stopPropagation();
    });

    $('#SearchResultList').on('click', 'input[name="select_all"]', function (e) {
        performCheckboxEvent(this);
        e.stopPropagation();
    });

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $compile(nRow)($scope);
    }

    $scope.dtColumns = [
         DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
         DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").notSortable(),
         DTColumnBuilder.newColumn(null, 'File Name').withOption('defaultContent', "").withClass("FilenameColumnContentSize").renderWith(function (data, type) {
             return data.FileType == 'CTD' ?
               '<a ui-sref="importfile.vibadetail({ id:' + data.ID + '})">' + data.FileName + '</a>'
             : ' <a ui-sref="importfile.detail({ id: ' + data.ID + '})">' + data.FileName + '</a>';
         }),
         DTColumnBuilder.newColumn('FileType', 'File Type').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('TotalTransaction', 'Total Transactions').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('TotalImportedTransaction', 'Imported Transactions').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('TotalTransactionValidationFail', 'Transaction Validation Fail').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn('Status', 'Status').withOption('defaultContent', ""),
         DTColumnBuilder.newColumn(null, 'View Log').withOption('defaultContent', "").notSortable().renderWith(function (data, type) {
             return '<a href="javascript:;" ng-click="toggleModalViewLogDetail({id: ' + data.ID + '})">View Log</a>';
         }),

          DTColumnBuilder.newColumn(null, '<div>Approve or <br>Reject</div> <div><input type="checkbox" id="selectedAll" name="select_all" ng-model="isCheckedAll" /></div>')
          .withOption('defaultContent', "").notSortable().renderWith(function (data, type) {
      
              return ((data.Status == 'Imported' && data.FileType != 'CTD') || data.Status == 'Exported') ?
                  '<input type="checkbox" />' : '';
              
          }),
         DTColumnBuilder.newColumn('Remarks', 'Remarks').withOption('defaultContent', ""),
    ];


    $scope.checkAll = function () {
        if (!$scope.isCheckedAll) {
            for (var i = 0; i < $scope.importFileManuals.length; i++) {
                $scope.importFileManuals[i].isChecked = true;
            }
            $("#checkAll").prop('checked', true);
        } else {
            for (var i = 0; i < $scope.importFileManuals.length; i++) {
                $scope.importFileManuals[i].isChecked = false;
            }
            $("#checkAll").prop('checked', false);
        }
        $scope.isCheckedAll = !$scope.isCheckedAll;
    }

    $scope.individualSelected = function () {
        $scope.isCheckedAll = false;
        $("#checkAll").prop('checked', false);

    }

    $scope.dtNewOptions = DTOptionsBuilder.newOptions()
            .withFnServerData(get) // method name server call
            .withDataProp('data')// parameter name of list use in getLeads Fuction
            .withOption('processing', true) // required
            .withOption('serverSide', true)// required
            .withOption('paging', true)// required
            .withPaginationType('full_numbers')
            .withOption('scrollX', true)
            .withOption('scrollCollapse', true)
            .withOption('searching', false)
            //.withOption('responsive', true)
            .withOption('rowCallback', rowCallback)
            .withDisplayLength(10);
    // ---------------------------------------------------------------------

    var firstFieldID = "GCMSAccountID";

    // init the datatable
    $('#alertErrorMessageSearchContainer').hide();

    $scope.isLoading = false;

    // $scope.getImportedFilesApprovalByBranch($scope.currentDate);

    $scope.toggleModalViewLogList = function () {
        appResource.$getLogFilesByBranch().then(function (data) {
            $scope.isLoading = true;
            if (data.success) {
                $scope.logFileLists = [];
                for (i = 0; i < data.obj.length; i++) {
                    var item = data.obj[i];
                    $scope.logFileLists.push(item);
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
            $scope.isLoading = false;
        }, function errorCallback(response) {
            var errMsg = "System fails to proceed. Please contact System Administrator for more information.";
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;
        });
        $('#modal-ViewLog').modal('toggle');
    }
    
    $scope.setSelectedRow = function (id) {
        $scope.SelectedLogFileID = id;
    }

    $scope.selectedLogFile = function () {
        for (var i = 0; i < $scope.logFileLists.length; i++) {
            if ($scope.SelectedLogFileID == $scope.logFileLists[i].ID) {
                $scope.selectedLogFileName = $scope.logFileLists[i].NameFileLog;
                break;
            }
        }
    }

    $scope.showDetailLogFile = function () {
        appResource.FileImportID = null;
        appResource.ID = $scope.SelectedLogFileID;
        $scope.showContentLogFileFunction();
    }

    $scope.toggleModalViewLogDetail = function (importFile) {
        appResource.ID = null;
        appResource.FileImportID = importFile.id;
        $scope.showContentLogFileFunction();
    }
    
    $scope.showContentLogFileFunction = function()
    {
        var fileContents = document.getElementById('FileContents');
        fileContents.innerText = "";
        appResource.$showContentLogfile().then(function (data) {
            $scope.isLoading = true;
            fileContents.innerText = data.obj.FileContent;
            $scope.isLoading = false;
        }, function errorCallback(response) {
            var errMsg = "System fails to proceed. Please contact System Administrator for more information.";
            $scope.alerts = [{
                type: 'danger',
                msg: errMsg
            }];
            $scope.isLoading = false;
        });
        $('#modal-ViewLogDetail').modal('toggle');
    }
        
    function getDataTableSelectedID()
    {
        var listFileIds = [];
        for (var i = 0; i < $scope.importFileManuals.length; i++) {
            if ($scope.importFileManuals[i].isChecked) {
                listFileIds.push($scope.importFileManuals[i].ID);
            }
        }
        return listFileIds;
    }


    $scope.clearForm = function () {
        $scope.accountpaymentSearch.SearchText = "";
    }

    $scope.openModalApprove = function () {
        $scope.buttonApproveDisabled = false;

        $scope.selectedParamIndex = rows_selected;
        if ($scope.selectedParamIndex.length > 0) {
            $scope.isValueDateFutureDate = false;
            $scope.futureDateFileName = '';
            for (i = 0; i < $scope.selectedParamIndex.length; ++i) {
                var currentItem = $scope.importFileManuals.filter(function(item) {
                    return item.ID === $scope.selectedParamIndex[i];
                })[0];
                if (currentItem.IsValueDateFutureDate) {
                    $scope.isValueDateFutureDate = true;
                    if ($scope.futureDateFileName.length > 0) {
                        $scope.futureDateFileName = $scope.futureDateFileName + ", " + currentItem.FileName;
                    }
                    else {
                        $scope.futureDateFileName = currentItem.FileName;
                    }
                }
            }
            $('#modal-alert-approve').modal('show');
        } else {
            alert("Please Select a file to approve");
        }
    }

    $scope.closeModalApprove = function () {
        $scope.showErrorMax = false;
        $scope.Remarks = '';
        $('#modal-alert-approve').modal('toggle');
    }

    $scope.openModalReject = function () {
        $scope.buttonRejectDisabled = false;

        $scope.selectedParamIndex = rows_selected;
        if ($scope.selectedParamIndex.length > 0) {
            $('#modal-alert-reject').modal('show');
        } else {
            alert("Please Select a file to reject");
        }
    }

    $scope.closeModalReject = function () {
        $('#modal-alert-reject').modal('toggle');
    }

    $scope.approve = function () {
        $scope.alerts = [];
        if ($scope.Remarks.length > 500) {
            $scope.showErrorMax = true;
            return;
        }
        $scope.isLoading = true;
        $scope.buttonApproveDisabled = true;
        // http post export

        var listFileIds = rows_selected;

        appResource.ListFileIds = listFileIds;
        appResource.NewValueDate = null;
        appResource.IsHightValuePayment = false;
        appResource.Remarks = $scope.Remarks;
        appResource.SelectedItem = selectedItem;
        $scope.closeModalApprove();
        appResource.$approve().then(function (data) {
            // if success
            if (data.success) {
                sucMsg = 'File is approved.';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];
                rows_selected = [];
                $('#data-table').dataTable().fnClearTable();

                // $scope.getImportedFilesApprovalByBranch($scope.currentDate);
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


    $scope.reject = function () {
        $scope.alerts = [];
        if ($scope.Remarks.length > 500) {
            $scope.showErrorMax = true;
            return;
        }
       
        $scope.isLoading = true;
        $scope.buttonRejectDisabled = true;
        // http post export

        var listFileIds = rows_selected;

        appResource.ListFileIds = listFileIds;
        appResource.Remarks = $scope.Remarks;
        $scope.closeModalReject();
        appResource.$reject().then(function (data) {
            // if success
            if (data.success) {
                sucMsg = 'File is rejected.';
                $scope.alerts = [{
                    type: 'success',
                    msg: sucMsg
                }];
                rows_selected = [];
                $('#data-table').dataTable().fnClearTable();

                //$scope.getImportedFilesApprovalByBranch($scope.currentDate);
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
            $scope.buttonRejectDisabled = false;
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
            $scope.buttonRejectDisabled = false;
            $scope.isLoading = false;

        });
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

});




