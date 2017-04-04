import {Component, Inject} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {ContactService} from "../services/contact.service";
import {UIRouterStateParams, UIRouterState} from "../ajs-upgraded-providers";


@Component({
  selector: 'personEdit',
  templateUrl: 'app/components/person-modify.component.html'
})
export class PersonEditComponent {
  public mode: string = 'Edit';
  public person: any;

  constructor(private contacts: ContactService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['email']) {
        this.person = this.contacts.getPerson(params['email']);
      }
    });
  }

  save() {
    this.contacts.updateContact(this.person)
        .then(() => {
          this.router.navigate(['']);
        })
  }

  remove() {
    this.contacts.removeContact(this.person)
        .then(() => {
          this.router.navigate(['']);
        })
  }
}