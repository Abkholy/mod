import { Component, OnInit } from '@angular/core';
import { AttTableService } from '../services/att-table.service';
import { AttTableLinesService } from '../services/att-table-lines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { attTable } from 'src/app/shared/models/attTable';
import { attTableLines } from 'src/app/shared/models/attTableLines';

@Component({
  selector: 'app-all-att-tables',
  templateUrl: './all-att-tables.component.html',
  styleUrls: ['./all-att-tables.component.scss']
})
export class AllAttTablesComponent implements OnInit {
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
      code: ''
    },
    student: {
      id: '',
      code:'',
    },
    timeTable: {
      id: '',
      code: ''
    },
    }
  
  private gridApi;
  private gridColumnApi;
  attTables = [];
  gridOptions;
  columnDefs = [
    { headerName: 'Code', field: 'code' },
    {
      
      headerName: 'attTables', children: [
        {
          headerName: 'location', children: [
            { headerName: 'Location', field: 'location.code', editable: false },
            { headerName: 'Location Type', field: 'location.locationType.name', editable: false},
            { headerName: 'Location Capacity', field: 'location.capacity' , editable: false},
          ]
        },
        {
          headerName: 'subject', children: [
            { headerName: 'subject Name', field: 'subject.name', editable: false },
            { headerName: 'subject From Date', field: 'subject.defaultInstructor', editable: false },
          ]
        }
      ]
    },
    { headerName: 'Description', field: 'description' },

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
  attTableId;
  constructor(
    private attTableService: AttTableService,
    private linesService: AttTableLinesService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }



  ngOnInit() {
    this.attTableService.getAll().subscribe((res) => {
      this.attTables = this.attTableService.allattTables;
      this.rowData = this.attTableService.allattTables;
 
    });


  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
  cellEditingStopped(event) {
    var attTable = event.data;
    console.log(event.data)
    this.attTableService.update(attTable, attTable.id).subscribe(res => {
      console.log(res)
      this.attTable = res.body;
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
        this.attTableService.delete(selectedRows[i].id).subscribe(res => {
        })

        this.attTableService.getAll().subscribe(data => {
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
    this.attTableId = event.data.id;
  }


}
