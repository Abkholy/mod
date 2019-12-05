import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { subject } from 'src/app/shared/models/subject';

@Component({
  selector: 'app-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrls: ['./all-subjects.component.scss']
})
export class AllSubjectsComponent implements OnInit {

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
  private gridApi;
  private gridColumnApi;
  subjects = [];
  gridOptions;
  columnDefs = [
    { headerName: 'Code', field: 'code', editable: false },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Default Instructor', field: 'defaultInstructor' },
    { headerName: 'Credit Hours', field: 'creditHours', editable: false },
    { headerName: 'collage', field: 'collage.name' }
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
  subjectId;
  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }



  ngOnInit() {
    this.subjectService.getAll().subscribe((res) => {
      this.subjects = this.subjectService.allsubjects;
      this.rowData = this.subjectService.allsubjects;
    });
  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  cellEditingStopped(event) {
    var subject = event.data;
    console.log(event.data)
    this.subjectService.update(subject, subject.id).subscribe(res => {
      console.log(res)
      this.subject = res.body;
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
          this.subjectService.delete(selectedRows[i].id).subscribe(res => {
          })
        }, 100);
        setTimeout(() => {
          this.subjectService.getAll().subscribe(data => {
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
    this.subjectId = event.data.id;
  }



}
