define([
    "dojo/_base/declare",
    "dojo/_base/window",
    "dojo/dom-construct",
    "esri/map",
    'esri/arcgis/utils'

],

    function (declare, win, domConstruct, Map, utils) {

        return declare([],
        {

            constructor: function (args) {

            },
            
            createTestMap: function (divId, mapReadyCallback) {
                /// <summary></summary>
                /// <param name="divId" type="Object"></param>
                /// <param name="mapReadyCallback" type="Object"></param>

                domConstruct.create('div', { style: { height: "400px", width: "400px", display: "inline-block" }, id: divId }, win.body(), "first");

                var deferred = utils.createMap('c0b0f8fec385439da3939970cfce6b73', divId);

                deferred.then(function (response) {
                    var map = response.map;
                    //var extent;
                    map.itemId = '2e95c070c1e34f54a7083697e20bff22';
                    map.itemInfo = response.itemInfo;
                    map.webMapResponse = response;
                    mapReadyCallback(map);
                }, function (error) {
                    console.log("Error: ", error.code, " Message: ", error.message);
                    deferred.cancel();
                });

                //var map = new Map(divId,{
                //    basemap:"topo",
                //    center:[-122.45,37.75],
                //    zoom:13,
                //    sliderStyle:"small"
                //}); 

               // dojo.connect(map,'onLoad', function(theMap){
               //     mapReadyCallback(theMap);
              //  });
            }


        });

    });
