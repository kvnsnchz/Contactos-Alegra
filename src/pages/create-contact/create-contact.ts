import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
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
  inputs=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public form:FormBuilder,public contactService:ContactServiceProvider,public loaderCtrl: LoadingController,public alertCtrl: AlertController) {
    this.contact = form.group({
      name: ['', Validators.required],
      identification: ['', null],
      phonePrimary: ['', null],
      phoneSecondary: ['', null],
      fax: ['', null],
      mobile: ['', null],
      observations: ['', null],
      email: ['', null],
      address: ['', null],
      city: ['', null],
      client: ['false', null],
      provider: ['false', null]
    
    });
    this.contacts = navParams.data.contacts;
    this.items = navParams.data.items;
    this.loadInputs();
  }
  loadInputs(){
    this.inputs.push({name:'name',type:'text',title:'NAME'});
    this.inputs.push({name:'identification',type:'text',title:'ID'});
    this.inputs.push({name:'phonePrimary',type:'text',title:'PHONE 1'});
    this.inputs.push({name:'phoneSecondary',type:'text',title:'PHONE 2'});
    this.inputs.push({name:'fax',type:'text',title:'FAX'});
    this.inputs.push({name:'mobile',type:'text',title:'MOBILE'});
    this.inputs.push({name:'email',type:'email',title:'EMAIL'});
    this.inputs.push({name:'address',type:'text',title:'ADDRESS'});
    this.inputs.push({name:'city',type:'text',title:'CITY'});
    this.inputs.push({name:'observations',type:'textarea',title:'OBSERVATIONS'});
    this.inputs.push({name:'client',type:'checkBox',title:'CLIENT'});
    this.inputs.push({name:'provider',type:'checkBox',title:'PROVIDER'});
  }
  logForm(){
    let loader = this.loaderCtrl.create();
    loader.present();
    this.contactService.addContact(this.contact.value).subscribe(
      (data) => {
        this.showOK();
         loader.dismiss();
      },
      (error) => {
        console.log(error);
        loader.dismiss();
    });
    
  }
  showOK(){
    let ok= this.alertCtrl.create({
      title: 'SUCCESS',
      message: 'Contact Created',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    ok.present();
  }

}
