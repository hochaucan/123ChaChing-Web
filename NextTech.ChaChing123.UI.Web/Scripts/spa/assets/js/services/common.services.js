// set the virtual directory for the application
// in production, the url will start from /OLS....
// set the application virtual directory here
var virtualDirectory = angular.element('input[name="__virtualDirectory"]').attr('value');

(function () {
    "use strict";
    angular
        .module("common.services",
                ["ngResource"])

}());

// APF: Custom resource for user profile REST
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("userProfileResource",
                ["$resource",
                 userProfileResource]);

    function userProfileResource($resource) {
        return $resource(virtualDirectory + "/api/users/:action/:Id",
               { Id: '@id' },
               {
                   user: { method: 'POST', params: { action: 'user' } },
                   search: { method: 'POST', params: { action: 'search' } },
                   get: { method: 'GET' },
                   add: { method: 'POST', params: { action: 'add' } },
                   edit: { method: 'POST', params: { action: 'edit' } },
                   delete: { method: 'DELETE' }
               })
    }
}());

// APF: Custom resource for report REST
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("reportResource",
                ["$resource",
                 reportResource]);

    function reportResource($resource) {
        return $resource(virtualDirectory + "/api/sysreport/:action/:Id",
               { Id: '@id' },
               {
                   getbyapplicationid: {
                       method: 'POST',
                       params: { action: 'getbyapplicationid' }
                   },
                   search: { method: 'POST', params: { action: 'search' } },
                   get: { method: 'GET' },
                   add: { method: 'POST', params: { action: 'add' } },
                   edit: { method: 'POST', params: { action: 'edit' } },
                   delete: { method: 'DELETE' }
               })
    }
}());

// APF: Custom resource for upload REST
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("uploadResource",
                ["$resource",
                 uploadResource]);
function uploadResource($resource) {
    function formDataObject(data) {

        // pass in data.FileList where FileList contains
        // e.g.
        // var FileList = [];
        // var uploadFile = { SequenceNo: "", FileName: fileName, Remarks: "", fileByte: files[index] };
        // FileList.push(uploadFile);

        /*
                        // File Name 
                        name: item.name,
                        //File Size 
                        size: item.size,
                        //File URL to view 
                        url: URL.createObjectURL(item),
                        // File Input Value 
                        _file: item
        */

        var fd = new FormData();
        // loop through the FileList - below is sample code, not tested, please try yourselrf
        var index;
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
        return fd;
    }
    return $resource("/api/application/:action/:fileCount",
           { unitcode: '@fileCount' },
           {
               upload: {  // this is the upload method to call to update files
                   params: { action: 'upload'} ,
                   method: 'POST',
                   transformRequest: formDataObject,
                   headers: { 'Content-Type': undefined }
               }
           })
}
}());

