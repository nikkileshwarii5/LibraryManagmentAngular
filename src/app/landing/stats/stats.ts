import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../services/Dashboard.Service';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements OnInit,AfterViewInit {

constructor(
  private dashboardService: DashboardService,private cdr: ChangeDetectorRef,private ngZone: NgZone,
  @Inject(PLATFORM_ID) private platformId: Object
) {}



  stats = [

  {
    icon: 'menu_book',
    value: 10000,
    suffix: '+',
    label: 'Books Available',
    subTitle: 'Extensive digital & physical collection',
    color: 'text-primary',
    bgColor: 'bg-primary-subtle',
    borderColor: '#2563eb'
  },

  {
    icon: 'group',
    value: 5000,
    suffix: '+',
    label: 'Active Members',
    subTitle: 'Readers from across the community',
    color: 'text-success',
    bgColor: 'bg-success-subtle',
    borderColor: '#10b981'
  },

  {
    icon: 'emoji_events',
    value: 50,
    suffix: '+',
    label: 'Awards Received',
    subTitle: 'Recognized for innovation & excellence',
    color: 'text-warning',
    bgColor: 'bg-warning-subtle',
    borderColor: '#f59e0b'
  },

  {
    icon: 'trending_up',
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    subTitle: 'Trusted by thousands of readers',
    color: 'text-danger',
    bgColor: 'bg-danger-subtle',
    borderColor: '#ef4444'
  }

];

  counts: number[] = [0, 0, 0, 0];
  hasAnimated: boolean[] = [false, false, false, false];




ngOnInit(): void {

  this.dashboardService.getHomeStats().subscribe({

    next: (res: any) => {

      this.stats[0].value = res.books;
      this.stats[1].value = res.members;
      this.stats[2].value = res.awards;
      this.stats[3].value = res.satisfaction;

      this.cdr.detectChanges();

      // Start animation after values are loaded
      this.startCounterAnimation();

    },

    error: (err) => {
      console.error(err);
    }

  });

}

  ngAfterViewInit() { } 

  

private startCounterAnimation() {

  console.log("Animation started");

  this.stats.forEach((stat, index) => {

    console.log("Target:", stat.value);

    const duration = 3000;
    const steps = 60;
    const increment = stat.value / steps;

    let current = 0;

    this.counts[index] = 0;

 const timer = setInterval(() => {

  this.ngZone.run(() => {

    current += increment;

    if (current >= stat.value) {

      this.counts[index] = stat.value;
      clearInterval(timer);

    } else {

      this.counts[index] = Math.floor(current);

    }

    this.cdr.detectChanges();

  });

}, duration / steps);
  });

}

}