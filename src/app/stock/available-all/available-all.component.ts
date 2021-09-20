import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../item';

@Component({
  selector: 'app-available-all',
  templateUrl: './available-all.component.html',
  styleUrls: ['./available-all.component.scss']
})
export class AvailableAllComponent implements OnInit {
  stock: Item[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.stock = data.stock;
      this.stock = this.stock.filter(i => i.available && i.format === 'vinyl');
      this.stock.sort((a,b) => (a.artist > b.artist) ? 1 : ((b.artist > a.artist) ? -1 : 0));
    });
  }

}
