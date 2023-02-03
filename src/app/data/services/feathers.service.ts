import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import authentication, {
  AuthenticationClient,
} from '@feathersjs/authentication-client';
import * as feathersRx from 'feathers-reactive';

@Injectable({
  providedIn: 'root',
})
export class FeathersService {
  private _socket = io(environment.apiUrl, { transports: ['websocket'] });
  private client = feathers();
  // private feathersAuthClient = require('@feathersjs/authentication-client').default;

  constructor() {
    const options = {
      storage: window.localStorage, // The storage to store the access token
      path: '/authentication', // The path of the authentication service
      locationKey: 'access_token', // The name of the window hash parameter to parse for an access token from the window.location. Usually used by the oAuth flow.
      locationErrorKey: 'error', // The name of the window hash parameter to parse for authentication errors. Usually used by the oAuth flow.
      jwtStrategy: 'jwt', // The access token authentication strategy
      storageKey: 'feathers-jwt', // Key for storing the token in e.g. localStorage
      header: 'Authorization', // Name of the accessToken header
      scheme: 'Bearer', // The HTTP header scheme
      Authentication: AuthenticationClient, // Allows to provide a customized authentication client class
    };

    // this.client.configure(socketio(this._socket));
    // this.client.configure(authentication())

    // Pass the custom authentication client class as the `Authentication` option
    /*this.client.configure(
      authentication({
        Authentication: MyAuthenticationClient
      })
    )*/

    this.client
      .configure(socketio(this._socket)) // add socket.io plugin
      // .configure(this.feathersAuthClient(options))
      .configure(authentication(options))
      .configure(
        feathersRx({
          // add feathers-reactive plugin
          idField: 'id',
        })
      );

    /*.hooks({
    before: {
      all: [
        iff(
          context => ['create', 'update', 'patch'].includes(context.method),
          discard('__id', '__isTemp')
        )
      ]
    }
  })
*/
    /*
      this.client
      .configure(socketio(this._socket))  // add socket.io plugin
      .configure(this.feathersAuthClient({                   // add authentication plugin
        storage: window.localStorage
      }))
      .configure(feathersRx({                           // add feathers-reactive plugin
        idField: 'id'
      })); */
  }

  /*
  app.reAuthenticate()        // authenticates using the JWT from the storage
app.authenticate(options)  // authenticate with a Feathers server by passing a strategy and other properties as credentials
app.logout()               // removes the JWT accessToken from storage on the client */

  public socket() {
    return this.socket;
  }

  // expose services
  public service(name: string) {
    return this.client.service(name);
  }

  // expose authentication
  public authenticate(credentials?: any): Promise<any> {
    return this.client.authenticate(credentials);
  }

  public getCurrentUser(): Promise<any> {
    return this.client.get('authentication');
  }

  user(): Observable<any> {
    return this.client.get('authentication');
  }

  // expose logout
  public logout(): Promise<any> {
    return this.client.logout();
  }
}
