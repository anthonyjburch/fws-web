import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Setting } from './setting';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private data = new BehaviorSubject<Setting[]>([]);
  settings = this.data.asObservable();

  constructor(private http: HttpClient) { }

  loadSettings(): void {
    this.http.get<Setting[]>('../assets/settings.json').subscribe(settings => {
      this.updateSettings(settings);
    });
  }

  updateSettings(settings: Setting[]): void {
    this.data.next(settings);
  }
}

