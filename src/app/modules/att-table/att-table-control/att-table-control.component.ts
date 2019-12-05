import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { attTable } from 'src/app/shared/models/attTable';
import { attTableLines } from 'src/app/shared/models/attTableLines';
import { AttTableService } from '../services/att-table.service';
import { AttTableLinesService } from '../services/att-table-lines.service';
import { LocationService } from '../../location/location.service';
import { StudentService } from '../../student/student.service';
import { TimetableService } from '../../timetable/timetable.service';
import { SubjectService } from '../../subject/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbDateParserFormatter, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ImageCompressService } from 'ng2-image-compress';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-att-table-control',
  templateUrl: './att-table-control.component.html',
  styleUrls: ['./att-table-control.component.scss']
})
export class AttTableControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;
  attTable: attTable = {
    id: '',
    code: '',
    description: '',
    location: {
      id: ''
    },
    subject: {
      id: '',

    }
  }
  attTableLines: attTableLines = {
    id: '',
    code: '',
    attTable: this.attTable,
    subject: {
      id: '',
      code: '',
      name:''
    },
    student: {
      id: '',
      code: '',
    },
    timeTable: {
      id: '',
      code: ''
    },
  }
  closeResult: string;
  response;
  isEditMode: boolean;
  attTableQueryId: string;
  attTables = [];
  attTableCodes = []
  semesters = [];
  students = [];
  subjects = [];
  timetables = [];
  subjectIds = [];
  subjectName = [];
  timeTableCodes = [];
  timeTableIds = [];
  studentCodes = [];
  studentIds = [];
  lines = [];
  locations: any;
  constructor(
    private attTableService: AttTableService,
    private linesService: AttTableLinesService,
    private locationService: LocationService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private timetableService: TimetableService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imgCompressService: ImageCompressService,
    config: NgbDatepickerConfig,
    private parserFormatter: NgbDateParserFormatter
  ) {
    config.minDate = { year: 2019, month: 1, day: 1 };

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // weekends are disabled
    config.showWeekdays = true  
   }

  ngOnInit() {
    this.attTableQueryId = this.route.snapshot.paramMap.get('attTableId');
    if (this.attTableQueryId) {
      this.isEditMode = true;
      this.attTableService.getOne(this.attTableQueryId).subscribe(attTable => {
        this.attTable = attTable.body;
        this.rowData = attTable.body.lines
        console.log(this.rowData)
        
      })

    };

    this.locationService.getAll().subscribe(res => {
      this.locations = res.body
    });

    this.studentService.getAll().subscribe(res => {
      this.students = res.body
      for (let i = 0; i < this.students.length; i++) {
        this.studentCodes.push(this.students[i].name)
        this.studentIds.push(this.students[i].id)
      
      }
    });

    this.attTableService.getAll().subscribe(res => {
      this.attTables = res.body;
      this.attTables.forEach(element => {
        this.attTableCodes.push(element.code);
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
  }

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.attTableCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 30))
    )


  save(attTable: any) {
    this.attTable.date = new Date(this.parserFormatter.format(attTable.date));

    if (this.isEditMode === true) {
      this.attTableService.update(this.attTable, this.attTable.id).subscribe(
        res => {
          console.log(res)
          this.open(this.modalSuccess);
          this.attTable = res.body;
        });
      setTimeout(() => {
        this.updateLine();
      }, 500);;
    }
    else {

      this.attTableService.save(this.attTable).subscribe((res) => {
        this.response = res.body;
        this.attTable = res.body;
      })
      setTimeout(() => {
        this.saveLine();
      }, 500);
    }

   
  }

  saveLine(){
    this.gridApi.rowModel.rowsToDisplay.forEach(element => {
      var line = element.data;
      for (let j = 0; j < this.subjectName.length; j++) {
        if (this.subjectName[j] == line.subject.name) {
          var subId = this.subjectIds[j];
          line.subject.id = subId;
        };
      }
      for (let j = 0; j < this.studentCodes.length; j++) {
        if (this.studentCodes[j] == line.student.name) {
          var studentId = this.studentIds[j];
          line.student.id = studentId;
        };
      }
      for (let i = 0; i < this.timeTableCodes.length; i++) {
        const element = this.timeTableCodes[i];
        if (element == line.timeTable.code) {
          var timetableId = this.timeTableIds[i];
          line.timeTable.id = timetableId;
        };
      }
      line.attTable = this.attTable
      line.code = new Date() + this.attTable.id 

      this.lines.push(line);
    });

    for (let i = 0; i < this.lines.length; i++) {
      const lineToSave = this.lines[i];
      var lins = {
        code: lineToSave.attTable.code + '-' + new Date(),
        attTable: {
          id: this.attTable.id
        },
        subject: {
          id: lineToSave.subject.id
        },
        student: {
          id: lineToSave.student.id
        },
        timeTable: {
          id: lineToSave.timeTable.id
        }
      }
     
      setTimeout(() => {
        this.linesService.save(lins).subscribe(res => {
          this.response = res.body
        }, error => {
          this.response = error.error;
        });
      }, 200);
    }

  }

  updateLine() {
    this.gridApi.rowModel.rowsToDisplay.forEach(element => {
      console.log(element.data)
      var line = element.data;
      for (let j = 0; j < this.subjectName.length; j++) {
        if (this.subjectName[j] == line.subject.name) {
          var subId = this.subjectIds[j];
          line.subject.id = subId;
        };
      }
      for (let j = 0; j < this.studentCodes.length; j++) {
        if (this.studentCodes[j] == line.student.name) {
          var studentId = this.studentIds[j];
          line.student.id = studentId;
        };
      }
      for (let i = 0; i < this.timeTableCodes.length; i++) {
        const element = this.timeTableCodes[i];
        if (element == line.timeTable.code) {
          var timetableId = this.timeTableIds[i];
          line.timetable.id = timetableId;
        };
      }
      line.attTable = this.attTable
      line.code =  new Date() + this.attTable.id 

      this.lines.push(line);
    });

    for (let i = 0; i < this.lines.length; i++) {
      const lineToSave = this.lines[i];
      var lins = {
        code: lineToSave.attTable.code + '-' + new Date(),
        attTable: {
          id: lineToSave.attTable.id
        },
        subject: {
          id: lineToSave.subject.id
        },
        student: {
          id: lineToSave.student.id
        },
        timeTable: {
          id: lineToSave.timeTable.id
        }
      }
      if (lineToSave.id != ''){
        this.linesService.update(lins, lineToSave.id).subscribe(res => {
          this.response = res.body
        }, error => {
          this.response = error.error;
        })
      } else {
        this.linesService.save(lins).subscribe(res => {
          this.response = res.body
        })
      }
     
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

  delete(attTable: attTable) {
    if (confirm("Are You Sure to delete  " + this.attTable.code + " ?")) {
      if (attTable.id) {
        this.attTableService.delete(attTable.id).subscribe(res => {
          if (res.statuse == 200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/attTable'])
            }, 300);
          }
        }), error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/attTable'])
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
      }
    },
    {
      headerName: 'timeTable', field: 'timeTable.code',
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        cellHeight: 40,
        values: this.timeTableCodes

      },
    },{
      headerName: 'student', field: 'student.name',
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        cellHeight: 40,
        values: this.studentCodes 

      },
    },
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
    id: '',
    code: '',
    attTable: this.attTable,
    subject: {
      id: '',
      code: ''
    },
    student: {
      id: '',
      code: '',
    },
    timeTable: {
      id: '',
      code: ''
    },
  }]


  cellEditingStopped(event) {
    if (event.column.colDef.field == "timetable.code") {

      // if (this.registedCA < 18) {
      //   this.gridApi.updateRowData({
      //     add: [{
      //       attTable: this.attTable,
      //       subject: {
      //         id: '',
      //         code: '',
      //         name: '',
      //         defaultInstructor: '',
      //         creditHours: 0,
      //       },
      //       timetable: {
      //         id: '',
      //         code: '',
      //         dayOfWeek: '',
      //       }
      //     }]
      //   })
      // }



    } 


  }
  onCellKeyDown(event) {

    if (event.event.code == 'ArrowDown' ) {
      this.gridApi.updateRowData({
        add: [{
          code: '',
          attTable: this.attTable,
          subject: {
            id: '',
            code: '',
            name: ''
          },
          student: {
            id: '',
            code: '',
          },
          timeTable: {
            id: '',
            code: ''
          }
        }]
      })

    }
    if (event.event.code == 'Delete' && event.event.ctrlKey == true) {
      var selectedList = this.gridApi.getSelectedRows();

    }

  }
}
