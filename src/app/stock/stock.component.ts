import { Component, OnInit, ViewChild } from '@angular/core';
import { FormatFilterComponent } from './format-filter/format-filter.component';
import { Item } from './item';
import { StockService } from './stock-service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  @ViewChild(FormatFilterComponent) formatFilter:FormatFilterComponent = {} as FormatFilterComponent;
  stock: Item[] = []
  lastUpdated: Date = new Date();
  page = 1;
  pageSize = 10;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getStock().subscribe(stock => this.stock = stock);
  }
}


