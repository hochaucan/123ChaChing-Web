// allow you to format a text input field.
app.directive('specialcharacters', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            

            //var regularExp = new RegExp('^[\\0-9.,:;&_/()\\s- ]*$','g');
            //var regularExp = new RegExp('[a-zA-Z0-9]*$', 'g');
            //For DOM -> model validation

            ngModel.$parsers.unshift(function (value) {
                var regularExp = /^[a-zA-Z0-9\s\.\-.,:;&/()]*$/;
                var valid = regularExp.test(value);
                ngModel.$setValidity('specialcharacters', valid);
                return valid ? value : undefined;
            });

            //For model -> DOM validation
            ngModel.$formatters.unshift(function (value) {
                var regularExp = /^[a-zA-Z0-9\s\.\-.,:;&/()']*$/;;
                var valid = regularExp.test(value);
                ngModel.$setValidity('specialcharacters', valid);
                return value;
            });
        }
    };
});