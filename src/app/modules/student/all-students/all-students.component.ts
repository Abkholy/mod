import { Component, OnInit } from '@angular/core';
import { student } from 'src/app/shared/models/student';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit {

  student: student = {
    id: '',
    code: '',
    name: '',
    phoneNumber:'',
    ssn:'',
    image:'',
    macAddress:'',
    email:'',
    level:0,
    collage:{
      id:'',
      code: '',
      name: '',
      phoneNumber: '',
      location: '',
      Email: '',
      website: ''
    }

  }
  private gridApi;
  private gridColumnApi;
  students = [];
  gridOptions;
  columnDefs = [
    { headerName: 'Code', field: 'code', editable: false },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Phone', field: 'phoneNumber' },
    { headerName: 'level', field: 'level', editable: false },
    { headerName: 'email', field: 'email' }
  ];
  defaultColDef = {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true
  };
  rowData;
  selectedRows;
  studentId;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }



  ngOnInit() {
    this.studentService.getAll().subscribe((res) => {
      this.students = this.studentService.allstudents;
      this.rowData = this.studentService.allstudents;
    });
  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  cellEditingStopped(event) {
    var student = event.data;
    console.log(event.data)
    this.studentService.update(student, student.id).subscribe(res => {
      console.log(res)
      this.student = res.body;
    });
    this.gridApi.refreshCells();

  }
  onSelectionChanged(event) {
    this.selectedRows = this.gridApi.getSelectedRows();
  }
  delete(selectedRows) {
    if (confirm("are You sure ?")) {
      for (let i = 0; i < selectedRows.length; i++) {
        setTimeout(() => {
          this.studentService.delete(selectedRows[i].id).subscribe(res => {
          })
        }, 100);
        setTimeout(() => {
          this.studentService.getAll().subscribe(data => {
            this.rowData = data.body;
            console.log(data)
          })
        }, 600);
        this.gridApi.refreshCells();

      }

    }

  }
  print() {
    window.print();
  }
  onBtFirst() {
    this.gridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    console.log("here");
    this.gridApi.paginationGoToLastPage();
  }

  onBtNext() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridApi.paginationGoToPreviousPage();
  }

  rowSelected(event) {
    this.studentId = event.data.id;
  }


}
