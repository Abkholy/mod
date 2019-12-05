import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { users } from 'src/app/shared/models/users';
import { CollageService } from '../../collage/collage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.scss']
})
export class UsersControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;
  user: users = {
    id: '',
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    collage: {
      id: '',
      code: '',
      name: '',
      location: '',
      phoneNumber: '',
      website: '',
      Email: ''
    }
  }
  closeResult: string;
  response;
  isEditMode: boolean;
  usersQueryId: string;
  userss = [];
  usersCodes = []
  collages = [];
  usersTypes = [];
  constructor(
    private UserService: UserService,
    private collageService: CollageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imgCompressService: ImageCompressService
  ) { }

  ngOnInit() {
    this.usersQueryId = this.route.snapshot.paramMap.get('usersId');
    if (this.usersQueryId) {
      this.isEditMode = true;
      this.UserService.getOne(this.usersQueryId).subscribe(res => {
        this.user = res.body;
      })
    }
    this.UserService.getAll().subscribe(res => {
      this.userss = this.UserService.allusers;
      this.userss.forEach(element => {
        this.usersCodes.push(element.email);
      });
    })

    this.collageService.getAll().subscribe(res => {
      this.collages = res.body;
    })

  };

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.usersCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  public imagePath;
  public message: string;
  processedImages: any = [];
  resizeOtions: ResizeOptions = {
    Resize_Max_Height: 200,
    Resize_Max_Width: 200,
    Resize_Quality: 70,
    Resize_Type: ''
  }


  save(users: users) {
    if (this.isEditMode === true) {
      this.UserService.update(this.user, this.user.id).subscribe(
        res => {
          console.log(res)
          this.open(this.modalSuccess);
          this.user = res.body;
          setTimeout(() => {
            this.router.navigate(['/users'])
          }, 300);

        }, error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/users'])
          }, 300);
        });
    }
    else {
      this.UserService.save(this.user).subscribe((res) => {
        this.response = res.body;
        if (res) {
          this.user = res.body;
          this.open(this.modalSuccess);
          setTimeout(() => {
            this.router.navigate(['/users'])
          }, 300);
        } else {
          this.isEditMode = false
          this.open(this.modalFaild);
        }
      })
    }
  }

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


  delete(users: users) {
    if (confirm("Are You Sure to delete  " + this.user.email + " ?")) {
      if (users.id) {
        this.UserService.delete(users.id).subscribe(res => {
          if (res.statuse == 200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/users'])
            }, 300);
          }
        }), error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/users'])
          }, 300);

        }
          ;
      }
    }

  }

  print() {
    window.print();
  }
  
}
