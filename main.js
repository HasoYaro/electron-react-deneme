const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path');
const { start } = require('repl');

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'Anani Sikim Hayat',
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

    mainWindow.webContents.openDevTools()

    // mainPreload'dan loading fonksiyonunu bekliyor
    const startUrll = ipcMain.on('loading', (e, state) => {
        if(!state) {
            startUrl = url.format({
            pathname: path.join(__dirname, './app/build/index.html'),
            protocol: 'file'
        })

        mainWindow.loadURL(startUrl)
        }
    })

    let startUrl = url.format({
            pathname: path.join(__dirname, './loading/loading.html'),
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