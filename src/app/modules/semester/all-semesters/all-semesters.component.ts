import { Component, OnInit } from '@angular/core';
import { SemesterService } from '../semester.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { semester } from 'src/app/shared/models/semester';

@Component({
  selector: 'app-all-semesters',
  templateUrl: './all-semesters.component.html',
  styleUrls: ['./all-semesters.component.scss']
})
export class AllSemestersComponent implements OnInit {
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
  private gridApi;
  private gridColumnApi;
  semesters = [];
  gridOptions;
  columnDefs = [
    { headerName: 'Code', field: 'code', editable: false, filter: "agTextColumnFilter" },
    { headerName: 'collage', field: 'collage.name', filter: "agTextColumnFilter" },
    { headerName: 'From Date', field: 'fromDate', filter: "agDateColumnFilter" },
    {
      headerName: 'To Date', field: 'toDate', filter: "agDateColumnFilter"}
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
  semesterId;
  constructor(
    private semesterService: SemesterService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }
  currencyFormatter(params) {
    var number = params.value
    return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }


  ngOnInit() {
    this.semesterService.getAll().subscribe((res) => {
      this.semesters = this.semesterService.allsemesters;
      this.rowData = this.semesterService.allsemesters;
    });


  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  cellEditingStopped(event) {
    var semester = event.data;
    console.log(event.data)
    this.semesterService.update(semester, semester.id).subscribe(res => {
      console.log(res)
      this.semester = res.body;
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
          this.semesterService.delete(selectedRows[i].id).subscribe(res => {
          })
        }, 100);
        setTimeout(() => {
          this.semesterService.getAll().subscribe(data => {
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
    this.semesterId = event.data.id;
  }

}
