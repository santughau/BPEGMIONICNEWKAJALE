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
  constructor(private youtube: YoutubeVideoPlayer,private service: MyServiceService, public loadingController: LoadingController, private _router: Router) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true
    this.service.getAllClasses(this.pageno, this.pagesize).subscribe((res) => {
      this.datas = res.document.records;
      this.showLoadingIndicator = false;

    })
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
      this.service.getSubjectList(this.classId).subscribe((data) => {
        this.allSubject = data.document.records;
        this.showLoadingIndicator = false;
      });
    }
  }

  onChangeSub(ev: any) {
    this.subId = ev.target.value;
    if (ev.target.value == 100) {
      this.showLoadingIndicator = false;
      this.allChapters = [];
    } else {
      this.showLoadingIndicator = true
      this.service.getChapterList(this.subId).subscribe((data) => {
        this.allChapters = data.document.records;
        this.showLoadingIndicator = false;
      });
    }
  }

  onChangeChapter(ev: any) {
    this.firstView = false;
    this.chapterId = ev.target.value;
    if (ev.target.value == 100) {
      this.showLoadingIndicator = false;
      this.videoList = [];
    } else {
      this.showLoadingIndicator = true
      this.service.getVideoList(this.chapterId).subscribe((data) => {
        ;

        this.videoList = data.document.records;
        this.showData = true;
        console.log(this.videoList);

        this.showLoadingIndicator = false;
      }, (error) => {
        console.error('error caught in component')
        this.errorMessage = error;
        this.videoList = [];
        console.log(this.videoList);
        this.showData = false;
        this.showLoadingIndicator = false;

      });
    }
  }

  goToUrl(url: string) {
    this.youtube.openVideo(url);
  }

}
