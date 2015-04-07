define([
    'dojo/_base/declare',
    'dojo/_base/lang',

    'jimu/BaseWidget',

    'dijit/_WidgetsInTemplateMixin',
    
    'dojox/mvc/at',

    './templateWidget', //update this

    //required text files. In the main app esri will load these but in tests it won't
    'dojo/text!./Widget.html',
    'dojo/text!./config.json',
    'dojo/i18n!' + require.toUrl('widgets/wabTemplate/nls/strings.js')
],
  function (
      declare, lang, 
      BaseWidget, widgetsInTemplateMixin,
      at,
      templateWidget,
      template, inConfig, nls //required text files. In the main app esri will load these but in tests it won't
      ) {

      return declare([BaseWidget, widgetsInTemplateMixin], {

          baseClass: 'wab-widget-wabTemplate', //update this
          controller: null,

          templateString: template,
          nls: nls,

          constructor: function (args) {
              lang.mixin(this, args);

          },

          postCreate: function () {
              this.inherited(arguments);
          },

          startup: function () {
              this.inherited(arguments);
          },

       
          onClose: function () {
              this.inherited(arguments);
          },

          onOpen: function () {
              this.inherited(arguments);
          },

          destroy: function () {
              try {
                  //clean up!
              } catch (e) {

              }
              this.inherited(arguments);
          }

      });
  });