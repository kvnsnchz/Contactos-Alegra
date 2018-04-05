import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ContactServiceProvider } from '../../providers/contact-service/contact-service';

@IonicPage()
@Component({
  selector: 'page-create-contact',
  templateUrl: 'create-contact.html',
})
export class CreateContactPage {
  contact: FormGroup;
  contacts= [];
  items=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public form:FormBuilder,public contactService:ContactServiceProvider) {
    this.contact = form.group({
      name: ['', Validators.required]
    });
    this.contacts = navParams.data.contacts;
    this.items = navParams.data.items;
  }

  logForm(){
    this.contactService.addContact(this.contact.value).subscribe(
      (data) => {
        this.contacts.push(data);
        this.items = this.contacts;
        this.navCtrl.pop();
      }
    );
    
  }

}
