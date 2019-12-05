import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { BasarService } from './shared/services/basar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService, private titleService: Title, private basar: BasarService) {
    translate.setDefaultLang(this.basar.currentLang ? this.basar.currentLang : 'en');
    this.basar.setTitle('basar');
    this.basar.setStyle();
  }

  switchlang(language: string) {
    this.basar.switchLanguage(language, 'basar');
  }



}
