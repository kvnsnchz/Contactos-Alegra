import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactServiceProvider {
	 httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic a3ZuOTYxNkBnbWFpbC5jb206YTU3NzhlNzc4ZGI4ZmZkZDI0ZjY='
    })
  };
  constructor(public http: HttpClient) {}
  getContacts(index){
  	return this.http.get('https://app.alegra.com/api/v1/contacts/?start='+(index*30),this.httpOptions);
  }
  addContact(contact){
    return this.http.post('https://app.alegra.com/api/v1/contacts',contact, this.httpOptions);
  }
  getContact(id){
    return this.http.get('https://app.alegra.com/api/v1/contacts/'+id,this.httpOptions);
  }
  deleteContacts(id){
    return this.http.delete('https://app.alegra.com/api/v1/contacts/'+id,this.httpOptions);
  }
 

}
