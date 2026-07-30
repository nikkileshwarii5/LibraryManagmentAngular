import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Features } from '../features/features';
import { Stats } from '../stats/stats';
import { Testimonals } from '../testimonals/testimonals';
import { Footer } from '../footer/footer';
@Component({
  selector: 'app-home',
  imports: [Hero,Features,Stats,Testimonals,Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
