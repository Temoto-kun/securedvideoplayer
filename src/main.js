/*global require */
/*global process */

/*global __dirname */

(function(require, process, undefined) {

    "use strict";

    var app = require("app");
    var BrowserWindow = require("browser-window");

    require("crash-reporter").start();

    var window = null;

    app.on("window-all-closed", function() {
        if(process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("ready", function() {
        window = new BrowserWindow({ width: 640, height: 480 });

        window.loadUrl("file://" + __dirname + "/index.html");

        window.on("closed", function() {
            window = null;
        });
    });

})(require, process);
