import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ContactServiceProvider } from '../../providers/contact-service/contact-service';
import { ContactPage } from '../contact/contact';
import { CreateContactPage } from '../create-contact/create-contact';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data;
  inSearch = false;
  contacts = [];
  items = [];
  create = false;
  showDelete = false;
  constructor(public navCtrl: NavController,public contact: ContactServiceProvider,public alertCtrl: AlertController) {
  
  }
  ionViewDidLoad(){
    this.create = true;
    this.data = this.contact.getContacts(0);
    this.data.subscribe(
      (data)=> {this.contacts = data;
                this.initializeItems();
              },
      (error)=> {console.log(error);}
    );
  

  }
  ionViewWillEnter(){
    if(!this.create){
      this.data.subscribe(
      (data)=> {this.contacts = data;
                this.initializeItems();},
      (error)=> {console.log(error);}
      );
    }
    else{
      this.create = false;
    }
    
  }
  isNull(value){
    return (value==null || value == '');
  }
  comparate(valueContact,value){
    if(this.isNull(valueContact)){
      return false;
    }
    return (valueContact.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }
  initializeItems() {
    this.items = this.contacts;
  }
  clickItem(contact){
    if(this.showDelete){
      this.showConfirm(contact);
    }
    else{
      this.viewContact(contact);
    }
  }
  setDelete(){
    this.showDelete = !this.showDelete;
  }
  setSearch(){
    this.inSearch = !this.inSearch;
  }
  onSearch(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (this.comparate(item.name,val) || this.comparate(item.identification,val) || this.comparate(item.phonePrimary,val) || this.comparate(item.email,val));
      })
    }
  }
  endSearch(){
    this.initializeItems();
    this.setSearch();
  }
  viewContact(contact){
    this.navCtrl.push(ContactPage,{contact : contact});
  }
  viewCreateContact(){
    this.navCtrl.push(CreateContactPage,{contacts:this.contacts, items:this.items});
  }
  delete(contact){
    this.contacts.splice(this.contacts.indexOf(contact),1);
    this.items.splice(this.items.indexOf(contact),1);
    this.contact.deleteContacts(contact.id).subscribe();
  }
  showConfirm(contact){
    let confirm = this.alertCtrl.create({
      title: 'Delete Contact?',
      message: 'Are you sure to eliminate the contact?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.delete(contact);
          }
        }
      ]
    });
    confirm.present();
  }
  doRefresh(refresher) {
    this.data.subscribe(
      (data)=> {
        this.contacts = data;
        this.initializeItems();
        this.inSearch = false;
        refresher.complete();
      },
      (error)=> {
        console.log(error);
        refresher.complete();
      },
    );
  }
  doInfinite(infiniteScroll) {
    this.contact.getContacts(this.contacts.length)
    .subscribe(
      (data)=> {
        this.contacts = this.contacts.concat(data);
        this.initializeItems();
        this.inSearch = false;
        infiniteScroll.complete();
      },
      (error)=> {
        console.log(error);
        infiniteScroll.complete();
      }
    );
  }
}
