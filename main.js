const { app, BrowserWindow, globalShortcut } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
  // win.webContents.openDevTools();
}

const toggleDevTools = () => win.webContents.toggleDevTools();

function createShortCuts() {
  globalShortcut.register("CmdOrCtrl+j", toggleDevTools);
}

app.whenReady().then(createWindow).then(createShortCuts);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
