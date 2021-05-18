import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { LoadingController } from '@ionic/angular';
import { MyServiceService } from 'src/app/serives/my-service.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.page.html',
  styleUrls: ['./youtube.page.scss'],
})
export class YoutubePage implements OnInit {
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
  videoList: any[] = [];
  errorMessage = "";
  showData: boolean = true;
  firstView: boolean = true;
  skleton = false;
  constructor(private youtube: YoutubeVideoPlayer, private service: MyServiceService, public loadingController: LoadingController, private _router: Router) { }

  ngOnInit(): void {    
      this.service.getAllClasses(this.pageno, this.pagesize).subscribe((res) => {
        this.datas = res.document.records;
        this.skleton = true;
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

  onChangeChapter(ev: any) {
    this.skleton = false;
    this.firstView = false;
    this.chapterId = ev.target.value;
    if (ev.target.value == 100) {
      this.showLoadingIndicator = false;
      this.videoList = [];
    } else {
      this.showLoadingIndicator = true;      
        this.service.getVideoList(this.chapterId).subscribe((data) => {
          this.videoList = data.document.records;
          this.skleton = true;
          this.showData = true;
          this.showLoadingIndicator = false;
        }, (error) => {
          this.skleton = true;
          this.errorMessage = error;
          this.videoList = [];
          this.showData = false;
          this.showLoadingIndicator = false;
        });
    }
  }

  goToUrl(url: string) {
    this.youtube.openVideo(url);
  }

}
