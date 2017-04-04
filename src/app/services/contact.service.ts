import * as angular from 'angular';

import {Injectable, Inject} from "@angular/core";
import {downgradeInjectable} from '@angular/upgrade/static';
import {Contact} from "./contact.resource";
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class ContactService {
  public page = 1;
  public hasMore = true;
  public isLoading = false;
  public isSaving = false;
  public isDeleting = false;
  public persons = [];
  public search = null;
  public sorting = 'name';
  public ordering = 'ASC';


  constructor(private contact: Contact, private toaster: ToasterService) {
    this.loadContacts();
  }

  getPerson(email) {
    for (let person of this.persons) {
      if (person.email === email) {
        return person;
      }
    }
    return {};
  }

  doSearch() {
    this.hasMore = true;
    this.page = 1;
    this.persons = [];
    this.loadContacts();
  }

  loadContacts() {
    if (this.hasMore && !this.isLoading) {
      this.isLoading = true;

      let params = {
        '_page': this.page,
        '_sort': this.sorting,
        "_order": this.ordering,
        'q': this.search
      };

      this.contact.query(params).then(res => {
        console.log(res);
        for (let person of res) {
          this.persons.push(person);
        }
        if (res.length === 0) {
          this.hasMore = false;
        }
        this.isLoading = false;
      });
    }
  };

  loadMore() {
    if (this.hasMore && !this.isLoading) {
      this.page += 1;
      this.loadContacts();
    }
  };

  updateContact(person) {
    return new Promise((resolve, reject) => {
      this.isSaving = true;
      this.contact.update(person).then(() => {
        this.isSaving = false;
        this.toaster.pop('success', 'Updated ' + person.name);
        resolve()
      });
    });
  };

  removeContact(person) {
    return new Promise((resolve, reject) => {
      this.isDeleting = true;
      this.contact.remove(person).then(() => {
        this.isDeleting = false;
        var index = this.persons.indexOf(person);
        this.persons.splice(index, 1);
        this.toaster.pop('success', 'Deleted ' + person.name);
        resolve()
      });
    });
  };

  createContact(person) {
    return new Promise((resolve, reject) => {
      this.isSaving = true;
      this.contact.save(person).then(() => {
        this.isSaving = false;
        this.hasMore = true;
        this.page = 1;
        this.persons = [];
        this.loadContacts();
        this.toaster.pop('success', 'Created ' + person.name);
        resolve()
      });
    });
  };

}

angular
    .module('codecraft')
    .factory('ContactService', downgradeInjectable(ContactService));