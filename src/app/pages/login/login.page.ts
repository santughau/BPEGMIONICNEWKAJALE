import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerData = {
    email: "",
    password: ""
  };
  constructor(private router: Router,
    public auth: AngularFireAuth,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(title, message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: title,
      message: message,
      buttons: ["OK"],
      mode: "ios",
    });

    await alert.present();
  }
  goToRegister() {
    this.router.navigate(["/register"]);
  }
  goToHome() {
    this.auth
      .signInWithEmailAndPassword(this.registerData.email, this.registerData.password)
      .then(() => {
        this.router.navigate(["/home"]);
      })
      .catch((err) => {
        var msg = "";
        if (err.code == "auth/wrong-password") {
          msg = "कृपया आपला  पासवर्ड तपासून  पहा . ";
        } else if (err.code == "auth/user-not-found") {
          msg = "कृपया आपला  ई-मेल तपासून पहा . ";
        }
        this.presentAlert("Alert", msg);
      });
  }


}
