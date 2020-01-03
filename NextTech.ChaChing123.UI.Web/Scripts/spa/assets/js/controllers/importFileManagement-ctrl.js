app.controller('importFileManagementController', function ($scope, $rootScope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, importFileResource, $filter, commonfunctions,$timeout) {

    $scope.widgetShow = true;
    $scope.importFileManagements = [];
    $scope.fileStatusList = [];
    $scope.fileTypeList = [];
    $scope.SearchObject = {};

    $scope.TotalImportFile = 0;
    $scope.Imported = 0;
    $scope.ImportedFailed = 0;
    $scope.Approved = 0;
    $scope.Rejected = 0;
    $scope.Exported = 0;
    $scope.SendToARHFailed = 0;
    $scope.SendToARHSucceed = 0;
    $scope.FullyExport = 0;
    $scope.PartiallyExport = 0;
    $scope.logFileLists = [];
    $scope.searchFileName = "";
    $scope.searchFileType = "";
    $scope.searchFileStatus = "";
    $scope.searchTotalAmount = "";
    $scope.searchFromDate = "";
    $scope.searchToDate = "";
    $scope.SelectedLogFileID = "";
    $scope.selectedLogFileName = "";
    var rows_selected = [];
    var index = 1;
    countIndex = function () {
        return index++;
    }
    $scope.pageData = {
        total: 0,
    };
    // data tables option configuration
    $scope.dtOptions = DTOptionsBuilder.newOptions()
                         .withOption('select', false)
                         .withOption('select.style', 'single')
                         .withOption('searching', false)
                         .withOption('paging', true)
                         .withOption('responsive', true);
    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(8).notSortable()
    ];
    //initialize server pagging
    $scope.pagingOptions = { start: 0, length: 10, orderColumn: 2, orderDir: 'asc', draw: 1 };
    $scope.totalItems = 0;
    $scope.numPages = 0;

    var appResource = new importFileResource();

    appResource.$getFileStatusList().then(function (data) {
        // if success
        if (data.success) {
            $scope.fileStatusList = [];
            for (i = 0; i < data.obj.length; i++) {
                var item = data.obj[i];
                $scope.fileStatusList.push(item);
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

    appResource.$getFileTypeList().then(function (data) {
        // if success
        if (data.success) {
            $scope.fileTypeList = [];
            for (i = 0; i < data.obj.length; i++) {
                var item = data.obj[i];
                $scope.fileTypeList.push(item);
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
        appResource.FileName = $scope.SearchObject.FileName;
        appResource.FileType = $scope.SearchObject.FileType;
        appResource.FileStatus = $scope.SearchObject.FileStatus;
        appResource.FromDate = $scope.SearchObject.FromDate;
        appResource.ToDate = $scope.SearchObject.ToDate;
        appResource.TotalAmount = $scope.SearchObject.TotalAmount;

        //POST Parameters pagination result search
        appResource.start = $scope.pagingOptions.start;
        appResource.length = $scope.pagingOptions.length;
        appResource.orderColumn = $scope.pagingOptions.orderColumn;
        appResource.orderDir = $scope.pagingOptions.orderDir;

        appResource.$searchimportfilelist().then(function (data) {
            var records = {
                'draw': 0,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': []
            };
            if (data) {
                $scope.TotalImportFile = data.obj.TotalImportFile;
                $scope.Imported = data.obj.Imported;
                $scope.ImportedFailed = data.obj.ImportedFailed;
                $scope.Exported = data.obj.Exported;

                $scope.Approved = data.obj.Approved;
                $scope.Rejected = data.obj.Rejected;
                $scope.SendToARHFailed = data.obj.SendToARHFailed;
                $scope.SendToARHSucceed = data.obj.SendToARHSucceed;
                $scope.FullyExport = data.obj.FullyExport;
                $scope.PartiallyExport = data.obj.PartiallyExport;

                rows_selected = [];
                $("#selectedAll").prop('checked', false);
                records = {
                    'draw': aoData[0].value,
                    'recordsTotal': data.obj.TotalImportFile,
                    'recordsFiltered': data.obj.TotalImportFile,
                    'data': data.obj.lstImportFile
                };
            }
            $scope.pageData.total = data.obj.TotalImportFile;
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

    $scope.dtColumns = [
        DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
        DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").notSortable(),
        DTColumnBuilder.newColumn(null, 'File Name').withOption('defaultContent', "").renderWith(function (data, type) {
            return data.FileType == 'CTD' ?
              '<a ui-sref="importfile.vibadetail({ id:' + data.ID + '})">' + data.FileName + '</a>'
            : ' <a ui-sref="importfile.detail({ id: ' + data.ID + '})">' + data.FileName + '</a>';
        }),
        DTColumnBuilder.newColumn('FileType', 'File Type').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('Status', 'Status').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn('CreatedDate', 'Imported Date').withOption('defaultContent', "").renderWith(function (data, type) {
            return $filter('date')($rootScope.formatLocalDate(data), 'dd/MM/yyyy HH:mm:ss');
        }),
        DTColumnBuilder.newColumn('ExportedDate', 'Exported Date').withOption('defaultContent', "").notSortable().renderWith(function (data, type) {
            if (data) {
                return $filter('date')($rootScope.formatLocalDate(data), 'dd/MM/yyyy HH:mm:ss');
            }
            else {
                return '';
            }
        }),
        DTColumnBuilder.newColumn('ISOFileName', 'ISO File Name').withOption('defaultContent', "").notSortable(),
        DTColumnBuilder.newColumn('CreatedBy', 'Imported User').withOption('defaultContent', ""),
        DTColumnBuilder.newColumn(null, 'View Log').withOption('defaultContent', "").notSortable().renderWith(function (data, type) {
            return '<a href="javascript:;" ng-click="toggleModalViewLogDetail({id: ' + data.ID + '})">View Log</a>';
        }),
        DTColumnBuilder.newColumn(null, '<div>Download</div> <div><input type="checkbox" id="selectedAll" name="select_all" ng-model="isCheckedAll" /></div>')
         .withOption('defaultContent', "").notSortable().renderWith(function (data, type) {
             return '<input type="checkbox"/>';
         }),
    ];

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
            .withOption('rowCallback', rowCallback)
            .withDisplayLength(10);

    $scope.searchimportfilelist = function () {
        //POST Parameters search condition
        $scope.SearchObject.FileName = $scope.searchFileName;
        $scope.SearchObject.FileType = $scope.searchFileType;
        $scope.SearchObject.FileStatus = $scope.searchFileStatus;
        var searchFromDate = moment($('#searchFromDate').val(), 'DD/MM/YYYY hh:mm A').format('MM/DD/YYYY hh:mm a');
        var searchToDate = moment($('#searchToDate').val(), 'DD/MM/YYYY hh:mm A').format('MM/DD/YYYY hh:mm a');

        $scope.SearchObject.FromDate = searchFromDate;
        $scope.SearchObject.ToDate = searchToDate;

        if (!$scope.searchTotalAmount) {
            $scope.SearchObject.TotalAmount = $scope.searchTotalAmount;
        }
        else if (!angular.isNumber($scope.searchTotalAmount)) {
            $scope.SearchObject.TotalAmount = ($scope.searchTotalAmount.replace(/[^0-9\.]+/g, "")) * 1;
        }
        else {
            $scope.SearchObject.TotalAmount = $scope.searchTotalAmount;
        }

        $('#data-table-fileimport').dataTable().fnClearTable();
    }

    $scope.download = function () {
        $scope.isLoading = true;
        $scope.isDisabled = true;
        var listFileIds = rows_selected;
        if (listFileIds.length <= 0) {
            alert("Please select file to download.");
            $scope.isLoading = false;
            $scope.isDisabled = false;
        }
        else {
            appResource.ListFileIds = listFileIds;
            appResource.$download().then(function (data) {
                // if success
                if (data.success) {

                    if (data.obj && data.obj.length) {
                        var i;
                        for (i = 0; i < data.obj.length; ++i) {
                            var file = commonfunctions.base64ToBlob([data.obj[i].OriginalImportFileData]);
                            window.navigator.msSaveOrOpenBlob(file, data.obj[i].OriginalImportFileName);
                        }
                        sucMsg = 'Original imported files are downloaded successfully.';
                        $scope.alerts = [{
                            type: 'success',
                            msg: sucMsg
                        }];
                    }
                } else {
                    // assign the error  message
                    var errMsg = data.obj.StatusMsg;
                    $scope.alerts = [{
                        type: 'danger',
                        msg: errMsg
                    }];
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
                $scope.isLoading = false;
            });
           
            $timeout(function () { $scope.isDisabled = false; }, 1000);
        }
    }

    $scope.isLoading = false;
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

    $scope.toggleModalViewLogDetail = function (importFile) {
        appResource.ID = null;
        appResource.FileImportID = importFile.id;
        $scope.showContentLogFileFunction();
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

    $scope.showContentLogFileFunction = function () {
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

    $scope.desryptAndDownload = function () {
        $scope.isLoading = true;
        $scope.isDisabled = true;
        var listFileIds = rows_selected;
        if (listFileIds.length <= 0) {
            alert("Please select file to download.");
            $scope.isLoading = false;
            $scope.isDisabled = false;
        }
        else {
            appResource.ListFileIds = listFileIds;
            appResource.$desryptAndDownload().then(function (data) {
                // if success
                if (data.success) {
                    if (data.obj && data.obj.length) {
                        var i;
                        for (i = 0; i < data.obj.length; ++i) {
                            var file = commonfunctions.base64ToBlob([data.obj[i].OriginalImportFileData]);
                            window.navigator.msSaveOrOpenBlob(file, data.obj[i].OriginalImportFileName);
                        }
                        sucMsg = 'Original imported files are decrypted and downloaded successfully.';
                        $scope.alerts = [{
                            type: 'success',
                            msg: sucMsg
                        }];
                    }
                } else {
                    // assign the error  message
                    var errMsg = data.obj.StatusMsg;
                    $scope.alerts = [{
                        type: 'danger',
                        msg: errMsg
                    }];
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
                $scope.isLoading = false;
            });
            $timeout(function () { $scope.isDisabled = false; }, 1000);
        }
    }

    $scope.clearForm = function () {
        $scope.searchFileName = "";
        $scope.searchFileType = "";
        $scope.searchFileStatus = "";
        $('#searchFromDate').val("");
        $('#searchToDate').val("");
        $scope.searchTotalAmount = "";
    }

    $scope.individualSelected = function () {
        $scope.isCheckedAll = false;
        $("#checkAll").prop('checked', false);
    }

    $scope.checkAll = function () {
        if (!$scope.isCheckedAll) {
            for (var i = 0; i < $scope.importFileManagements.length; i++) {
                $scope.importFileManagements[i].isChecked = true;
            }
            $("#checkAll").prop('checked', true);
        } else {
            for (var i = 0; i < $scope.importFileManagements.length; i++) {
                $scope.importFileManagements[i].isChecked = false;
            }
            $("#checkAll").prop('checked', false);
        }
        $scope.isCheckedAll = !$scope.isCheckedAll;
    }

    commonfunctions.hasDateTimepicker();

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

    function updateReloadGrid() {
        $('#data-table-fileimport > tbody > tr').each(function () {
            var $row = $(this).closest('tr');
            var table = $('#data-table-fileimport').DataTable();
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
        var table = $('#data-table-fileimport').DataTable();
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
        var table = $('#data-table-fileimport').DataTable();
        // Get row data
        var data = table.row($row).data();
        if (data) {
            // Get row ID
            var rowId = data.ID;

            // Determine whether row ID is in the list of selected row IDs
            var index = $.inArray(rowId, rows_selected);

            // If checkbox is checked and row ID is not in list of selected row IDs
            if (element.checked && index === -1) {
                rows_selected.push(rowId);

                // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
            } else if (!element.checked && index !== -1) {
                rows_selected.splice(index, 1);
            }

            if (element.checked) {
                $row.addClass('selected');
            } else {
                $row.removeClass('selected');
            }
        }
        else {
            if (element.checked) {
                $('#data-table-fileimport tbody input[type="checkbox"]:not(:checked)').trigger('click');
            } else {
                $('#data-table-fileimport tbody input[type="checkbox"]:checked').trigger('click');
            }
        }
        // Update state of "Select all" control
        updateDataTableSelectAllCtrl(table);
    }

    $('#data-table-fileimport').on('click', 'input[type="checkbox"]', function (e) {
        performCheckboxEvent(this);
        e.stopPropagation();
    });

    $('#SearchResultList').on('click', 'input[name="select_all"]', function (e) {
        performCheckboxEvent(this);
        e.stopPropagation();
    });
});