define([
         "dojo/request/xhr",
          "dojo/Deferred",
          "esri/tasks/FeatureSet"
    ],
    function (xhr, Deferred, FeatureSet) {
        var theFunc = function (fileName) {
            //perform a sync get on the json file
            var deferred = new Deferred();

            //build the url
            var url = require.toUrl('widgets/eclSearch/tests/spec/fixtures/' + fileName);
            xhr(url, {
                handleAs: "json",
                sync: true, //we call this sync. it will be fast and makes testing simpler.
            }).then(function (response) {
                var fs = new FeatureSet(response);
                deferred.resolve(fs);
            }, function (error) {
                console.error("Failed to get json fixture. getJsonFixture.js" & error);
            });

            return deferred.promise;
        }
        return theFunc;

    });

    

    ;
