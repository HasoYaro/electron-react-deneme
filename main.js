const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path');
const { start } = require('repl');

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 576,
        resizable: false,
        autoHideMenuBar: true,
        center: true,
        darkTheme: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, './mainPreload.js')
        }
    });
    // mainWindow.loadFile(path.join(__dirname, './pages/loading/loading.html'));

    //     ipcMain.on('loading', (e, state) => {
    //         if(!state)
    //             mainWindow.loadFile(path.join(__dirname, './pages/mainMenu/mainMenu.html'));
            
    //     })

    //     // mainWindow.loadFile(path.join(__dirname, './renderer/codes/loading.html'));
    mainWindow.webContents.openDevTools()

    const startUrl = url.format({
        pathname: path.join(__dirname, './app/build/index.html'),
        protocol: 'file'
    })

    mainWindow.loadURL(startUrl)
}

app.whenReady().then(() => {
    createMainWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })