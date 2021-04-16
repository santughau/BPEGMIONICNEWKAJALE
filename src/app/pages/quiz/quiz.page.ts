import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  datas: any[] = [];
  pageno = 1;
  pagesize = 10;
  selectClass: number = 5;
  classId: any;
  subId: any;
  chapterId: any;
  allSubject: any[] = [];
  allChapters: any[] = [];
  examList: any[] = [];
  errorMessage = "";
  showData: boolean = true;
  firstView: boolean = true;
  constructor(private service: MyServiceService, public loadingController: LoadingController, private _router: Router) { }

  ngOnInit() {
    this.presentLoading().then(() => {
      this.service.getAllClasses(this.pageno, this.pagesize).subscribe((res) => {
        this.datas = res.document.records;
        this.loadingController.dismiss();
      })
    })

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
      this.allSubject = [];
      this.allChapters = [];
    } else {
      this.allChapters = [];
      this.presentLoading().then(() => {
        this.service.getSubjectList(this.classId).subscribe((data) => {
          this.allSubject = data.document.records;
          this.loadingController.dismiss()


        });
      })

    }
  }

  onChangeSub(ev: any) {
    this.subId = ev.target.value;
    if (ev.target.value == 100) {
      this.allChapters = [];
    } else {
      this.allChapters = [];
      this.presentLoading().then(() => {
        this.service.getChapterList(this.subId).subscribe((data) => {
          this.allChapters = data.document.records;
          this.loadingController.dismiss();
        });
      })
    }
  }


  onChangeChapter(ev: any) {
    this.firstView = false;
    this.chapterId = ev.target.value;
    if (ev.target.value == 100) {
      this.examList = [];
    } else {
      this.examList = [];
      this.presentLoading().then(() => {
        this.service.getExamList(this.chapterId).subscribe((data) => {
          this.examList = data.document.records;
          this.showData = true;
          this.loadingController.dismiss();
        }, (error) => {
          this.loadingController.dismiss();
          this.errorMessage = error;
          this.examList = [];

          this.showData = false;

        });
      })

    }
  }

  goToUrl(id: string) {

    this._router.navigate(['/question-page', id]);
  }

}
