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
  	return this.http.get('https://app.alegra.com/api/v1/contacts/?start='+index,this.httpOptions);
  }
  addContact(contact){
    let vect;
    if(contact.client && contact.provider){
      vect = ["client","provider"];
    }
    else{
      if(contact.client){
        vect = ["client"];
      }
      else{
        if(contact.provider){
          vect = ["provider"];
        }
        else{
          vect = [];
        }
      }
    }
    let c = {
      name : contact.name,
      identification : contact.identification,
      phonePrimary : contact.phonePrimary,
      phoneSecondary : contact.phoneSecondary,
      fax : contact.fax,
      mobile : contact.mobile,
      observations : contact.observations,
      email: contact.email,
      address : {
                address : contact.address,
                city : contact.city
                },
      type : vect 

    };
    return this.http.post('https://app.alegra.com/api/v1/contacts',c, this.httpOptions);
  }
  getContact(id){
    return this.http.get('https://app.alegra.com/api/v1/contacts/'+id,this.httpOptions);
  }
  deleteContacts(id){
    return this.http.delete('https://app.alegra.com/api/v1/contacts/'+id,this.httpOptions);
  }
 

}
