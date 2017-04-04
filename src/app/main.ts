import 'reflect-metadata';
import './polyfills.ts';
import './rxjs-operators.ts';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {LaddaModule} from "angular2-ladda/module/module";
import {RouterModule} from "@angular/router";
import {ToasterModule} from 'angular2-toaster';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {routes} from './app.routes'

import {Contact} from "./services/contact.resource";
import {ContactService} from "./services/contact.service";

import {CardComponent} from "./components/card.component";
import {SpinnerComponent} from "./components/spinner.component"
import {PersonListComponent} from "./components/person-list.component";
import {PersonEditComponent} from "./components/person-edit.component";
import {PersonCreateComponent} from "./components/person-create.component";
import {SearchComponent} from "./components/search.component";
import {AppRootComponent} from "./components/app-root.component";

import {DefaultImagePipe} from "./pipes/default-image.pipe";


@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpModule,
    LaddaModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ToasterModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  declarations: [
    CardComponent,
    SpinnerComponent,
    PersonListComponent,
    DefaultImagePipe,
    PersonEditComponent,
    PersonCreateComponent,
    SearchComponent,
    AppRootComponent
  ],
  entryComponents: [
    CardComponent,
    SpinnerComponent,
    PersonListComponent,
    PersonEditComponent,
    PersonCreateComponent,
    SearchComponent,
    AppRootComponent
  ],
  providers: [
    Contact,
    ContactService
  ],
  bootstrap: [
    AppRootComponent
  ]
})
export class AppModule {
}

// Bootstrap using the UpgradeModule
platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  console.log("Bootstrapping Angular");
});