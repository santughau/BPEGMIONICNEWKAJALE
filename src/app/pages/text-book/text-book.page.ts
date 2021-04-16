import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-text-book',
  templateUrl: './text-book.page.html',
  styleUrls: ['./text-book.page.scss'],
})
export class TextBookPage implements OnInit {
  datas: any[] = [];
  pageno = 1;
  pagesize = 10;
  selectClass: number = 5;
  classId: any;
  subId: any;
  chapterId: any;
  showLoadingIndicator: boolean = false;
  allSubject: any[] = [];
  allChapters: any[] = [];
  homeworkList: any[] = [];
  errorMessage = "";
  showData: boolean = true;
  firstView: boolean = true;
  constructor(public loadingController: LoadingController, private service: MyServiceService, private iab: InAppBrowser) { }

  ngOnInit() {
    this.showLoadingIndicator = true;
    this.presentLoading().then(() => {
      this.service.getAllClasses(this.pageno, this.pagesize).subscribe((res) => {
        this.datas = res.document.records;
        this.loadingController.dismiss();
        this.showLoadingIndicator = false;
      })
    });

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'कृपया  थोडा वेळ वाट पहा आम्ही सर्वर वरून डेटा तुमच्या करिता  घेऊन येत आहोत .... ',
    });
    await loading.present();
  }
  onChangeClass(ev: any) {
    this.classId = ev.target.value;
    if (ev.target.value == 100) {
      this.showLoadingIndicator = false;
      this.allSubject = [];

    } else {
      this.showLoadingIndicator = true;
      this.presentLoading().then(() => {
        this.service.getSubjectList(this.classId).subscribe((data) => {
          this.allSubject = data.document.records;
          this.loadingController.dismiss();
          this.showLoadingIndicator = false;
        });
      });
    }
  }

  goToLink(url: string) {
    const browser = this.iab.create(url, "_system");
    browser.show();
  }

}
