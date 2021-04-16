import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.page.html',
  styleUrls: ['./worksheet.page.scss'],
})
export class WorksheetPage implements OnInit {
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
  constructor(public loadingController: LoadingController, private iab: InAppBrowser, private service: MyServiceService) { }

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
      this.allChapters = [];
    } else {
      this.showLoadingIndicator = true
      this.allChapters = [];
      this.presentLoading().then(() => {
        this.service.getSubjectList(this.classId).subscribe((data) => {
          this.allSubject = data.document.records;
          this.loadingController.dismiss();
          this.showLoadingIndicator = false;
        });
      });

    }
  }

  onChangeSub(ev: any) {
    this.subId = ev.target.value;
    if (ev.target.value == 100) {
      this.showLoadingIndicator = false;
      this.allChapters = [];
    } else {
      this.showLoadingIndicator = true;
      this.presentLoading().then(() => {
        this.service.getChapterList(this.subId).subscribe((data) => {
          this.allChapters = data.document.records;
          this.loadingController.dismiss();
          this.showLoadingIndicator = false;
        });
      });

    }
  }

  onChangeChapter(ev: any) {
    this.firstView = false;
    this.chapterId = ev.target.value;
    if (ev.target.value == 100) {
      this.showLoadingIndicator = false;
      this.homeworkList = [];
    } else {
      this.showLoadingIndicator = true;
      this.presentLoading().then(() => {
        this.service.getHomeList(this.chapterId).subscribe((data) => {
          this.homeworkList = data.document.records;
          this.loadingController.dismiss();
          this.showData = true;
          this.showLoadingIndicator = false;
        }, (error) => {
          this.loadingController.dismiss();
          this.errorMessage = error;
          this.homeworkList = [];
          this.showData = false;
          this.showLoadingIndicator = false;
        });
      });

    }
  }

  onChangeHomework(link: string) {
    const browser = this.iab.create(link, "_system");
    browser.show();
  }

}
