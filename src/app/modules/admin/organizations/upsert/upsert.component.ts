import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfoService } from '@services/company-info.service';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  id: number = 0;
  companyInfoform: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private companyInfoService: CompanyInfoService
  ) {
    //**************Create Reactive Form with validation********************* */
    this.companyInfoform = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', []],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      gender: ['', [Validators.required]],
      dob: [null, [Validators.required]],
      id: [0, [Validators.required]],
      isActive: [true],
      range: [[0, 10]],
      userType: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //**************Get CompanyInfo ID On Edit********************* */
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.companyInfoform.get('Id')?.setValue(params['id']);
        // const data = this.companyInfoService.getCompanyInfosByID(this.id);
        // if (data) {
        //   this.companyInfoform.setValue(data);
        // }
      }
    });
  }

  save() {
    if (this.companyInfoform.invalid)
      // true if any form validation fail
      return;

    if (this.companyInfoform.get('id')?.value === 0) {
      // on Create New CompanyInfo
      // this.companyInfoService.addCompanyInfo(this.companyInfoform.value);
    } else {
      // on Update CompanyInfo info
      // this.companyInfoService.updateCompanyInfo(this.companyInfoform.value);
    }

    //Redirecting to companyInfo List page after save or update
    // this.router.navigate(['/companyInfo']);
  }
}
