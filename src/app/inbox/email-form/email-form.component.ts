import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IndividualEmail } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  emailForm!: FormGroup;
  @Input() emailFormComp!: IndividualEmail; // we don`t have access tot this property in the constructor, only in NgOnInit
  @Output() emailEvent = new EventEmitter();
  constructor() {}

  ngOnInit() {
    const { subject, from, to, text } = this.emailFormComp;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) return;
    console.log(this.emailForm.value);

    this.emailEvent.emit(this.emailForm.value);
  }
}
