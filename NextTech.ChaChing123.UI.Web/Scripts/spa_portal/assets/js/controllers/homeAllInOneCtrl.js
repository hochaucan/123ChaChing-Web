'use strict';
/** 
  * controller for User Profile Example
*/

var backgroundPath = "";
var resourcePath = "";
var baseUrl = 'https://api.123chaching.app';
//var baseUrl = 'http://localhost:1494';

app.controller('HomeBannerController', ["$scope", "$state", "$window", "$location", "$localStorage", "$timeout", "homeBannerService", "notificationService",
    function ($scope, $state, $window, $location, $localStorage, $timeout, homeBannerService, notificationService) {
        $scope.bannerContents = {};

        function loadContent() {
            var entity = {};

            // Load the data from the API
            $scope.showSpinner = true;
            homeBannerService.getall(entity, function (result) {
                if (result.status === 200) {
                    //var data = result.data.Details.Items;
                    $scope.bannerContents = result.data;

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                    notificationService.displayError('Đã có lỗi xả ra trong quá trình tải nội dúng');
                }
            });
        }

        $scope.HomeBannerManager = {
            init: function () {
                loadContent();
            }
        };

        $scope.HomeBannerManager.init();

    }]);

app.controller('AllInOneHomeController', ["$scope", "$state", "$window", "$location", "$localStorage", "$timeout", "homeAllInOneService", "notificationService",
    function ($scope, $state, $window, $location, $localStorage, $timeout, homeAllInOneService, notificationService) {
        $scope.active = false;
        var taxIndex = 0;
        var locationURL = $location.url();
        var parts = locationURL.split('/');
        var tempURL = parts.join('.');
        var routURL = tempURL.substr(1);

        $scope.tabs = [
            { heading: "Landing Page Không Giới Hạn", route: "", active: true },
            { heading: "Ứng Dụng Điện Thoại", route: "", active: false },
            { heading: "Tích Hợp", route: "", active: false },
            { heading: "Hỗ Trợ Tận Tình", route: "", active: false }
        ];

        $scope.active = function (route) {
            return $state.is(route);
        };

        $scope.tabs.forEach(function (tab, index) {
            if (tab.route === routURL) {
                $scope.active = index;
                return;
            }
        });

        //$scope.AllInOneTabs = [{
        //    title: 'Landing Page Không Giới Hạn',
        //    content: "Scripts/spa_portal/assets/views/home_landing_page.html"
        //}, {
        //    title: 'Ứng Dụng Điện Thoại',
        //    content: "Scripts/spa_portal/assets/views/home_mobile_app.html"
        //}, {
        //    title: 'Tích Hợp',
        //    content: "Scripts/spa_portal/assets/views/home_integration.html"
        //}, {
        //    title: 'Hỗ Trợ Tận Tình',
        //    content: "Scripts/spa_portal/assets/views/home_support.html"
        //}];

        $scope.AllInOneTabs = [];

        function loadContent() {
            var entity = {};

            // Load the data from the API
            $scope.showSpinner = true;
            homeAllInOneService.getall(entity, function (result) {
                if (result.status === 200) {
                    //var data = result.data.Details.Items;
                    var contents = result.data;

                    angular.forEach(contents, function (content, index) {
                        var categoryName = "";
                        if (content.CategoryID === "landing_page") // Chưa thanh toán
                            categoryName = "Landing Page Không Giới Hạn";
                        else if (content.CategoryID === "mobile_application") // Ðã thanh toán
                            categoryName = "Ứng Dụng Điện Thoại";
                        else if (content.CategoryID === "integration") // Hoàn tiền
                            categoryName = "Tích Hợp";
                        else if (content.CategoryID === "support")
                            categoryName = "Hỗ Trợ Tận Tinh";

                        var row = {
                            title: categoryName,
                            content: content.Content,
                            imagePath: content.ImagePath
                        };

                        $scope.AllInOneTabs.push(row);
                    });

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                    notificationService.displayError('Đã có lỗi xả ra trong quá trình tải nội dúng');
                }
            });
        }

        $scope.HomeAllInOneManager = {
            init: function () {
                loadContent();
            }
        };

        $scope.HomeAllInOneManager.init();

    }]);

app.controller('HomeMobileController', ["$scope", "$state", "$window", "$location", "$localStorage", "$timeout", "homeMobileService", "notificationService",
    function ($scope, $state, $window, $location, $localStorage, $timeout, homeMobileService, notificationService) {
        $scope.mobileContents = {};

        function loadContent() {
            var entity = {};

            // Load the data from the API
            $scope.showSpinner = true;
            homeMobileService.getall(entity, function (result) {
                if (result.status === 200) {
                    //var data = result.data.Details.Items;
                    $scope.mobileContents = result.data;

                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                    notificationService.displayError('Đã có lỗi xả ra trong quá trình tải nội dúng');
                }
            });
        }

        $scope.HomeMobileManager = {
            init: function () {
                loadContent();
            }
        };

        $scope.HomeMobileManager.init();

    }]);
