import {  OnInit } from '@angular/core';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  isEqual,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
  
} from 'angular-calendar';
import { timetable } from 'src/app/shared/models/timetable';
import { TimetableService } from '../timetable.service';
import { Time } from '@angular/common';
import { SemesterService } from '../../semester/semester.service';

import * as  moment from 'moment';
import { Router } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-all-timetables',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './all-timetables.component.html',
  styleUrls: ['./all-timetables.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllTimetablesComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  timetable: timetable = {
    id: '',
    dayOfWeek:'',
    length: 0,
    period:0,
    subject:{
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
    },
    location:{
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
    },
    semester:{
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
  timeTables = [];

  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    }
    // ,
    // {
    //   // label: '<i class="fa fa-fw fa-times"></i>',
    //   // onClick: ({ event }: { event: CalendarEvent }): void => {
    //   //   this.events = this.events.filter(iEvent => iEvent !== event);
    //   //   this.handleEvent('Deleted', event);
    //   // }
    // }
  ];

  refresh: Subject<any> = new Subject();

  periods= {
    1: { start : 9.00 , color: colors.yellow },
    2: { start: 10.20, color: colors.red },
    3: { start: 12.30, color: colors.blue  },
    4: { start: 14.05, color: colors.green },
  }
  events: CalendarEvent[] = [
  
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];

  activeDayIsOpen: boolean = true;
  dayOfWeeks = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"]
  dates = []
  constructor(private modal: NgbModal,
    private timetableService: TimetableService,
    private router: Router,
   ) { }

  ngOnInit() {
    this.timetableService.getAll().subscribe(res => {
      this.timeTables = this.timetableService.alltimetables;

      this.timeTables.forEach(table => {
        var fromDate = new Date(table.semester.fromDate.substring(0, 10))
        var toDate = new Date(table.semester.toDate.substring(0, 10))
        while (fromDate <= toDate) {
          fromDate = new Date(fromDate.setDate(fromDate.getDate() + 1));
          for (let i = 0; i < this.dayOfWeeks.length; i++) {
            if(table.dayOfWeek == this.dayOfWeeks[i]){
              var day = i;
            }
          }
         if (fromDate.getDay() == day ){
           this.dates.push(fromDate);
           var devent = {
             id: table.id,
             start: addHours(startOfDay(fromDate), fromDate.getHours() + this.periods[table.period].start - 2 ),
             end: addHours(startOfDay(fromDate), fromDate.getHours() + this.periods[table.period].start - 2 + table.length),
             title: table.subject.name + '-' + table.subject.defaultInstructor + '-' + table.location.code,
             color: this.periods[table.period].color,
             actions: this.actions,
           }
           this.events.push(devent);
           this.fetchEvents();
                   }
         
        }

      });
    })

  }
  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    if(action=='Edited'){
      this.edit(event);
    }
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  edit(event){
    var timetableId = event.id;
    this.router.navigate(['timetable/edit', timetableId])
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  print(){
    window.print()
  }

}
