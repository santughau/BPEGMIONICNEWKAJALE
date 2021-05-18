import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.page.html',
  styleUrls: ['./score-board.page.scss'],
})
export class ScoreBoardPage implements OnInit {
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
  collection: any = [];
  errorMessage = "";
  showData: boolean = true;
  skleton = false;
  constructor(public loadingController: LoadingController, private service: MyServiceService, public auth: AngularFireAuth) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.uid = user.uid;

      this.service.getProfile(this.uid).subscribe((res) => {
        this.registerData = res.document;
        this.service.getLeaderboardData(this.registerData?.profile_id).subscribe((res) => {
          this.collection = res.document.records;
          console.log(this.collection);

          this.skleton = true;
          this.showData = true;
        }, (error) => {
          this.skleton = true;
          this.errorMessage = error;
          this.showData = false;
        })
      });


    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'कृपया  थोडा वेळ वाट पहा आम्ही सर्वर वरून डेटा तुमच्या करिता  घेऊन येत आहोत .... ',
    });
    await loading.present();
  }

}
