
/* -------------------------------
   CONTROLLER: importFileController
   Author: Unified Tool
------------------------------- */
app.controller('importFileController', function ($scope, $rootScope, $state, $compile, DTColumnDefBuilder, DTOptionsBuilder,
                                                DTColumnBuilder, importFileResource, $filter, commonfunctions)
{

  $scope.widgetShow = true;
  $scope.sectionShow = true;
  $scope.isLoading = true;
  var appResource = new importFileResource();
  $scope.files = [];
  $scope.currentDate = $filter('date')(new Date(), "dd/MM/yyyy");
  $scope.isCheckedAll = false;
  $scope.importFileDetails = [];
  $scope.importFileManuals = [];
  $scope.importedFiles = [];
  $scope.logFileLists = [];
  $scope.importFilesFail = [];
  $scope.accountpayment = {};
  $scope.searchFilter = {};
  $scope.selectedAccountPayment = {};
  $scope.selectedAccountPaymentIndex = null;
  var rows_selected = [];
  $scope.SelectedLogFileID = "";
  $scope.selectedLogFileName = "";

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
    
  $('.datepicker').datepicker({
      viewMode: 'months',
      dateFormat: "dd/mm/yy",
      autoclose: true,
      todayHighlight: true,
      onSelect: function(date) {
          changedate(date);
      }  
  });
  var changedate = function (date) {
      $scope.currentDate = date;
      $scope.getImportedFilesByBranch($scope.currentDate);
  };
  var index = 1;
  countIndex = function () {
      return index++;
  }
  $scope.pageData = {
      total: 0,
  };
  //initialize server pagging
  $scope.pagingOptions = { start: 0, length: 10, orderColumn: 2, orderDir: 'asc', draw: 1 };
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
      var dateParts = $scope.currentDate.split("/");
      var dateObject = new Date(Date.UTC(dateParts[2], dateParts[1] - 1, dateParts[0]))
      appResource.searchdate = dateObject;

      //POST Parameters pagination result search
      appResource.start = $scope.pagingOptions.start;
      appResource.length = $scope.pagingOptions.length;
      appResource.orderColumn = $scope.pagingOptions.orderColumn;
      appResource.orderDir = $scope.pagingOptions.orderDir;
      
        appResource.$getImportedFilesByBranch().then(function (data) {
            var records = {
                'draw': 0,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': []
            };
            if (data) {
                $scope.importFileManuals = [];
                for (i = 0; i < data.obj.lstImportFile.length; i++)
                {
                    var item = data.obj.lstImportFile[i];
                    $scope.importFileManuals.push(item);
                }
                rows_selected =[];
                $("#selectedAll").prop('checked', false);
                records = {
                    'draw': aoData[0].value,
                    'recordsTotal': data.obj.TotalImportFile,
                    'recordsFiltered': data.obj.TotalImportFile,
                    'data': data.obj.lstImportFile
                };
            }
            $scope.importedFiles = data.obj.Imported;
            $scope.importFilesFail = data.obj.ImportedFailed;
            $scope.pageData.total = data.obj.TotalImportFile;
            fnCallback(records);
            updateReloadGrid();

        });
    }
  function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      $compile(nRow)($scope);
  }

  // <table id="data-table-fileimport" datatable="" dt-options="dtNewOptions" dt-columns="dtColumns" class="table table-striped table-bordered table-hover" width="100%"></table>
  $scope.dtColumns = [
       DTColumnBuilder.newColumn("ID", 'ID').withOption('defaultContent', "").withClass('hide'),
       DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").notSortable(),
       DTColumnBuilder.newColumn(null, 'File Name').withOption('defaultContent', "").renderWith(function (data, type) {
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
        DTColumnBuilder.newColumn(null, '<div>Print</div> <div><input type="checkbox" id="selectedAll" name="select_all" ng-model="isCheckedAll" /></div>')
        .withOption('defaultContent', "").notSortable().renderWith(function (data, type) {
            return data.Status == 'ImportFail' ? ''
                : '<input type="checkbox"/>';
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
          //.withOption('responsive', true)
          .withOption('rowCallback', rowCallback)
          .withDisplayLength(10);

  $scope.importDataByFile = function () {
      appResource.FilesCount = $scope.files.length;
      appResource.FileList = $scope.files;
      if (appResource.FilesCount <= 0) {
          var errMsg = "Please choose files to import.";
          $scope.alerts = [{
              type: 'danger',
              msg: errMsg
          }];
          $scope.isLoading = false;

          return;
      }
      appResource.$importDataByFile({ parameter: $scope.files.length }).then(function (data) {
          $scope.files = undefined;
          angular.element("input[type='file']").val(null);
          // if success
          if (data.success) {
              var a = document.createElement('a');
              var sucMsg = 'Files are imported successfully.';
              $scope.alerts = [{
                  type: 'success',
                  msg: sucMsg
              }];
             
          } else {
              var errMsg = data.obj.StatusMsg;
              $scope.alerts = [{
                  type: 'danger',
                  msg: errMsg
              }];

          }
          $scope.isLoading = false;
          $('#data-table-fileimport').dataTable().fnClearTable();
          if (data.obj && data.obj.length) {
              for (i = 0; i < data.obj.length; ++i) {
                  if (data.obj[i].IsErrorReport) {
                      var errMsg = data.obj[i].StatusMsg;
                      $scope.alerts = [{
                          type: 'danger',
                          msg: errMsg
                      }];
                  }
                  var file = commonfunctions.base64ToBlob([data.obj[i].FileReportData]);
                  window.navigator.msSaveOrOpenBlob(file, data.obj[i].FileReportName);
              }
          }
          //$rootScope.scrollTop();
          $scope.isLoading = false;
      }, function errorCallback(response) {
          if (response.status == "400")
          {
              $scope.isLoading = false;
              var errMsg = "The security session is timeout. System need refresh the page to continue.";
              alert(errMsg);
              window.location.reload();
          }
          var errMsg = "E0003: Error occured while calling REST API. Please try again or contact the Administrator.";
          $scope.alerts = [{
              type: 'danger',
              msg: errMsg
          }];
          //$rootScope.scrollTop();
          $scope.isLoading = false;
      });
  };

    $scope.importFiles = function () {
      $scope.isLoading = true;
      
      if (!$scope.files || $scope.files.length <= 0)
      {
          var errMsg = "Please choose files to import.";
          $scope.alerts = [{
              type: 'danger',
              msg: errMsg
          }];
          $scope.isLoading = false;
                    
          return;
      }
      appResource.FilesCount = $scope.files.length;
      appResource.FileList = $scope.files;
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
    };

    $scope.isLoading = false;

    $scope.getImportedFilesByBranch = function () {
      var dateS = $scope.currentDate.split("/");
      appResource.searchdate = new Date(Date.UTC(dateS[2], dateS[1] - 1, dateS[0]))

      appResource.$getImportedFilesByBranch().then(function (data) {
          if (data.success) {
              //$scope.TotalTransaction = data.obj.lstImportFile;
              $scope.importedFiles = data.obj.Imported;
              $scope.importFilesFail = data.obj.ImportedFailed;
              $('#data-table-fileimport').dataTable().fnClearTable();
              $scope.isLoading = false;
          } else {
              // assign the error  message
              var errMsg = "E0003: Error occured while calling REST API. Please try again or contact the Administrator."; // data.obj.StatusMsg;
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
    //$scope.getImportedFilesByBranch();
      
    // init the datatable
    $('#alertErrorMessageSearchContainer').hide();
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

    // Load Log Content when click ViewLog Link on every line
    $scope.showDetailLogFile = function () {
        appResource.FileImportID = null;
        appResource.ID = $scope.SelectedLogFileID;
        $scope.showContentLogFileFunction();
    }

    // Load Log Content when click ViewLog Link on every line
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
    function getDataTableSelectedIndex() {
        var table = $('#data-table').DataTable();
        var selectRow = table.row('.selected');
        var result = null;
        if (selectRow.length > 0) {
            result = selectRow[0][0];
        }

        return result;
    }
    $scope.clearForm = function () {
        $scope.accountpaymentSearch.SearchText = "";
    }
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

    $scope.printReport = function () {
        $scope.isLoading = true;

        var listFileIds = rows_selected;
            //getDataTableSelectedID();
        if (listFileIds.length <= 0) {
            alert("Please Select a file to print report.");
            $scope.isLoading = false;
        }
        else {

            appResource.ListFileIds = listFileIds;
            appResource.$printReport().then(function (data) {
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

    function updateReloadGrid() {
        
        $('#data-table-fileimport > tbody > tr').each(function() {
        
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

    $('#SearchResultList').on('click', 'input[name="select_all"]', function (e) {
        performCheckboxEvent(this);
        e.stopPropagation();
    });

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



});