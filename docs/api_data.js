define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C__Users_jeremy_source_music_Dahu_pusher_docs_main_js",
    "groupTitle": "C__Users_jeremy_source_music_Dahu_pusher_docs_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/debug",
    "title": "DebugConsole",
    "description": "<p>Shows debug console which can be used to manually trigger events</p>",
    "name": "DebugConsole",
    "group": "Debug",
    "version": "0.0.0",
    "filename": "./main.js",
    "groupTitle": "Debug"
  },
  {
    "type": "post",
    "url": "/notify/:type/:id",
    "title": "Notify",
    "description": "<p>Sends a notification to connected users</p>",
    "name": "Notify",
    "group": "General",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"chat\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Which service to notify</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>UUID or ID of concerned service</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./main.js",
    "groupTitle": "General"
  },
  {
    "type": "get",
    "url": "/status",
    "title": "Status",
    "description": "<p>Returns informations about the pusher</p>",
    "name": "Status",
    "group": "General",
    "version": "0.0.0",
    "filename": "./main.js",
    "groupTitle": "General"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Root",
    "description": "<p>Test if pusher is running</p>",
    "name": "Test",
    "group": "General",
    "version": "0.0.0",
    "filename": "./main.js",
    "groupTitle": "General"
  }
] });
