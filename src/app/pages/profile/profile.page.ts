import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  uid = "";
  registerData = {
    profile_fullname: "",
    profile_mobile: "",
    profile_email: "",
    profile_distId: "",
    profile_taluka: "",
    profile_password: "",
    profile_uid: "",
    profile_id: ""
  };
  show: boolean = false;
  constructor(public loadingController: LoadingController,private service: MyServiceService, public auth: AngularFireAuth) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.uid = user.uid;
      this.presentLoading().then(() => {
        this.service.getProfile(this.uid).subscribe((res) => {
          this.registerData = res.document;
          this.loadingController.dismiss();
        });
      });
      
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'कृपया  थोडा वेळ वाट पहा आम्ही सर्वर वरून डेटा तुमच्या करिता  घेऊन येत आहोत .... ',
    });
    await loading.present();
  }

  showPassword() {
    this.show = !this.show
  }

}
