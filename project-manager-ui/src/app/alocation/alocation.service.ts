import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Alocation } from '../core/models/alocation.model';

@Injectable({
  providedIn: 'root'
})
export class AlocationService {

    alocationUrl = 'http://localhost:8080/alocation';

  constructor(private http: HttpClient) { }

  add(alocation: Alocation): Promise<Alocation> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Alocation>(this.alocationUrl, Alocation.toJson(alocation), { headers }));
  }

  getById(code: number): Promise<Alocation> {
    return firstValueFrom(this.http.get<Alocation>(`${this.alocationUrl}/${code}`))
  }

  search(): Promise<Alocation[]> {
    return firstValueFrom(this.http.get<Alocation[]>(`${this.alocationUrl}`))
  }

  delete(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.alocationUrl}/${id}`));
  }

  update(alocation: Alocation): Promise<Alocation> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return firstValueFrom(this.http.put<Alocation>(`${this.alocationUrl}/${alocation.code}`, Alocation.toJson(alocation), { headers }));
  }
}