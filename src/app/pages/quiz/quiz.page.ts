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
        console.log(this.datas);
      })
    })

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

  onChangeClass(ev: any) {
    this.classId = ev.target.value;
    console.log(this.classId);

    if (ev.target.value == 100) {
      this.allSubject = [];
      this.allChapters = [];
    } else {
      this.allChapters = [];
      this.presentLoading().then(() => {
        this.service.getSubjectList(this.classId).subscribe((data) => {
          this.allSubject = data.document.records;
          this.loadingController.dismiss()
          console.log(this.allSubject);

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
          console.log(this.examList);
          this.loadingController.dismiss();
        }, (error) => {
          this.loadingController.dismiss();
          console.error('error caught in component')
          this.errorMessage = error;
          this.examList = [];
          console.log(this.examList);
          this.showData = false;

        });
      })

    }
  }

  goToUrl(id: string) {
    console.log(id);
    this._router.navigate(['/question-page', id]);
  }

}
