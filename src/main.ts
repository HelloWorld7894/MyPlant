import {app, BrowserWindow, ipcMain, screen} from "electron"

//window variable declarations
var main: Window;

const main_dict = {
    width: 1000,
    height: 600,
    title: "MyPlant",
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    },
    resizable: false
}

class Window{
    static window: BrowserWindow;
    static path_load: string


    public close(){
        Window.window.close()
    }

    public show(){
        Window.window.loadFile(Window.path_load);
    }

    public constructor(config: any, path: string){
        Window.window = new BrowserWindow(config);
        Window.window.setMenu(null);
        Window.window.webContents.openDevTools()

        Window.path_load = path
    }
}

app.on("ready", () => {
    main = new Window(main_dict, "./ui/index.html")
    main.show()
})