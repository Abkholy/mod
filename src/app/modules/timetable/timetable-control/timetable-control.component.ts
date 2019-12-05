import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { timetable } from 'src/app/shared/models/timetable';
import { TimetableService } from '../timetable.service';
import { SemesterService } from '../../semester/semester.service';
import { LocationService } from '../../location/location.service';
import { SubjectService } from '../../subject/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-timetable-control',
  templateUrl: './timetable-control.component.html',
  styleUrls: ['./timetable-control.component.scss']
})
export class TimetableControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;
  timetable: timetable = {
    id: '',
    code: '',
    dayOfWeek: '',
    length: 1,
    period: 1,
    subject: {
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
    },
    location: {
      id: '',
      code: '',
      name: '',
      scannerMacAddress: '',
      capacity: 0,
      collage: {
        id: '',
        code: '',
        name: '',
        phoneNumber: '',
        location: '',
        Email: '',
        website: ''
      },
      locationType: {
        id: '',
        code: '',
        name: ''
      }
    },
    semester: {
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
  }
  semesters = [];
  locations = [];
  subjects = [];
  closeResult: string;
  response;
  isEditMode: boolean;
  timetableQueryId: string;
  timetables = [];
  collages = [];
  timetableCodes = [];
  constructor(private timetableService: TimetableService,
    private semesterService: SemesterService,
    private locationService: LocationService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imgCompressService: ImageCompressService
  ) { }

  ngOnInit() {
    this.timetableQueryId = this.route.snapshot.paramMap.get('timetableId');
    console.log(this.timetableQueryId)
    if (this.timetableQueryId) {
      this.isEditMode = true;
      this.timetableService.getOne(this.timetableQueryId).subscribe(timetable => {
        this.timetable = timetable.body;
       
      })
    }
    this.timetableService.getAll().subscribe(res => {
      this.timetables = this.timetableService.alltimetables;
      this.timetables.forEach(element => {
        this.timetableCodes.push(element.code);
      });
    })
    this.semesterService.getAll().subscribe(res => {
      this.semesters = res.body;
    }) 
     this.subjectService.getAll().subscribe(res => {
      this.subjects = res.body;
    }) 
    this.locationService.getAll().subscribe(res => {
      this.locations = res.body;
    })
  };

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.timetableCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  public imagePath;
  public message: string;
  processedImages: any = [];
  dayOfWeeks = ["SUNDAY", "MONDAY", "TUESDAY","WEDNESDAY",  "THURSDAY"]

  save(timetable: timetable) {
    if (this.isEditMode === true) {
      this.timetableService.update(this.timetable, this.timetable.id).subscribe(
        res => {
          console.log(res)
          this.open(this.modalSuccess);
          this.timetable = res.body;
          setTimeout(() => {
            this.router.navigate(['/timetable'])
          }, 300);

        }, error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/timetable'])
          }, 300);
        });
    }
    else {
      this.timetableService.save(this.timetable).subscribe((res) => {
        this.response = res.body;
        if (res) {
          this.timetable = res.body;
          this.open(this.modalSuccess);
          setTimeout(() => {
            this.router.navigate(['/timetable'])
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


  delete(timetable: timetable) {
    if (confirm("Are You Sure to delete  " + this.timetable.code + " ?")) {
      if (timetable.id) {
        this.timetableService.delete(timetable.id).subscribe(res => {
          if (res.statuse == 200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/timetable'])
            }, 300);
          }
        }), error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/timetable'])
          }, 300);

        }
          ;
      }
    }

  }
  selectedSubject(event){
    let subjectId = event.target.value;
    this.subjectService.getOne(subjectId).subscribe(res => {
      this.timetable.length = res.body.creditHours
    })

  }
  print() {
    window.print();
  }
}
