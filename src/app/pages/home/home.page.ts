import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  ckeditorContent;
  uid = "";
  registerData = {
    profile_fullname: "",
    profile_mobile: "",
    profile_email: "",
    profile_distId: "",
    profile_taluka: "",
    profile_password: "",
    profile_uid: "",
  };
  skleton = false;
  constructor(private alertControler: AlertController, private network: Network, private service: MyServiceService, public auth: AngularFireAuth,) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.network.onConnect().subscribe(() => {
        if (this.network.type === 'wifi' || this.network.type === 'CELL_4G' || this.network.type === 'CELL_3G' || this.network.type === 'CELL') {
          console.log('we got a wifi connection, woohoo!');
        }
        else {
          this.openAlert();
        }
      });
    }, 3000);

    setTimeout(() => {
      this.network.onDisconnect().subscribe(() => {
        this.openAlert();
        console.log("Disconnected Network");
      });
    }, 3000);



    this.auth.user.subscribe((user) => {
      this.uid = user.uid;
      this.service.getProfile(this.uid).subscribe((res) => {
        this.registerData = res.document;
      });
    });
  }


  async openAlert() {
    const alert = await this.alertControler.create({
      header: 'Alert',
      message: 'You do not have an Internet connection.',
      cssClass: 'my-custom-class',
      buttons: [{
        text: "Ok",
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }





}
