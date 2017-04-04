import 'angular';
import 'angular-resource';
import 'angular-animate';
import 'ng-infinite-scroll';
import 'angular-spinner';
import 'angular-auto-validate/dist/jcs-auto-validate';
import 'angular-ladda';
import 'angular-strap';
import 'angularjs-toaster';
import 'angular-ui-router';

import 'reflect-metadata';

import './app.main';
import './services';
import './pipes';
import './components';
import './app.routes';
import './polyfills.ts';
import './rxjs-operators.ts';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {LaddaModule} from "angular2-ladda/module/module";
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {
    toasterServiceProvider,
    uiRouterStateParamsProvider,
    uiRouterStateProvider
} from "./ajs-upgraded-providers"

import {Contact} from "./services/contact.resource";
import {ContactService} from "./services/contact.service";

import {CardComponent} from "./components/card.component";
import {SpinnerComponent} from "./components/spinner.component"
import {PersonListComponent} from "./components/person-list.component";
import {PersonEditComponent} from "./components/person-edit.component";
import {PersonCreateComponent} from "./components/person-create.component";
import {SearchComponent} from "./components/search.component";

import {DefaultImagePipe} from "./pipes/default-image.pipe";


@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpModule,
    LaddaModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  declarations: [
    CardComponent,
    SpinnerComponent,
    PersonListComponent,
    DefaultImagePipe,
    PersonEditComponent,
    PersonCreateComponent,
    SearchComponent
  ],
  entryComponents: [
    CardComponent,
    SpinnerComponent,
    PersonListComponent,
    PersonEditComponent,
    PersonCreateComponent,
    SearchComponent
  ],
  providers: [
    Contact,
    ContactService,
    toasterServiceProvider,
    uiRouterStateParamsProvider,
    uiRouterStateProvider
  ],
})
export class AppModule {
  // Override Angular bootstrap so it doesn't do anything
  ngDoBootstrap() {
  }
}

// Bootstrap using the UpgradeModule
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  console.log("Bootstrapping in Hybrid mode with Angular & AngularJS");
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['codecraft']);
});