import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from './error-message.component';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [ErrorMessageComponent],
})
export class ErrorMessageModule {}
