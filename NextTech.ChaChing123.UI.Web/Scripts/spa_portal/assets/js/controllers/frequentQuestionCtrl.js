'use strict';
/** 
  * controller for notification
*/
app.controller('FrequentQuestionCtrl', ["$scope", "$timeout", "$localStorage", "frequentQuestionService", "membershipService", "notificationService",
    function ($scope, $timeout, $localStorage, frequentQuestionService, membershipService, notificationService) {
        $scope.frequentQuestions = {};
        $scope.number_Col_Md_6 = 1;

        function loadFrequestQuestions() {
            var entity = {
                SessionKey: ""
            };

            $scope.showSpinner = true;
            // Load the data from the API
            frequentQuestionService.GetAllQuestion(entity, function (result) {
                if (result.data && result.data.StatusCode === 17) {
                    membershipService.checkMemberAuthorization();
                }

                if (result.data && result.data.StatusCode === 0) {
                    $scope.frequentQuestions = result.data.Details.Items;

                    var count = result.data.Details.Total;
                    if (count > 0) {
                        $scope.number_Col_Md_6 = Math.round(count / 2);
                    }

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

        $scope.FrequentQuestionManager = {
            init: function () {
                loadFrequestQuestions();
            }
        };

        $scope.FrequentQuestionManager.init();
    }]);