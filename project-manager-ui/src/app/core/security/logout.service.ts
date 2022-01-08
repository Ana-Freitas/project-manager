import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LogoutService {

  tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  logout(): Promise<any> {
    return firstValueFrom(this.http.delete(this.tokensRevokeUrl, { withCredentials: true }))
      .then(() => {
        this.auth.clearAccessToken();
      });
  }

}