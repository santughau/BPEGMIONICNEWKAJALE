import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  url = 'https://bpegm.co/quiz/';
  constructor(private http: HttpClient) { }
  getAllClasses(pageno: any, pagesize: any): Observable<any> {
    return this.http.get(
      this.url + 'allclasses/read.php?pageno=' + pageno + '&pagesize=' + pagesize
    );
  }

  getSubjectList(id: any): Observable<any> {
    return this.http.get(this.url + 'allsubject/read_by_allsubject_classid.php?allSubject_classId=' + id);
  }

  getChapterList(id: any): Observable<any> {
    return this.http.get(this.url + 'allchapters/read_by_allchapters_subid.php?allChapters_subId=' + id);
  }

  getHomeList(id: any): Observable<any> {
    return this.http.get(this.url + 'homework/read_by_homework_chapter_id.php?homework_chapter_id=' + id);
  }

  getVideoList(id: any): Observable<any> {
    return this.http.get(this.url + 'youtube/read_by_youtube_chapter_id.php?youtube_chapter_id=' + id);
  }

  getTermList(subId: any, termId: any): Observable<any> {
    return this.http.get(this.url + 'questionpaper/read_by_questionpaper_sub_id.php?questionPaper_sub_id=' + subId + '&questionPaper_term_id=' + termId);
  }

  getExamList(Id: any): Observable<any> {
    return this.http.get(this.url + 'exam/read_by_exam_chapter_id.php?exam_chapter_id=' + Id);
  }

  getQuestionList(Id: any): Observable<any> {
    return this.http.get(this.url + 'questions/read_by_questions_exam_id.php?questions_exam_id=' + Id);
  }

  getDistrictList(): Observable<any> {
    return this.http.get(this.url + 'district/read.php');
  }

  getTalukaList(Id: any): Observable<any> {
    return this.http.get(this.url + 'taluka/read_by_taluka_dist_id.php?taluka_dist_id=' + Id);
  }

  saveExamResult(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'leaderboard/create.php', data);
  }

  saveRegister(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'profile/create.php', data);
  }
  getProfile(Id: any): Observable<any> {
    return this.http.get(this.url + 'profile/read_one.php?id=' + Id);
  }

  getLeaderboardData(Id: any): Observable<any> {
    return this.http.get(this.url + 'leaderboard/read_by_leaderboard_profileid.php?leaderBoard_profileId=' + Id);
  }

  getAllDownloads(pageno, pagesize): Observable<any> {
    return this.http.get(
      this.url + "downloaddata/read.php?pageno=" + pageno + "&pagesize=" + pagesize
    );
  }
}
