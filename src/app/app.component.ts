import { Component } from '@angular/core';
//import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AdminUI';
  //public modalRef: BsModalRef;
  public showButton = true;

  constructor() {} //private modalService: BsModalService,

  hideButton() {
    if (window.location.pathname.indexOf('/owner/owners') != -1) {
      return false;
    }
    return true;
  }

  // public openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template); // {3}
  // }
}
