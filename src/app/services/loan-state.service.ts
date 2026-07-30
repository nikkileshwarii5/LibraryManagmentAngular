import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanBadgeService {

  private showBadgeSubject = new BehaviorSubject<boolean>(false);

  showBadge$ = this.showBadgeSubject.asObservable();

  setShowBadge(show: boolean) {
    this.showBadgeSubject.next(show);
  }
}