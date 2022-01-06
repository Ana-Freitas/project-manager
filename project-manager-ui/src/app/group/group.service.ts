import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Group } from "../core/models/group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

    groupUrl = 'http://localhost:8080/group';

  constructor(private http: HttpClient) { }

  add(group: Group): Promise<Group> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Group>(this.groupUrl, Group.toJson(group), { headers }));
  }

  getById(id: number): Promise<Group> {
    return firstValueFrom(this.http.get<Group>(`${this.groupUrl}/${id}`))
  }

  search(): Promise<Group[]> {
    return firstValueFrom(this.http.get<Group[]>(`${this.groupUrl}`))
  }

  delete(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.groupUrl}/${id}`));
  }

  update(group: Group): Promise<Group> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return firstValueFrom(this.http.put<Group>(`${this.groupUrl}/${group.code}`, Group.toJson(group), { headers }));
  }
}