import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[isChicken]'
})
export class IsChickenDirective implements OnInit {

    constructor(
        private templateRef: TemplateRef<any>, // templateRef будет содержать содержимое нашего ng-template
        private viewContainer: ViewContainerRef // второй параметр будет ссылаться на весь ng-template элемент
    ) { }

    @Input() // если с сеттером сложно, можно пойти более простым путем
    isChicken: string = ''; 
    ngOnInit() {
        if (this.isChicken.toLowerCase().includes('кур')) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        } 
    }

    // @Input()
    // set isChicken(description: string) {
    //     if (description.toLowerCase().includes('кур')) {
    //         this.viewContainer.createEmbeddedView(this.templateRef);
    //     } else {
    //         this.viewContainer.clear();
    //     }
    // }
}

// Создали структурную директиву, которая отображает карточку продукта, если в его описании есть 'кур'

// Зачем создавать директиву, если все можно сделать в самом компоненте?
// 2 аспекта: 
// 1. Директиву можно использовать повторно и применять к любому элементу
// 2. Вынести часть логики из компонента, чтобы разгрузить его