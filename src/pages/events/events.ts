import { ViewEventPage } from './../view-event/view-event';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { CreerEventPage } from '../creer-event/creer-event';
import { Events } from '../../app/models/events.model';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  listEvents : Observable<any>;
  spin : boolean = true ;
  currentUser : any ; 

  constructor(public loading:LoadingController,
    public alert:AlertController,
    public afd: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams, 
    public modalCtrl : ModalController) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ionViewDidLoad() {
    console.log("hello init");
    this.spin = true;
    this.listEvents = this.afd.list('/evenement/').snapshotChanges().map(
      changes => {
        this.spin = false;
        return changes.map(c => (
          {
            key: c.payload.key, ...c.payload.val()
          }
        ));
      }
    );
  }

  presentModal() {
    console.log("Modal to show !");
    let modal = this.modalCtrl.create(CreerEventPage);
    modal.present();
  }

  interss(event){
    console.log(event);
    let alrt = this.alert.create({
      mode:"ios", 
      title:"Succès",
      message:"Ajouté avec succès !"
    });

    let ld = this.loading.create({
      spinner : "dots", 
      content:"En Cours ..."
    }); 

    ld.present() ;

    this.afd.list("/events/"+event.key+"/subscribers/").push(this.currentUser).then(
      data=>{
        ld.dismiss();
        alrt.present();
      }
    );
  }

  viewEvent(item : Events){
    this.navCtrl.push(ViewEventPage, {event: item})
  }



}
