import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { student } from 'src/app/shared/models/student';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCompressService, ResizeOptions, IImage } from 'ng2-image-compress';
import { CollageService } from '../../collage/collage.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-student-control',
  templateUrl: './student-control.component.html',
  styleUrls: ['./student-control.component.scss']
})
export class StudentControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;

  student: student = {
    id: '',
    code: '',
    name: '',
    phoneNumber: '',
    ssn: '',
    image: '',
    macAddress: '',
    email: '',
    level: 0,
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
  studentQueryId: string;
  students = [];
  collages = [];
  studentCodes = [];
  constructor(private studentService: StudentService,
    private collageService: CollageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imgCompressService: ImageCompressService
  ) { }

  ngOnInit() {
    this.studentQueryId = this.route.snapshot.paramMap.get('studentId');
    if (this.studentQueryId) {
      this.isEditMode = true;
      this.studentService.getOne(this.studentQueryId).subscribe(student => {
        this.student = student.body;
      })
    }
    this.studentService.getAll().subscribe(res => {
      this.students = this.studentService.allstudents;
      this.students.forEach(element => {
        this.studentCodes.push(element.code);
      });
    })
    this.collageService.getAll().subscribe(res => {
      this.collages = res.body ;
    })
  };

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.studentCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
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
    let images: Array<IImage> = [];

    ImageCompressService.filesToCompressedImageSourceEx(fileInput.target.files, this.resizeOtions).then(observableImages => {
      observableImages.subscribe((image) => {
        images.push(image);
        this.student.image = image.compressedImage.imageDataUrl;
      }, (error) => {
        console.log("Error while converting");
      }, () => {
        this.processedImages = images;
      });
    });

  }


  save(student: student) {
    if (this.isEditMode === true) {
      this.studentService.update(this.student, this.student.id).subscribe(
        res => {
          console.log(res)
          this.open(this.modalSuccess);
          this.student = res.body;
          setTimeout(() => {
            this.router.navigate(['/student'])
          }, 300);

        }, error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/student'])
          }, 300);
        });
    }
    else {
      this.studentService.save(this.student).subscribe((res) => {
        this.response = res.body;
        if (res) {
          this.student = res.body;
          this.open(this.modalSuccess);
          setTimeout(() => {
            this.router.navigate(['/student'])
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


  delete(student: student) {
    if (confirm("Are You Sure to delete  " + this.student.name + " ?")) {
      if (student.id) {
        this.studentService.delete(student.id).subscribe(res => {
          if (res.statuse == 200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/student'])
            }, 300);
          }
        }), error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/student'])
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
