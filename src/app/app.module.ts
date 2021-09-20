import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockComponent } from './stock/stock.component';
import { FormatFilterComponent } from './stock/format-filter/format-filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { StockService } from './stock/stock-service';
import { SettingsService } from './settings.service';
import { RecentlyUpdatedComponent } from './stock/recently-updated/recently-updated.component';
import { AvailableAllComponent } from './stock/available-all/available-all.component';
import { AvailableColorComponent } from './stock/available-color/available-color.component';
import { StockContainerComponent } from './stock/stock-container/stock-container.component';

export function stockFactory(provider: StockService) {
  return () => provider.loadStock();
}

export function settingFactory(provider: SettingsService) {
  return () => provider.loadSettings();
}

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    FormatFilterComponent,
    FooterComponent,
    RecentlyUpdatedComponent,
    AvailableAllComponent,
    AvailableColorComponent,
    StockContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: stockFactory, deps: [StockService], multi: true },
    { provide: APP_INITIALIZER, useFactory: settingFactory, deps: [SettingsService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
