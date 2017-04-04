import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'personCreate',
  templateUrl: 'app/components/person-modify.component.html'
})
export class PersonCreateComponent {
  public mode: string = 'Create';
  public person = {};

  constructor(private contacts: ContactService,
              private router: Router) {
    this.person = {};
  }

  save() {
    this.contacts.createContact(this.person)
        .then(() => {
          this.router.navigate(['']);
        })
  }
}