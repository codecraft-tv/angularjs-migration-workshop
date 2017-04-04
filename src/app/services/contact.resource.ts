import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class Contact {
  private apiRoot: string = 'http://localhost:3000/contacts';

  constructor(private http: Http) {
  }

  static toURLSearchParams(params): URLSearchParams {
    let search = new URLSearchParams();
    for (let key in params) search.append(key, params[key])
    return search;
  }

  query(params?) {
    let search = Contact.toURLSearchParams(params);
    return this.http.get(this.apiRoot, {search})
        .map(res => res.json())
        .toPromise();
  }

  get(id, params?) {
    let search = Contact.toURLSearchParams(params);
    return this.http.get(this.apiRoot + '/' + id, {search})
        .map(res => res.json())
        .toPromise();
  }

  save(data: any) {
    return this.http.post(this.apiRoot, data)
        .map(res => res.json())
        .toPromise();
  }

  update(data) {
    return this.http.put(this.apiRoot + '/' + data.id, data)
        .map(res => res.json())
        .toPromise();
  }

  remove(data) {
    return this.http.delete(this.apiRoot + '/' + data.id)
        .map(res => res.json())
        .toPromise();
  }

}