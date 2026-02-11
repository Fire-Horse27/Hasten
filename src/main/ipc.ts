import { ipcMain } from "electron";
import { addAccount, getAccounts } from "./db";

ipcMain.handle("accounts:init", () => {
  const accounts = getAccounts();

  if (accounts.length === 0) {
    addAccount("Checking", "checking", 0);
  }

  return getAccounts();
});
