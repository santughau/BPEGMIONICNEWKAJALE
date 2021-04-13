import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { MyServiceService } from 'src/app/serives/my-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerData = {
    profile_fullname: "",
    profile_mobile: "",
    profile_email: "",
    profile_distId: "",
    profile_taluka: "",
    profile_password: "",
    profile_uid: "",
  };
  district = [];
  taluka = [];
  constructor(public loadingController: LoadingController, public auth: AngularFireAuth, private service: MyServiceService, public alertController: AlertController,
    private router: Router,) { }

  ngOnInit() {
    this.presentLoading().then(() => {
      this.service.getDistrictList().subscribe((res) => {
        this.district = res.document.records;
        console.log(this.district);

        this.loadingController.dismiss();
      });
    });
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
  }

  OnDistrictChange(ev) {
    this.registerData.profile_distId = ev.target.value;
    console.log(this.registerData.profile_distId);
    this.presentLoading().then(() => {
      this.service.getTalukaList(this.registerData.profile_distId).subscribe((data) => {
        this.taluka = data.document.records;
        console.log(this.taluka);
        this.loadingController.dismiss();
      });
    });
  }

  OnTalukaChange(ev) {
    this.registerData.profile_taluka = ev.target.value;
    console.log(this.registerData.profile_taluka);
  }

  saveTeacher() {
    console.log(this.registerData);
    const data = {
      email: this.registerData.profile_email,
      password: this.registerData.profile_password,
    };

    this.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        this.registerData.profile_uid = user.user.uid;
        this.service.saveRegister(this.registerData).subscribe((res) => {
          this.router.navigate(["/home"]);
        });
      })
      .catch((err) => {
        var msg = "";
        if (err.code == "auth/email-already-in-use") {
          msg =
            "कृपया हा ई-मेल अगोदर वापरलेला  आहे , नवीन ई-मेल वापरा  किंवा पासवर्ड  रीसेट करण्याकरिता ८४२१३३३४१७ या मोबाईल क्रमांक वर फोन करा  . ";
        } else if (err.code == "auth/weak-password") {
          msg =
            "आपला पासवर्ड चांगला लिहा . कॅपिटल , स्मॉल  लेटर्स व अंक  यांचा  वापर करा . ";
        }
        this.presentAlert("Alert", msg);
      });
  }



}
