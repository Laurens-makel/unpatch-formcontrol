import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

@Directive({
  selector: '[leadingCharacter]',
  standalone: true,
})
export class LeadingCharacterDirective {
  @Input() leadingCharacter = '0';
  @Input() leadingLength = 1;
  @Input() control: FormControl<string|null>|null = null;

  private lastAddedAmount = 0;
  private currentlyPadded = false;
  private currentlyFocussed = false;

  constructor(public element: ElementRef) { }

  @HostListener('focus') public focus() {
    this.currentlyFocussed = true;
    this.unPad();
  }
  @HostListener('blur') public blur() {
    this.currentlyFocussed = false;
    this.pad();
  }

  @HostListener('mouseenter') public mouseenter() {
    this.unPad();
  }
  @HostListener('mouseleave') public mouseleave() {
    this.pad();
  }

  private pad() {
    if (!this.currentlyFocussed && !this.currentlyPadded) {
      this.currentlyPadded = true;
      const inputElement = this.element.nativeElement as HTMLInputElement;
      const value = inputElement.value;
      if (value.length !== 0) {
        this.lastAddedAmount = Math.max(this.leadingLength - value.length, 0);
        this.control?.setValue(value.padStart(this.leadingLength, this.leadingCharacter));
      }
    }
  }

  private unPad() {
    if (this.currentlyPadded) {
      this.currentlyPadded = false;
      const inputElement = this.element.nativeElement as HTMLInputElement;
      const value = inputElement.value;
      if (value.length !== 0) {
        const leadingString = new RegExp(`^(?:${this.leadingCharacter})+`).exec(value);
        const next = value.substring(leadingString ? Math.min(leadingString[0].length, this.lastAddedAmount) : 0);
        this.control?.setValue(next);
      }
    }
  }
}
