import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'मुख्य  पान ', url: '/home', icon: 'home' },
    { title: 'बहुपर्यायी प्रश्न पत्रिका ', url: '/quiz', icon: 'apps' },
    { title: 'व्हिडिओ ', url: '/youtube', icon: 'videocam' },
    { title: 'गृहपाठ  ', url: '/worksheet', icon: 'create' },
    {
      title: 'प्रश्न  पत्रिका संग्रह   ',
      url: '/question-papers',
      icon: 'list',
    },
    { title: 'डाउनलोड  / लिंक ', url: '/download', icon: 'download' },
    { title: 'सूचना  ', url: '/messages', icon: 'document-text' },
    { title: 'शालेय पाठ्यपुस्तके  ', url: '/text-book', icon: 'book' },
    { title: 'माझी प्रगती ', url: '/score-board', icon: 'analytics' },
    { title: 'माझी  माहिती  ', url: '/profile', icon: 'person' },
    { title: 'अँप  बद्दल  ', url: '/info-page', icon: 'apps' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }
}
