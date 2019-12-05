import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { location } from 'src/app/shared/models/location';
import { LocationService } from '../location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CollageService } from '../../collage/collage.service';
import { locationTypeService } from '../../locationtype/locationtype.service';

@Component({
  selector: 'app-location-control',
  templateUrl: './location-control.component.html',
  styleUrls: ['./location-control.component.scss']
})
export class LocationControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;
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
  closeResult: string;
  response;
  isEditMode: boolean;
  locationQueryId: string;
  locations = [];
  locationCodes = []
  collages= [];
  locationTypes = [];
  constructor(
    private locationService: LocationService,
    private collageService: CollageService,
    private locationTypeService: locationTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imgCompressService: ImageCompressService
  ) { }

  ngOnInit() {
    this.locationQueryId = this.route.snapshot.paramMap.get('locationId');
    if (this.locationQueryId) {
      this.isEditMode = true;
      this.locationService.getOne(this.locationQueryId).subscribe(location => {
        this.location = location.body;
      })
    }
    this.locationService.getAll().subscribe(res => {
      this.locations = this.locationService.alllocations;
      this.locations.forEach(element => {
        this.locationCodes.push(element.code);
      });
    })

    this.collageService.getAll().subscribe(res => {
      this.collages = res.body ;
    })

    this.locationTypeService.getAll().subscribe(res => {
      this.locationTypes = res.body;
    })
  };

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.locationCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  public imagePath;
  public message: string;
  processedImages: any = [];
  resizeOtions: ResizeOptions = {
    Resize_Max_Height: 200,
    Resize_Max_Width: 200,
    Resize_Quality: 70,
    Resize_Type: ''
  }


  save(location: location) {
    if (this.isEditMode === true) {
      this.locationService.update(this.location, this.location.id).subscribe(
        res => {
          console.log(res)
          this.open(this.modalSuccess);
          this.location = res.body;
          setTimeout(() => {
            this.router.navigate(['/location'])
          }, 300);

        }, error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/location'])
          }, 300);
        });
    }
    else {
      this.locationService.save(this.location).subscribe((res) => {
        this.response = res.body;
        if (res) {
          this.location = res.body;
          this.open(this.modalSuccess);
          setTimeout(() => {
            this.router.navigate(['/location'])
          }, 300);
        } else {
          this.isEditMode = false
          this.open(this.modalFaild);
        }
      })
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  delete(location: location) {
    if (confirm("Are You Sure to delete  " + this.location.name + " ?")) {
      if (location.id) {
        this.locationService.delete(location.id).subscribe(res => {
          if (res.statuse == 200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/location'])
            }, 300);
          }
        }), error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/location'])
          }, 300);

        }
          ;
      }
    }

  }

  print() {
    window.print();
  }
  selectLocation(event){
    let locationTypeId = event.target.value;

    this.locationTypeService.getOne(locationTypeId).subscribe(res => {
      this.location.code = res.body.code + "-"

    })
    
  }
}
