import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Employee } from '../core/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    employeeUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) { }

  add(employee: Employee): Promise<Employee> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Employee>(this.employeeUrl, Employee.toJson(employee), { headers }));
  }

  getById(code: number): Promise<Employee> {
    return firstValueFrom(this.http.get<Employee>(`${this.employeeUrl}/${code}`))
  }

  search(): Promise<Employee[]> {
    return firstValueFrom(this.http.get<Employee[]>(`${this.employeeUrl}`))
  }

  delete(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.employeeUrl}/${id}`));
  }

  update(employee: Employee): Promise<Employee> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return firstValueFrom(this.http.put<Employee>(`${this.employeeUrl}/${employee.code}`, Employee.toJson(employee), { headers }));
  }
}