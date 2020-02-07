
function rdSectionFooter() {
    var directive = {
        requires: '^rdSection',
        transclude: true,
        template: '<div class="footer" >@Copyright 2019 123 ChaChing. All rights reserved</div>',
        restrict: 'E'
    };
    return directive;
};

angular.module('RDash')
	    .directive('rdSectionFooter', rdSectionFooter);

