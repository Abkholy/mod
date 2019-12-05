import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { BasarService } from 'src/app/shared/services/basar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/users/user.service';
import { map } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isStudent: boolean = false;
  isUser: boolean = false;
  userId: string ;
  token: string;

  constructor(
    private usersService : UserService,
    private translate: TranslateService,
     private titleService: Title,
      private basar: BasarService ,
       private router: Router ,
        private route: ActivatedRoute) {
    translate.setDefaultLang(this.basar.currentLang ? this.basar.currentLang : 'en');
    this.basar.setTitle('modern');
    this.basar.setStyle();
 
  }

  switchlang(language: string) {
    this.basar.switchLanguage(language, 'modern');
  }

  ngOnInit() {
    this.usersService.isUser.subscribe(value =>{
      this.isUser = value
    })
    this.usersService.isStudent.subscribe(value => {
      this.isStudent = value
    })
    console.log(this.isStudent, this.isUser)

  }

 
  logout(){

    this.usersService.setIsStudent(false);
    this.usersService.setIsUser(false);

     sessionStorage.clear();
     localStorage.clear();
   setTimeout(() => {
     this.router.navigate(['/login'])
   }, 300);
  }

  changeDir(lang){
    var all = document.getElementsByTagName("body");
    for (var i = 0, max = all.length; i < max; i++) {
      // Do something with the element here
      if (lang == 'en') {
        all[i].dir = 'ltr';
      } else {
        all[i].dir = 'rtl';
      }
    }
  }
  


}
