app.controller('pluginsCtrl', function ($scope, $rootScope, $state) {
    /* Select2
      ------------------------- */
      $scope.widgetShow = true;
      $scope.sectionShow = true;
      $scope.isLoading = false;
      $(".default-select2").select2();
      //jQuery("#test").html("<h3>Test Title</h3>");
      //setTimeout(function(){ console.log(jQuery("#test").html()); }, 3000);
    //console.log($(".default-select2"));

});
