import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalVNService} from '../../../LocalVNService/local-v-n.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {

  formUser: FormGroup = this.fb.group({
    idUser: [],
    login: ['', Validators.required],
    password: ['', Validators.required],
    role: ['ROLE_MEMBER'],
    idAccount: [],
    name: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', Validators.required],
    cardId: ['', Validators.required],
    age: ['', Validators.required],
    houseNumber: ['', Validators.required],
    img: ['', Validators.required],
    street: ['', Validators.required],
    wardId: ['', Validators.required],
    deleteFlag: [false],
  });
  isLinear = false;
  cityList: any;
  districtList: any;
  wardList: any;
  streetList: any;
  idCity: any;
  idDistrict: any;
  imageChangedEvent: any = '';
  croppedImage: any = 'https://taimienphi.vn/tmp/cf/aut/mAKI-top-anh-dai-dien-dep-chat-1.jpg';
  styleShowImg = 'background-image: url("https://taimienphi.vn/tmp/cf/aut/mAKI-top-anh-dai-dien-dep-chat-1.jpg");' +
    '  height: 400px;' +
    '  background-size: 100%;' +
    '  background-repeat: no-repeat;' +
    '  border: 2px solid #494ca2;';
  checkLoginPattern = '';
  hide = true;
  constructor(
    private dialogRef: MatDialogRef<AccountAddComponent>,
    @Inject(MAT_DIALOG_DATA) id: any,
    private fb: FormBuilder,
    private localVNService: LocalVNService
  ) {
    localVNService.getCityList().subscribe(data => {
      this.cityList = data;
    });
  }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      idUser: [],
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ['ROLE_MEMBER'],
      idAccount: [],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      cardId: ['', Validators.required],
      age: ['', Validators.required],
      houseNumber: ['', Validators.required],
      img: ['', Validators.required],
      street: ['', Validators.required],
      wardId: ['', Validators.required],
      deleteFlag: [false],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getDistrict(e: any): void {
    this.idCity = e;
    this.localVNService.getDistrictList(e).subscribe(data => {
      this.districtList = data;
      this.formUser.get('district')?.setValue('');
      this.formUser.get('street')?.setValue('');
      this.formUser.get('ward')?.setValue('');
    });
  }

  getWardAndStreet(e: any): void {
    this.idDistrict = e;
    this.localVNService.getStreetAndWardList(e).subscribe(data => {
      this.streetList = data.streets;
      this.wardList = data.wards;
      this.formUser.get('street')?.setValue('');
      this.formUser.get('ward')?.setValue('');
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

  searchStreet(e: any): void {
    const value = e.target.value;
    this.localVNService.getStreetAndWardList(this.idDistrict).subscribe(data => {
      const arr = [];
      for (const dataChild of data.streets) {
        if (dataChild._name.toLowerCase().includes(value.toLowerCase())) {
          arr.push(dataChild);
        }
      }
      this.streetList = arr;
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.styleShowImg = 'background-image: none;height: auto;';
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.formUser.controls.img.setValue(event.base64);
  }
  imageLoaded(image: HTMLImageElement): void {
    // show cropper
  }
  cropperReady(): void {
    // cropper ready
  }
  loadImageFailed(): void {
    // show message
  }

  submitForm(): void {
    console.log(this.formUser);
  }
}
