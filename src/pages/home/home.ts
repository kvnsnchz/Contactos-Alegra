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
  
  initializeItems() {
    this.items = this.contacts;
  }
  setSearch(){
    this.inSearch = !this.inSearch;
  }
  onSearch(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
    this.contact.deleteContacts(contact.id).subscribe(
      (data) => {
        this.contacts.splice(this.contacts.indexOf(contact),1);
        this.items.splice(this.items.indexOf(contact),1);
      }
    );
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
        infiniteScroll.complete();
      },
      (error)=> {
        console.log(error);
        infiniteScroll.complete();
      }
    );
  }
}
