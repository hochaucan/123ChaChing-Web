var app = angular.module("RDash",
['ui.bootstrap',
'ui.router',
'oc.lazyLoad',
'common.services',
'ngCookies',
'datatables',
'ngResource',
'ncy-angular-breadcrumb',
'angucomplete-alt']);

/**
 * BreadCrumb configuration for the RDash module.
*/
app.config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        prefixStateName: 'home',
        template:
                  '  <span ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract">' +
                  '   <a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;</a>' +
                  '   <span ng-switch-when="true" style="color:red;">' +
                  '      <text ng-if="step.ncyBreadcrumbStateRef != ' + "'" + 'home' + "'" + '"></text>' +
                  '      {{step.ncyBreadcrumbLabel}}' +
                  '      <text ng-if="step.ncyBreadcrumbStateRef == ' + "'" + 'home' + "'" + '">&nbsp;&nbsp;</text>' +
                  '   </span>' +
                  '  </span>'
    });
});


/**
* cross site scripting prevention
* add X-XSRF-Token to http headers
*/
app.service('MyResourceInterceptor', ['$cookies', function ($cookies) {
    var token = angular.element('input[name="__RequestVerificationToken"]').attr('value'),
    operationUnit = angular.element('input[name="__operationUnit"]').attr('value'),
        service = this;
    service.request = function (config) {
        config.headers['X-XSRF-Token'] = token;
        config.headers['X-Operation-Unit'] = operationUnit;
        return config;
    };
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('MyResourceInterceptor');
}]);
// end cross site scripting prevention 



/**
 * Route configuration for the RDash module.
 */
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/home');
        // Application routes
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'Scripts/spa_admin/templates/home.html',
                ncyBreadcrumb: {
                    label: 'home'
                }
            })
            .state('settlementAccountNumber', {
                url: '/settlementAccountNumber',
                templateUrl: 'Scripts/spa_admin/views/settlementAccountNumber.html',
                ncyBreadcrumb: {
                    label: 'settlementAccountNumber'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa_admin/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa_admin/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa_admin/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa_admin/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa_admin/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa_admin/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
    }
]);


