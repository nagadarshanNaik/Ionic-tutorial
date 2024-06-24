import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMessage: string = '';
  // @Input() field!: FormGroup;
  @Input() field!: AbstractControl<any> | null;

  @Input() errorType: string = ''
  constructor() {
    // this.field = new FormGroup({});
  }

  ngOnInit() {}

  showErrorMessage() {
    // ( loginForm.get('email')?.touched || loginForm.get('email')?.dirty) && loginForm.get('email')?.errors?.['required']
    if (
      (this.field?.touched || this.field?.dirty) &&
      this.field?.errors?.[this.errorType]
    ) {
      return true;
    }
    return false;
  }
}
