/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$rootScope', '$cookieStore', 'userProfileResource', MasterCtrl]);

function MasterCtrl($scope, $rootScope, $cookieStore, userProfileResource) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $rootScope.getCurrentDate = function () {
        var __localServerDate = angular.element('input[name="__localServerDate"]').attr('value'); // note: local current date from server is stored in hidden control __localServerDate

        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        var dateArray = reggie.exec(__localServerDate);
        var dateNow = new Date(
                  (+dateArray[1]),
                  (+dateArray[2]) - 1, // Careful, month starts at 0!
                  (+dateArray[3]),
                  (+dateArray[4]),
                  (+dateArray[5]),
                  (+dateArray[6]));
        return dateNow;
    };


    // APF: Custom function to retrieve user profile on init
    // check user authorization
    $rootScope.formatLocalDate = function (dateToFormat) {
        var __localTimeZoneOffset = angular.element('input[name="__localTimeZoneOffset"]').attr('value'); // note: local current date from server is stored in hidden control __localServerDate
        var dateObj = new Date(dateToFormat)
        var miliDateToFormat = dateObj.getTime();
        var miliSGTimeZone = 8 * 3600000;
        var miliLocalTimeZoneOffset = __localTimeZoneOffset * 3600000;
        var milliFormattedDate = miliDateToFormat - miliSGTimeZone + miliLocalTimeZoneOffset;
        return new Date(milliFormattedDate);
    };

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };


    // APF: Custom function to retrieve user profile on init
    // check user authorization

    // rootScope user profile setting
    $rootScope.setting = {
        userProfile: {
            user: {},
            authorizePermission: [],
            operationUnit: '',
            operationUnitName: ''
        },
        application:
            {
                id: "[ApplicationID]",	// TODO: change to your application id / code / description
                code: "[ApplicationCode]",    
                name: "[ApplicationName]"
            },
        globalVariables:
            {
                var1: "",
                var2: "",
                var3: ""
            }

    };

    $rootScope.appResource = new userProfileResource();

    $rootScope.verifyUser = function () {

        if ($rootScope.setting.userProfile != null && $rootScope.setting.userProfile != undefined) {
            if ($rootScope.setting.userProfile.user.UserName != "" && $rootScope.setting.userProfile.user.UserName != undefined) {
                // continue...
            }
            else {
                $rootScope.getUserProfile();
            }
        }
        else {
            $rootScope.getUserProfile();
        }

    }

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        // $rootScope.hideAppMenu();
        console.log(next + "|||" + current);
        alert("testing");
    });

    $rootScope.getCurrentDate = function () {
        var __localServerDate = angular.element('input[name="__localServerDate"]').attr('value'); // note: local current date from server is stored in hidden control __localServerDate
        //var localDate = new Date(__localServerDate);
        var dateNow = new Date();
        var dateString = __localServerDate + " " + ("0" + dateNow.getHours().toString()).slice(-2) + ":" + ("0" + dateNow.getMinutes().toString()).slice(-2) + ":" + ("0" + dateNow.getSeconds().toString()).slice(-2);
        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        var dateArray = reggie.exec(dateString);
        var dateObject = new Date(
            (+dateArray[1]),
            (+dateArray[2]) - 1, // Careful, month starts at 0!
            (+dateArray[3]),
            (+dateArray[4]),
            (+dateArray[5]),
            (+dateArray[6])
        );
        return dateObject;
    }

    $rootScope.getUserProfile = function () {

        var __userProfile = angular.element('input[name="__userProfile"]').attr('value'); // note: user profile json is stored in hidden control __userProfile
        var obj = JSON.parse(__userProfile);
        $rootScope.setting.userProfile = obj;

        // do a for loop to search permission for bustiness unit isMain = true;
        var displayName = $rootScope.setting.userProfile.user.DisplayName;
        var operationUnit = $rootScope.setting.userProfile.user.Unit; // Unit; // initial business unit
        var operationUnitName = $rootScope.setting.userProfile.user.Unit; // UnitName; // initial business unit
        var userRole = "";
        for (i = 0; i < $rootScope.setting.userProfile.authorizePermission.length; i++) {
            var item = $rootScope.setting.userProfile.authorizePermission[i];
            if (i == 0) {
                userRole = item.RoleName; // default to first role
                operationUnit = item.OperationUnit;
                operationUnitName = item.OperationUnitName;

            }
            if (item.IsMain == "1" || item.IsMain == "true") {
                userRole = item.RoleName;
                operationUnit = item.OperationUnit;
                operationUnitName = item.OperationUnitName;
                break;
            }
        }

        // assign the operation unit in setting
        $rootScope.setting.userProfile.operationUnit = operationUnit;
        $rootScope.setting.userProfile.operationUnitName = operationUnitName;

        $scope.fieldOperationUnit = operationUnit; // to change to the correct unit code
        $scope.fieldUserName = displayName; // "John Smith";
        $scope.fieldUnitName = operationUnitName;  // "Singapore Branch";
        $scope.fieldRoleName = userRole;  // "Officer";

        // 20170815 - last login date
        var __lastLoginDate = angular.element('input[name="__lastLoginDate"]').attr('value'); // note: last login date is stored in hidden control __lastLoginDate
        $scope.fieldLastLogin = $rootScope.formatLocalDate(__lastLoginDate); // new Date(__lastLoginDate); format the last login date to local date time

        // reassign the operation unit if not the same
        //angular.element('input[name="__operationUnit"]').attr('value') = operationUnit;

    }

    $rootScope.isAuthorizedRole = function (roleName) {
        var obj = $rootScope.setting.userProfile.authorizePermission;
        var isAuthorized = false;
        for (i = 0; i < obj.length; i++) {
            var item = obj[i];
            if (item.RoleName == roleName) {
                isAuthorized = true;
                break;
            }
        }

        return isAuthorized;

    };

    $rootScope.isAuthorizedResource = function (resourceName) {
        var obj = $rootScope.setting.userProfile.authorizePermission;
        var isAuthorized = false;
        for (i = 0; i < obj.length; i++) {
            var item = obj[i];
            if (item.ResourceName == resourceName) {
                isAuthorized = true;
                break;
            }
        }

        return isAuthorized;

    };

    $rootScope.setACL = function () {
        var obj = $rootScope.setting.userProfile.authorizePermission;
        var isAuthorized = false;
        for (i = 0; i < obj.length; i++) {
            var item = obj[i];
            if (item.RoleName == "Regional User Admin" || item.RoleName == "Regional Ops" || item.RoleName == "System Admin" || item.RoleName == "Unit User Admin") {
                //$rootScope.showAppMenu();
                isAuthorized = true;
                break;
            }

        }
    };

    $rootScope.hideAppMenu = function () {

        //document.getElementById("menuHeaderUserManagement").style.display = "none";
        //document.getElementById("menuUser").style.display = "none";
        //document.getElementById("menuHeaderConfiguration").style.display = "none";
        //document.getElementById("menuApplication").style.display = "none";
        //document.getElementById("menuRole").style.display = "none";
        //document.getElementById("menuResource").style.display = "none";
        //document.getElementById("menuUnit").style.display = "none";
        /*
        $("menuHeaderUserManagement").hide();
        $("menuUser").hide();
        $("menuHeaderConfiguration").hide();
        $("menuApplication").hide();
        $("menuRole").hide();
        $("menuResource").hide();
        $("menuUnit").hide();
        */
    };

    $rootScope.showAppMenu = function () {

        //document.getElementById("menuHeaderUserManagement").style.display = "none";
        //document.getElementById("menuUser").style.display = "none";
        //document.getElementById("menuHeaderConfiguration").style.display = "none";
        //document.getElementById("menuApplication").style.display = "none";
        //document.getElementById("menuRole").style.display = "none";
        //document.getElementById("menuResource").style.display = "none";
        //document.getElementById("menuUnit").style.display = "none";
        /*
        $("menuHeaderUserManagement").show();
        $("menuUser").show();
        $("menuHeaderConfiguration").show();
        $("menuApplication").show();
        $("menuRole").show();
        $("menuResource").show();
        $("menuUnit").show();
        */
    };

    $rootScope.initUserProfile = function () {
        // $rootScope.hideAppMenu();
        $rootScope.verifyUser();
    };

    $rootScope.initUserProfile();
    // end check authorization


    
    // end custom function

}