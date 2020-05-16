'use strict';

/**
 * Config constant
 */
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
        'modernizr': ['Scripts/spa_portal/bower_components/components-modernizr/modernizr.js'],
        'moment': ['Scripts/spa_portal/bower_components/moment/min/moment.min.js'],
        'spin': 'Scripts/spa_portal/bower_components/spin.js/spin.js',

        //*** jQuery Plugins
        'perfect-scrollbar-plugin': ['Scripts/spa_portal/bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js', 'Scripts/spa_portal/bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css'],
        'ladda': ['Scripts/spa_portal/bower_components/ladda/dist/ladda.min.js', 'Scripts/spa_portal/bower_components/ladda/dist/ladda-themeless.min.css'],
        'sweet-alert': ['Scripts/spa_portal/bower_components/sweetalert/lib/sweet-alert.min.js', 'Scripts/spa_portal/bower_components/sweetalert/lib/sweet-alert.css'],
        'chartjs': 'Scripts/spa_portal/bower_components/chartjs/Chart.min.js',
        'jquery-sparkline': 'Scripts/spa_portal/bower_components/jquery.sparkline.build/dist/jquery.sparkline.min.js',
        'ckeditor-plugin': 'Scripts/spa_portal/bower_components/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['Scripts/spa_portal/bower_components/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['Scripts/spa_portal/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', 'Scripts/spa_portal/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
		'spectrum-plugin': ['Scripts/spa_portal/bower_components/spectrum/spectrum.js', 'Scripts/spa_portal/bower_components/spectrum/spectrum.css'],
		
        //*** Controllers
        'dashboardCtrl': 'Scripts/spa_portal/assets/js/controllers/dashboardCtrl.js',
        'iconsCtrl': 'Scripts/spa_portal/assets/js/controllers/iconsCtrl.js',
        'vAccordionCtrl': 'Scripts/spa_portal/assets/js/controllers/vAccordionCtrl.js',
        'ckeditorCtrl': 'Scripts/spa_portal/assets/js/controllers/ckeditorCtrl.js',
        'laddaCtrl': 'Scripts/spa_portal/assets/js/controllers/laddaCtrl.js',
        'ngTableCtrl': 'Scripts/spa_portal/assets/js/controllers/ngTableCtrl.js',
        'ngTableAffiliateCtrl': 'Scripts/spa_portal/assets/js/controllers/ngTableAffiliateCtrl.js',
        'ngTableLeadListCtrl': 'Scripts/spa_portal/assets/js/controllers/leadListCtrl.js',
        'ngTableSoloPageListCtrl': 'Scripts/spa_portal/assets/js/controllers/editorSoloPageListCtrl.js',
        'ngTableAutoResponderCtrl': 'Scripts/spa_portal/assets/js/controllers/autoResponderManagerCtrl.js',
        'cropCtrl': 'Scripts/spa_portal/assets/js/controllers/cropCtrl.js',
        'asideCtrl': 'Scripts/spa_portal/assets/js/controllers/asideCtrl.js',
        'toasterCtrl': 'Scripts/spa_portal/assets/js/controllers/toasterCtrl.js',
        'sweetAlertCtrl': 'Scripts/spa_portal/assets/js/controllers/sweetAlertCtrl.js',
        'mapsCtrl': 'Scripts/spa_portal/assets/js/controllers/mapsCtrl.js',
        'chartsCtrl': 'Scripts/spa_portal/assets/js/controllers/chartsCtrl.js',
        'leadDetailsCtrl': 'Scripts/spa_portal/assets/js/controllers/leadDetailsCtrl.js',
        'calendarCtrl': 'Scripts/spa_portal/assets/js/controllers/calendarCtrl.js',
        'nestableCtrl': 'Scripts/spa_portal/assets/js/controllers/nestableCtrl.js',
        'userCtrl': ['Scripts/spa_portal/assets/js/controllers/userCtrl.js'],
        'selectCtrl': 'Scripts/spa_portal/assets/js/controllers/selectCtrl.js',
        'wizardCtrl': 'Scripts/spa_portal/assets/js/controllers/wizardCtrl.js',
        'uploadCtrl': 'Scripts/spa_portal/assets/js/controllers/uploadCtrl.js',
        'treeCtrl': 'Scripts/spa_portal/assets/js/controllers/treeCtrl.js',
        'inboxCtrl': 'Scripts/spa_portal/assets/js/controllers/inboxCtrl.js',
        'xeditableCtrl': 'Scripts/spa_portal/assets/js/controllers/xeditableCtrl.js',
        'chatCtrl': 'Scripts/spa_portal/assets/js/controllers/chatCtrl.js',
        'dynamicTableCtrl': 'Scripts/spa_portal/assets/js/controllers/dynamicTableCtrl.js',
        'NotificationIconsCtrl': 'Scripts/spa_portal/assets/js/controllers/notificationIconsCtrl.js',

        //*** Filters
        'htmlToPlaintext': 'Scripts/spa_portal/assets/js/filters/htmlToPlaintext.js'
    },
    //*** angularJS Modules
    modules: [{
        name: 'angularMoment',
        files: ['Scripts/spa_portal/bower_components/angular-moment/angular-moment.min.js']
    }, {
        name: 'toaster',
        files: ['Scripts/spa_portal/bower_components/AngularJS-Toaster/toaster.js', 'Scripts/spa_portal/bower_components/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['Scripts/spa_portal/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', 'Scripts/spa_portal/bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'angular-ladda',
        files: ['Scripts/spa_portal/bower_components/angular-ladda/dist/angular-ladda.min.js']
    }, {
        name: 'ngTable',
        files: ['Scripts/spa_portal/bower_components/ng-table/dist/ng-table.min.js', 'Scripts/spa_portal/bower_components/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.select',
        files: ['Scripts/spa_portal/bower_components/angular-ui-select/dist/select.min.js', 'Scripts/spa_portal/bower_components/angular-ui-select/dist/select.min.css', 'Scripts/spa_portal/bower_components/select2/dist/css/select2.min.css', 'Scripts/spa_portal/bower_components/select2-bootstrap-css/select2-bootstrap.min.css', 'Scripts/spa_portal/bower_components/selectize/dist/css/selectize.bootstrap3.css']
    }, {
        name: 'ui.mask',
        files: ['Scripts/spa_portal/bower_components/angular-ui-utils/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['Scripts/spa_portal/bower_components/ngImgCrop/compile/minified/ng-img-crop.js', 'Scripts/spa_portal/bower_components/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['Scripts/spa_portal/bower_components/angular-file-upload/angular-file-upload.min.js']
    }, {
        name: 'ngAside',
        files: ['Scripts/spa_portal/bower_components/angular-aside/dist/js/angular-aside.min.js', 'Scripts/spa_portal/bower_components/angular-aside/dist/css/angular-aside.min.css']
    }, {
        name: 'truncate',
        files: ['Scripts/spa_portal/bower_components/angular-truncate/src/truncate.js']
    }, {
        name: 'oitozero.ngSweetAlert',
        files: ['Scripts/spa_portal/bower_components/angular-sweetalert-promised/SweetAlert.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['Scripts/spa_portal/bower_components/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['Scripts/spa_portal/bower_components/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'tc.chartjs',
        files: ['Scripts/spa_portal/bower_components/tc-angular-chartjs/dist/tc-angular-chartjs.min.js']
    }, {
        name: 'flow',
        files: ['Scripts/spa_portal/bower_components/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'uiSwitch',
        files: ['Scripts/spa_portal/bower_components/angular-ui-switch/angular-ui-switch.min.js', 'Scripts/spa_portal/bower_components/angular-ui-switch/angular-ui-switch.min.css']
    }, {
        name: 'ckeditor',
        files: ['Scripts/spa_portal/bower_components/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['Scripts/spa_portal/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', 'Scripts/spa_portal/bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', 'Scripts/spa_portal/assets/js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: ['Scripts/spa_portal/bower_components/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'vAccordion',
        files: ['Scripts/spa_portal/bower_components/v-accordion/dist/v-accordion.min.js', 'Scripts/spa_portal/bower_components/v-accordion/dist/v-accordion.min.css']
    }, {
        name: 'xeditable',
        files: ['Scripts/spa_portal/bower_components/angular-xeditable/dist/js/xeditable.min.js', 'Scripts/spa_portal/bower_components/angular-xeditable/dist/css/xeditable.css', 'Scripts/spa_portal/assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['Scripts/spa_portal/bower_components/checklist-model/checklist-model.js']
    }, {
        name: 'angular-notification-icons',
        files: ['Scripts/spa_portal/bower_components/angular-notification-icons/dist/angular-notification-icons.min.js', 'Scripts/spa_portal/bower_components/angular-notification-icons/dist/angular-notification-icons.min.css']
    }, {
        name: 'angularSpectrumColorpicker',
        files: ['Scripts/spa_portal/bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js']
    }]
});
