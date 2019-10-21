import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFilterPipe } from './shared/pipes/search-filter.pipe';
import { SortFilterPipe } from './shared/pipes/sort-filter.pipe';
import { PagerService } from './shared/services/pager.services';
import { DataService } from'./shared/services/data.services';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent, SearchFilterPipe, SortFilterPipe, GenericTableComponent, PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [SearchFilterPipe, SortFilterPipe, PagerService,DataService],
  exports: [SearchFilterPipe, SortFilterPipe,PaginationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
