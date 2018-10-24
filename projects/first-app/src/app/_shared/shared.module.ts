import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KitModule } from '@first-app-shared/kit.module';
import { LoadingComponent } from '@first-app-shared/loading/loading.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, KitModule],
  declarations: [LoadingComponent],
  exports: [CommonModule, FormsModule, KitModule, LoadingComponent]
})
export class SharedModule {}
