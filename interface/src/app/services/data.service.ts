import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: any;

  constructor() {
    this.data = undefined;
  }

  set(item: any) {
    this.data = item;
  }

  get(): any {
    const d = this.data;
    this._reset();
    return d;
  }

  _reset(): void {
    this.data = undefined;
  }

  isPresent(): boolean {
    return this.data!= undefined;
  }
}
