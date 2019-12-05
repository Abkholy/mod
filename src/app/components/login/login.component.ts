import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { AuthService } from './auth.service';
import { authentication } from 'src/app/shared/models/authentication';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { users } from 'src/app/shared/models/users';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/modules/users/user.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;

  authentication: authentication = {
    email: '',
    password: ''
  }
  responseStatus;
  responseBody;
  error;
  isStudent;
  isUser;

  constructor(public authService: AuthService, private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private loginService: LoginService,
    private usersevice: UserService

  ) { }

  ngOnInit() {

  }

  login(authentication) {
    this.authService.login(authentication).subscribe(res=> {
      this.usersevice.setIsUser(true);

      this.usersevice.isUser.next(true)
      console.log(res.userId)
      this.usersevice.getIfStuddent(res.userId).subscribe((data) => {
        console.log(data)
        if (data == true) {

      this.usersevice.setIsStudent(false)
          this.isStudent = false;
        } else {
          this.usersevice.setIsStudent(true)
          this.isStudent = true;
        }
      })
      setTimeout(() => {
        this.open(this.modalSuccess);
      }, 200);
      this.router.navigate(['/']);
    },
    error => {
      this.usersevice.setIsUser(false);

      this.usersevice.isUser.next(false)
      this.responseBody = error.error;
      this.responseStatus = error.status;
      this.open(this.modalFaild);
    })
   
    
    
   
  }

    


  
  closeResult: string;

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
