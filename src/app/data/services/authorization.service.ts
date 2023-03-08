import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  decodedToken: any;
  constructor() {}
  public GetRolPermission(): void {}
  public GetRol() {}
  public ReloadRolPermissions(): void {}
}
