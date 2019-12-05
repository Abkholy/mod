import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/shared/models/users';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  users: users = {
    id: '',
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    collage: {
      id: '',
      code: '',
      name: '',
      location: '',
      phoneNumber: '',
      website: '',
      Email: ''
    }

  }
  private gridApi;
  private gridColumnApi;
  allusers = [];
  gridOptions;
  columnDefs = [
    { headerName: 'First Name', field: 'firstName'},
    { headerName: 'Last Name', field: 'lastName' },
    { headerName: 'Email', field: 'email' },
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
  usersId;
  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }



  ngOnInit() {
    this.UserService.getAll().subscribe((res) => {
      this.allusers = this.UserService.allusers;

      this.rowData = this.UserService.allusers;

    });


  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  cellEditingStopped(event) {
    var users = event.data;
    console.log(event.data)
    this.UserService.update(users, users.id).subscribe(res => {
      console.log(res)
      this.users = res.body;
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
          this.UserService.delete(selectedRows[i].id).subscribe(res => {
          })
        }, 100);
        setTimeout(() => {
          this.UserService.getAll().subscribe(data => {
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
    this.usersId = event.data.id;
  }


}
