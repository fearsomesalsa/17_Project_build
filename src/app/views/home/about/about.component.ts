import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../../shared/components/popup/popup.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  constructor(private modalService: NgbModal) {}

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;
  ngAfterViewInit(): void {
    // const modalRef = this.modalService.open(PopupComponent);
    // modalRef.componentInstance.data = 'About component';

    this.popupComponent.open();
  }
}
