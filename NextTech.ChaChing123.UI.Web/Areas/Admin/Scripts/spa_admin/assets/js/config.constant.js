'use strict';

/**
 * Config constant
 */
var virtualDirectory = angular.element('input[name="__virtualDirectory"]').attr('value');
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'modernizr': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/components-modernizr/modernizr.js'],
        'moment': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/moment/min/moment.min.js'],
        'spin': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/spin.js/spin.js',

        //*** jQuery Plugins
        'perfect-scrollbar-plugin': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css'],
        'ladda': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ladda/dist/ladda.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ladda/dist/ladda-themeless.min.css'],
        'sweet-alert': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/sweetalert/lib/sweet-alert.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/sweetalert/lib/sweet-alert.css'],
        'chartjs': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/chartjs/Chart.min.js',
        'jquery-sparkline': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/jquery.sparkline.build/dist/jquery.sparkline.min.js',
        'ckeditor-plugin': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
		'spectrum-plugin': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/spectrum/spectrum.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/spectrum/spectrum.css'],
		
        //*** Controllers
        'dashboardCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/dashboardCtrl.js',
        'iconsCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/iconsCtrl.js',
        'vAccordionCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/vAccordionCtrl.js',
        'ckeditorCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/ckeditorCtrl.js',
        'laddaCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/laddaCtrl.js',
        'ngTableCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/ngTableCtrl.js',
        'ngTableMemberListCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/memberListCtrl.js',
        'ngTableOrderListCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/orderListCtrl.js',
        'ngTableLeadListCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/leadListCtrl.js',
        'ngTableDocumentManagerCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/documentManagerCtrl.js',
        'ngTableDocumentCategoryManagerCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/documentCategoryManagerCtrl.js',
        'cropCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/cropCtrl.js',
        'asideCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/asideCtrl.js',
        'toasterCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/toasterCtrl.js',
        'sweetAlertCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/sweetAlertCtrl.js',
        'mapsCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/mapsCtrl.js',
        'chartsCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/chartsCtrl.js',
        'calendarCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/calendarCtrl.js',
        'nestableCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/nestableCtrl.js',
        'validationCtrl': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/validationCtrl.js'],
        'userCtrl': [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/userCtrl.js'],
        'selectCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/selectCtrl.js',
        'wizardCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/wizardCtrl.js',
        'uploadCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/uploadCtrl.js',
        'treeCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/treeCtrl.js',
        'inboxCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/inboxCtrl.js',
        'xeditableCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/xeditableCtrl.js',
        'chatCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/chatCtrl.js',
        'dynamicTableCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/dynamicTableCtrl.js',
        'NotificationIconsCtrl': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/controllers/notificationIconsCtrl.js',
        
        //*** Filters
        'htmlToPlaintext': virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/filters/htmlToPlaintext.js'
    },
    //*** angularJS Modules
    modules: [{
        name: 'angularMoment',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-moment/angular-moment.min.js']
    }, {
        name: 'toaster',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/AngularJS-Toaster/toaster.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'angular-ladda',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-ladda/dist/angular-ladda.min.js']
    }, {
        name: 'ngTable',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ng-table/dist/ng-table.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.select',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-ui-select/dist/select.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-ui-select/dist/select.min.css', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/select2/dist/css/select2.min.css', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/select2-bootstrap-css/select2-bootstrap.min.css', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/selectize/dist/css/selectize.bootstrap3.css']
    }, {
        name: 'ui.mask',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-ui-utils/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ngImgCrop/compile/minified/ng-img-crop.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-file-upload/angular-file-upload.min.js']
    }, {
        name: 'ngAside',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-aside/dist/js/angular-aside.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-aside/dist/css/angular-aside.min.css']
    }, {
        name: 'truncate',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-truncate/src/truncate.js']
    }, {
        name: 'oitozero.ngSweetAlert',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-sweetalert-promised/SweetAlert.min.js']
    }, {
        name: 'monospaced.elastic',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'tc.chartjs',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/tc-angular-chartjs/dist/tc-angular-chartjs.min.js']
    }, {
        name: 'flow',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'uiSwitch',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-ui-switch/angular-ui-switch.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-ui-switch/angular-ui-switch.min.css']
    }, {
        name: 'ckeditor',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'vAccordion',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/v-accordion/dist/v-accordion.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/v-accordion/dist/v-accordion.min.css']
    }, {
        name: 'xeditable',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-xeditable/dist/js/xeditable.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-xeditable/dist/css/xeditable.css', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/checklist-model/checklist-model.js']
    }, {
        name: 'angular-notification-icons',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-notification-icons/dist/angular-notification-icons.min.js', virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-notification-icons/dist/angular-notification-icons.min.css']
    }, {
        name: 'angularSpectrumColorpicker',
        files: [virtualDirectory + 'Areas/Admin/Scripts/spa_admin/bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js']
    }]
});
