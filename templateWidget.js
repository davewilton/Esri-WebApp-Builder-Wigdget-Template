define([
        "dojo/_base/declare",
        "dojo/_base/lang",
       
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",

        "dojox/mvc/at",

        //html template
        'dojo/text!./templates/wabTemplateWidget.html', //update this
        'dojo/i18n!' + require.toUrl('widgets/wabTemplate/nls/strings.js') //update this
],
    function (
        declare, lang,
        widgetBase, templatedMixin, widgetsInTemplateMixin,
        at,
        template,
        nls) {

        return declare([widgetBase, templatedMixin, widgetsInTemplateMixin],
        {

            templateString: template,

            constructor: function (args) {
                lang.mixin(this, args);
            },

            startup: function () {
                try {

                    this.inherited(arguments);

                } catch (e) {
                    console.log(e);
                }
            },

            destroy: function () {
                this.inherrited(arguments);
               //clean up handlers and any widgets which are not managed
            }


        });
    });