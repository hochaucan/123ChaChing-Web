(function () {
    angular
        .module('ChaChingApp')
        .factory("accountResource", Service);

    function Service($resource) {
        var virtualDirectory = angular.element('input[name="__virtualDirectory"]').attr('value');

        //var service = {};

        //service.add = add;
        //service.edit = edit;

        //return service;

        //function add() {
        //    return 
        //}

        //return $resource
        //    (virtualDirectory + "api/Account/:action/:Id",
        //    { Id: '@id' },
        //    {
        //        add: { method: 'POST', params: { action: 'add' } },
        //        edit: { method: 'POST', params: { action: 'edit' } },
        //        delete: { method: 'DELETE' },
        //        initialIP: { method: 'GET', cache: false, params: { action: 'initialIP' } }
        //    }
        //    )
    }
})();