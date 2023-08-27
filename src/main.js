"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
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
        Window.window.webContents.openDevTools();
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
