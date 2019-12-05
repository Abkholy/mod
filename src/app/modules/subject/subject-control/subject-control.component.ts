import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { subject } from 'src/app/shared/models/subject';
import { SubjectService } from '../subject.service';
import { CollageService } from '../../collage/collage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCompressService, ResizeOptions, IImage } from 'ng2-image-compress';
import { Observable, Observer } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
let fileUpload = require('node_modules/fuctbase64');
@Component({
  selector: 'app-subject-control',
  templateUrl: './subject-control.component.html',
  styleUrls: ['./subject-control.component.scss']
})
export class SubjectControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;
  
  subject: subject = {
    id: '',
    code: '',
    name: '',
    defaultInstructor: '',
    description: '',
    files: '',
    creditHours: 0,
    collage: {
      id: '',
      code: '',
      name: '',
      phoneNumber: '',
      location: '',
      Email: '',
      website: ''
    }

  }
  closeResult: string;
  response;
  isEditMode: boolean;
  subjectQueryId: string;
  subjects = [];
  collages = [];
  subjectCodes = [];
  constructor(private subjectService: SubjectService,
    private collageService: CollageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imgCompressService: ImageCompressService
  ) { }

  ngOnInit() {
    this.subjectQueryId = this.route.snapshot.paramMap.get('subjectId');
    if (this.subjectQueryId) {
      this.isEditMode = true;
      this.subjectService.getOne(this.subjectQueryId).subscribe(subject => {
        this.subject = subject.body;
      })
    }
    this.subjectService.getAll().subscribe(res => {
      this.subjects = this.subjectService.allsubjects;
      this.subjects.forEach(element => {
        this.subjectCodes.push(element.code);
      });
    })
    this.collageService.getAll().subscribe(res => {
      this.collages = res.body;
    })
  };

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.subjectCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
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
  preview(fileInput: any) {
    let result = fileUpload(fileInput);
    setTimeout(() => {
      this.subject.files = result.__zone_symbol__value.base64

    }, 300);
  }


  save(subject: subject) {
    if (this.isEditMode === true) {
      this.subjectService.update(this.subject, this.subject.id).subscribe(
        res => {
          console.log(res)
          this.open(this.modalSuccess);
          this.subject = res.body;
          setTimeout(() => {
            this.router.navigate(['/subject'])
          }, 300);

        }, error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/subject'])
          }, 300);
        });
    }
    else {
      this.subjectService.save(this.subject).subscribe((res) => {
        this.response = res.body;
        if (res) {
          this.subject = res.body;
          this.open(this.modalSuccess);
          setTimeout(() => {
            this.router.navigate(['/subject'])
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


  delete(subject: subject) {
    if (confirm("Are You Sure to delete  " + this.subject.name + " ?")) {
      if (subject.id) {
        this.subjectService.delete(subject.id).subscribe(res => {
          if (res.statuse == 200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/subject'])
            }, 300);
          }
        }), error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/subject'])
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
