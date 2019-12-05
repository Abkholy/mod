import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { registration } from 'src/app/shared/models/registration';
import { RegistrationService } from '../registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CollageService } from '../../collage/collage.service';
import { StudentService } from '../../student/student.service';
import { SemesterService } from '../../semester/semester.service';
import { SubjectService } from '../../subject/subject.service';
import { TimetableService } from '../../timeTable/timeTable.service';
import { registrationLines } from 'src/app/shared/models/registrationLines';
import { registrationLinesLinesService } from '../registration-lines.service';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-registration-control',
  templateUrl: './registration-control.component.html',
  styleUrls: ['./registration-control.component.scss']
})
export class RegistrationControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;
  registration: registration = {
    id: '',
    code: '',
    details: '',
    level: 0,
    student: {
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
  registrationLines: registrationLines = {
    registration: this.registration,
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
    timeTable: {
      id: '',
      code:'',
      dayOfWeek: '',
      length: 0,
      period: 0,
      subject: {
        id: '',
        code: '',
        name: '',
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
  }
  registedCA: number = 0;
  closeResult: string;
  response;
  isEditMode: boolean;
  registrationQueryId: string;
  registrations = [];
  registrationCodes = []
  semesters =[];
  students =[];
  subjects = [];
  timetables = [];
  subjectIds = [];
  subjectName = [];
  timeTableCodes = [];
  timeTableIds = [];
  lines = [];
  constructor(
    private registrationService: RegistrationService,
    private linesService: registrationLinesLinesService,
    private semesterService: SemesterService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private timetableService: TimetableService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imgCompressService: ImageCompressService
  ) { }

  ngOnInit() {
    this.registrationQueryId = this.route.snapshot.paramMap.get('registrationId');
    if (this.registrationQueryId) {
      this.isEditMode = true;
      this.registrationService.getOne(this.registrationQueryId).subscribe(registration => {
        this.registration = registration.body;
        this.rowData =registration.body.lines
      })
    };

    this.semesterService.getAll().subscribe(res => {
      this.semesters = res.body
    }) ;
    
    this.studentService.getAll().subscribe(res => {
      this.students = res.body
    });

    this.registrationService.getAll().subscribe(res => {
      this.registrations = res.body;
      this.registrations.forEach(element => {
        this.registrationCodes.push(element.code);
      });
    });

    this.timetableService.getAll().subscribe(res => {
      this.timetables = res.body
      for (let i = 0; i < this.timetables.length; i++) {
        this.timeTableCodes.push(this.timetables[i].code)
        this.timeTableIds.push(this.timetables[i].id)
       
      }
    });

    this.subjectService.getAll().subscribe(res => {
      this.subjects = res.body
      for (let i = 0; i < this.subjects.length; i++) {
        this.subjectIds.push(this.subjects[i].id);
        this.subjectName.push(this.subjects[i].name);
        
      }
    })
  };

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.registrationCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
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


  save(registration: registration) {
    if (this.isEditMode === true) {
      this.registrationService.update(this.registration, this.registration.id).subscribe(
        res => {
          console.log(res)
          this.open(this.modalSuccess);
          this.registration = res.body;
          setTimeout(() => {
            this.router.navigate(['/registration'])
          }, 300);

        }, error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/registration'])
          }, 300);
        });
    }
    else {
      this.registrationService.save(this.registration).subscribe((res) => {
        this.response = res.body;
        this.registration = res.body;

        
      })
      
    }
   
    setTimeout(() => {
      this.gridApi.rowModel.rowsToDisplay.forEach(element => {
        var line = element.data;
        for (let j = 0; j < this.subjectName.length; j++) {
          if (this.subjectName[j] == line.subject.name) {
            var subId = this.subjectIds[j];
            line.subject.id = subId;
          };
        }
        for (let i = 0; i < this.timeTableCodes.length; i++) {
          const element = this.timeTableCodes[i];
          if (element == line.timeTable.code) {
            var timetableId = this.timeTableIds[i];
            line.timeTable.id = timetableId;
          };
        }
        line.registration = this.registration
        // line.code = line.timeTable.id + new Date() + line.registration.id + line.subject.id

        this.lines.push(line);
      });

      for (let i = 0; i < this.lines.length; i++) {
        const lineToSave = this.lines[i];
        var lins = {
          registration: {
            id: lineToSave.registration.id
          },
          subject: {
            id: lineToSave.subject.id
          },
          timeTable: {
            id: lineToSave.timeTable.id
          }
        }
        this.linesService.save(lins).subscribe(res => {
          this.response = res.body
        }, error => {
          this.response = error.error;

        })

      }
      // this.open(this.modalSuccess);
      // setTimeout(() => {
      //   this.router.navigate(['/registration'])
      // }, 300);
    }, 500);
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


  delete(registration: registration) {
    if (confirm("Are You Sure to delete  " + this.registration.code + " ?")) {
      if (registration.id) {
        this.registrationService.delete(registration.id).subscribe(res => {
          if (res.statuse == 200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/registration'])
            }, 300);
          }
        }), error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/registration'])
          }, 300);

        }
          ;
      }
    }

  }

  print() {
    window.print();
  }




  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
  private gridApi;
  private gridColumnApi;
  gridOptions;
  
  columnDefs = [
    {
      headerName: "ID",
      width: 50,
      valueGetter: "node.id",
      editable: false,
    },
    {
      headerName: 'Subject', field: 'subject.name',
       cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        cellHeight: 40,
        values: this.subjectName
      }},
    {
      headerName: 'timeTable', field: 'timeTable.code',
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        cellHeight: 40,
        values: this.timeTableCodes
      
    }, },
            // { headerName: 'Student Phone', field: 'student.phoneNumber' },
  ];
  defaultColDef = {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
   
  }
  rowData = [{
    registration: this.registration,
    subject: {
      id: '',
      code: '',
      name: '',
      defaultInstructor: '',
      creditHours: 0,
    },
    timeTable: {
      id: '',
      code: '',
      dayOfWeek: '',
    }
  }];


  cellEditingStopped(event) {
    if (event.column.colDef.field == "timeTable.code"){
      
    // if (this.registedCA < 18) {
    //   this.gridApi.updateRowData({
    //     add: [{
    //       registration: this.registration,
    //       subject: {
    //         id: '',
    //         code: '',
    //         name: '',
    //         defaultInstructor: '',
    //         creditHours: 0,
    //       },
    //       timeTable: {
    //         id: '',
    //         code: '',
    //         dayOfWeek: '',
    //       }
    //     }]
    //   })
    // }
    


    }  if (event.column.colDef.field == "subject.name"){
      var subjectName = event.data.subject.name;
      console.log(this.subjectIds)
      for (let j = 0; j < this.subjectName.length; j++) {
         
        if (subjectName== subjectName) {
          var subId = this.subjectIds[j];
          console.log(subId)
        };
      }
     this.subjectService.getOne(subId).subscribe(res =>{
       this.registedCA += res.body.creditHours
     })
    }


  }
  onCellKeyDown(event) {

    if (event.event.code =='ArrowDown' && this.registedCA < 18) {
        this.gridApi.updateRowData({
          add: [{
            registration: this.registration,
            subject: {
              id: '',
              code: '',
              name: '',
              defaultInstructor: '',
              creditHours: 0,
            },
            timeTable: {
              id: '',
              code: '',
              dayOfWeek: '',
            }
          }]
        })

      }
    if (event.event.code == 'Delete' && event.event.ctrlKey == true){
      var selectedList = this.gridApi.getSelectedRows();

  }
  
}
}

