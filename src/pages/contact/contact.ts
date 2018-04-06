import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';


@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contact;
  items = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public callNumber: CallNumber,public alertCtrl: AlertController,public plt: Platform) {
    this.contact = navParams.data.contact;
    this.initializeItems();
  }
  initializeItems() {
    this.items.push({name:'NAME',value:this.contact.name});
    this.items.push({name:'ID',value:this.contact.identification});
    this.items.push({name:'EMAIL',value:this.contact.email});
    this.items.push({name:'PHONE 1',value:this.contact.phonePrimary});
    this.items.push({name:'PHONE 2',value:this.contact.phoneSecondary});
    this.items.push({name:'FAX',value:this.contact.fax});
    this.items.push({name:'MOBILE',value:this.contact.mobile});
    this.items.push({name:'OBSERVATIONS',value:this.contact.observations});
    this.items.push({name:'ADDRESS',value:this.contact.address.address});
    this.items.push({name:'CITY',value:this.contact.address.city});
  }
  isNull(value){
    return (value==null || value == '');
  }
  
  withoutPhone(){
    return this.isNull(this.contact.phonePrimary) && this.isNull(this.contact.phoneSecondary) && this.isNull(this.contact.mobile);
  }
  showCall(){
    return this.plt.is('mobile') && !this.withoutPhone();
  }
  callTel(tel) {
    window.location.href = 'tel:'+ tel;
  }
  
  call(){
    let butts = [];
    if(!this.isNull(this.contact.phonePrimary)){
      butts.push({text: 'PHONE 1',
                  handler: () => {
                    this.callTel(this.contact.phonePrimary);
                  }});
    }
    if(!this.isNull(this.contact.phoneSecondary)){
      butts.push({text: 'PHONE 2',
                  handler: () => {
                    this.callTel(this.contact.phoneSecondary);
                  }});
    }
    if(!this.isNull(this.contact.mobile)){
      butts.push({text: 'MOBILE',
                  handler: () => {
                    this.callTel(this.contact.mobile);
                  }});
    }
    butts.push({text: 'CANCEL',
                  handler: () => {
                    console.log("cancel");
                  }});

    let call= this.alertCtrl.create({
        title: 'CALL TO',
        buttons: butts
      });
      call.present();
    
  }
}
