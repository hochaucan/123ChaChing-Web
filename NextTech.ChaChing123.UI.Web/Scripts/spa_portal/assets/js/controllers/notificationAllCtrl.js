'use strict';
/** 
  * controller for notification
*/
app.controller('NotificationAllController', ["$scope", "$timeout", "$localStorage", "noticeService", "membershipService", "notificationService",
    function ($scope, $timeout, $localStorage, noticeService, membershipService, notificationService) {
        var sessionKey = $localStorage.currentUser ? $localStorage.currentUser.token : "";
        $scope.notifications = {};

        function loadNotifications() {
            var entity = {
                SessionKey: sessionKey
            };

            $scope.showSpinner = true;
            // Load the data from the API
            noticeService.GetAllNotification(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.notifications = result.data.Details.Items;
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                } else {
                    notificationService.displayError(result.data.StatusMsg);
                    $timeout(function () {
                        $scope.showSpinner = false;
                    }, 1000);
                }
            });
        }

        $scope.NotificationManager = {
            init: function () {
                loadNotifications();
            }
        };

        $scope.NotificationManager.init();
    }]);