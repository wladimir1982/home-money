import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'svv-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  public dollar: number;
  public euro: number;

  constructor() { }

  ngOnInit() {
    const rates = this.currency;
    this.dollar = rates[2].buy * this.bill.value;
    this.euro = rates[0].buy * this.bill.value;
  }

}
