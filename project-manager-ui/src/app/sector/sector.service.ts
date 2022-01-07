import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Sector } from '../core/models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

    sectorUrl = 'http://localhost:8080/sector';

  constructor(private http: HttpClient) { }

  add(sector: Sector): Promise<Sector> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Sector>(this.sectorUrl, Sector.toJson(sector), { headers }));
  }

  getById(code: number): Promise<Sector> {
    return firstValueFrom(this.http.get<Sector>(`${this.sectorUrl}/${code}`))
  }

  search(): Promise<Sector[]> {
    return firstValueFrom(this.http.get<Sector[]>(`${this.sectorUrl}`))
  }

  delete(code: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.sectorUrl}/${code}`));
  }

  update(sector: Sector): Promise<Sector> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return firstValueFrom(this.http.put<Sector>(`${this.sectorUrl}/${sector.code}`, Sector.toJson(sector), { headers }));
  }
}