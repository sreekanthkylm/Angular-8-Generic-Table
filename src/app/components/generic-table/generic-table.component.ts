import { Component, OnInit, } from '@angular/core';
import { SearchFilterPipe } from '../../shared/pipes/search-filter.pipe';
import { SortFilterPipe } from '../../shared/pipes/sort-filter.pipe';
import { PagerService } from '../../shared/services/pager.services';
import { DataService } from '../../shared/services/data.services';
import { PaginationComponent } from '../pagination/pagination.component';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})

export class GenericTableComponent implements OnInit {
  visibleList: any;
  filterKeys: any = {};
  sorkKey: string;
  isAsc: boolean;
  TotalCount: number;
  page: number = 1;
  pageSize: Array<number> = [5, 10, 25, 50, 100];
  ItemsPerPage = 25;
  count: number = 0;
  pager: any = {};
  leftColspan: number;
  rightColspan: number;
  loading: boolean = false;
  data:any;
  

  constructor(private searchFilter: SearchFilterPipe, private sortFilter: SortFilterPipe,
     private pagerService: PagerService,private dataService:DataService) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData(){
    let data=this.dataService.getCousres().subscribe((data) => {
      this.data=data;
      this.generateTableData();
    })
  }

  generateTableData(){
    for (let [key, value] of Object.entries(this.data[0])) {
      this.filterKeys[key] = '';
    }
    this.visibleList = this.searchFilter.transform(this.data, this.filterKeys);
    this.count = this.visibleList.length;
    this.TotalCount = this.data.length;
    this.setHeader();
  }

  setHeader() {
    let columncount = Object.keys(this.filterKeys).length;
    this.leftColspan = (columncount) % 2 == 0 ? (columncount) / 2 : Math.floor(columncount / 2);
    this.rightColspan = (columncount) % 2 == 0 ? (columncount) / 2 : Math.round(columncount / 2);
  }

  sortNull() {}

  search(value, item) {
    this.filterKeys[item] = value;
    this.visibleList = this.searchFilter.transform(this.data, this.filterKeys);
    this.count = this.visibleList.length;
  }

  sort(key: string) {
    this.isAsc = !this.isAsc
    this.sorkKey = key;
    this.visibleList = this.sortFilter.transform(this.visibleList, this.sorkKey, this.isAsc);
  }

  changePageSize(item) {
    this.ItemsPerPage = item;
    //page set to 1st page
    this.pager = this.pagerService.getPager(this.data.length, 1, this.ItemsPerPage, 5);
    this.visibleList = this.data.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  changePagination(pager) {
    this.pager = pager;
    this.visibleList = this.data.slice(pager.startIndex, pager.endIndex + 1);
  }

}
