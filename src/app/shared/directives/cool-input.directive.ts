import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[coolInput]'
})
export class CoolInputDirective implements OnInit {

  @Input() coolInputDefaultBgColor: string = 'white';
  @Input() coolInputFocusBgColor: string = 'orange';  

  constructor(private el: ElementRef, // если мы принимаем элемент, к которому применена директива в конструктор, то должна быть возможность использовать этот элемент в других методах. 
              private rend: Renderer2) { // чтобы подключить класс Renderer2 в нашей директиве, так же можно его заинжектить в конструктор (проверить импорт).
    // Можно создать отдельную переменную - свойство класса и присвоить ее в конструкторе. 
    // Но можно проще - добавить модицифкатор, который сразу создаст соотв. свойство в классе.
    // обычно используют модицифкатор private, т.к. использовать вне класса то, что инжектим в класс, будет неправильно.
    // console.log(el.nativeElement.innerText); // внутри ElementRef находится свойство nativeElement, внутри которого обычная DOM нода. Через . можем обращаться к любым свойствам HTML элемента, напр. .innerText и т.д.
  }

  private _backgroundColor: string = '';
  @HostBinding('style.backgroundColor')
  get getBgColor() {
    return this._backgroundColor;
  }

  private _isOnFocus: boolean = false;
  @HostBinding('class.isOnFocus')
  get getIsOnFocus() {
    return this._isOnFocus;
  }

  @HostListener('focus')
  onFocus() {
    // this.rend.setStyle(this.el.nativeElement, 'background-color', 'orange'); // заменили на функцию
    // this.changleElementBgColor('orange');
    this.changleElementBgColor(this.coolInputFocusBgColor); // сделали через binding
    this._isOnFocus = true;
  }

  @HostListener('blur')
  onBlur() {
    // this.rend.setStyle(this.el.nativeElement, 'background-color', 'white'); // заменили на функцию
    // this.changleElementBgColor('white');
    this.changleElementBgColor(this.coolInputDefaultBgColor);
    this._isOnFocus = false;
  }

//   @HostListener('click', ['$event.target']) // можно ['$event'], ['$event', 'target']
//   onClick(target: HTMLElement) {
//     console.log(target);
//   }

  @HostListener('click', ['$event', '$event.target'])
  onClick(event: Event, target: HTMLElement) {
    console.log(event);
    console.log(target);
  }

  ngOnInit() {
    // this.rend.setStyle(this.el.nativeElement, 'background-color', 'yellow'); // заменили на функцию
    // this.changleElementBgColor('white');
    this.changleElementBgColor(this.coolInputDefaultBgColor); // сделали через binding
    this.rend.setAttribute(this.el.nativeElement, 'placeholder',this.el.nativeElement.getAttribute('placeholder') + '*'); // поменяем плейсхолдер инпута (добавим к текущему значению *)
    // this.el.nativeElement.style.backgroundColor = 'yellow'; // у инпута применился желтый цвет
    
    // Вставим после инпута текст '*Обязательно для заполнения'
    // const text = this.rend.createElement('span');
    // this.rend.setProperty(text, 'innerText', '*Обязательно для заполнения');
    // this.rend.setStyle(text, 'color', 'red');
    // this.rend.insertBefore(this.el.nativeElement.parentElement, text, this.rend.nextSibling(this.el.nativeElement)); // параметры - родитель; вставляемый элемент; элемент, перед которым должен вставиться элемент 
    }

    changleElementBgColor(color: string) { // т.к. замена цвета фона встречается уже 3 раза, создадим функцию
        // this.rend.setStyle(this.el.nativeElement,'background-color', color);
        this._backgroundColor = color;
    }
}

// Директива - это сущность в Angular, которая является классом, добавляющим какое-то поведение для элементов
// @Directive({
// selector: '[test]'
// })

// В Angular существует 3 типа директив:
// 1. Компоненты
// Любой компонент - это директива. Единственно отличие компонента от директивы в том, что компонент использует декоратор @Component, а не @Directive, и за счет этого мы можем использовать в компонентах шаблоны.
// Т.е. компонент - это директива с шаблоном. Компонент расширяет директиву, а у самих директив нет шаблона.

// 2. Атрибутные директивы
// Используются в качестве атрибута для элемента.
// Например, есть элемент с определенным поведением, мы можем добавить к нему определенную директиву, и поведение у этого элемента будет уже другое. Мы это пробовали, используя встроенные директивы ngModel, ng Class,..

// 3. Структурные директивы
// Изменяют структуру DOM (добавление/удаление элементов). Мы уже использовали встроенные директивы ngFor и ngIf, и по факту они тоже работают с изменением стандартного поведения тех элементов, к которым применяются. Но отличие атрибутных в том, что они занимаются работой не с самим элементом, а с DOM-узлами посредством добавления или удаления элементов.

// По другой классификации директивы бывают:
// 1. Встроенные 
// Присутствуют в Angular "из коробки" (NgIf, NgModel, NgFor, NgSwitch)

// 2. Кастомные
// Созданные самостоятельно

// Попробуем создать свои директивы
// 1. Атрибутная директива задается с помощью атрибута для элемента/компонента
// <component myDirective></component>

// Класс Rendered 2
// Часто в директивах Angular используют класс Renderer2 - класс Angular для работы с DOM.
// Используя стандартный подход, мы работаем с DOM-элементами напрямую. А класс Renderer2 позволяет управлять элементами, не взаимодействуя с DOM напрямую.
// В большинстве веб-приложений в нем нет необходимости. Но бывают случаи, когда приложения могут существовать в другой среде (т.е. не в браузере, а например в на мобильном устройстве).
// Чтобы его подключить в нашей директиве, так же можно его заинжектить в конструктор.


// @HostListener
// Кроме простой работы с элементом, установки значений атрибутная директива может взаимодействовать с действиями пользователя. Для этого применяется декоратор @HostListener к функции, которая будет служить обработчиком соотвю события (напр., по клику, при наведении мыши, при нажатии клавиш на клавиатуре)
// Позволяет задать функцию-обработчик для события элемента
// @HostListener('click')
// onClick() {
// //...
// }

// Если мы хотим использовать с событиями какие-то данные события, напр. мы знаем, что когда событие возникает, то всегда по умолчанию там есть объект event, у которого можно взять event.target (где находится текущий элемент).
// Мы можем это использовать и здесь вторым параметром в @HostListener
// @HostListener('click', [$event.target])
// onClick(target: HTMLElement) {
//     // use target
// }

// В директиву, как и в компонент, мы можем передавать значения. Для этого используется тот же декоратор @Input.
// Допустим при использовании директивы мы хотим что-то еще указывать, чтобы директива учитывала какое-то наше определенное значение.
// Лучше использовать такие названия атрибутов, чтобы при первом взгляде на них было понятно, что они относятя не к компоненту, а именно к этой директиве.
// <div class="main-action" myDirective [str]="test"> // тут лучше вместо str задать myDirectiveStr 
// @Directive({
//     selector: '[myDirective]'
// })
// export class MyDirective {
//     @Input() str: string = ''; // тут лучше вместо str задать myDirectiveStr
// }


// Декоратор @HostBinding
// Позволяет привязать свойство класса к определенному свойству DOM-элемента
// private _color = '';
// @HostBinding('style.color')
// get getColor() {
// return this._color;
// }


