import * as angular from "angular";

import {Component, Inject} from "@angular/core";
import {downgradeComponent} from "@angular/upgrade/static";
import {ContactService} from "../services/contact.service";
import {UIRouterStateParams, UIRouterState} from "../ajs-upgraded-providers";

@Component({
  selector: 'personCreate',
  templateUrl: 'app/components/person-modify.component.html'
})
export class PersonCreateComponent {
  public mode: string = 'Create';
  public person = {};

  constructor(@Inject(UIRouterStateParams) private $stateParams,
              @Inject(UIRouterState) private $state,
              private contacts: ContactService) {
    this.person = this.contacts.getPerson(this.$stateParams.email);
  }

  save() {
    this.contacts.createContact(this.person)
        .then(() => {
          this.$state.go("list");
        })
  }
}

angular
    .module('codecraft')
    .directive('personCreate', downgradeComponent({
      component: PersonCreateComponent
    }) as angular.IDirectiveFactory);