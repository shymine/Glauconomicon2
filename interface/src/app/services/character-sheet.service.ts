import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/api/charac_sheet'

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const obs = new Observable(observer => {
      this.http.get(baseUrl).subscribe((sheet_list:any) => {
        sheet_list.forEach((sheet: any) => {
          sheet.sections.forEach((section: any) => {
            section.tables = section.tables.map((table:any) => {
              let tmp = table;
              tmp.headers = table.headers.split(",");
              return tmp;
            });
          });
        });
        observer.next(sheet_list);
        observer.complete();
      });
    });

    return obs;
  }

  get(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    data.sections.forEach((section: any) => {
      section.tables = section.tables.map((table: any) => {
        let tmp = table;
        tmp.headers = table.headers.join(",");
        return tmp;
      });
    });
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
