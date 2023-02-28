import { Component } from '@angular/core';

@Component({
  selector: 'app-receive-refund',
  templateUrl: './receive-refund.component.html',
  styleUrls: ['./receive-refund.component.css'],
})
export class ReceiveRefundComponent {
  // blockedPanel: boolean = false;
  blockedPanel: boolean = true;

  // blockedDocument: boolean = false;
  blockedDocument: boolean = true;

  blockDocument() {
    this.blockedDocument = true;
    setTimeout(() => {
      this.blockedDocument = false;
    }, 3000);
  }
}
