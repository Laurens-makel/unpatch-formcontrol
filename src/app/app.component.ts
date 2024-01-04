import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {LeadingCharacterDirective} from "./leading-character.directive";
import {RxUnpatch} from "@rx-angular/template/unpatch";
import {RxFormControlDirective} from "./rx-form-control.directive";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, LeadingCharacterDirective, RxUnpatch, RxFormControlDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  allEvents = [
    'scroll',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'load',
    'pointerup',
    'change',
    'blur',
    'focus',
    'click',
    'contextmenu',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'input',
  ]
  allEventsExceptBlur =  this.allEvents.filter(e => e !== 'blur');
  allEventsExceptInput =  this.allEvents.filter(e => e !== 'input');

  form = new FormGroup({
    contractNumber: new FormControl('', [Validators.required]),
    phoneNumber:    new FormControl('', [Validators.required]),
  });

  constructor() {
    this.form.controls.contractNumber.valueChanges.subscribe((contractNumber) => console.log(`contractNumber: ${contractNumber}`))
    this.form.controls.phoneNumber.valueChanges.subscribe((phoneNumber) => console.log(`phoneNumber: ${phoneNumber}`))
  }

  ngAfterViewChecked() {
    console.log('Change Detection Cycle!');
  }

}
