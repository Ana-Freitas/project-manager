import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: HttpClient, 
              private jwtHelper: JwtHelperService) {
                this.loadToken();
              }

  login(user: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic Y2xpZW50OmNsaWVudA==');

    const body = `username=${user}&password=${password}&grant_type=password`;
    
    return firstValueFrom(this.http.post(this.oauthTokenUrl, body,  { headers, withCredentials: true }))
    .then((response: any) => {
      console.log(response);
      this.storeToken(response[`access_token`]);
    }).catch(response => {
      if (response.status === 400) {
        if (response.error === 'invalid_grant') {
          return Promise.reject('Usuário e/ou senha inválida!');
        }
      }

      return Promise.reject(response);
    });
  }

  private storeToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken(): void {
    const token = localStorage.getItem('token');
    if(token){
      this.storeToken(token);
    }
  }

  hasPermission(permission: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }

  hasAnyPermission(roles: any): boolean {
    for (const role of roles) {
      if (this.hasPermission(role)) {
        return true;
      }
    }

    return false;
  }

  getNewAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic Y2xpZW50OmNsaWVudA==');

    const body = 'grant_type=refresh_token';

    return firstValueFrom(this.http.post<any>(this.oauthTokenUrl, body,
        { headers, withCredentials: true }))
      .then((response: any) => {
        this.storeToken(response[`access_token`]);

        console.log('Novo access token criado!');

        return Promise.resolve();
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve();
      });
  }

  isAccessTokenInvalid(): boolean {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  
  clearAccessToken(): void {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }
}
