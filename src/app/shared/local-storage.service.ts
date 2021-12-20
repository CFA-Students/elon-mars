import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get localStorage(): Storage {
    return localStorage;
  }

  getItem<T>(key: string): T | undefined {
    const item = this.localStorage.getItem(key);
    if (!item) return;
    return JSON.parse(item) as T;
  }

  setItem<T>(key: string, value: T): void {
    const json = JSON.stringify(value);
    this.localStorage.setItem(key, json);
  }

  get length(): number {
    return this.localStorage.length;
  }
}
