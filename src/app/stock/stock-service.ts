import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from './item';
import { StockFilter } from './stockFilter';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private allStock: Item[] = [];
  private filteredStockSubject = new BehaviorSubject<Item[]>([]);
  private $stock = this.filteredStockSubject.asObservable();
  private recentlyUpdatedStockSubject = new BehaviorSubject<Item[]>([]);
  private $recentlyUpdatedStock = this.recentlyUpdatedStockSubject.asObservable();
  stockFilter: StockFilter;

  constructor(private http: HttpClient) {
    this.stockFilter = {
      searchTerm: '',
      availTrue: true,
      availFalse: false,
      vinyl: true,
      cassette: false,
      cd: false,
      dvd: false,
      digital: false,
      merch: false
    }
  }

  loadStock(): void {
    this.http.get<Item[]>('./assets/stock.json').subscribe(stock => {
      this.allStock = stock;
      this.filterStock(this.stockFilter);
      this.setRecentlyUpdatedStock();
    })
  }

  getStock(): Observable<Item[]> {
    return this.$stock;
  }

  filterStock(filter: StockFilter): void {
    let tempList: Item[] = this.allStock;

    if (!filter.availTrue) {
      tempList = tempList.filter(i => !i.available);
    }

    if (!filter.availFalse) {
      tempList = tempList.filter(i => i.available);
    }

    if (!filter.vinyl) {
      tempList = tempList.filter(i => i.format.toLowerCase() !== 'vinyl');
    }

    if (!filter.cassette) {
      tempList = tempList.filter(i => i.format.toLowerCase() !== 'cassette');
    }

    if (!filter.cd) {
      tempList = tempList.filter(i => i.format.toLowerCase() !== 'cd');
    }

    if (!filter.dvd) {
      tempList = tempList.filter(i => i.format.toLowerCase() !== 'dvd');
    }

    if (!filter.digital) {
      tempList = tempList.filter(i => i.format.toLowerCase() !== 'digital')
    }

    if (!filter.merch) {
      tempList = tempList.filter(i => i.format.toLowerCase() !== 'merch')
    }

    if (filter.searchTerm) {
      tempList = tempList.filter(i =>
        i.artist.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
        i.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
        i.format.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
        i.description.toLowerCase().includes(filter.searchTerm.toLowerCase())
      );
    }

    this.filteredStockSubject.next(tempList);
  }

  setRecentlyUpdatedStock(): void {
    let compareDate = new Date();
    compareDate.setDate(compareDate.getDate() - 7);

    this.recentlyUpdatedStockSubject.next(this.allStock.filter(i => new Date(i.dateUpdated) >= compareDate && i.available));
  }

  getRecentlyUpdatedStock(): Observable<Item[]> {
    return this.$recentlyUpdatedStock;
  }
}
