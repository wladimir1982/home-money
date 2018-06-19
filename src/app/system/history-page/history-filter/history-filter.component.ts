import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'svv-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

  @Input() categories: Category[] = [];
  @Output() oFilterCancel = new EventEmitter<any>();
  @Output() oFilterApply = new EventEmitter<any>();


  // @Output() onFilterCancel = new EventEmitter<any>();
  // @Output() onFilterApply = new EventEmitter<any>();

  // @Input() categories: Category[] = [];

  public selectedPeriod = 'd';
  public selectedTypes = [];
  public selectedCategories = [];
  public timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];
  public types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  closeFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.oFilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter() {
    this.oFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

}











