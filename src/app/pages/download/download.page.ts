import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/serives/my-service.service';
import { LoadingController, ToastController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  data = [];
  pageno = 1;
  pagesize = 10;
  term;
  skleton = false;
  constructor(private service: MyServiceService, public loadingController: LoadingController,
    public toastController: ToastController,
    private iab: InAppBrowser) { }

  ngOnInit() {
    this.getData(null);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "All Download Completed ",
      duration: 2000,
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "कृपया  थोडा वेळ वाट पहा आम्ही सर्वर वरून डेटा तुमच्या करिता  घेऊन येत आहोत ....",
    });
    await loading.present();
  }


  getData(ev) {
    if (ev == null) {
      this.pageno = 1;
      this.pagesize = 10;   
        this.service
          .getAllDownloads(this.pageno, this.pagesize)
          .subscribe((data) => {
            this.data = data.document.records;
             this.skleton = true;
          });  
    } else {
      this.pageno++;      
        this.service
          .getAllDownloads(this.pageno, this.pagesize)
          .subscribe((data) => {
            this.data = this.data.concat(data.document.records);

            this.skleton = true;
            if (data.document.records.length <= 10) {
              ev.target.disabled = true;
              this.presentToast();
            }
          });
        ev.target.complete();   
    }
  }

  openBrowese(download_link) {
    const browser = this.iab.create(download_link, "_system");
    browser.show();
  }

}
