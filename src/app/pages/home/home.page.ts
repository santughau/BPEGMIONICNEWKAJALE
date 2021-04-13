import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { AngularFireAuth } from "@angular/fire/auth";
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
  constructor(private service: MyServiceService, public auth: AngularFireAuth,) { }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.uid = user.uid;
      this.service.getProfile(this.uid).subscribe((res) => {
        this.registerData = res.document;
        console.log(this.registerData);

      });
    });
  }



}
