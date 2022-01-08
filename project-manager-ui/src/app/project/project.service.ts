import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Project } from '../core/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

    projectUrl = 'http://localhost:8080/project';

  constructor(private http: HttpClient) { }

  add(project: Project): Promise<Project> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Project>(this.projectUrl, Project.toJson(project), { headers }));
  }

  getById(code: number): Promise<Project> {
    return firstValueFrom(this.http.get<Project>(`${this.projectUrl}/${code}`))
  }

  search(): Promise<Project[]> {
    return firstValueFrom(this.http.get<Project[]>(`${this.projectUrl}`))
  }

  delete(code: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.projectUrl}/${code}`));
  }

  update(project: Project): Promise<Project> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return firstValueFrom(this.http.put<Project>(`${this.projectUrl}/${project.code}`, Project.toJson(project), { headers }));
  }
}