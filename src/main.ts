import {app, BrowserWindow, ipcMain} from "electron"
import {exec} from 'child_process';

//window variable declarations
var main: Window;

const main_dict = {
    width: 800,
    height: 480,
    title: "MyPlant",
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    },
    resizable: true,
    fullscreen: false
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

        Window.path_load = path
    }
}

app.on("ready", () => {
    main = new Window(main_dict, "./ui/index.html")
    main.show()
})


ipcMain.on("actions", (event, data) => {
    switch(data){
        case "leave":
            main.close()
            break
        case "update_system":
            
            break
        case "update_application":
            break
        case "turnoff":
            main.close()
            exec("shutdown now")
            throw new Error("Program is going to exit now")

    }
})

ipcMain.on("getdata", (event, data) => {
    switch(data){
        case "temp":
            exec("./getdata.py temp", (error, stdout, stderr) => {
                if (error){
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                event.reply("getdata-reply", stdout)
            })
    }
})