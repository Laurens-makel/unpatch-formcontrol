import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LeadingCharacterDirective} from "./leading-character.directive";
import {RxUnpatch} from "@rx-angular/template/unpatch";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, LeadingCharacterDirective, RxUnpatch],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  form = new FormGroup({
    contractNumber: new FormControl(''),
    phoneNumber:    new FormControl(''),
  });

  constructor() {
    this.form.controls.contractNumber.valueChanges.subscribe((contractNumber) => console.log(`contractNumber: ${contractNumber}`))
    this.form.controls.phoneNumber.valueChanges.subscribe((phoneNumber) => console.log(`phoneNumber: ${phoneNumber}`))
  }

  ngAfterViewChecked() {
    console.log('Change Detection Cycle!');
  }

}
