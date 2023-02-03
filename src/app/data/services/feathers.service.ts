import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import authentication, {
  AuthenticationClient,
} from '@feathersjs/authentication-client';
import * as rx from 'feathers-reactive';

@Injectable({
  providedIn: 'root',
})
export class FeathersService {
  private _socket = io(environment.apiUrl, { transports: ['websocket'] });
  private client = feathers();

  constructor() {
    const options = {
      storage: window.localStorage, // The storage to store the access token
      path: '/authentication', // The path of the authentication service
      locationKey: 'access_token', // The name of the window hash parameter to parse for an access token from the window.location. Usually used by the oAuth flow.
      locationErrorKey: 'error', // The name of the window hash parameter to parse for authentication errors. Usually used by the oAuth flow.
      jwtStrategy: 'jwt', // The access token authentication strategy
      storageKey: 'access_token', // Key for storing the token in e.g. localStorage
      header: 'Authorization', // Name of the accessToken header
      scheme: 'Bearer', // The HTTP header scheme
      Authentication: AuthenticationClient, // Allows to provide a customized authentication client class
    };

    this.client
      .configure(socketio(this._socket)) // add socket.io plugin
      .configure(authentication(options));
    // .configure(
    //   rx({
    //     // add feathers-reactive plugin
    //     idField: 'id',
    //   })
    // );
  }

  public socket() {
    return this.socket;
  }

  // expose services
  public service(name: string) {
    return this.client.service(name);
  }

  // expose authentication
  // authenticate with a Feathers server by passing a strategy and other properties as credentials
  public authenticate(credentials?: any): Promise<any> {
    return this.client.authenticate(credentials);
  }

  // authenticates using the JWT from the storage
  public reAuthenticate(credentials?: any): Promise<any> {
    return this.client.reAuthenticate();
  }

  public getCurrentUser(): Promise<any> {
    return this.client.get('authentication');
  }

  user(): Observable<any> {
    return this.client.get('authentication');
  }

  // expose logout
  // removes the JWT accessToken from storage on the client
  public logout(): Promise<any> {
    return this.client.logout();
  }
}
