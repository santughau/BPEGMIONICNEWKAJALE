import {
  Component, OnInit,
  ViewChildren,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform, IonRouterOutlet, AlertController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
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
  constructor(private platform: Platform, public alertController: AlertController, private service: MyServiceService, public auth: AngularFireAuth, private router: Router,) {
    this.platform.ready().then(() => {
      this.backButtonEvent();
    });
  }

  backButtonEvent() {
    this.backButtonSubscription = this.platform.backButton.subscribe(
      async () => {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
            outlet.pop();
          } else if (this.router.url === "/home") {
            this.presentAlertConfirm();
          }
        });
      }
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Confirm to Exit App !!!",
      mode: "ios",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Exit",
          handler: () => {
            console.log("Confirm Okay");
            navigator["app"].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
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
