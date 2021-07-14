import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TypePurchaseService} from '../../type-pur-chase/type-purchase.service';
import {TypeHouseService} from '../../type-house/type-house.service';
import {ProjectService} from '../../project/project.service';
import {UtilityService} from '../../utility/utility.service';
import {TypePostService} from '../../type-post/type-post.service';
import {PostService} from '../post.service';
import {LocalVNService} from '../../../LocalVNService/local-v-n.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  postForm: FormGroup = this.fb.group({
    id: [],
    subject: [''],
    subjectChild: [''],
    price: [''],
    area: [''],
    bedroomNumber: [''],
    wcNumber: [''],
    floorNumber: [''],
    description: [''],
    status: [''],
    discount: [''],
    deleteFlag: [''],
    floor: [''],
    timeCreate: [''],
    timeFinish: [''],
    typePurchaseId: [''],
    typeHouseId: [''],
    projectId: [''],
    typePostId: [''],
    utilityIdList: [''],
    images: [''],
    video: [''],
    wardId: [''],
    address: ['']
  });
  fileForm: FormGroup = this.fb.group({
    id: [],
    url: [],
    postId: [],
  });

  isLinear = false;
  typePurchaseList: any;
  typeHouseList: any;
  projectList: any;
  utilities: any;
  typePostList: any;
  imageList: string[] = [];
  videoList: string[]  = [];
  cityList: any;
  districtList: any;
  wardList: any;
  idCity: any;
  idDistrict: any;

  constructor(
    private dialogRef: MatDialogRef<PostCreateComponent>,
    @Inject(MAT_DIALOG_DATA) id: any,
    private fb: FormBuilder,
    private typePurchaseService: TypePurchaseService,
    private typeHouseService: TypeHouseService,
    private projectService: ProjectService,
    private utilityService: UtilityService,
    private typePostService: TypePostService,
    private postService: PostService,
    private localVNService: LocalVNService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getTypePurchaseList();
    this.getTypeHouseList();
    this.getProjectList();
    this.getUtilities();
    this.getTypePost();
    this.localVNService.getCityList().subscribe(data => {
      this.cityList = data;
    });
    this.initFileForm();
  }

  initForm(): void {
    this.postForm = this.fb.group({
      id: [],
      subject: ['', Validators.required],
      subjectChild: ['', Validators.required],
      price: ['', Validators.required],
      area: ['', Validators.required],
      bedroomNumber: [0, Validators.required],
      wcNumber: [0, Validators.required],
      floorNumber: [0, Validators.required],
      description: ['', Validators.required],
      status: ['Chưa bán'],
      discount: [''],
      deleteFlag: ['false'],
      floor: [0],
      timeCreate: [],
      timeFinish: [],
      typePurchaseId: ['', Validators.required],
      typeHouseId: ['', Validators.required],
      projectId: ['', Validators.required],
      typePostId: ['', Validators.required],
      utilityIdList: ['', Validators.required],
      wardId: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  initFileForm(): void {
    this.fileForm = this.fb.group({
      id: [],
      url: [],
      postId: [],
    });
  }
  getTypePurchaseList(): void {
    this.typePurchaseService.getTypePurchaseList().subscribe(data => {
      this.typePurchaseList = data;
    });
  }

  getTypeHouseList(): void {
    this.typeHouseService.getTypeHouseList().subscribe(data => {
      this.typeHouseList = data;
    });
  }

  getProjectList(): void {
    this.projectService.getProjectList().subscribe(data => {
      this.projectList = data;
      this.postForm.get('project')?.setValue(data[0]);
    });
  }

  getUtilities(): void {
    this.utilityService.getUtilityList().subscribe(data => {
      this.utilities = data;
    });
  }

  getTypePost(): void {
    this.typePostService.getTypePostList().subscribe(data => {
      this.typePostList = data;
    });
  }

  submitForm(): void {
    if (this.postForm.valid) {
      this.postService.save(this.postForm.getRawValue()).subscribe(data => {
        console.log(data);
        this.imageList.forEach((item) => {
          this.fileForm.get('url')?.setValue(item);
          this.fileForm.get('postId')?.setValue(data.id);
          this.postService.saveImg(this.fileForm.getRawValue()).subscribe();
        });
        this.videoList.forEach((item) => {
          this.fileForm.get('url')?.setValue(item);
          this.fileForm.get('postId')?.setValue(data.id);
          this.postService.saveVideo(this.fileForm.getRawValue()).subscribe();
        });
      });
    }
  }

  uploadFile(e: any): void {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.imageList.push(event.target.result);
        console.log(event.target.result);
      };
    }
  }

  closeImgFromList(index: number): void {
    this.imageList.splice(index, 1);
  }

  uploadFileVideo(e: any): void {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.videoList.push(event.target.result);
        console.log(event.target.result);
      };
    }
  }

  closeVideoFromList(index: number): void {
    this.videoList.splice(index, 1);
  }

  getDistrict(e: any): void {
    this.idCity = e;
    this.localVNService.getDistrictList(e).subscribe(data => {
      this.districtList = data;
      this.postForm.get('ward')?.setValue('');
    });
  }

  getWardAndStreet(e: any): void {
    this.idDistrict = e;
    this.localVNService.getStreetAndWardList(e).subscribe(data => {
      this.wardList = data.wards;
      this.postForm.get('ward')?.setValue('');
    });
  }

  searchCity(e: any): void {
    const value = e.target.value;
    this.localVNService.getCityList().subscribe(data => {
      const arr = [];
      for (const dataChild of data) {
        if (dataChild._name.toLowerCase().includes(value.toLowerCase())) {
          arr.push(dataChild);
        }
      }
      this.cityList = arr;
    });
  }

  searchDistrict(e: any): void {
    const value = e.target.value;
    this.localVNService.getDistrictList(this.idCity).subscribe(data => {
      const arr = [];
      for (const dataChild of data) {
        if (dataChild._name.toLowerCase().includes(value.toLowerCase())) {
          arr.push(dataChild);
        }
      }
      this.districtList = arr;
    });
  }

  searchWard(e: any): void {
    const value = e.target.value;
    this.localVNService.getStreetAndWardList(this.idDistrict).subscribe(data => {
      const arr = [];
      for (const dataChild of data.wards) {
        if (dataChild._name.toLowerCase().includes(value.toLowerCase())) {
          arr.push(dataChild);
        }
      }
      this.wardList = arr;
    });
  }
}
