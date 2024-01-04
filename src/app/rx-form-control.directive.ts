import {ChangeDetectorRef, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Directive({
  selector: '[rx-form-control]',
  standalone: true
})
export class RxFormControlDirective {
  @Input() control: FormControl<string|null>|null = null;
  wasValid = true;

  constructor(private cdRef: ChangeDetectorRef) { }

  @HostListener('input') public input() {
    if(this.control && this.wasValid !== this.control.valid){
      this.wasValid = !!this.wasValid;
      this.cdRef.detectChanges();
    }
  }
}
