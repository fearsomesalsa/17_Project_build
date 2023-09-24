import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
})
export class PopupComponent {
  @Input() data: string = ''; // благодаря декоратору @Input() мы сможем передавать сюда значение при использовании этого компонента

  @ViewChild('popup') // 'popup' - это название той переменной, которую мы хотим использовать
  popup!: TemplateRef<ElementRef>; // получаем ng-template в переменную popup

  constructor(private modalService: NgbModal) {}

  open(): void {
    this.modalService.open(this.popup);
  }
}
