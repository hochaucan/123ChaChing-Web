'use strict';
/** 
  * controller for v-accordion
  * AngularJS multi-level accordion component.
*/
(function (angular) {
    app.controller('responseScriptvAccordionCtrl', ["$scope", function ($scope) {
        $scope.firstAccordionControl = {
            onExpand: function (expandedPaneIndex) {
                console.log('expanded:', expandedPaneIndex);
            },
            onCollapse: function (collapsedPaneIndex) {
                console.log('collapsed:', collapsedPaneIndex);
            }
        };
        $scope.panes = [{
            header: 'Tôi không có tiền - Tiêu đề 1',
            content: 'Tôi hoàn toàn hiểu điều này. Tôi có một người bạn đã phải dành tất cả số tiền tiết kiệm trong tài khoản để sử dụng 123 ChaChing. Hiện giờ anh ấy có một căn hộ sang trọng và một công việc kinh doanh của anh ấy đang phát triển hằng ngày. Bạn có thể dành ra ngay 20.000 một ngày?'
        }, {
            header: 'Tôi không có tiền - Tiêu đề 2',
            content: 'Tôi hoàn toàn hiểu điều này. Tôi có một người bạn đã phải dành tất cả số tiền tiết kiệm trong tài khoản để sử dụng 123 ChaChing. Hiện giờ anh ấy có một căn hộ sang trọng và một công việc kinh doanh của anh ấy đang phát triển hằng ngày. Bạn có thể dành ra ngay 20.000 một ngày?'
        }, {
            header: 'Tôi không có tiền - Tiêu đề 3',
            content: 'Tôi hoàn toàn hiểu điều này. Tôi có một người bạn đã phải dành tất cả số tiền tiết kiệm trong tài khoản để sử dụng 123 ChaChing. Hiện giờ anh ấy có một căn hộ sang trọng và một công việc kinh doanh của anh ấy đang phát triển hằng ngày. Bạn có thể dành ra ngay 20.000 một ngày?'
        }];
    }]);
})(angular);