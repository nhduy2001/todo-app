import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostBinding('style.backgroundColor') bg = '';
  @HostListener('mouseenter') onEnter() {this.bg = '#fff3cd';}
  @HostListener('mouseleave') onLeave() {this.bg = '';}
}
