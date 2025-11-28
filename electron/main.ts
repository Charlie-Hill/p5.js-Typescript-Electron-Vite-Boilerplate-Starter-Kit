import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow: BrowserWindow | null = null;

const isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true';
const startUrl = isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`;

const enableDevTools = true;

function createMainWindow(): BrowserWindow {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js'), // provide a preload script if needed
        },
    });

    win.once('ready-to-show', () => win.show());
    if (isDev && enableDevTools) win.webContents.openDevTools({ mode: 'detach' });

    win.loadURL(startUrl).catch(err => {
        console.error('Failed to load start URL:', err);
    });

    win.on('closed', () => {
        if (mainWindow === win) mainWindow = null;
    });

    return win;
}

// Ensure single instance
if (!app.requestSingleInstanceLock()) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.whenReady().then(() => {
        mainWindow = createMainWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                mainWindow = createMainWindow();
            }
        });
    });

    app.on('window-all-closed', () => {
        // On macOS apps commonly stay active until user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}

// Example safe IPC handlers (use contextBridge in preload for renderer access)
ipcMain.handle('app:get-version', () => app.getVersion());
ipcMain.handle('app:quit', () => {
    app.quit();
});