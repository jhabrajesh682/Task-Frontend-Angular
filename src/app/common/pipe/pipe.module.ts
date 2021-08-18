import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { ListfilterPipe } from './listfilter.pipe';

@NgModule({
  declarations: [SearchPipe,ListfilterPipe],
  exports: [SearchPipe, ListfilterPipe]

})
export class PipeModule { }
