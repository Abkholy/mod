import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { registration } from 'src/app/shared/models/registration';
import { registrationLinesLinesService } from '../registration-lines.service';

@Component({
  selector: 'app-all-registration',
  templateUrl: './all-registration.component.html',
  styleUrls: ['./all-registration.component.scss']
})
export class AllRegistrationComponent implements OnInit {
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
  private gridApi;
  private gridColumnApi;
  registrations = [];
  gridOptions;
  columnDefs = [
    {
      headerName: 'Registrations', children: [
        {
          headerName: 'student', children: [
            { headerName: 'Student Name', field: 'student.name' },
            { headerName: 'Student Level', field: 'student.level' },
            { headerName: 'Student Phone', field: 'student.phoneNumber' },
          ]
        },
        {
          headerName: 'semester', children: [
            { headerName: 'Semester Code', field: 'semester.code' },
            { headerName: 'Semester From Date', field: 'semester.fromDate' },
            { headerName: 'Semester To Date', field: 'semester.toDate' },
          ]
        }
      ]
    },
    { headerName: 'Details', field: 'details' },

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
  registrationId;
  constructor(
    private registrationService: RegistrationService,
    private linesService: registrationLinesLinesService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }



  ngOnInit() {
    this.registrationService.getAll().subscribe((res) => {
      this.registrations = this.registrationService.allregistrations;

      this.rowData = this.registrationService.allregistrations;

    });


  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
  cellEditingStopped(event) {
    var registration = event.data;
    console.log(event.data)
    this.registrationService.update(registration, registration.id).subscribe(res => {
      console.log(res)
      this.registration = res.body;
    });
    this.gridApi.refreshCells();

  }
  onSelectionChanged(event) {
    this.selectedRows = this.gridApi.getSelectedRows();
  }
  delete(selectedRows) {
    if (confirm("are You sure ?")) {
      for (let i = 0; i < selectedRows.length; i++) {
        for (let j = 0; j < selectedRows[i].lines.length; j++) {
          const element = selectedRows[i].lines[j];
          this.linesService.delete(element.id).subscribe(res => {
          })
        }
          this.registrationService.delete(selectedRows[i].id).subscribe(res => {
          })
  
          this.registrationService.getAll().subscribe(data => {
            this.rowData = data.body;
          })
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
    this.registrationId = event.data.id;
  }

}
