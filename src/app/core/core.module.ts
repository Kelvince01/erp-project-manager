import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouteReuseStrategy } from '@angular/router';
import { RouteReusableStrategy } from './route-reusable-strategy';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
  exports: [PageNotFoundComponent],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        // { provide: AuthConfig, useValue: authConfig },
        // { provide: OAuthModuleConfig, useValue: authModuleConfig },
        // { provide: OAuthStorage, useFactory: storageFactory },
      ],
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
