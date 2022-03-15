import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/settings.service';
import { Item } from '../item';
import { StockService } from '../stock-service';

@Component({
  selector: 'app-recently-updated',
  templateUrl: './recently-updated.component.html',
  styleUrls: ['./recently-updated.component.scss']
})
export class RecentlyUpdatedComponent implements OnInit {
  lastUpdated: Date = new Date();
  vinylOnly: boolean = true;
  recentlyUpdatedStock: Item[] = [];

  constructor(private stockService: StockService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.settings.subscribe(settings => {
      const strUpdated = settings.find(s => s.key === 'LastUpdated')?.value;

      if (strUpdated) {
        this.lastUpdated = new Date(strUpdated);
      }
    });

    this.stockService.getRecentlyUpdatedStock().subscribe(stock => {
      this.recentlyUpdatedStock = stock;
    });
  }

}
