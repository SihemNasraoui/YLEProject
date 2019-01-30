import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Events } from './../../app/models/events.model';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { storage } from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-creer-event',
  templateUrl: 'creer-event.html',
})
export class CreerEventPage {

  event = new Events() ; 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public camera : Camera,
    public afd : AngularFireDatabase,
    public loading : LoadingController,
    public toast : ToastController
    
    ) {
    this.event.logoEvent = "assets/imgs/defaultImages.png" ; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreerEventPage');
  }

  public uploadPicture(){
    console.log("Time to change !");

    const options: CameraOptions = {
      quality: 100, 
      targetWidth : 500 ,
      targetHeight : 500 ,
      correctOrientation : true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then((imageData)=>{
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.event.logoEvent = base64Image ;
    },
    (err)=>{
    console.log(err);
  }
  );
  }

  public ajouterEvent(){

    let load = this.loading.create({
      spinner:"dots",
      content:"Création en cours<br>Veuillez patientez ..."
    });
    load.present();
    let date = new Date().getTime().toString();

    if(this.event.logoEvent!="assets/imgs/defaultImages.png")
    {
      storage().ref("/evenement/pictures/"+date).putString(this.event.logoEvent, "data_url").then(
        data =>{
          load.setContent("Upload en cours...");
          this.event.logoEvent = data.downloadURL ;
        }
      ).catch(err=>{
        load.dismiss();  
        console.log(err.message);
      });
    }

    this.afd.list("/evenement/").push(this.event).then(
      res=>{
        console.log(res);
        load.dismiss();   
        let tst = this.toast.create({
          message: 'Ajout avec succès !',
          duration: 3000
        });
        tst.present();
        load.dismiss();  
        //this.navCtrl.pop();
        
      }
    );

  }

  
  public closePage(){
    this.navCtrl.pop();
  }

}
