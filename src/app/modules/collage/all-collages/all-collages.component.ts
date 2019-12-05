import { Component, OnInit } from '@angular/core';
import { CollageService } from '../collage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { collage } from 'src/app/shared/models/collage';

@Component({
  selector: 'app-all-collages',
  templateUrl: './all-collages.component.html',
  styleUrls: ['./all-collages.component.scss']
})
export class AllCollagesComponent implements OnInit {
collage: collage = {
  id: '',
  code: '',
  name:'',
  phoneNumber:'',
  location:'',
  Email:'',
  website:''
}
  private gridApi;
  private gridColumnApi;
  collages = [];
  gridOptions;
  columnDefs = [
    { headerName: 'Code', field: 'code', editable: false },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Phone', field: 'phoneNumber' },
    { headerName: 'website', field: 'website' }
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
  collageId;
  constructor(
    private collageService: CollageService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }



  ngOnInit() {
    this.collageService.getAll().subscribe((res) => {
      this.collages = this.collageService.allCollages;

      this.rowData = this.collageService.allCollages;

    });


  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  cellEditingStopped(event) {
    var collage = event.data;
    console.log(event.data)
    this.collageService.update(collage, collage.id).subscribe(res => {
      console.log(res)
      this.collage = res.body;
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
          this.collageService.delete(selectedRows[i].id).subscribe(res => {
          })
        }, 100);
        setTimeout(() => {
          this.collageService.getAll().subscribe(data => {
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
    this.collageId = event.data.id;
  }


}
