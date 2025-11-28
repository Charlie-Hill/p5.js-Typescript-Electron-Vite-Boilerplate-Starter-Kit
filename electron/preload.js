const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
  quitApp: () => ipcRenderer.invoke('app:quit'),
  getVersion: () => ipcRenderer.invoke('app:get-version')
});
