﻿(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("bankCodeManagementResource",
                ["$resource",
                 bankCodeManagementResource]);

    function bankCodeManagementResource($resource) {

        function formDataObject(data) {
            var fd = new FormData();
            fd.append("fileByte", data.SelectedFile._file);
            fd.append("name", data.SelectedFile.name);
            fd.append("size", data.SelectedFile.size);
            fd.append("url", data.SelectedFile.url);
            fd.append("remarks", data.SelectedFile.remarks);
            return fd;
        }

        return $resource(virtualDirectory + "api/bankCodeManagement/:action/:Id", /* same with code Controllers.cs  [RoutePrefix("api/bankCodeManagement")] */
               { Id: '@id' },
               {
                   /*get: { method: 'GET' },*/
                   

                   Search: {method: 'POST', params: {action: 'search'} },
                   // View: { method: 'GET', params: { action: 'view' } }, // same as  view
                   add: { method: 'POST', params: { action: 'add' } },
                   edit: { method: 'POST', params: { action: 'edit' } },
                   delete: { method: 'DELETE' },

                   import: {  // this is the upload method to call to update files
                        method: 'POST',
                        params: { action: 'import' },
                        transformRequest: formDataObject,
                        headers: { 'Content-Type': undefined }
                   },
                   export: { method: 'POST', params: { action: 'export' } },
                   initialIP: { method: 'GET', cache: false, params: { action: 'initialIP' } }
               })
    }
}());