import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { BasarService } from 'src/app/shared/services/basar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLogin: boolean;
  constructor(private BasarService: BasarService ) { 
  }

  ngOnInit() {
  // this.isLogin = this.BasarService.isLogin();

  }



}

