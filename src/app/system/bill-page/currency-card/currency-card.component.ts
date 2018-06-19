import {Component, Input} from '@angular/core';

@Component({
  selector: 'svv-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {

  @Input() currency: any;

  public date: Date = new Date();


}
