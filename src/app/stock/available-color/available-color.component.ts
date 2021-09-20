import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-available-color',
  templateUrl: './available-color.component.html',
  styleUrls: ['./available-color.component.scss']
})
export class AvailableColorComponent implements OnInit {
  stock: Item[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Item[]>('./assets/stock.json').subscribe(stock => {
      this.stock = stock;
      this.stock = this.stock.filter(i => i.available && i.format === 'vinyl');
      this.stock = this.stock.filter(i => i.title.toLowerCase().includes('color') || i.description.toLowerCase().includes('color'));
      this.stock.sort((a,b) => (a.artist > b.artist) ? 1 : ((b.artist > a.artist) ? -1 : 0));
    });
  }

}
