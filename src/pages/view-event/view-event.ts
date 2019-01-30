import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from '../../app/models/events.model';
import { Profile } from '../../app/models/profile';

/**
 * Generated class for the ViewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-event',
  templateUrl: 'view-event.html',
})
export class ViewEventPage {
  event : Events ; 
  currentUser : any ; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get("event") ; 
    console.log(this.event); 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) ;
    console.log(this.currentUser) ; 
  }

  ionViewDidLoad() {
    
  }

}
