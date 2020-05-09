'use strict';

/**
 * Config for the router
 */
var virtualDirectory = angular.element('input[name="__virtualDirectory"]').attr('value');
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
        $urlRouterProvider.otherwise("/app/dashboard");
        //
        // Set up the states
        $stateProvider.state('app', {
            url: "/app",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/app.html",
            resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl', 'truncate', 'htmlToPlaintext', 'angular-notification-icons'),
            abstract: true
        }).state('app.dashboard', {
            url: '/dashboard',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Dashboard',
            ncyBreadcrumb: {
                label: 'Dashboard'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.dashboard.banner', {
            url: "/banner",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard_banner.html",
            title: 'Quản Lý Dashboard',
            ncyBreadcrumb: {
                label: 'Quản Lý Dashboard'
            }
        }).state('app.dashboard.banneradd', {
            url: "/banneradd",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard_banner_add_new_update.html",
            title: 'Thêm Mới Banner Trang Chủ',
            ncyBreadcrumb: {
                label: 'Thêm Mới Banner Trang Chủ'
            },
            resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
        }).state('app.dashboard.banneredit', {
            url: "/banneredit/:id",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard_banner_add_new_update.html",
            title: 'Cập Nhật Banner Trang Chủ',
            ncyBreadcrumb: {
                label: 'Cập Nhật Banner Trang Chủ'
            },
            resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
        }).state('app.dashboard.manage', {
            url: "/manage",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard.html",
            title: 'Quản Lý Dashboard',
            ncyBreadcrumb: {
                label: 'Quản Lý Dashboard'
            }
        }).state('app.dashboard.add', {
            url: "/add",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard_add_new.html",
            title: 'Thêm Mới Nội Dung Trang Chủ',
            ncyBreadcrumb: {
                label: 'Thêm Mới Nội Dung Trang Chủ'
            },
            resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
        }).state('app.dashboard.edit', {
            url: "/edit/:id",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard_add_new.html",
            title: 'Cập Nhật Nội Dung Trang Chủ',
            ncyBreadcrumb: {
                label: 'Cập Nhật Nội Dung Trang Chủ'
            },
            resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
        }).state('app.dashboard.mobile', {
            url: "/mobile",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard_mobile.html",
            title: 'Quản Lý Ứng Dụng Di Động',
            ncyBreadcrumb: {
                label: 'Quản Lý Ứng Dụng Di Động'
            }
        }).state('app.dashboard.mobileadd', {
            url: "/mobileadd",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard_mobile_add_new_update.html",
            title: 'Thêm Mới Nội Dung Quản Lý Di Động Trang Chủ',
            ncyBreadcrumb: {
                label: 'Thêm Mới Nội Dung Quản Lý Di Động Trang Chủ'
            },
            resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
        }).state('app.dashboard.mobileedit', {
            url: "/mobileedit/:id",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard_mobile_add_new_update.html",
            title: 'Cập Nhật Nội Dung Quản Lý Di Động Trang Chủ',
            ncyBreadcrumb: {
                label: 'Cập Nhật Nội Dung Quản Lý Di Động Trang Chủ'
            },
            resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
        }).state('app.dashboard.frequentquestion', {
            url: "/frequentquestion",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/dashboard_frequent_question_manager.html",
            title: 'Quản Lý Câu Hỏi Thường Gặp',
            ncyBreadcrumb: {
                label: 'Quản Lý Câu Hỏi Thường Gặp'
            },
            resolve: loadSequence('ngTable', 'ngTableFrequentQuestionManagerCtrl')
        }).state('app.ui', {
            url: '/ui',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'UI Elements',
            ncyBreadcrumb: {
                label: 'UI Elements'
            }
        }).state('app.ui.elements', {
            url: '/elements',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_elements.html",
            title: 'Elements',
            icon: 'ti-layout-media-left-alt',
            ncyBreadcrumb: {
                label: 'Elements'
            }
        }).state('app.ui.buttons', {
            url: '/buttons',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_buttons.html",
            title: 'Buttons',
            resolve: loadSequence('spin', 'ladda', 'angular-ladda', 'laddaCtrl'),
            ncyBreadcrumb: {
                label: 'Buttons'
            }
        }).state('app.ui.links', {
            url: '/links',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_links.html",
            title: 'Link Effects',
            ncyBreadcrumb: {
                label: 'Link Effects'
            }
        }).state('app.ui.icons', {
            url: '/icons',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_icons.html",
            title: 'Font Awesome Icons',
            ncyBreadcrumb: {
                label: 'Font Awesome Icons'
            },
            resolve: loadSequence('iconsCtrl')
        }).state('app.ui.lineicons', {
            url: '/line-icons',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_line_icons.html",
            title: 'Linear Icons',
            ncyBreadcrumb: {
                label: 'Linear Icons'
            },
            resolve: loadSequence('iconsCtrl')
        }).state('app.ui.modals', {
            url: '/modals',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_modals.html",
            title: 'Modals',
            ncyBreadcrumb: {
                label: 'Modals'
            },
            resolve: loadSequence('asideCtrl')
        }).state('app.ui.toggle', {
            url: '/toggle',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_toggle.html",
            title: 'Toggle',
            ncyBreadcrumb: {
                label: 'Toggle'
            }
        }).state('app.ui.tabs_accordions', {
            url: '/accordions',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_tabs_accordions.html",
            title: "Tabs & Accordions",
            ncyBreadcrumb: {
                label: 'Tabs & Accordions'
            },
            resolve: loadSequence('vAccordionCtrl')
        }).state('app.ui.panels', {
            url: '/panels',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_panels.html",
            title: 'Panels',
            ncyBreadcrumb: {
                label: 'Panels'
            }
        }).state('app.ui.notifications', {
            url: '/notifications',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_notifications.html",
            title: 'Notifications',
            ncyBreadcrumb: {
                label: 'Notifications'
            },
            resolve: loadSequence('toasterCtrl', 'sweetAlertCtrl', 'NotificationIconsCtrl')
        }).state('app.ui.treeview', {
            url: '/treeview',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_tree.html",
            title: 'TreeView',
            ncyBreadcrumb: {
                label: 'Treeview'
            },
            resolve: loadSequence('angularBootstrapNavTree', 'treeCtrl')
        }).state('app.ui.media', {
            url: '/media',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_media.html",
            title: 'Media',
            ncyBreadcrumb: {
                label: 'Media'
            }
        }).state('app.ui.nestable', {
            url: '/nestable2',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_nestable.html",
            title: 'Nestable List',
            ncyBreadcrumb: {
                label: 'Nestable List'
            },
            resolve: loadSequence('jquery-nestable-plugin', 'ng-nestable', 'nestableCtrl')
        }).state('app.ui.typography', {
            url: '/typography',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/ui_typography.html",
            title: 'Typography',
            ncyBreadcrumb: {
                label: 'Typography'
            }
        }).state('app.member', {
            url: '/member',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Thành Viên',
            ncyBreadcrumb: {
                label: 'Thành Viên'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.member.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/member_list.html",
            title: 'Quản Lý Thành Viên',
            ncyBreadcrumb: {
                label: 'Quản Lý Thành Viên'
            },
            resolve: loadSequence('ngTable', 'ngTableMemberListCtrl')
        }).state('app.member.detais', {
            url: '/details/:username',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/member_details.html",
            title: 'Chi Tiết Thành Viên',
            ncyBreadcrumb: {
                label: 'Chi Tiết Thành Viên'
            },
            resolve: loadSequence('ngTable', 'ngTableMemberListCtrl')
        }).state('app.order', {
            url: '/order',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Đơn Hàng',
            ncyBreadcrumb: {
                label: 'Đơn Hàng'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.order.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/order_list.html",
            title: 'Quản Lý Đơn Hàng',
            ncyBreadcrumb: {
                label: 'Quản Lý Đơn Hàng'
            },
            resolve: loadSequence('ngTable', 'ngTableOrderListCtrl')
        }).state('app.customer', {
            url: '/customer',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Khách Hàng',
            ncyBreadcrumb: {
                label: 'Khách Hàng'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.customer.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/lead_list.html",
            title: 'Quản Lý Khách Hàng',
            ncyBreadcrumb: {
                label: 'Quản Lý Khách Hàng'
            },
            resolve: loadSequence('ngTable', 'ngTableLeadListCtrl')
            })

            .state('app.withdrawrequest', {
                url: '/withdrawrequest',
                template: '<div ui-view class="fade-in-up"></div>',
                title: 'Yêu Cầu Rút Tiền',
                ncyBreadcrumb: {
                    label: 'Yêu Cầu Rút Tiền'
                },
                resolve: { isAuthenticated: isAuthenticated }
            }).state('app.withdrawrequest.list', {
                url: '/list',
                templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/withdraw_request.html",
                title: 'Quản Lý Yêu Cầu Rút Tiền',
                ncyBreadcrumb: {
                    label: 'Quản Lý Yêu Cầu Rút Tiền'
                },
                resolve: loadSequence('ngTable', 'ngTableWithDrawRequestCtrl')
            })

            .state('app.title', {
            url: '/title',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Mẫu Tiêu Đề',
            ncyBreadcrumb: {
                label: 'Mẫu Tiêu Đề'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.title.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/title_template_list.html",
            title: 'Quản Lý Mẫu Tiêu Đề',
            ncyBreadcrumb: {
                label: 'Quản Lý Mẫu Tiêu Đề'
            }
            //resolve: loadSequence('ngTable', 'ngTableTitleListCtrl')
        }).state('app.subtitle', {
            url: '/subtitle',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Mẫu Tiêu Đề Phụ',
            ncyBreadcrumb: {
                label: 'Mẫu Tiêu Đề Phụ'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.subtitle.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/sub_title_template_list.html",
            title: 'Quản Lý Mẫu Tiêu Đề Phụ',
            ncyBreadcrumb: {
                label: 'Quản Lý Mẫu Tiêu Đề Phụ'
            }
            //resolve: loadSequence('ngTable', 'ngTableSubTitleListCtrl')
        }).state('app.documentcategory', {
            url: '/documentcategory',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Danh Mục Tài Liệu',
            ncyBreadcrumb: {
                label: 'Danh Mục Tài Liệu'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.documentcategory.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/documentcategory_manager.html",
            title: 'Quản Lý Danh Mục Tài Liệu',
            ncyBreadcrumb: {
                label: 'Quản Lý Danh Mục Tài Liệu'
            },
            resolve: loadSequence('ngTable', 'ngTableDocumentCategoryManagerCtrl')
        }).state('app.document', {
            url: '/document',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Tài Liệu',
            ncyBreadcrumb: {
                label: 'Tài Liệu'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.document.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/document_manager.html",
            title: 'Quản Lý Tài Liệu',
            ncyBreadcrumb: {
                label: 'Quản Lý Tài Liệu'
            },
            resolve: loadSequence('ngTable', 'ngTableDocumentManagerCtrl')
        }).state('app.affiliatelink', {
            url: '/affiliatelink',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Danh Mục Affiliate Link',
            ncyBreadcrumb: {
                label: 'Danh Mục Affiliate Link'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.affiliatelink.category', {
            url: '/category',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/affiliatelink_category_manager.html",
            title: 'Quản Lý Danh Mục Affiliate Link',
            ncyBreadcrumb: {
                label: 'Quản Lý Danh Mục Affiliate Link'
            },
            resolve: loadSequence('ngTable', 'ngTableAffiliateLinkCategoryManagerCtrl')
        }).state('app.affiliatelink.link', {
            url: '/link',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/affiliatelink_link_manager.html",
            title: 'Quản Lý Affiliate Link',
            ncyBreadcrumb: {
                label: 'Quản Lý Affiliate Link'
            },
            resolve: loadSequence('ngTable', 'ngTableAffiliateLinkManagerCtrl')
        }).state('app.affiliatelink.banner', {
            url: '/banner',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/affiliatelink_banner_manager.html",
            title: 'Quản Lý Affiliate Link',
            ncyBreadcrumb: {
                label: 'Quản Lý Affiliate Link'
            },
            resolve: loadSequence('ngTable', 'ngTableAffiliateLinkBannerManagerCtrl')
        }).state('app.response', {
            url: '/response',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Trả Lời Nhanh',
            ncyBreadcrumb: {
                label: 'Trả Lời Nhanh'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.response.now', {
            url: '/now',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Trả Lời Nhanh',
            ncyBreadcrumb: {
                label: 'Trả Lời Nhanh'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.response.now.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/response_now_manager.html",
            title: 'Quản Lý Trả Lời Nhanh',
            ncyBreadcrumb: {
                label: 'Quản Lý Trả Lời Nhanh'
            },
            resolve: loadSequence('ngTable', 'ngTableResponseNowManagerCtrl')
        }).state('app.response.script', {
            url: '/script',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Nhắn Tin Theo Kịch Bản',
            ncyBreadcrumb: {
                label: 'Nhắn Tin Theo Kịch Bản'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.response.script.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/response_script_manager.html",
            title: 'Quản Lý Nhắn Tin Theo Kịch Bản',
            ncyBreadcrumb: {
                label: 'Quản Lý Nhắn Tin Theo Kịch Bản'
            },
            resolve: loadSequence('ngTable', 'ngTableResponseScriptManagerCtrl')
        }).state('app.response.rebuttal', {
            url: '/rebuttal',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Xử Lý Sự Từ Chối',
            ncyBreadcrumb: {
                label: 'Xử Lý Sự Từ Chối'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.response.rebuttal.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/response_rebuttal_manager.html",
            title: 'Quản Lý Xử Lý Sự Từ Chối',
            ncyBreadcrumb: {
                label: 'Quản Lý Xử Lý Sự Từ Chối'
            },
            resolve: loadSequence('ngTable', 'ngTableResponseRebuttalManagerCtrl')
        }).state('app.notification', {
            url: '/notification',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Thông Báo',
            ncyBreadcrumb: {
                label: 'Thông Báo'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.notification.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/notification_manager.html",
            title: 'Quản Lý Thông Báo',
            ncyBreadcrumb: {
                label: 'Quản Lý Thông Báo'
            },
            resolve: loadSequence('ngTable', 'ngTableNotificationManagerCtrl')
        }).state('app.contact', {
            url: '/contact',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Liên Hệ',
            ncyBreadcrumb: {
                label: 'Liên Hệ'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.contact.list', {
            url: '/list',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/contact_us.html",
            title: 'Quản Lý Yêu Cầu Liên Hệ',
            ncyBreadcrumb: {
                label: 'Quản Lý Yêu Cầu Liên Hệ'
            },
            resolve: loadSequence('ngTable', 'ngTableContactUsCtrl')
        }).state('app.configuration', {
            url: '/configuration',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Cấu Hình',
            ncyBreadcrumb: {
                label: 'Cấu Hình'
            },
            resolve: { isAuthenticated: isAuthenticated }
        }).state('app.configuration.statistic', {
            url: "/statistic",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/configuration.html",
            resolve: loadSequence('chartjs', 'tc.chartjs', 'ngTable', 'revenueCtrl'),
            title: "Thống Kê",
            ncyBreadcrumb: {
                label: 'Thống Kê'
            }
        }).state('app.configuration.mailchip', {
            url: "/mailchip",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/configuration_mailchip.html",
            resolve: loadSequence('chartjs', 'tc.chartjs', 'ngTable', 'revenueCtrl'),
            title: "Thống Kê",
            ncyBreadcrumb: {
                label: 'Thống Kê'
            }
        }).state('app.table.dynamic', {
            url: '/dynamic',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/table_dynamic.html",
            title: 'Dynamic Tables',
            ncyBreadcrumb: {
                label: 'Dynamic'
            },
            resolve: loadSequence('dynamicTableCtrl')
        }).state('app.table.export', {
            url: '/export',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/table_export.html",
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
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/form_elements.html",
            title: 'Forms Elements',
            ncyBreadcrumb: {
                label: 'Elements'
            },
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'ui.mask', 'touchspin-plugin', 'selectCtrl', 'spectrum-plugin', 'angularSpectrumColorpicker')
        }).state('app.form.xeditable', {
            url: '/xeditable',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/form_xeditable.html",
            title: 'Angular X-Editable',
            ncyBreadcrumb: {
                label: 'X-Editable'
            },
            resolve: loadSequence('xeditable', 'checklist-model', 'xeditableCtrl')
        }).state('app.form.texteditor', {
            url: '/editor',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/form_text_editor.html",
            title: 'Text Editor',
            ncyBreadcrumb: {
                label: 'Text Editor'
            },
            resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
        }).state('app.form.wizard', {
            url: '/wizard',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/form_wizard.html",
            title: 'Form Wizard',
            ncyBreadcrumb: {
                label: 'Wizard'
            },
            resolve: loadSequence('wizardCtrl')
        }).state('app.form.validation', {
            url: '/validation',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/form_validation.html",
            title: 'Form Validation',
            ncyBreadcrumb: {
                label: 'Validation'
            },
            resolve: loadSequence('validationCtrl')
        }).state('app.form.cropping', {
            url: '/image-cropping',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/form_image_cropping.html",
            title: 'Image Cropping',
            ncyBreadcrumb: {
                label: 'Image Cropping'
            },
            resolve: loadSequence('ngImgCrop', 'cropCtrl')
        }).state('app.form.upload', {
            url: '/file-upload',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/form_file_upload.html",
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
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/pages_user_profile.html",
            title: 'User Profile',
            ncyBreadcrumb: {
                label: 'User Profile'
            },
            resolve: loadSequence('flow', 'userCtrl')
        }).state('app.pages.invoice', {
            url: '/invoice',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/pages_invoice.html",
            title: 'Invoice',
            ncyBreadcrumb: {
                label: 'Invoice'
            }
        }).state('app.pages.timeline', {
            url: '/timeline',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/pages_timeline.html",
            title: 'Timeline',
            ncyBreadcrumb: {
                label: 'Timeline'
            },
            resolve: loadSequence('ngMap')
        }).state('app.pages.calendar', {
            url: '/calendar',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/pages_calendar.html",
            title: 'Calendar',
            ncyBreadcrumb: {
                label: 'Calendar'
            },
            resolve: loadSequence('moment', 'mwl.calendar', 'calendarCtrl')
        }).state('app.pages.messages', {
            url: '/messages',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/pages_messages.html",
            resolve: loadSequence('truncate', 'htmlToPlaintext', 'inboxCtrl')
        }).state('app.pages.messages.inbox', {
            url: '/inbox/:inboxID',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/pages_inbox.html",
            controller: 'ViewMessageCrtl'
        }).state('app.pages.blank', {
            url: '/blank',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/pages_blank_page.html",
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
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/utility_search_result.html",
            title: 'Search Results',
            ncyBreadcrumb: {
                label: 'Search Results'
            }
        }).state('app.utilities.pricing', {
            url: '/pricing',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/utility_pricing_table.html",
            title: 'Pricing Table',
            ncyBreadcrumb: {
                label: 'Pricing Table'
            }
        }).state('app.maps', {
            url: "/maps",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/maps.html",
            resolve: loadSequence('ngMap', 'mapsCtrl'),
            title: "Maps",
            ncyBreadcrumb: {
                label: 'Maps'
            }
        }).state('app.charts', {
            url: "/charts",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/charts.html",
            resolve: loadSequence('chartjs', 'tc.chartjs', 'chartsCtrl'),
            title: "Charts",
            ncyBreadcrumb: {
                label: 'Charts'
            }
        }).state('app.documentation', {
            url: "/documentation",
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/documentation.html",
            title: "Documentation",
            ncyBreadcrumb: {
                label: 'Documentation'
            }
        }).state('error', {
            url: '/error',
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('error.404', {
            url: '/404',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/utility_404.html",
        }).state('error.500', {
            url: '/500',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/utility_500.html",
        })// Login routes
        .state('login', {
            url: '/login',
            template: '<div ui-view class="fade-in-right-big smooth"></div>'
        }).state('login.signin', {
            url: '/signin',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/login_login.html"
        }).state('login.forgot', {
            url: '/forgot',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/login_forgot.html"
        }).state('login.registration', {
            url: '/registration',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/login_registration.html"
        }).state('login.lockscreen', {
            url: '/lock',
            templateUrl: virtualDirectory + "Areas/Admin/Scripts/spa_admin/assets/views/login_lock_screen.html"
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
                $location.path('/login/signin');
            }
        }
    }]);