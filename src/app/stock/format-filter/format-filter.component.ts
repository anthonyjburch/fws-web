import { Component } from '@angular/core';
import { StockService } from '../stock-service';
import { StockFilter } from '../stockFilter';

@Component({
  selector: 'app-format-filter',
  templateUrl: './format-filter.component.html',
  styleUrls: ['./format-filter.component.scss']
})
export class FormatFilterComponent {
  stockFilter: StockFilter;

  constructor(private stockService: StockService) {
    this.stockFilter = stockService.stockFilter;
    this.onChange();
  }

  onChange(): void {
    this.stockService.filterStock(this.stockFilter);
  }
}
