(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("stateTreasuryResource",
                ["$resource",
                 stateTreasuryResource]);

    function stateTreasuryResource($resource) {
        function formDataObject(data) {
            var fd = new FormData();
            fd.append("fileByte", data.SelectedFile._file);
            fd.append("name", data.SelectedFile.name);
            fd.append("size", data.SelectedFile.size);
            fd.append("url", data.SelectedFile.url);
            fd.append("remarks", data.SelectedFile.remarks);
            return fd;
        }
        return $resource(virtualDirectory + "api/statetreasury/:action/:Id",
                { Id: '@id' },
                {
                    searchstatetreasury: { method: 'POST', params: { action: 'searchstatetreasury' } },
                    get: { method: 'GET' },
                    add: { method: 'POST', params: { action: 'add' } },
                    edit: { method: 'POST', params: { action: 'edit' } },
                    delete: { method: 'DELETE' },
                    import: {
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