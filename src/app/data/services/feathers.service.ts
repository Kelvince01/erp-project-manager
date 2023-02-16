import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
// import feathersSocketIOClient from '@feathersjs/socketio-client';
import { Observable } from 'rxjs';
// import * as rx from 'feathers-reactive';
import feathersAuthClient2 from '@feathersjs/authentication-client';
import { environment } from '@envs/environment';

@Injectable({
  providedIn: 'root',
})
export class FeathersService {
  private _socket = io(environment.apiUrl, { transports: ['websocket'] });
  private client = feathers();
  private feathersAuthClient = require('@feathersjs/authentication-client')
    .default;

  constructor() {
    this.client
      .configure(socketio(this._socket)) // add socket.io plugin
      .configure(
        this.feathersAuthClient({
          // add authentication plugin
          storage: window.localStorage,
        })
      );
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

  /*
  _socket.on("disconnect", () => changeServerState('disconnected'));
_socket.on("connect", () => changeServerState('connected'));
_socket.on("connect_error", () => changeServerState('error'));
_socket.on("connect_timeout", () => changeServerState('connect_timeout')); */

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
