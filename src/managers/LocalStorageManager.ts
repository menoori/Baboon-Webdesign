// Local Storage App Data Storage HAS TO BE the following...
// id: string <-- this will be used as a key value name
// data: any[] <-- this be your array of data, which user can perform array functions on
export class LocalStorageManager {
  private _dataId: string;
  private _data: any[];
  constructor(dataId: string) {
    this._dataId = dataId;
    // Getting the app data from localstorage, if nor set empty array
    const appDataArr = JSON.parse(localStorage.getItem(this._dataId)!);
    if (appDataArr === null) this._data = [];
    else this._data = appDataArr;
  }
  get getDataFromLocalStorage() {
    const appDataArr = JSON.parse(localStorage.getItem(this._dataId)!) as any[];
    if (appDataArr === null) {
      const keyValuePair = window.confirm(
        "No data found, want to create a new database in local storage?"
      );
      if (keyValuePair)
        localStorage.setItem(this._dataId, JSON.stringify(this._data));
      return this._data;
    } else {
      return appDataArr;
    }
  }

  set addAppDataToLocalStorage(data: any) {
    this._data = [...this._data, data];
    localStorage.setItem(this._dataId, JSON.stringify(this._data));
  }
}
