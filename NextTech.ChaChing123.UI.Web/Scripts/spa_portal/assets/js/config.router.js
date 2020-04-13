'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/app/home");
    //
    // Set up the states
        $stateProvider.state('app', {
            url: "/app",
            templateUrl: "Scripts/spa_portal/assets/views/app.html",
            resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl', 'truncate', 'htmlToPlaintext', 'angular-notification-icons'),
            abstract: true
        }).state('app.home', {
            url: "/home",
            templateUrl: "Scripts/spa_portal/assets/views/dashboard.html",
            resolve: loadSequence('chartjs', 'tc.chartjs', 'leadDetailsCtrl'),
            title: 'Home',
            ncyBreadcrumb: {
                label: 'Home'
            }
            // Login routes
        }).state('app.aboutus', {
            url: '/aboutus',
            templateUrl: "Scripts/spa_portal/assets/views/pricing.html"
        }).state('app.login', {
            url: '/login',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Đăng Nhập',
            ncyBreadcrumb: {
                label: 'Đăng Nhập'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.login.signin', {
            url: '/signin',
            templateUrl: "Scripts/spa_portal/assets/views/login_login.html",
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.dologin', {
            url: '/dologin/:username/:sessionkey',
            templateUrl: "Scripts/spa_portal/assets/views/login_login.html"
        }).state('app.login.forgot', {
            url: '/forgot',
            templateUrl: "Scripts/spa_portal/assets/views/login_forgot.html"
        }).state('app.login.registration', {
            url: '/registration',
            templateUrl: "Scripts/spa_portal/assets/views/login_registration.html",
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.login.lockscreen', {
            url: '/lock',
            templateUrl: "Scripts/spa_portal/assets/views/login_lock_screen.html"
        }).state('app.profile', {
            url: '/profile',
            templateUrl: "Scripts/spa_portal/assets/views/pages_user_profile.html",
            title: 'Tài Khoản Của Tôi',
            ncyBreadcrumb: {
                label: 'Thông tin tài khoản'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.affiliate', {
            url: '/affiliate',
            templateUrl: "Scripts/spa_portal/assets/views/affiliate.html",
            title: 'Affiliate',
            ncyBreadcrumb: {
                label: 'Affiliate'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.editor', {
            url: '/editor',
            templateUrl: "Scripts/spa_portal/assets/views/editor.html",
            title: 'editor',
            ncyBreadcrumb: {
                label: 'editor'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.editor2', {
            url: '/editor2',
            templateUrl: "Scripts/spa_portal/assets/views/editor2.html",
            title: 'editor',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.editor2.solo', {
            url: '/solo',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Manage Solo Page',
            ncyBreadcrumb: {
                label: 'Manage Solo Page'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.editor2.solo.add', {
            url: '/add',
            templateUrl: "Scripts/spa_portal/assets/views/editor_create_new_solo_page.html",
            title: 'Create New Solo Page',
            ncyBreadcrumb: {
                label: 'Create New Solo Page'
            }
        }).state('app.editor2.solo.manage', {
            url: '/manage',
            templateUrl: "Scripts/spa_portal/assets/views/editor_manage_solo_page.html",
            title: 'Create New Solo Page',
            ncyBreadcrumb: {
                label: 'Create New Solo Page'
            },
            resolve: loadSequence('ngTable', 'ngTableSoloPageListCtrl')
        }).state('app.editor2.solo.edit', {
            url: '/edit/:id',
            templateUrl: "Scripts/spa_portal/assets/views/editor_edit_mypage.html",
            title: 'Edit Solo Page',
            ncyBreadcrumb: {
                label: 'Edit Solo Page'
            }
        }).state('app.editor2.funnels', {
            url: '/funnels',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Manage Funnels Page',
            ncyBreadcrumb: {
                label: 'Manage Funnels Page'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.editor2.funnels.manage', {
            url: '/manage',
            templateUrl: "Scripts/spa_portal/assets/views/funnel.html",
            title: 'Funnels',
            ncyBreadcrumb: {
                label: 'editor'
            },
            resolve: loadSequence('ngTable', 'ngTableSoloPageListCtrl')
        }).state('app.editor2.funnels.add', {
            url: '/add',
            templateUrl: "Scripts/spa_portal/assets/views/funnel_add_edit.html",
            title: 'Add New Funnel',
            ncyBreadcrumb: {
                label: 'editor'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.editor2.funnels.edit', {
            url: '/edit/:id',
            templateUrl: "Scripts/spa_portal/assets/views/funnel_add_edit.html",
            title: 'Edit New Funnel',
            ncyBreadcrumb: {
                label: 'editor'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.mypages', {
            url: '/mypages/edit/:id',
            templateUrl: "Scripts/spa_portal/assets/views/editor_edit_mypage.html",
            title: 'mypae',
            ncyBreadcrumb: {
                label: 'mypage'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.funnels', {
            url: '/funnels',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Funnels'
        }).state('app.funnels.manage', {
            url: '/manage',
            templateUrl: "Scripts/spa_portal/assets/views/funnel.html",
            title: 'Funnels',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.funnels.add', {
            url: '/add',
            templateUrl: "Scripts/spa_portal/assets/views/funnel_add_edit.html",
            title: 'Add New Funnel',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.funnels.edit', {
            url: '/edit/:id',
            templateUrl: "Scripts/spa_portal/assets/views/funnel_add_edit.html",
            title: 'Edit New Funnel',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.lead', {
            url: '/lead',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Khách Hàng',
            ncyBreadcrumb: {
                label: 'Khách Hàng'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.lead.manage', {
            url: '/manage',
            templateUrl: "Scripts/spa_portal/assets/views/lead.html",
            title: 'Quản Lý Khách Hàng',
            ncyBreadcrumb: {
                label: 'Quản Lý Khách Hàng'
            },
            resolve: loadSequence('ngTable', 'ngTableLeadListCtrl')
        }).state('app.lead.details', {
            url: '/details/:id',
            templateUrl: "Scripts/spa_portal/assets/views/lead_details.html",
            title: 'Chi Tiết Khách Hàng',
            resolve: loadSequence('chartjs', 'tc.chartjs', 'leadDetailsCtrl')
        }).state('app.lead.add', {
            url: '/add',
            templateUrl: "Scripts/spa_portal/assets/views/lead_add_edit.html",
            title: 'Thêm Khách Hàng',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.lead.edit', {
            url: '/edit/:id',
            templateUrl: "Scripts/spa_portal/assets/views/lead_add_edit.html",
            title: 'Sửa Khách Hàng',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.documents', {
            url: '/documents',
            templateUrl: "Scripts/spa_portal/assets/views/document.html",
            title: 'Tài Liệu',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.document', {
            url: '/document',
            templateUrl: "Scripts/spa_portal/assets/views/document.html",
            title: 'Tài Liệu',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.document.usermanual', {
            url: '/usermanual',
            templateUrl: "Scripts/spa_portal/assets/views/document_user_manual.html",
            title: 'Hướng Dẫn Sử Dụng',
            ncyBreadcrumb: {
                label: 'Hướng Dẫn Sử Dụng'
            }
            //resolve: { isAuthenticated: isAuthenticated }
        }).state('app.document.generalmarketing', {
            url: '/generalmarketing',
            templateUrl: "Scripts/spa_portal/assets/views/document_general_marketing.html",
            title: 'Marketing Tổng Thể',
            ncyBreadcrumb: {
                label: 'Marketing Tổng Thể'
            }
        }).state('app.document.advancedmarketing', {
            url: '/advancedmarketing',
            templateUrl: "Scripts/spa_portal/assets/views/document_advanced_marketing.html",
            title: 'Marketing Cao Cấp',
            ncyBreadcrumb: {
                label: 'Marketing Cao Cấp'
            }
            //resolve: loadSequence('ngTable', 'ngTableSoloPageListCtrl')
        }).state('app.document.courses', {
            url: '/courses',
            templateUrl: "Scripts/spa_portal/assets/views/document_course.html",
            title: 'Khóa Học',
            ncyBreadcrumb: {
                label: 'Khóa Học'
            }
        }).state('app.response', {
            url: '/response',
            templateUrl: "Scripts/spa_portal/assets/views/response.html",
            title: 'Trả Lời Nhanh',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.response.now', {
            url: '/now',
            templateUrl: "Scripts/spa_portal/assets/views/response_now.html",
            title: 'Trả Lời Nhanh',
            ncyBreadcrumb: {
                label: 'Trả Lời Nhanh'
            }
            //resolve: { isAuthenticated: isAuthenticated }
        }).state('app.response.script', {
            url: '/script',
            templateUrl: "Scripts/spa_portal/assets/views/response_script.html",
            title: 'Nhắn Tin Theo Kịch Bản',
            ncyBreadcrumb: {
                label: 'Nhắn Tin Theo Kịch Bản'
            }
        }).state('app.response.rebuttal', {
            url: '/rebuttal',
            templateUrl: "Scripts/spa_portal/assets/views/response_rebuttal.html",
            title: 'Xử Lý Sự Từ Chối',
            ncyBreadcrumb: {
                label: 'Xử Lý Sự Từ Chối'
            }
        }).state('app.notification', {
            url: '/notification',
            templateUrl: "Scripts/spa_portal/assets/views/notification.html",
            title: 'Thông Báo',
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.notification.all', {
            url: '/all',
            templateUrl: "Scripts/spa_portal/assets/views/notification_all.html",
            title: 'Tất Cả',
            ncyBreadcrumb: {
                label: 'Tất Cả'
            }
        }).state('app.notification.system', {
            url: '/system',
            templateUrl: "Scripts/spa_portal/assets/views/notification_system.html",
            title: 'Hệ Thống',
            ncyBreadcrumb: {
                label: 'Hệ Thống'
            }
        }).state('app.notification.newlead', {
            url: '/newlead',
            templateUrl: "Scripts/spa_portal/assets/views/notification_newlead.html",
            title: 'Cá Nhân',
            ncyBreadcrumb: {
                label: 'Cá Nhân'
            }
        }).state('app.ui', {
            url: '/ui',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'UI Elements',
            ncyBreadcrumb: {
                label: 'UI Elements'
            }
        }).state('app.ui.elements', {
            url: '/elements',
            templateUrl: "Scripts/spa_portal/assets/views/ui_elements.html",
            title: 'Elements',
            icon: 'ti-layout-media-left-alt',
            ncyBreadcrumb: {
                label: 'Elements'
            }
        }).state('app.ui.buttons', {
            url: '/buttons',
            templateUrl: "Scripts/spa_portal/assets/views/ui_buttons.html",
            title: 'Buttons',
            resolve: loadSequence('spin', 'ladda', 'angular-ladda', 'laddaCtrl'),
            ncyBreadcrumb: {
                label: 'Buttons'
            }
        }).state('app.ui.links', {
            url: '/links',
            templateUrl: "Scripts/spa_portal/assets/views/ui_links.html",
            title: 'Link Effects',
            ncyBreadcrumb: {
                label: 'Link Effects'
            }
        }).state('app.ui.icons', {
            url: '/icons',
            templateUrl: "Scripts/spa_portal/assets/views/ui_icons.html",
            title: 'Font Awesome Icons',
            ncyBreadcrumb: {
                label: 'Font Awesome Icons'
            },
            resolve: loadSequence('iconsCtrl')
        }).state('app.ui.lineicons', {
            url: '/line-icons',
            templateUrl: "Scripts/spa_portal/assets/views/ui_line_icons.html",
            title: 'Linear Icons',
            ncyBreadcrumb: {
                label: 'Linear Icons'
            },
            resolve: loadSequence('iconsCtrl')
        }).state('app.ui.modals', {
            url: '/modals',
            templateUrl: "Scripts/spa_portal/assets/views/ui_modals.html",
            title: 'Modals',
            ncyBreadcrumb: {
                label: 'Modals'
            },
            resolve: loadSequence('asideCtrl')
        }).state('app.ui.toggle', {
            url: '/toggle',
            templateUrl: "Scripts/spa_portal/assets/views/ui_toggle.html",
            title: 'Toggle',
            ncyBreadcrumb: {
                label: 'Toggle'
            }
        }).state('app.ui.tabs_accordions', {
            url: '/accordions',
            templateUrl: "Scripts/spa_portal/assets/views/ui_tabs_accordions.html",
            title: "Tabs & Accordions",
            ncyBreadcrumb: {
                label: 'Tabs & Accordions'
            },
            resolve: loadSequence('vAccordionCtrl')
        }).state('app.ui.panels', {
            url: '/panels',
            templateUrl: "Scripts/spa_portal/assets/views/ui_panels.html",
            title: 'Panels',
            ncyBreadcrumb: {
                label: 'Panels'
            }
        }).state('app.ui.notifications', {
            url: '/notifications',
            templateUrl: "Scripts/spa_portal/assets/views/ui_notifications.html",
            title: 'Notifications',
            ncyBreadcrumb: {
                label: 'Notifications'
            },
            resolve: loadSequence('toasterCtrl', 'sweetAlertCtrl', 'NotificationIconsCtrl')
        }).state('app.ui.treeview', {
            url: '/treeview',
            templateUrl: "Scripts/spa_portal/assets/views/ui_tree.html",
            title: 'TreeView',
            ncyBreadcrumb: {
                label: 'Treeview'
            },
            resolve: loadSequence('angularBootstrapNavTree', 'treeCtrl')
        }).state('app.ui.media', {
            url: '/media',
            templateUrl: "Scripts/spa_portal/assets/views/ui_media.html",
            title: 'Media',
            ncyBreadcrumb: {
                label: 'Media'
            }
        }).state('app.ui.nestable', {
            url: '/nestable2',
            templateUrl: "Scripts/spa_portal/assets/views/ui_nestable.html",
            title: 'Nestable List',
            ncyBreadcrumb: {
                label: 'Nestable List'
            },
            resolve: loadSequence('jquery-nestable-plugin', 'ng-nestable', 'nestableCtrl')
        }).state('app.ui.typography', {
            url: '/typography',
            templateUrl: "Scripts/spa_portal/assets/views/ui_typography.html",
            title: 'Typography',
            ncyBreadcrumb: {
                label: 'Typography'
            }
        }).state('app.table', {
            url: '/table',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Tables',
            ncyBreadcrumb: {
                label: 'Tables'
            }
        }).state('app.table.basic', {
            url: '/basic',
            templateUrl: "Scripts/spa_portal/assets/views/table_basic.html",
            title: 'Basic Tables',
            ncyBreadcrumb: {
                label: 'Basic'
            }
        }).state('app.table.responsive', {
            url: '/responsive',
            templateUrl: "Scripts/spa_portal/assets/views/table_responsive.html",
            title: 'Responsive Tables',
            ncyBreadcrumb: {
                label: 'Responsive'
            }
        }).state('app.table.dynamic', {
            url: '/dynamic',
            templateUrl: "Scripts/spa_portal/assets/views/table_dynamic.html",
            title: 'Dynamic Tables',
            ncyBreadcrumb: {
                label: 'Dynamic'
            },
            resolve: loadSequence('dynamicTableCtrl')
        }).state('app.table.data', {
            url: '/data',
            templateUrl: "Scripts/spa_portal/assets/views/table_data.html",
            title: 'ngTable',
            ncyBreadcrumb: {
                label: 'ngTable'
            },
            resolve: loadSequence('ngTable', 'ngTableCtrl')
        }).state('app.table.export', {
            url: '/export',
            templateUrl: "Scripts/spa_portal/assets/views/table_export.html",
            title: 'Table'
        }).state('app.form', {
            url: '/form',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Forms',
            ncyBreadcrumb: {
                label: 'Forms'
            }
        }).state('app.form.elements', {
            url: '/elements',
            templateUrl: "Scripts/spa_portal/assets/views/form_elements.html",
            title: 'Forms Elements',
            ncyBreadcrumb: {
                label: 'Elements'
            },
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'ui.mask', 'touchspin-plugin', 'selectCtrl', 'spectrum-plugin', 'angularSpectrumColorpicker')
        }).state('app.form.xeditable', {
            url: '/xeditable',
            templateUrl: "Scripts/spa_portal/assets/views/form_xeditable.html",
            title: 'Angular X-Editable',
            ncyBreadcrumb: {
                label: 'X-Editable'
            },
            resolve: loadSequence('xeditable', 'checklist-model', 'xeditableCtrl')
        }).state('app.form.texteditor', {
            url: '/editor',
            templateUrl: "Scripts/spa_portal/assets/views/form_text_editor.html",
            title: 'Text Editor',
            ncyBreadcrumb: {
                label: 'Text Editor'
            },
            resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
        }).state('app.form.wizard', {
            url: '/wizard',
            templateUrl: "Scripts/spa_portal/assets/views/form_wizard.html",
            title: 'Form Wizard',
            ncyBreadcrumb: {
                label: 'Wizard'
            },
            resolve: loadSequence('wizardCtrl')
        }).state('app.form.validation', {
            url: '/validation',
            templateUrl: "Scripts/spa_portal/assets/views/form_validation.html",
            title: 'Form Validation',
            ncyBreadcrumb: {
                label: 'Validation'
            },
            resolve: loadSequence('validationCtrl')
        }).state('app.form.cropping', {
            url: '/image-cropping',
            templateUrl: "Scripts/spa_portal/assets/views/form_image_cropping.html",
            title: 'Image Cropping',
            ncyBreadcrumb: {
                label: 'Image Cropping'
            },
            resolve: loadSequence('ngImgCrop', 'cropCtrl')
        }).state('app.form.upload', {
            url: '/file-upload',
            templateUrl: "Scripts/spa_portal/assets/views/form_file_upload.html",
            title: 'Multiple File Upload',
            ncyBreadcrumb: {
                label: 'File Upload'
            },
            resolve: loadSequence('angularFileUpload', 'uploadCtrl')
        }).state('app.pages', {
            url: '/pages',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Pages',
            ncyBreadcrumb: {
                label: 'Pages'
            }
        }).state('app.pages.user', {
            url: '/user',
            templateUrl: "Scripts/spa_portal/assets/views/pages_user_profile.html",
            title: 'User Profile',
            ncyBreadcrumb: {
                label: 'User Profile'
            },
            resolve: loadSequence('flow', 'userCtrl')
        }).state('app.pages.invoice', {
            url: '/invoice',
            templateUrl: "Scripts/spa_portal/assets/views/pages_invoice.html",
            title: 'Invoice',
            ncyBreadcrumb: {
                label: 'Invoice'
            }
        }).state('app.pages.timeline', {
            url: '/timeline',
            templateUrl: "Scripts/spa_portal/assets/views/pages_timeline.html",
            title: 'Timeline',
            ncyBreadcrumb: {
                label: 'Timeline'
            },
            resolve: loadSequence('ngMap')
        }).state('app.pages.calendar', {
            url: '/calendar',
            templateUrl: "Scripts/spa_portal/assets/views/pages_calendar.html",
            title: 'Calendar',
            ncyBreadcrumb: {
                label: 'Calendar'
            },
            resolve: loadSequence('moment', 'mwl.calendar', 'calendarCtrl')
        }).state('app.pages.messages', {
            url: '/messages',
            templateUrl: "Scripts/spa_portal/assets/views/pages_messages.html",
            resolve: loadSequence('truncate', 'htmlToPlaintext', 'inboxCtrl')
        }).state('app.pages.messages.inbox', {
            url: '/inbox/:inboxID',
            templateUrl: "Scripts/spa_portal/assets/views/pages_inbox.html",
            controller: 'ViewMessageCrtl'
        }).state('app.pages.blank', {
            url: '/blank',
            templateUrl: "Scripts/spa_portal/assets/views/pages_blank_page.html",
            ncyBreadcrumb: {
                label: 'Starter Page'
            }
        }).state('app.utilities', {
            url: '/utilities',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Utilities',
            ncyBreadcrumb: {
                label: 'Utilities'
            }
        }).state('app.utilities.search', {
            url: '/search',
            templateUrl: "Scripts/spa_portal/assets/views/utility_search_result.html",
            title: 'Search Results',
            ncyBreadcrumb: {
                label: 'Search Results'
            }
        }).state('app.utilities.pricing', {
            url: '/pricing',
            templateUrl: "Scripts/spa_portal/assets/views/utility_pricing_table.html",
            title: 'Pricing Table',
            ncyBreadcrumb: {
                label: 'Pricing Table'
            }
        }).state('app.maps', {
            url: "/maps",
            templateUrl: "Scripts/spa_portal/assets/views/maps.html",
            resolve: loadSequence('ngMap', 'mapsCtrl'),
            title: "Maps",
            ncyBreadcrumb: {
                label: 'Maps'
            }
        }).state('app.charts', {
            url: "/charts",
            templateUrl: "Scripts/spa_portal/assets/views/charts.html",
            resolve: loadSequence('chartjs', 'tc.chartjs', 'chartsCtrl'),
            title: "Charts",
            ncyBreadcrumb: {
                label: 'Charts'
            }
        }).state('app.documentation', {
            url: "/documentation",
            templateUrl: "Scripts/spa_portal/assets/views/documentation.html",
            title: "Documentation",
            ncyBreadcrumb: {
                label: 'Documentation'
            }
        }).state('error', {
            url: '/error',
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('error.404', {
            url: '/404',
            templateUrl: "Scripts/spa_portal/assets/views/utility_404.html",
        }).state('error.500', {
            url: '/500',
            templateUrl: "Scripts/spa_portal/assets/views/utility_500.html",
        }).state('solo', {
            url: '/solo',
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('solo.page', {
            url: '/page/:id/:username/:sessionkey',
            templateUrl: "Scripts/spa_portal/assets/views/solo_page.html"
        }).state('solo.public', {
            url: '/public/:id',
            templateUrl: "Scripts/spa_portal/assets/views/solo_page.html"
        }).state('funnel', {
            url: '/funnel',
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('funnel.preview', {
            url: '/preview/:funnelID/:soloID',
            templateUrl: "Scripts/spa_portal/assets/views/funnel_preview_public_page.html",
            title: 'View Funnel'
        }).state('funnel.public', {
            url: '/public/:funnelID/:soloID?',
            templateUrl: "Scripts/spa_portal/assets/views/funnel_preview_public_page.html",
            title: 'View Funnel'
        });

    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }

    isAuthenticated.$inject = ['membershipService', '$rootScope', '$location'];

    function isAuthenticated(membershipService, $rootScope, $location) {
        if (!membershipService.isUserLoggedIn()) {
            $rootScope.previousState = $location.path();
            $location.path('/app/login/signin');
        }
    }
}]);