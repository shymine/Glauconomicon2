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
    return this.http.get(`${baseUrl}/${id}`);
  }

  get(sc_id: number, id: number): Observable<any> {
    return this.http.get(`${baseUrl}/${sc_id}/${id}`);
  }

  create(data: any, sc_id: number): Observable<any> {
    return this.http.post(`${baseUrl}/${sc_id}`, data);
  }

  update(sc_id: number, id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${sc_id}/${id}`, data);
  }

  delete(sc_id: number, id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${sc_id}/${id}`);
  }
}
