(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("bankMappingResource",
                ["$resource",
                 bankMappingResource]);

    function bankMappingResource($resource) {
        function formDataObject(data) {
            var fd = new FormData();
            fd.append("fileByte", data.SelectedFile._file);
            fd.append("name", data.SelectedFile.name);
            fd.append("size", data.SelectedFile.size);
            fd.append("url", data.SelectedFile.url);
            fd.append("remarks", data.SelectedFile.remarks);
            return fd;
        }

        return $resource(virtualDirectory + "api/bankmapping/:action/:Id",
               { Id: '@id' },
               {
                   get: { method: 'GET' },
                   add: { method: 'POST', params: { action: 'add' } },
                   edit: { method: 'POST', params: { action: 'edit' } },
                   delete: { method: 'DELETE' },
                   importDataByFiles: {  // this is the upload method to call to update files
                       params: { action: 'importDataByFiles' },
                       method: 'POST',
                       transformRequest: formDataObject,
                       headers: { 'Content-Type': undefined }
                   },
                   checkBankMappings: {
                       params: { action: 'checkBankMappings' },
                       method: 'POST',
                   },
                   exportBankMappings: {
                       params: { action: 'exportBankMappings' },
                       method: 'POST',
                   },
                   searchBankMapping: { method: 'POST', params: { action: 'searchBankMapping' } },
                   initialIP: { method: 'GET', cache: false, params: { action: 'initialIP' } },
               })
    }
}());