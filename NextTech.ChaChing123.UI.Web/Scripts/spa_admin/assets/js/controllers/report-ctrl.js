
/* -------------------------------
   CONTROLLER: reportController
   Author: Unified Tool
------------------------------- */

app.controller('reportController', function ($scope, $rootScope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder,
                                                importedFileResource, reportResource, $filter, commonfunctions, $stateParams, $anchorScroll, $location) {


    $scope.widgetShow = true;
    $scope.sectionShow = true;
    $scope.isLoading = true;
    $scope.fileStatusList = [];
    $scope.searchFromDate = "";
    $scope.searchToDate = "";
    $scope.SearchObject = {};
    var appResource = new reportResource();
    var importResource = new importedFileResource();
    var currentState = $state.current.name;
    var fileType = $stateParams.fileType;

    if (currentState == "report.transactionSummaryReport") {
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

        //Enum ReportType:
        //SummaryReport = 0
        //DetailReport_All = 1
        //DetailReport_Domestic = 2
        //DetailReport_BookTransfer = 3
        //DetailReport_InterBranch = 4
        $scope.ViBaVTBReports = [];
        $scope.fileReports = [];
        $scope.EXLReports = [];

        var item = { No: 1, ReportFileName: "Transaction Summary Report", ReportType: 0 };
        $scope.ViBaVTBReports.push(item);

        $scope.fileReports.push(item);
        item = { No: 2, ReportFileName: "Transaction Detail Report (All)", ReportType: 1 };

        $scope.ViBaVTBReports.push(item);
        item = { No: 3, ReportFileName: "Transaction Detail Report (Domestic-EBANK)", ReportType: 2 };
        $scope.ViBaVTBReports.push(item);
        item = { No: 4, ReportFileName: "Transaction Detail Report (Domestic-CITAD)", ReportType: 14 };
        $scope.ViBaVTBReports.push(item);
        item = { No: 5, ReportFileName: "Transaction Detail Report (BookTransfer)", ReportType: 3 };
        $scope.ViBaVTBReports.push(item);
        item = { No: 6, ReportFileName: "Transaction Detail Report (InterBranch)", ReportType: 4 };
        $scope.ViBaVTBReports.push(item);

        //var item = { No: 6, ReportFileName: "File Transfer Payment Request Report", ReportType: 9 };
        var item = { No: 7, ReportFileName: "Transaction Summary Report", ReportType: 0 };  // importFile-ctrl.js: will add ReportType
        $scope.EXLReports.push(item);

        $scope.openfilereport = function ($index, ID) {

            importResource.ReportFileName = $scope.fileReports[$index].ReportFileName;
            importResource.ReportType = $scope.fileReports[$index].ReportType;
            // Gan File ID
            importResource.FileImportID = ID;
            var reportfilename = $scope.fileReports[$index].ReportFileName;
            $scope.isLoading = true;
            $scope.getReportFile();
        };

        $scope.openfileViBaVTBReport = function ($index, ID) {

            importResource.ReportFileName = $scope.ViBaVTBReports[$index].ReportFileName;
            importResource.ReportType = $scope.ViBaVTBReports[$index].ReportType;
            // Gan File ID
            importResource.FileImportID = ID;
            var reportfilename = $scope.ViBaVTBReports[$index].ReportFileName;
            $scope.isLoading = true;
            $scope.getReportFile();
        };

        $scope.openfileEXLReport = function ($index, ID) {

            importResource.ReportFileName = $scope.EXLReports[$index].ReportFileName;
            importResource.ReportType = $scope.EXLReports[$index].ReportType;
            // Gan File ID
            importResource.FileImportID = ID;
            var reportfilename = $scope.EXLReports[$index].ReportFileName;
            $scope.isLoading = true;
            $scope.getReportFile();
        };

        $scope.getReportFile = function ()
        {
            importResource.$getReportFile().then(function (data) {

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
        }

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

        // this function used to get all leads
        var getTransactionSummaryReport = function (sSource, aoData, fnCallback, oSettings) {

            $scope.pagingOptions.start = aoData[3].value;
            $scope.pagingOptions.length = aoData[4].value;
            $scope.pagingOptions.orderColumn = aoData[2].value[0].column;
            $scope.pagingOptions.orderDir = aoData[2].value[0].dir;
            index = $scope.pagingOptions.start + 1;

            //POST Parameters search condition
            appResource.FileName = $scope.SearchObject.FileName;
            appResource.FileStatus = $scope.SearchObject.FileStatus;
            appResource.FromDate = $scope.SearchObject.FromDate;
            appResource.ToDate = $scope.SearchObject.ToDate;
           
            appResource.FileType = fileType;

            //POST Parameters pagination result search
            appResource.start = $scope.pagingOptions.start;
            appResource.length = $scope.pagingOptions.length;
            appResource.orderColumn = $scope.pagingOptions.orderColumn;
            appResource.orderDir = $scope.pagingOptions.orderDir;

            appResource.$searchTransactionSummaryReport().then(function (data) {
                var records = {
                    'draw': 0,
                    'recordsTotal': 0,
                    'recordsFiltered': 0,
                    'data': []
                };
                if (data) {
                    records = {
                        'draw': aoData[0].value,
                        'recordsTotal': data.TotalFile,
                        'recordsFiltered': data.TotalFile,
                        'data': data.obj
                    };
                }
                $scope.pageData.total = data.TotalFile;
                fnCallback(records);
            });
        }

        ///
        // Build report type base on FileType of each row in Report Management page.
        ///
        function BuildDateFileType(data) {
            var html = "";
            if (data.FileType == "CTD" || data.FileType == "VTB") {
                html += "<div>"
                for (var i = 0; i < $scope.ViBaVTBReports.length; i++) {
                    var fileReport = $scope.ViBaVTBReports[i];
                    html += '<div><a href="javascript:void(0)" ng-click="openfileViBaVTBReport(' + i + ', ' + data.ID + ')">';
                    html += fileReport.ReportFileName;
                    html += '</a></div>';
                }
                html += "<div>"
            } else if (data.FileType == "EXL") {
                html = "";
                html += "<div>"
                for (var i = 0; i < $scope.EXLReports.length; i++) {
                    var fileReport = $scope.EXLReports[i];
                    html += '<div><a href="javascript:void(0)" ng-click="openfileEXLReport(' + i + ', ' + data.ID + ')">';
                    html += fileReport.ReportFileName;
                    html += '</a></div>';
                }
                html += "<div>"
            } else {
                html = "";
                html += "<div>"
                for (var i = 0; i < $scope.fileReports.length; i++) {
                    var fileReport = $scope.fileReports[i];
                    html += '<div><a href="javascript:void(0)" ng-click="openfilereport(' + i + ', ' + data.ID + ')">';
                    html += fileReport.ReportFileName;
                    html += '</a></div>';
                }
                html += "<div>"
            }
            return html;
        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $compile(nRow)($scope);
        }

        $scope.dtColumns = [
             DTColumnBuilder.newColumn(countIndex, 'No').withOption('defaultContent', "").notSortable(),
             DTColumnBuilder.newColumn("FileName", "File Name").withOption('defaultContent', ""),
             DTColumnBuilder.newColumn("Status", "Status").withOption('defaultContent', ""),
             DTColumnBuilder.newColumn(null, "View Reports").withOption('defaultContent', "").notSortable().renderWith(function (data, type) {
                 //return (data.FileType == 'CTD' || data.FileType == 'VTB') ?
                 //'<div ng-repeat="reportItem in ViBaVTBReports"><a href="javascript:void(0)" ng-click="openfileViBaVTBReport($index, ' + data.ID + ')">+ {{reportItem.ReportFileName}}</a></div>'
                 //:  ((data.FileType == 'EXL' || data.FileType == 'EXM') ? 
                 //    '<div ng-repeat="reportItem in EXLReports"><a href="javascript:void(0)" ng-click="openfileEXLReport($index, ' + data.ID + ')">+ {{reportItem.ReportFileName}}</a></div>'
                 //    : '<div ng-repeat="reportItem in fileReports"><a href="javascript:void(0)" ng-click="openfilereport($index, ' + data.ID + ')">+ {{reportItem.ReportFileName}}</a></div>')

                 return BuildDateFileType(data);


             }),
        ];

        $scope.dtNewOptions = DTOptionsBuilder.newOptions()
                .withFnServerData(getTransactionSummaryReport) // method name server call
                .withDataProp('data')// parameter name of list use in getLeads Fuction 
                .withOption('processing', true) // required
                .withOption('serverSide', true)// required
                .withOption('paging', true)// required
                .withPaginationType('full_numbers')
                .withOption('searching', false)
                .withOption('responsive', true)
                .withOption('rowCallback', rowCallback)
                .withDisplayLength(10);

        $scope.dtColumnDefs = [
         DTColumnDefBuilder.newColumnDef(8).notSortable()
        ];

        $scope.searchTransactionSummaryReport = function () {

            //POST Parameters search condition
            $scope.SearchObject.FileName = $scope.searchFileName;
            $scope.SearchObject.FileStatus = $scope.searchFileStatus;
            var searchFromDate = moment($('#searchFromDate').val(), 'DD/MM/YYYY hh:mm A').format('MM/DD/YYYY hh:mm a');
            var searchToDate = moment($('#searchToDate').val(), 'DD/MM/YYYY hh:mm A').format('MM/DD/YYYY hh:mm a');

            $scope.SearchObject.FromDate = searchFromDate;
            $scope.SearchObject.ToDate = searchToDate;

            $scope.SearchObject.FileType = fileType;

            $('#data-table').dataTable().fnClearTable();
            $scope.isLoading = false;
        }

        //$scope.searchTransactionSummaryReport();

        $scope.clearForm = function () {
            $scope.searchFileName = "";
            $scope.searchFileStatus = "";
            $('#searchFromDate').val("");
            $('#searchToDate').val("");
        }
      
        commonfunctions.hasDateTimepicker();
    }

    if (currentState == "report.domesticRemittanceReport") {
        $location.hash('top');
        $anchorScroll();
        // Init current date
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth(); 
        var year = today.getFullYear();
        $scope.CalendarInputDate = new Date(year, month, day);
        $scope.FileType = "All";
    }

    $scope.unprocessingFileReport = function (report) {
        var fileType = report.fileType;
        $scope.isLoading = true;
        $scope.isHiddenSucceedMsgBox = false; // initial mode should be false that indicates that succeed message box should be shown up
        appResource.$unprocessingFileReport({ fileType: fileType }).then(function (data) {
            // if success
            // succeed message box will be turned off
            if (data.success) {
                var file = commonfunctions.base64ToBlob(data.dataFile);
                window.navigator.msSaveOrOpenBlob(file, data.fileName);
                $scope.isLoading = false;
                $scope.isHiddenSucceedMsgBox = true;
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

    $scope.domesticRemittanceReport = function () {
        $scope.isLoading = true;
        var valueDate = commonfunctions.convertDateToDateStr($scope.CalendarInputDate);
        var FileType = $scope.FileType;
        var dateParts = valueDate.split("/");
        var valudeDateObject = new Date(Date.UTC(dateParts[2], dateParts[1] - 1, dateParts[0]))
        var TypeName;        
        appResource.ValueDate = valudeDateObject;
        appResource.FileType = FileType;
        appResource.$domesticRemittanceReport().then(function (data) {
            // if success
            if (data.success) {
                if (data.fileName == "" || data.fileName === undefined)
                {
                    if(FileType == "All")
                    {
                        TypeName = "GCP & MT101";
                    }
                    else
                    {
                        TypeName = FileType;
                    }
                    alert("Data does not exist in database with file type [" + TypeName + "] and Value Date [" + valueDate + "].");
                }
                else
                {
                    var file = commonfunctions.base64ToBlob(data.dataFile);
                    window.navigator.msSaveOrOpenBlob(file, data.fileName);
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

    $scope.isLoading = false;

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
