import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { locationType } from 'src/app/shared/models/locationType';
import { locationTypeService } from '../locationtype.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-locationtype-control',
  templateUrl: './locationtype-control.component.html',
  styleUrls: ['./locationtype-control.component.scss']
})
export class LocationtypeControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;
  locationType: locationType = {
    id: '',
    code: '',
    name: '',
   }
  closeResult: string;
  response;
  isEditMode: boolean;
  locationTypeQueryId: string;
  locationTypes = [];
  locationTypeCodes = []
  constructor(private locationTypeService: locationTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imgCompressService: ImageCompressService
  ) { }

  ngOnInit() {
    this.locationTypeQueryId = this.route.snapshot.paramMap.get('locationTypeId');
    if (this.locationTypeQueryId) {
      this.isEditMode = true;
      this.locationTypeService.getOne(this.locationTypeQueryId).subscribe(locationType => {
        this.locationType = locationType.body;
      })
    }
    this.locationTypeService.getAll().subscribe(res => {
      this.locationTypes = this.locationTypeService.alllocationTypes;
      this.locationTypes.forEach(element => {
        this.locationTypeCodes.push(element.code);
      });
    })
  };

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.locationTypeCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
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


  save(locationType: locationType) {
    if (this.isEditMode === true) {
      this.locationTypeService.update(this.locationType, this.locationType.id).subscribe(
        res => {
          console.log(res)
          this.open(this.modalSuccess);
          this.locationType = res.body;
          setTimeout(() => {
            this.router.navigate(['/locationType'])
          }, 300);

        }, error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/locationType'])
          }, 300);
        });
    }
    else {
      this.locationTypeService.save(this.locationType).subscribe((res) => {
        this.response = res.body;
        if (res) {
          this.locationType = res.body;
          this.open(this.modalSuccess);
          setTimeout(() => {
            this.router.navigate(['/locationType'])
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


  delete(locationType: locationType) {
    if (confirm("Are You Sure to delete  " + this.locationType.name + " ?")) {
      if (locationType.id) {
        this.locationTypeService.delete(locationType.id).subscribe(res => {
          if (res.statuse == 200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/locationType'])
            }, 300);
          }
        }), error => {
          this.open(this.modalFaild);
          this.response = error.error
          setTimeout(() => {
            this.router.navigate(['/locationType'])
          }, 300);

        }
          ;
      }
    }

  }

  print() {
    window.print();
  }

}
