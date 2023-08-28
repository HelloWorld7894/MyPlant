"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var child_process_1 = require("child_process");
//window variable declarations
var main;
var main_dict = {
    width: 800,
    height: 480,
    title: "MyPlant",
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    },
    resizable: true,
    fullscreen: false
};
var Window = /** @class */ (function () {
    function Window(config, path) {
        Window.window = new electron_1.BrowserWindow(config);
        Window.window.setMenu(null);
        Window.path_load = path;
    }
    Window.prototype.close = function () {
        Window.window.close();
    };
    Window.prototype.show = function () {
        Window.window.loadFile(Window.path_load);
    };
    return Window;
}());
electron_1.app.on("ready", function () {
    main = new Window(main_dict, "./ui/index.html");
    main.show();
});
electron_1.ipcMain.on("actions", function (event, data) {
    switch (data) {
        case "leave":
            main.close();
            break;
        case "turnoff":
            break;
    }
});
electron_1.ipcMain.on("getdata", function (event, data) {
    switch (data) {
        case "temp":
            (0, child_process_1.exec)("./getdata.py temp", function (error, stdout, stderr) {
                if (error) {
                    console.log("error: ".concat(error.message));
                    return;
                }
                if (stderr) {
                    console.log("stderr: ".concat(stderr));
                    return;
                }
                console.log("stdout: ".concat(stdout));
                event.reply("getdata-reply", stdout);
            });
    }
});
