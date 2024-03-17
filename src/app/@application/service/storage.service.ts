import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getFromLocalStorage(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }
}
