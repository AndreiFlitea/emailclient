import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [InputComponent, ModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, ModalComponent], //you need to export a component in order to use it in other parts of your application
})
export class SharedModule {}
