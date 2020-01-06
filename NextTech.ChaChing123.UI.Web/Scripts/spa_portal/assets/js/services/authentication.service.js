(function () {
    'use strict';

    angular
        .module('ChaChingApp')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(user, callback) {
            $http.post('http://localhost:1495/api/Account/login', { username: user.username, password: user.password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response && response.obj) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: user.username, token: response.obj.UpdatedBy };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.obj.UpdatedBy;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();