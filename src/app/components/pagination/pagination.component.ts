import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { PagerService } from '../../shared/services/pager.services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pager: any = {};
  @Input() ItemsPerPage: number;
  @Input() data: any ;

  @Output() pagerChange = new EventEmitter();

  constructor(private pagerService: PagerService) { }

  ngOnInit() {
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.data.length, page, this.ItemsPerPage, 5);
    this.pagerChange.emit(this.pager);
  }

}
