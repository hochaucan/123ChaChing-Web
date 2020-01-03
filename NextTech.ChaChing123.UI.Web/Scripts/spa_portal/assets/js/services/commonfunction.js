'use strict';

angular.module("common.services").service('commonfunctions', function ($filter, $rootScope) {



    // 20170630A, output format: dd-mm-yyyy   //T00:00:00
    this.convertDateToDateStr = function convertDateToDateStr(objDate) {

        if (typeof objDate == 'object') {
            if (objDate == null) { return null; }
            var year = objDate.getFullYear().toString();
            var month = (objDate.getMonth() + 1).toString(); // month range from 0 - 11
            var date = objDate.getDate().toString();
            if (month.length == 1) { month = "0" + month; }
            if (date.length == 1) { date = "0" + date; }
            return date + '/' + month + '/' + year; //+'T00:00:000Z';
        }
        else if (typeof objDate == 'string')
            return objDate;
        else return null;
    }


    this.hasDatepicker = function ()
    {
        $('.datepicker').datepicker({ forceParse: false });        

        $('.span-calendar').on('click', function () {
            $(this).next('.datepicker').focus();
        });
    }

    this.hasDateTimepicker = function () {
        $('.datetimepicker').datetimepicker({
            format: "DD/MM/YYYY",
            allowInputToggle: true
    });

    }

    this.myBrowser = function get_browser() {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: 'IE', version: (tem[1] || '') };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR|Edge\/(\d+)/)
            if (tem != null) { return { name: 'Opera', version: tem[1] }; }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
        return {
            name: M[0],
            version: M[1]
        };
    }

    this.base64ToBlob = function (base64, mimetype, slicesize) {
        if (!window.atob || !window.Uint8Array) {
            // The current browser doesn't have the atob function. Cannot continue
            return null;
        }
        mimetype = mimetype || '';
        slicesize = slicesize || 512;
        var bytechars = atob(base64);
        var bytearrays = [];
        for (var offset = 0; offset < bytechars.length; offset += slicesize) {
            var slice = bytechars.slice(offset, offset + slicesize);
            var bytenums = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                bytenums[i] = slice.charCodeAt(i);
            }
            var bytearray = new Uint8Array(bytenums);
            bytearrays[bytearrays.length] = bytearray;
        }
        return new Blob(bytearrays, { type: mimetype });
    };

    this.curLang = function getFirstBrowserLanguage() {
        var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

        // support for HTML 5.1 "navigator.languages"
        if (Array.isArray(nav.languages)) {
            for (i = 0; i < nav.languages.length; i++) {
                language = nav.languages[i];
                if (language && language.length) {
                    return language;
                }
            }
        }

        // support for other well known properties in browsers
        for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
            language = nav[browserLanguagePropertyKeys[i]];
            if (language && language.length) {
                return language;
            }
        }

        return null;
    };

    this.currentDate = function getCurrentDate() {               
        return $filter('date')($rootScope.getCurrentDate(), 'MM/dd/yyyy')
    };

    this.currentDatetime = function getCurrentDatetime() {
        return $filter('date')($rootScope.getCurrentDate(), 'MM/dd/yyyy hh:mm a')
    };

    this.exportObjtoFile = function exportObjtoFile(base64, filename) {

        var blob = this.base64ToBlob(base64);

        var msg = "";
        var type = "";
        var browser = this.myBrowser();

        if (browser == undefined) {
            msg = "Your browser is not support.";
            type = "danger";
        }

        if (browser.name == "MSIE" && browser.version == "9") {
            //IE9 has no API for handling downloads using Blob objects, and doesn't support the download attribute
            // Only works for IE10 and up, including Edge
            msg = "Your browser is not support.";
            type = "danger";
        }
        else
            if (typeof window.navigator.msSaveBlob !== 'undefined') {

                // Provides a prompt to save the file to a location of users choice
                //window.navigator.msSaveBlob(blob, filename);
                window.navigator.msSaveOrOpenBlob(blob, filename);
                msg = "Generate report file successfully";
                type = "success";
            }
                // Browsers that adhere to current standards can implement downloads
                // using the Blob object with the download anchor attribute
                // ---
                // NOTE: Edge 13+ is compliant with both these standards, but Edge 12
                // does not support the download anchor attribute so all versions
                // have been grouped to use the propriety `msSaveBlob` method
            else {

                // Use the Blob object to create an object URL to download the file
                var URL = window.URL;
                var downloadUrl = URL.createObjectURL(blob);

                var filelink = document.createElement('a');

                if (angular.isDefined(anchor.download)) {

                    anchor.href = downloadUrl;
                    anchor.download = filename;
                    anchor.target = '_blank';
                    document.body.appendChild(anchor); // Required by Firefox
                    anchor.click();

                    // Release the existing object URL, and the anchor
                    $timeout(function () {
                        URL.revokeObjectURL(downloadUrl);
                        document.body.removeChild(anchor);
                        anchor = null;
                    }, 100);

                    msg = "Generate report file successfully";
                    type = "success";
                }
                else {

                    msg = "Your browser is not support.";
                    type = "danger";
                }
            }

        return {
            type: type,
            msg: msg
        };
    }
});

