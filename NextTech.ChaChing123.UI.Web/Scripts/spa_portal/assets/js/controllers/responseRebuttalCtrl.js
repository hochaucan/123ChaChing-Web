'use strict';
/** 
  * controller for v-accordion
  * AngularJS multi-level accordion component.
*/
(function (angular) {
    app.controller('responseRebuttalvAccordionCtrl', ["$scope", "$uibModal", "$localStorage", "$timeout", "responseService", "membershipService", "notificationService",
        function ($scope, $uibModal, $localStorage, $timeout, responseService, membershipService, notificationService) {
            var sessionKey = $localStorage.currentUser ? $localStorage.currentUser.token : "";
            $scope.panes = [];

            $scope.firstAccordionControl = {
                onExpand: function (expandedPaneIndex) {
                    console.log('expanded:', expandedPaneIndex);
                },
                onCollapse: function (collapsedPaneIndex) {
                    console.log('collapsed:', collapsedPaneIndex);
                }
            };
            //$scope.panes = [{
            //    header: 'Tôi không có tiền - Tiêu đề 1',
            //    content: 'Tôi hoàn toàn hiểu điều này. Tôi có một người bạn đã phải dành tất cả số tiền tiết kiệm trong tài khoản để sử dụng 123 ChaChing. Hiện giờ anh ấy có một căn hộ sang trọng và một công việc kinh doanh của anh ấy đang phát triển hằng ngày. Bạn có thể dành ra ngay 20.000 một ngày?'
            //}, {
            //    header: 'Tôi không có tiền - Tiêu đề 2',
            //    content: 'Tôi hoàn toàn hiểu điều này. Tôi có một người bạn đã phải dành tất cả số tiền tiết kiệm trong tài khoản để sử dụng 123 ChaChing. Hiện giờ anh ấy có một căn hộ sang trọng và một công việc kinh doanh của anh ấy đang phát triển hằng ngày. Bạn có thể dành ra ngay 20.000 một ngày?'
            //}, {
            //    header: 'Tôi không có tiền - Tiêu đề 3',
            //    content: 'Tôi hoàn toàn hiểu điều này. Tôi có một người bạn đã phải dành tất cả số tiền tiết kiệm trong tài khoản để sử dụng 123 ChaChing. Hiện giờ anh ấy có một căn hộ sang trọng và một công việc kinh doanh của anh ấy đang phát triển hằng ngày. Bạn có thể dành ra ngay 20.000 một ngày?'
            //}];

            function loadDocumentsWithNgTable() {
                // Load the data from the API
                var entity = {};

                entity = {
                    "SessionKey": sessionKey
                };

                $scope.showSpinner = true;
                responseService.GetAllScript(entity, function (result) {
                    if (result.data && result.data.StatusCode === 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode === 0) {
                        var itemsResult = result.data.Details.Items;
                        angular.forEach(itemsResult, function (item, index) {
                            //1. Initialize a tab array
                            var pane = [];
                            //2. Build pane content
                            pane.id = item.ID;
                            pane.header = item.Title;
                            pane.content = item.Content;
                            $scope.panes.push(pane);
                        });

                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 1000);
                    } else {
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 1000);
                        notificationService.displayError(result.data.StatusMsg);
                    }
                });
            }

            $scope.showLead = function (size) {
                var _subject = document.getElementById('responseSubject' + size).value;
                var _content = document.getElementById('responseContent' + size).value;

                $scope.items = {
                    'subject': _subject ? _subject : '',
                    'content': _content ? _content : ''
                };

                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalShowLead.html',
                    controller: 'ModalShowRebuttalLeadCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
            };

            $scope.ResponseManager = {
                init: function () {
                    loadDocumentsWithNgTable();
                }
            };

            $scope.ResponseManager.init();
        }]);
})(angular);

(function (angular) {
    app.controller('ModalShowRebuttalLeadCtrl', ["$scope", "$localStorage", "$timeout", "$uibModalInstance", "items", "responseService", "leadService", "membershipService", "notificationService",
        function ($scope, $localStorage, $timeout, $uibModalInstance, items, responseService, leadService, membershipService, notificationService) {
            var sessionKey = $localStorage.currentUser ? $localStorage.currentUser.token : "";
            $scope.coldLeads = [];
            $scope.warmLeads = [];
            $scope.hotLeads = [];
            $scope.emailContent = items;

            function loadAllLeadByAccount() {
                // Load the data from the API
                var entity = {};

                entity = {
                    "LeadType": "-1",
                    "PageIndex": "1",
                    "PageCount": "1000",
                    "SessionKey": sessionKey
                };

                $scope.showSpinner = true;
                leadService.GetAllLeadsByAccount(entity, function (result) {
                    if (result.data && result.data.StatusCode === 17) {
                        membershipService.checkMemberAuthorization();
                    }

                    if (result.data && result.data.StatusCode === 0) {
                        var itemsResult = result.data.Details.Items;
                        angular.forEach(itemsResult, function (item, index) {
                            //1. build list cold lead
                            if (item.LeadType == 1)
                                $scope.coldLeads.push(item);

                            //2. build list warm lead
                            if (item.LeadType == 2)
                                $scope.warmLeads.push(item);

                            //3. build list hot lead
                            if (item.LeadType == 3)
                                $scope.hotLeads.push(item);
                        });

                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 1000);
                    } else {
                        $timeout(function () {
                            $scope.showSpinner = false;
                        }, 1000);
                        notificationService.displayError(result.data.StatusMsg);
                    }
                });
            }

            $scope.sendEmailToLead = function (size) {
                var to = "";
                var emailSubject = "";
                var emailContent = "";

                //var emailInfo = $scope.emailContent ? $scope.emailContent : "";
                var emailInfo = size.currentTarget.attributes.data.value;

                var emailSplit = emailInfo.split('|');
                if (emailSplit.length > 0) {
                    to = emailSplit[0];
                    emailSubject = emailSplit[1];
                    emailContent = emailSplit[2];
                }

                window.location.href = "mailto:" + to + "?subject=" + emailSubject + "&body=" + emailContent;
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.ResponseManager = {
                init: function () {
                    loadAllLeadByAccount();
                }
            };

            $scope.ResponseManager.init();
        }]);
})(angular);