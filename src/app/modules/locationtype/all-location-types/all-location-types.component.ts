import { Component, OnInit } from '@angular/core';
import { locationTypeService } from '../locationtype.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { locationType } from 'src/app/shared/models/locationType';

@Component({
  selector: 'app-all-location-types',
  templateUrl: './all-location-types.component.html',
  styleUrls: ['./all-location-types.component.scss']
})
export class AllLocationTypesComponent implements OnInit {
  locationType: locationType = {
    id: '',
    code: '',
    name: '',

  }
  private gridApi;
  private gridColumnApi;
  locationTypes = [];
  gridOptions;
  columnDefs = [
    { headerName: 'Code', field: 'code', editable: false },
    { headerName: 'Name', field: 'name' },
    // { headerName: 'Phone', field: 'phoneNumber' },
    // { headerName: 'website', field: 'website' }
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
  locationTypeId;
  constructor(
    private locationTypeService: locationTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }



  ngOnInit() {
    this.locationTypeService.getAll().subscribe((res) => {
      this.locationTypes = this.locationTypeService.alllocationTypes;

      this.rowData = this.locationTypeService.alllocationTypes;

    });


  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  cellEditingStopped(event) {
    var locationType = event.data;
    console.log(event.data)
    this.locationTypeService.update(locationType, locationType.id).subscribe(res => {
      console.log(res)
      this.locationType = res.body;
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
          this.locationTypeService.delete(selectedRows[i].id).subscribe(res => {
          })
        }, 100);
        setTimeout(() => {
          this.locationTypeService.getAll().subscribe(data => {
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
    this.locationTypeId = event.data.id;
  }

}
