import { Injectable } from '@angular/core';
import {Motivo} from './motivo';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MotivoService {

  endpoint = 'http://localhost:8888/test/?a='; //  http://localhost:8888/test/?a=  https://test-detektor.000webhostapp.com/?a=
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  motivos: Motivo[];


  constructor(private http: HttpClient) {

  }


  getMotivos(): Observable<Motivo[]> {
    return this.http.get<Motivo[]>(`${this.endpoint}listar`);
  }

  createMotive(motive: Motivo): Observable<Motivo> {
    return this.http.post<Motivo>(`${this.endpoint}registrar`, motive);
  }

  updateMotive(motive: Motivo) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Motivo>(`${this.endpoint}editar`, motive, );
  }

  deletePolicy(motive: Motivo) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Motivo>(`${this.endpoint}editar`, motive, );
  }

}
