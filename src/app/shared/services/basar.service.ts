import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {Lang} from '../lang.enum';
import {Styles} from '../styles';
@Injectable({
  providedIn: 'root'
})
export class BasarService {

  constructor(private translate: TranslateService, private titleService: Title) {}
  
  // Languages
  get currentLang() {
    return localStorage.getItem('language');
  }
  
  switchLanguage(language: string, key?: string) {
    if (language in Lang) {
      if (this.currentLang !== language) {
        this.translate.use(language);
        localStorage.setItem('language', language);
        this.setTitle(key || 'modern');
        this.setStyle();
      }
    } else {
      this.translate.use('en');
    }
  }
  
  inverseLang(keyLang) {
    return (keyLang === 'en') ? 'ar' : 'en';
  }

  // Title
  setTitle(key: string) {
    return this.translate.get(key).subscribe((data) => {
      this.titleService.setTitle(data);
    });
  }
  
 // Style
 setStyle() {
  const keyLang = this.currentLang || this.translate.getDefaultLang() ;
  const styleFiles = Styles[keyLang];
  const headElements = document.getElementsByTagName('head')[0];
  const paras = document.getElementsByClassName(this.inverseLang(keyLang));
  if (paras) {
    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }​
  }
  for (let i = 0; i < styleFiles.length; i++) {
    const node = document.createElement('link');
    node.setAttribute('href', Styles[keyLang][i]);
    node.setAttribute('rel', 'stylesheet');
    node.setAttribute('class', keyLang);
    headElements.appendChild(node);
  }
}   
// isLogin(){
//   var token = sessionStorage.getItem('userId');
//   var userId = sessionStorage.getItem('userId')
//   if (token && userId) {
//     return true;
//   } else {
//     return false;
//   }
// }
}
