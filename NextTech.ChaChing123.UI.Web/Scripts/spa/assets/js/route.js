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
        //$urlRouterProvider.otherwise('/home');
        // Application routes
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'Scripts/spa/templates/home.html',
                ncyBreadcrumb: {
                    label: 'home'
                }
            })
            .state('help', {
                url: '/help',
                templateUrl: 'Scripts/spa/templates/help.html',
                ncyBreadcrumb: {
                    label: 'Help'
                }
            })
            .state('importfile', {
                url: '/importfile',
                templateUrl: 'Scripts/spa/views/importfile.html',
                ncyBreadcrumb: {
                    label: 'ImportFile',
                    parent: 'home'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('importfileapproval', {
                url: '/importfileapproval',
                templateUrl: 'Scripts/spa/views/importfileapproval.html',
                ncyBreadcrumb: {
                    label: 'ImportFileApproval',
                    parent: 'home'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('importfilemanagement', {
                url: '/importfilemanagement',
                templateUrl: 'Scripts/spa/views/importfilemanagement.html',
                ncyBreadcrumb: {
                    label: 'ImportFileManagement',
                    parent: 'home'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('importfile.vibadetail', {
                url: '/ViBa/:id',
                views: {
                    '@': {
                        templateUrl: 'Scripts/spa/views/ImportedVIBAFileDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'ImportViBaFile',
                    parent: 'importfile'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('importfile.detail', {
                url: '/:id',
                views: {
                    '@': {
                        templateUrl: 'Scripts/spa/views/ImportedFileDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Import file detail',
                    parent: 'importfile'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('transaction', {
                url: '/transaction',
                templateUrl: 'Scripts/spa/views/transaction.html',
                ncyBreadcrumb: {
                    label: 'Transaction',
                    parent: 'home'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('transaction.detailtransaction', {
                url: '/:id',
                views: {
                    '@': {
                        templateUrl: 'Scripts/spa/views/DetailTransaction.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Detail Transaction',
                    parent: 'transaction'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('parametersettings', {
                url: '/parametersetting',
                templateUrl: 'Scripts/spa/views/ParameterSetting.html',
                ncyBreadcrumb: {
                    label: 'parametersetting'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('report', {
                url: '/report',
                templateUrl: 'Scripts/spa/views/Report.html',
                ncyBreadcrumb: {
                    label: 'report'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('report.transactionSummaryReport', {
                url: '/:fileType/transactionSummaryReport',
                views: {
                    'reportContent': {
                        templateUrl: 'Scripts/spa/views/TransactionSummaryReport.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'TransactionSummaryReport',
                    parent: 'report'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })

            .state('report.domesticRemittanceReport', {
                url: '/:fileType/domesticRemittanceReport',
                views: {
                    'reportContent': {
                        templateUrl: 'Scripts/spa/views/DomesticRemittanceReport.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'DomesticRemittanceReport',
                    parent: 'report'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })

            .state('settlementAccountNumber', {
                url: '/settlementAccountNumber',
                templateUrl: 'Scripts/spa/views/settlementAccountNumber.html',
                ncyBreadcrumb: {
                    label: 'settlementAccountNumber'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('bankmapping', {
                url: '/bankmapping',
                templateUrl: 'Scripts/spa/views/BankMapping.html',
                ncyBreadcrumb: {
                    label: 'bankmapping'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('statetreasury', {
                url: '/statetreasury',
                templateUrl: 'Scripts/spa/views/statetreasury.html',
                ncyBreadcrumb: {
                    label: 'StateTreasury',
                    parent: 'home'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('bankCodeManagement', {
                url: '/bankCodeManagement',
                templateUrl: 'Scripts/spa/views/BankCodeManagement.html',
                ncyBreadcrumb: {
                    label: 'bankCodeManagement'
                },
                resolve: {
                    service: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                                'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                                'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                                'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                            ]
                        });
                    }]
                }
            })

            .state('newAccountStructureCrossRef', {
                url: '/newAccountStructureCrossRef',
                templateUrl: 'Scripts/spa/views/NewAccountStructureCrossRef.html',
                ncyBreadcrumb: {
                  label: 'newAccountStructureCrossRef'
              },
              resolve: {
                  service: ['$ocLazyLoad', function ($ocLazyLoad) {
                      return $ocLazyLoad.load({
                          serie: true,
                          files: [
                              'Scripts/spa/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css',
                              'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css',
                              'Scripts/spa/assets/plugins/DataTables/media/js/jquery.dataTables.js',
                              'Scripts/spa/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js',
                              'Scripts/spa/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js',
                              'Scripts/spa/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js'
                          ]
                      });
                  }]
              }
          })
    }
]);


