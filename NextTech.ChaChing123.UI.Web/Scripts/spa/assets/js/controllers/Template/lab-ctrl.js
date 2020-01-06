app.controller('labCtrl', function ($scope, $rootScope, $state) {
    $scope.widgetShow = true;
    $scope.sectionShow = true;
    $('#datepicker-default').datepicker({
        todayHighlight: true
    });
});
