import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IItemType } from '@models/item-type.model';
import { IItem } from '@models/item.model';
import { IPaymentMethod } from '@models/payment-method.model';
import { BankingService } from '@services/banking.service';
import { ItemsService } from '@services/items.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-upsert-item',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  id: number = 0;
  itemForm!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  item?: IItem;
  itemTypes: IItemType[] = [];
  paymentMethods: IPaymentMethod[] = [];
  itemId: any;

  constructor(
    @Inject(DynamicDialogRef) public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MessageService) public messageService: MessageService,
    private accountService: BankingService,
    public router: Router,
    private itemService: ItemsService
  ) {
    if (config.data) {
      this.item = config.data.item;
    }
  }

  ngOnInit(): void {
    this.getItemTypes();
    this.getPaymentMethods();

    this.itemForm = this.fb.group({
      ItemName: ['', [Validators.required]],
      PurchaseDesc: [],
      ItemTypeID: ['', [Validators.required]],
      SalePrice: ['', [Validators.required]],
      Cost: ['', [Validators.required]],
      PymtMethodID: ['', [Validators.required]],
    });

    if (this.item) {
      this.itemForm.patchValue({
        ItemName: this.item?.ItemID,
        PurchaseDesc: this.item?.PurchaseDesc,
        ItemTypeID: this.item?.ItemTypeID,
        SalePrice: this.item?.SalePrice,
        Cost: this.item?.Cost,
        PymtMethodID: this.item?.PymtMethodID,
      });
    }
  }

  get f() {
    return this.itemForm.controls;
  }

  saveItem() {
    this.submitted = true;

    // reset alerts on submit
    this.messageService.clear();

    if (this.itemForm.invalid) return;

    let data: IItem = {
      ...this.itemForm.value,
      ItemCode: this.createId(),
      PurchaseDesc: this.itemForm.controls['ItemName'].value,
      SalesDesc: this.itemForm.controls['ItemName'].value,
      SubItem: '',
      ParentItemID: '',
      Cost: '',
      COGSAcID: '',
      PurchaseTaxID: '',
      PrefSellerID: '',
      SalePrice: '',
      IncAcID: '',
      SaleTaxID: '',
      AssetAcID: '',
      InclVAT: '',
      OnHand: '',
      OnOrder: '',
      TotalValue: '',
      ValuationID: '',
      Min: '',
      Max: '',
      PymtMethodID: '',
      DepositedTo: '',
      BankAcID: '',
      SubContracted: '',
      InActive: '',
      ItemGroup: '',
      ItemDetails: this.itemForm.controls['ItemName'].value,
      StockInHandID: '',
      StockInTransID: '',
      SerialNo: '',
      Model: '',
      Insured: '',
      TypeOfInsurance: '',
      InsurancePolicyNo: '',
      InsuranceExpiry: '',
      InsuranceCompany: '',
      InsuranceTelephone: '',
      Depreciated: '',
      DepreciationMethodID: '',
      DepreciationRate: '',
      DepreciationRatePC: '',
      DepreciationAccountID: '',
      CompanyID: '',
      ItemPhoto: '',
      ModelNo: '',
      OEMNo: '',
      Brand: '',
      Make: '',
      VehiclesOfUseID: 0,
      ManufucturerID: 0,
      SuppliersID: '',
      fxCost: '',
      CurrencyID: 1,
      SPCurrencyID: 1,
      fxRate: 1,
      ConverseRate: 0,
      OverheadBasis: 1,
      OverheadCost: 0,
      Margin: 0,
      BasisQuantity: 0,
      ManufactureDate: new Date(),
      ExpiryDate: new Date(),
      isMedicine: false,
      MedicineTypeID: 1,
      isLabTest: false,
      DepartmentID: 1,
      isVehicle: false,
      Issued: true,
      EngineNo: '',
      GKNo: '',
      VehicleCode: '',
      VehicleTypeID: '0',
      SalePriceType: '%',
    };

    if (!this.item) {
      this.itemService
        .create(data)
        .pipe(first())
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              detail: 'Item Saved',
            });
            this.ref.close();
          },
          error: (error: any) => {
            this.messageService.add({
              severity: 'error',
              detail: error,
              // detail: 'Could not create item!',
            });
            this.submitting = false;
          },
        });
    }
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.itemId = event.target.value;

    this.itemService
      .getTypeById(Number(this.itemId))
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
        this.itemForm.patchValue({ PurchaseDesc: res.Description });
      });
  }

  getItemTypes() {
    return this.itemService
      .itemTypes$()
      .pipe(first())
      .subscribe((res) => {
        this.itemTypes = res.data;
      });
  }

  getPaymentMethods() {
    return this.accountService
      .paymentMethods$()
      .pipe(first())
      .subscribe((res) => {
        this.paymentMethods = res.data;
      });
  }

  closeDialog() {
    this.ref.close();
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
