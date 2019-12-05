import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { collage } from 'src/app/shared/models/collage';
import { CollageService } from '../collage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCompressService, ResizeOptions, IImage } from 'ng2-image-compress';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-collage-control',
  templateUrl: './collage-control.component.html',
  styleUrls: ['./collage-control.component.scss']
})
export class CollageControlComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: ElementRef;
  @ViewChild('modalFaild') modalFaild: ElementRef;
  collage: collage = {
    id: '',
    code: '',
    name: '',
    phoneNumber: '',
    location: '',
    Email: '',
    website: ''
  }
  closeResult: string;
  response;
  isEditMode: boolean;
  collageQueryId: string;
  collages = [];
  collageCodes = []
  constructor(private collageService: CollageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private imgCompressService: ImageCompressService
  ) { }

  ngOnInit() {
    this.collageQueryId = this.route.snapshot.paramMap.get('collageId');
    if (this.collageQueryId) {
      this.isEditMode = true;
      this.collageService.getOne(this.collageQueryId).subscribe(collage => {
        this.collage = collage.body;
      })
    }
    this.collageService.getAll().subscribe(res => {
      this.collages = this.collageService.allCollages;
      this.collages.forEach(element => {
        this.collageCodes.push(element.code);
      });
    })
  };

  code = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.collageCodes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
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


  save(collage: collage) {
    if (this.isEditMode === true) {
      this.collageService.update(this.collage, this.collage.id).subscribe(
        res => {
      console.log(res)
          this.open(this.modalSuccess);
          this.collage = res.body;
          setTimeout(() => {
            this.router.navigate(['/collage'])
          }, 300);
        
      }, error =>{
            this.open(this.modalFaild);
        this.response = error.error
            setTimeout(() => {
        this.router.navigate(['/collage'])
      }, 300);
      });
    }
    else {
      this.collageService.save(this.collage).subscribe((res) => {
        this.response = res.body;
        if (res) {
          this.collage = res.body;
          this.open(this.modalSuccess);
          setTimeout(() => {
            this.router.navigate(['/collage'])
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


  delete(collage: collage) {
    if (confirm("Are You Sure to delete  " + this.collage.name + " ?")) {
      if (collage.id) {
        this.collageService.delete(collage.id).subscribe(res => {
          if (res.statuse ==200) {
            this.open(this.modalSuccess);
            setTimeout(() => {
              this.router.navigate(['/collage'])
            }, 300);
          } 
        }),error =>{
            this.open(this.modalFaild);
          this.response = error.error
            setTimeout(() => {
              this.router.navigate(['/collage'])
            }, 300);
          
        }
        ;
      }
    }

  }

  print(){
    window.print();
  }
}
