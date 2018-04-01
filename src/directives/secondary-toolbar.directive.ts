import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

const MIN_TOP = 0;
const MAX_TOP = 64;

@Directive({
  selector: '[appSecondaryToolbar]'
})
export class SecondaryToolbarDirective {

  constructor() { }

  @HostBinding('style.position') position = 'fixed';
  @HostBinding('style.top') top = `${MAX_TOP}px`;
  @HostBinding('style.left') left = '0';
  @HostBinding('style.visibility') visibility = 'visible';

  private prevScroll = 0;
  private currTop = MAX_TOP;

  @HostListener('window:scroll', []) onScroll(): void {
    this.currTop += this.prevScroll - window.scrollY;

    if (this.currTop <= MIN_TOP) {
      this.visibility = 'hidden';
      this.currTop = MIN_TOP;

    } else {
      this.visibility = 'visible';
      if (this.currTop > MAX_TOP) {
        this.currTop = MAX_TOP;
      }
    }
    this.top = `${this.currTop}px`;
    this.prevScroll = window.scrollY;
  }
}
