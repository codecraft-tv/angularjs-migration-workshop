import {Component} from "@angular/core";
import {ContactService} from "../services/contact.service";
import {
    FormGroup,
    FormControl
} from '@angular/forms';

@Component({
  selector: 'search',
  template: `
<form class="navbar-form navbar-left" [formGroup]="myform">

  <div class="form-group">
    <input type="text"
           class="form-control"
           formControlName="search"
           placeholder="Search name..."/>
  </div>

  <div class="form-group">
    <select class="form-control"
            formControlName="sorting">
      <option value="name">Name</option>
      <option value="email">Email</option>
    </select>
  </div>

  <div class="form-group">
    <select class="form-control"
            formControlName="ordering">
      <option value="ASC">ASC</option>
      <option value="DESC">DESC</option>
    </select>
  </div>
</form>
`
})
export class SearchComponent {

  private myform: FormGroup;

  constructor(private contacts: ContactService) {
    this.myform = new FormGroup({
      search: new FormControl(),
      sorting: new FormControl('name'),
      ordering: new FormControl('ASC')
    });
  }

  ngOnInit() {
    this.myform
        .valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .do(console.log)
        .subscribe(({sorting, ordering, search}) => {
          this.contacts.sorting = sorting;
          this.contacts.ordering = ordering;
          this.contacts.search = search;
          this.contacts.doSearch();
        });
  }
}
