import {Component, OnDestroy, OnInit} from '@angular/core';
import {SVVEvent} from '../shared/models/event.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';

import {CategoriesService} from '../shared/services/categories.service';
import {Category} from '../shared/models/category.model';
import {EventsService} from '../shared/services/events.service';

@Component({
  selector: 'svv-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  public isLoaded = false;
  public categories: Category[] = [];
  public events: SVVEvent[] = [];
  public filteredEvents: SVVEvent[] = [];
  public charData = [];
  public sub1: Subscription;
  public isFilterVisible = false;

  constructor(private categoriesService: CategoriesService,
              private eventService: EventsService) { }

  ngOnInit() {
   this.sub1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], SVVEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.isLoaded = true;

      this.setOriginalEvents();
      this.calculateChartData();
    });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData(): void {
    this.charData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.charData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  public openFilter() {
    this.toggleFilterVisibility(true);
  }

  public onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  public onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
