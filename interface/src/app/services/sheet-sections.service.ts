import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'localhost:8000/api/sheet_section'

@Injectable({
  providedIn: 'root'
})
export class SheetSectionsService {

  constructor(private http: HttpClient) { }

  getAll(id: number): Observable<any> {
    const obs = new Observable(observer => {
      this.http.get(`${baseUrl}/${id}`).subscribe((datas:any) => {
        datas.forEach((data:any) => {
          const tmp = data.tables.map((table: any) => {
            table.headers.split(",");
          });
          console.log(tmp);
          data.tables = tmp;
        });
        observer.next(datas);
        observer.complete();
      });
    });
    return obs;
  }

  get(sc_id: number, id: number): Observable<any> {
    const obs = new Observable(observer => {
      this.http.get(`${baseUrl}/${sc_id}/${id}`).subscribe((data:any) => {
        const tmp = data.tables.map((table: any) => {
          let tab = table;
          tab.headers = table.headers.split(",");
          return tab;
        });
        console.log(tmp);
        data.tables = tmp;
        observer.next(data);
        observer.complete();
      });
    });

    return obs;
  }

  create(data: any, sc_id: number): Observable<any> {
    data.tables = data.tables.map((table:any) => {
      let tmp = table;
      tmp.headers = table.headers.join(",");
      return tmp;
    });
    return this.http.post(`${baseUrl}/${sc_id}`, data);
  }

  update(sc_id: number, id: number, data: any): Observable<any> {
    data.tables = data.tables.map((table: any) => {
      let tmp = table;
      tmp.headers = table.headers.join(",");
      return tmp;
    });
    return this.http.put(`${baseUrl}/${sc_id}/${id}`, data);
  }

  delete(sc_id: number, id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${sc_id}/${id}`);
  }

}
