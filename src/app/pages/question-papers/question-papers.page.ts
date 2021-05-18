import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-question-papers',
  templateUrl: './question-papers.page.html',
  styleUrls: ['./question-papers.page.scss'],
})
export class QuestionPapersPage implements OnInit {
  datas: any[] = [];
  pageno = 1;
  pagesize = 10;
  selectClass: number = 5;
  classId: any;
  subId: any;
  termId: any;
  showLoadingIndicator: boolean = false;
  allSubject: any[] = [];
  allChapters: any[] = [];
  termList: any[] = [];
  errorMessage = "";
  showData: boolean = true;
  firstView: boolean = true;
  skleton = false;
  termData: any[] = [
  ]
  constructor(public loadingController: LoadingController, private service: MyServiceService) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;

    this.service.getAllClasses(this.pageno, this.pagesize).subscribe((res) => {
      this.datas = res.document.records;
      this.skleton = true;
      this.showLoadingIndicator = false;
    })


  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'कृपया  थोडा वेळ वाट पहा आम्ही सर्वर वरून डेटा तुमच्या करिता  घेऊन येत आहोत .... ',
    });
    await loading.present();
  }

  onChangeClass(ev: any) {
    this.skleton = false;
    this.classId = ev.target.value;
    if (ev.target.value == 100) {
      this.showLoadingIndicator = false;
      this.allSubject = [];
      this.allChapters = [];
    } else {
      this.showLoadingIndicator = true
      this.allChapters = [];
      this.service.getSubjectList(this.classId).subscribe((data) => {
        this.allSubject = data.document.records;
        this.skleton = true;
        this.showLoadingIndicator = false;
      });
    }
  }

  onChangeSub(ev: any) {
    this.skleton = false;
    this.termData = [];
    this.termData = [
      { id: 1, termName: "प्रथम घटक चाचणी" },
      { id: 2, termName: "द्वितीय घटक चाचणी" },
      { id: 3, termName: "प्रथम सत्र परीक्षा" },
      { id: 4, termName: "तृतीय घटक चाचणी" },
      { id: 5, termName: "चौथी घटक चाचणी" },
      { id: 6, termName: "द्वितीय सत्र परीक्षा" },
    ]
    this.subId = ev.target.value;
    if (ev.target.value == 100) {
      this.showLoadingIndicator = false;
      this.allChapters = [];
    } else {
      this.showLoadingIndicator = true;
      this.service.getChapterList(this.subId).subscribe((data) => {
        this.allChapters = data.document.records;
        this.skleton = true;
        this.showLoadingIndicator = false;
      });
    }
  }

  onChangeTerm(ev: any) {
    this.skleton = false;
    this.firstView = false;
    this.termId = ev.target.value;
    if (ev.target.value == 100) {
      this.showLoadingIndicator = false;
      this.termList = [];
    } else {
      this.showLoadingIndicator = true;
      this.service.getTermList(this.subId, this.termId).subscribe((data) => {
        this.termList = data.document.records;
        this.skleton = true;
        this.showData = true;
        this.showLoadingIndicator = false;
      }, (error) => {
        this.skleton = true;
        this.errorMessage = error;
        this.termList = [];
        this.showData = false;
        this.showLoadingIndicator = false;
      });
    }
  }

  goToUrl(url: string) {
    window.open(url, '_blank');
  }

  onChangeHomework(id) {

  }

}
