import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { semester } from 'src/app/shared/models/semester';
import { SemesterService } from '../semester.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CollageService } from '../../collage/collage.service';

@Component({
  selector: 'app-semester-control',
  templateUrl: './semester-control.component.html',
  styleUrls: ['./semester-control.component.scss']
})
export class SemesterControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  semester: semester = {
    id: '',
    code: '',
    collage: {
      id: '',
      code: '',
      name: '',
      phoneNumber: '',
      Email: '',
      website: ''
    },
    fromDate: new Date,
    toDate: new Date
  }
  closeResult: string;
  response;
  isEditMode: boolean;
  semesterQueryId: string;
  semesters = [];
  semesterCodes = []
  collages= [];
  constructor(
    private semesterService: SemesterService,
    private collageService: CollageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    calendar: NgbCalendar,
    private modalService: NgbModal,
    config: NgbDatepickerConfig,
    private imgCompressService: ImageCompressService,
        private parserFormatter: NgbDateParserFormatter
  ) { 
    config.minDate = { year: 2019, month: 1, day: 1 };

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // weekends are disabled
    config.showWeekdays = true
  }

  ngOnInit() {
    this.semesterQueryId = this.route.snapshot.paramMap.get('semesterId');
    if (this.semesterQueryId) {
      this.isEditMode = true;
      this.semesterService.getOne(this.semesterQueryId).subscribe(semester => {
        this.semester = semester.body;
      })
    }
    this.semesterService.getAll().subscribe(res => {
      this.semesters = this.semesterService.allsemesters;
      this.semesters.forEach(element => {
        this.semesterCodes.push(element.code);
      });
    })

    this.collageService.getAll().subscribe(res => {
      this.collages = res.body
    })
  };

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.semesterCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
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


  save(semester: semester) {
    if (this.isEditMode === true) {
      this.semesterService.update(this.semester, this.semester.id).subscribe(
        res => {
          console.log(res)
          this.open(this.modalSuccess);
          this.semester = res.body;
          setTimeout(() => {
            this.router.navigate(['/semester'])
          }, 300);

        }, error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/semester'])
          }, 300);
        });
    }
    else {
      this.semesterService.save(this.semester).subscribe((res) => {
        this.response = res.body;
        if (res) {
          this.semester = res.body;
          this.open(this.modalSuccess);
          setTimeout(() => {
            this.router.navigate(['/semester'])
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


  delete(semester: semester) {
    if (confirm("Are You Sure to delete  " + this.semester.code + " ?")) {
      if (semester.id) {
        this.semesterService.delete(semester.id).subscribe(res => {
          if (res.statuse == 200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/semester'])
            }, 300);
          }
        }), error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/semester'])
          }, 300);

        }
          ;
      }
    }

  }

  print() {
    window.print();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.semester.fromDate = new Date(this.parserFormatter.format(date));
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.semester.toDate = new Date(this.parserFormatter.format(date));

    } else {
      this.toDate = null;
      this.fromDate = date;
      this.semester.fromDate = new Date(this.parserFormatter.format(date));

    }
    console.log(this.semester)
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}
