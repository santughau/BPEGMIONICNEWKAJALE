import {
  Component, OnInit,
  ViewChild,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform, IonRouterOutlet, AlertController } from "@ionic/angular";
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  public appPages = [
    { title: 'मुख्य  पान ', url: '/home', icon: 'home' },
    { title: 'बहुपर्यायी प्रश्न पत्रिका ', url: '/quiz', icon: 'apps' },
    { title: 'व्हिडिओ ', url: '/youtube', icon: 'videocam' },
    { title: 'गृहपाठ  ', url: '/worksheet', icon: 'create' },
    {
      title: 'प्रश्न  पत्रिका संग्रह   ',
      url: '/question-papers',
      icon: 'list',
    },
    { title: 'डाउनलोड  / लिंक ', url: '/download', icon: 'download' },
    { title: 'शालेय पाठ्यपुस्तके  ', url: '/text-book', icon: 'book' },
    { title: 'माझी प्रगती ', url: '/score-board', icon: 'analytics' },
    { title: 'माझी  माहिती  ', url: '/profile', icon: 'person' },
    { title: 'अँप  बद्दल  ', url: '/info-page', icon: 'apps' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
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
  constructor(private network: Network, private location: Location, private platform: Platform, public alertController: AlertController, private service: MyServiceService, public auth: AngularFireAuth, private router: Router,) {

    window.addEventListener('offline', () => {
      this.openAlert();
    });


    setTimeout(() => {
      this.network.onDisconnect().subscribe(() => {
        this.openAlert();
        console.log("Disconnected Network");
      });
    }, 3000);

    this.platform.ready().then(() => {
      this.backButtonEvent();
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        this.backButtonAlert();
      } else {
        this.location.back();
      }
    })
  }

  async openAlert() {
    const alert = await this.alertController.create({
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

  async backButtonAlert() {
    const alert = await this.alertController.create({
      message: "अँप बंद करायचे आहे काय ?",
      buttons: [{
        text: "रद्द करा ",
        role: "Cancel"
      },
      {
        text: "अँप बंद करा ",
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }



  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.uid = user?.uid;
      this.service.getProfile(this.uid).subscribe((res) => {
        this.registerData = res.document;
      });
    });
  }
}
