import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { location } from 'src/app/shared/models/location';

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.scss']
})
export class AllLocationsComponent implements OnInit {
  location: location = {
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
  }
  private gridApi;
  private gridColumnApi;
  locations = [];
  gridOptions;
  columnDefs = [
    { headerName: 'Code', field: 'code', editable: false, filter: "agTextColumnFilter" },
    { headerName: 'Name', field: 'name', filter: "agTextColumnFilter" },
    { headerName: 'Type', field: 'locationType.name', filter: "agTextColumnFilter"  },
    {
      headerName: 'Capacity', field: 'capacity', filter: 'agNumberColumnFilter', valueFormatter: this.currencyFormatter},
    { headerName: 'collage', field: 'collage.name', filter: "agTextColumnFilter" }
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
  locationId;
  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }
  currencyFormatter(params) {
    var number = params.value
    return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }


  ngOnInit() {
    this.locationService.getAll().subscribe((res) => {
      this.locations = this.locationService.alllocations;
      this.rowData = this.locationService.alllocations;
    });


  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  cellEditingStopped(event) {
    var location = event.data;
    console.log(event.data)
    this.locationService.update(location, location.id).subscribe(res => {
      console.log(res)
      this.location = res.body;
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
          this.locationService.delete(selectedRows[i].id).subscribe(res => {
          })
        }, 100);
        setTimeout(() => {
          this.locationService.getAll().subscribe(data => {
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
    this.locationId = event.data.id;
  }

}
