(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("importFileResource",
                ["$resource",
                 importFileResource]);

    function importFileResource($resource) {
        function formDataObject(data) {
            var fd = new FormData();
            // loop through the FileList - below is sample code, not tested, please try yourselrf
            var index;
            if (data.FileList) {
                for (index = 0; index < data.FileList.length; ++index) {
                    var arrFileName = [];
                    var arrRemarks = [];
                    var arrFileSize = [];
                    var arrUrl = [];
                    var item = data.FileList[index];
                    i = i + 1;
                    arrFileName.push(item.name);
                    arrRemarks.push(item.remarks);
                    arrFileSize.push(item.size);
                    arrUrl.push(item.url);
                    fd.append("fileByte_" + index.toString(), item._file);
                    fd.append("name_" + index.toString(), arrFileName);
                    fd.append("size_" + index.toString(), arrFileSize);
                    fd.append("url_" + index.toString(), arrUrl);
                    fd.append("remarks_" + index.toString(), arrRemarks);
                }
            }
            return fd;
        }
        return $resource(virtualDirectory + "api/importfile/:action/:parameter",
               { date: '@date' },
               {
                   initialIP: { method: 'GET', cache: false, params: { action: 'initialIP' } },
                   search: { method: 'POST', params: { action: 'search' } },
                   getImportedFilesByBranch: { method: 'POST', params: { action: 'getImportedFilesByBranch' } },
                   getImportedFilesApprovalByBranch: { method: 'POST', params: { action: 'getImportedFilesApprovalByBranch' } },
                   importDataByFile: {  // this is the upload method to call to update files
                       method: 'POST',
                       params: { action: 'importDataByFile' },
                       transformRequest: formDataObject,
                       headers: {'Content-Type': undefined,'Pragma': 'no-cache, no-store, must-revalidate','Expires': 0,'Cache-Control': 'no-cache'
                       }
                   },
                   showContentLogfile: { params: { action: 'showContentLogfile' }, method: 'POST' },
                   getLogFilesByBranch: { method: 'GET', params: { action: 'getLogFilesByBranch' } },
                   approve: { params: { action: 'approve' }, method: 'POST' },
                   reject: { params: { action: 'reject' }, method: 'POST' },
                   printReport: { params: { action: 'printReport' }, method: 'POST' },
                   getFileStatusList: { method: 'GET', params: { action: 'getFileStatusList' } },
                   getFileTypeList: { method: 'GET', params: { action: 'getFileTypeList' } },
                   searchimportfilelist: { method: 'POST', params: { action: 'searchimportfilelist' } },
                   download: { method: 'POST', params: { action: 'download' } },
                   desryptAndDownload: { method: 'POST', params: { action: 'desryptAndDownload' } }
               })
    }
}());