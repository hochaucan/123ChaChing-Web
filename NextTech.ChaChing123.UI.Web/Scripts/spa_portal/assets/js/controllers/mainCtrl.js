'use strict';
/**
 * Clip-Two Main Controller
 */
app.controller('AppCtrl', ['$rootScope', '$scope', '$state', '$translate', '$localStorage', '$window', '$document', '$timeout', '$location', '$http', 'cfpLoadingBar', 'membershipService',
    function ($rootScope, $scope, $state, $translate, $localStorage, $window, $document, $timeout, $location, $http, cfpLoadingBar, membershipService) {

        // Loading bar transition
        // -----------------------------------
        var $win = $($window);

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //start loading bar on stateChangeStart
            cfpLoadingBar.start();
            if (typeof CKEDITOR !== 'undefined') {
                for (name in CKEDITOR.instances) {
                    CKEDITOR.instances[name].destroy();
                }
            }

        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            //stop loading bar on stateChangeSuccess
            event.targetScope.$watch("$viewContentLoaded", function () {

                cfpLoadingBar.complete();
            });

            // scroll top the page on change state
            $('#app .main-content').css({
                position: 'relative',
                top: 'auto'
            });

            $('footer').show();

            window.scrollTo(0, 0);

            if (angular.element('.email-reader').length) {
                angular.element('.email-reader').animate({
                    scrollTop: 0
                }, 0);
            }

            // Save the route title
            $rootScope.currTitle = $state.current.title;
        });
        // State not found
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            //$rootScope.loading = false;
            console.log(unfoundState.to);
            // "lazy.state"
            console.log(unfoundState.toParams);
            // {a:1, b:2}
            console.log(unfoundState.options);
            // {inherit:false} + default options
        });

        $rootScope.pageTitle = function () {
            return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        };

        // save settings to local storage
        if (angular.isDefined($localStorage.layout)) {
            $scope.app.layout = $localStorage.layout;

        } else {
            $localStorage.layout = $scope.app.layout;
        }
        $scope.$watch('app.layout', function () {
            // save to local storage
            $localStorage.layout = $scope.app.layout;
        }, true);

        //global function to scroll page up
        $scope.toTheTop = function () {

            $document.scrollTopAnimated(0, 600);

        };

        // angular translate
        // ----------------------

        $scope.language = {
            // Handles language dropdown
            listIsOpen: false,
            // list of available languages
            available: {
                'en': 'English',
                'it_IT': 'Italiano',
                'de_DE': 'Deutsch'
            },
            // display always the current ui language
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage();
                // we know we have set a preferred one in app.config
                $scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: function (localeId, ev) {
                $translate.use(localeId);
                $scope.language.selected = $scope.language.available[localeId];
                $scope.language.listIsOpen = !$scope.language.listIsOpen;
            }
        };

        $scope.language.init();

        // Function that find the exact height and width of the viewport in a cross-browser way
        var viewport = function () {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        };
        // function that adds information in a scope of the height and width of the page
        $scope.getWindowDimensions = function () {
            return {
                'h': viewport().height,
                'w': viewport().width
            };
        };
        // Detect when window is resized and set some variables
        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
            $scope.windowHeight = newValue.h;
            $scope.windowWidth = newValue.w;

            if (newValue.w >= 992) {
                $scope.isLargeDevice = true;
            } else {
                $scope.isLargeDevice = false;
            }
            if (newValue.w < 992) {
                $scope.isSmallDevice = true;
            } else {
                $scope.isSmallDevice = false;
            }
            if (newValue.w <= 768) {
                $scope.isMobileDevice = true;
            } else {
                $scope.isMobileDevice = false;
            }
        }, true);
        // Apply on resize
        $win.on('resize', function () {

            $scope.$apply();
            if ($scope.isLargeDevice) {
                $('#app .main-content').css({
                    position: 'relative',
                    top: 'auto',
                    width: 'auto'
                });
                $('footer').show();
            }
        });

        $scope.userAuthentication = {
            init: function () {
                $scope.userData = {};

                $scope.userData.displayUserInfo = displayUserInfo;
                $scope.logout = logout;


                function displayUserInfo() {
                    $scope.userData.isUserLoggedIn = membershipService.isUserLoggedIn();
                    if ($scope.userData.isUserLoggedIn) {
                        $scope.username = $localStorage.currentUser.username;
                        $scope.fullname = $localStorage.currentUser.fullname;
                        $scope.myavatar = $localStorage.currentUser.myavatar;
                    } else {
                        //membershipService.saveCredentials(result.data.Details);
                    }
                }

                function logout() {
                    membershipService.removeCredentials();
                    $scope.userData.displayUserInfo();
                    $location.path('/app/login/signin');

                    //var userLogin = {
                    //    "UserName": $localStorage.currentUser,
                    //    "SessionKey": $localStorage.token
                    //};
                    //$scope.showSpinner = true;
                    //membershipService.Logout(userLogin, function (result) {
                    //    if (result.data && result.data.StatusCode === 0) {
                    //        membershipService.removeCredentials();
                    //        $scope.userData.displayUserInfo();
                    //        notificationService.displaySuccess('Logout th�nh c�ng');

                    //        $timeout(function () {
                    //            $scope.showSpinner = false;
                    //            $location.path('/login/signin');
                    //        }, 1000);

                    //    } else {
                    //        //$scope.isLoading = false;

                    //        $timeout(function () {
                    //            $scope.showSpinner = false;
                    //        }, 2000);

                    //        notificationService.displayError(result.data.StatusMsg);
                    //    }
                    //});
                }

                $scope.userData.displayUserInfo();

                // keep user logged in after page refresh
                if ($localStorage.currentUser) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
                }

                // redirect to login page if not logged in and trying to access a restricted page
                //$rootScope.$on('$locationChangeStart', function (event, next, current) {
                //    var publicPages = ['/login'];
                //    var restrictedPage = publicPages.indexOf($location.path()) === -1;
                //    if (restrictedPage && !$localStorage.currentUser) {
                //        //$location.path('/login');
                //    }
                //});
            }
        };

        $scope.userAuthentication.init();

        $window.onbeforeunload = function (event) {
            //if (membershipService.isUserLoggedIn()) {
            //    membershipService.checkMemberAuthorization();
            //    $scope.userData.displayUserInfo();
            //    $location.path('/app/login/signin');
            //    $localStorage.isMySessionActive = "false";
            //}
            //return undefined;
        };

        $window.onload = function (event) {
            $localStorage.isMySessionActive = "true";
        };

        $scope.userRegistration = {
            init: function () {
                var search = $location.search();
                $localStorage.refcodeVal = search;
            }
        };

        $scope.userRegistration.init();
    }]);
