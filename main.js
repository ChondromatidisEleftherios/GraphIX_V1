const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1150,
        height: 666,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
            contextIsolation: false, 
            nodeIntegration: true, 
            enableRemoteModule: true,
            nodeIntegrationInWorker: true,
        }
    });

    mainWindow.loadFile('Main_Menu.html'); // Load your HTML file
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null; // Dereference the window object
    });
}

// Event: App ready
app.on('ready', createMainWindow);

// Event: All windows closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit(); // Quit the app unless on macOS
    }
});

// Event: App activated (macOS specific behavior)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow(); // Recreate window if none are open
    }
});
