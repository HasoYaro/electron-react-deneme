const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path');
const { autoUpdater, AppUpdater } = require('electron-updater')


autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

function createMainWindow(){
    mainWindow = new BrowserWindow({
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
    autoUpdater.checkForUpdates()
   // mainWindow.webContents.send('updateState', 'Searching for updates')
   mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('updateState', 'Checking for updates...');
});
})

autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('updateState', 'Update found!')
    let pth = autoUpdater.downloadUpdate()
    mainWindow.webContents.send('updateState', pth)
})

autoUpdater.on('update-not-available', (info) => {
    mainWindow.webContents.send('updateState', 'Update found!')
    mainWindow.webContents.send('updateState', pth)
})


autoUpdater.on('update-donwloaded', (info) => {
    mainWindow.webContents.send('updateState', 'Update downloaded!')
})


autoUpdater.on('error', (info) => {
    mainWindow.webContents.send('updateState', info)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })