// ReSharper disable UseOfImplicitGlobalInFunctionScope
require([
     'widgets/wabTemplate/Widget',
     'dojo/on',
     'dojo/Deferred',
     'dojo/dom-class',
     'dojo/dom-construct',
     "dojo/store/JsonRest",
     'dojo/domReady!'
], function (
    WidgetUnderTest,
    on,
    deferred,
    domClass,
    domConstruct,
    JsonRest
) {
    describe('widgets/wabTemplate/Widget', function () {


        widget = new WidgetUnderTest(null, domConstruct.create('div', null, 'testWidget'));
        widget.startup();

        var widget;

        var destroy = function (wdgt) {
            wdgt.destroyRecursive();
        };


        beforeEach(function () {
            //do we need to mock our services?
        });

        afterEach(function () {
            //dw its much faster if we don't tear down the whole widget after each test
            // if (widget) {
            //     destroy(widget);
            //  }
        });

        describe('Widget UI', function () {
            it('should create a Widget', function () {
                expect(widget).toEqual(jasmine.any(WidgetUnderTest));
            });
        });

    });
});
