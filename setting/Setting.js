//DW this is a work in progress. It's a settings file that attempts to 
//build the setting UI based on the config. It only works on very simple settings at present
//see the app config widget for an example of how to use this
define([
    'dojo/_base/declare',
    'dojo/_base/lang',

    'dojo/dom-construct',

    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',

    'jimu/dijit/SimpleTable',
    "dijit/form/TextBox"

],
  function (
    declare, lang,
    domConstruct,
    widgetsInTemplateMixin, BaseWidgetSetting,
    Table, TextBox
    ) {
      return declare([BaseWidgetSetting, widgetsInTemplateMixin], {
          //these two properties is defined in the BaseWidget
          baseClass: 'ecl-eclTemplate-setting',

          postCreate: function () {
              this.inherited(arguments);
          },

          startup: function () {

              this.inherited(arguments);
              this.buildUI();

          },

          buildUI: function () {
              //this should automatically build the UI based upon the settings file and the nls
              for (var prop in this.config) {
                  var configItem = this.config[prop];
                  this.addTitle(prop);
                  if (configItem.type) {
                      switch (configItem.type.toLowerCase()) {
                          case 'table':
                              //see the app config widget for an example of how to use this
                              this.createTable(configItem);
                              break;
                          case 'text':
                              this.createTextbox(configItem);
                          default:
                              //simple text box with label needs to be added
                      }
                  }

              }
          },

          addTitle: function (name) {
              var title = this.nls[name + 'Title'];
              if (!title) return;
              domConstruct.create('h2', { innerHTML: title }, this.settingsContainer);
          },

          createTable: function (configItem) {
              //this will create a very basic table based upon the config item. It's only really set up for name value pairs at present
              //Doesn't allow the user to add new values.
              var fields = [
                  {
                      name: 'id',
                      title: 'id',
                      type: 'text',
                      editable: false,
                      hidden: true,
                      unique: true
                  },
                  {
                      name: 'name',
                      title: 'Name',
                      type: 'text',
                      editable: false,
                      hidden: false,
                      unique: true
                  }, {
                      name: 'value',
                      title: 'Value',
                      type: 'text',
                      editable: true,
                      hidden: false,
                      unique: false
                  }
              ];

              var args = {
                  fields: fields,
                  selectable: false
              };

              var tbl = new Table(args);
              tbl.addRows(configItem.values);
              this['table' + configItem.type.toLowerCase()] = tbl;
              tbl.placeAt(this.settingsContainer);

          },

          createTextbox: function(configItem) {
              var myTextBox = new TextBox({
                  name: configItem.id,
                  value: configItem.value,
              });
           
              myTextBox.placeAt(this.settingsContainer);
          },

          setConfig: function (config) {
              //any checks on the config?
              for (var prop in this.config) {
                  var configItem = this.config[prop];
                  switch (prop) {
                      case 'urls':
                          //urls we need to check the values from protcol
                          for (var id in configItem.values) {
                              var item = configItem.values[id];
                              item.value = this.removeProtocol(item.value);
                          }
                          break;
                      default:
                  }

              }

              this.config = config;
          },

          getConfig: function () {

              //loop through our current config looking at types as we need to do different things in order to get the values
              var newConfig = {};
              for (var prop in this.config) {
                  var configItem = this.config[prop];
                  newConfig[prop] = configItem;
                  if (configItem.type) {
                      switch (configItem.type.toLowerCase()) {
                          case 'table':
                              newConfig[prop].values = this['table' + configItem.type.toLowerCase()].getData();
                              break;
                          default:
                      }
                  }
              }
              this.setConfig(newConfig);

              return this.config;
          },

          removeProtocol: function (url) {
              url = url.replace('http://', '');
              url = url.replace('https://', '');
              if (url.indexOf('//') == 0) {
                  url = url.replace('//', '');
              }
              //ensure we don't have a training '/'
              if (url.slice(-1) == '/') url = url.slice(0, -1);
              return url;
          }
      });


  });