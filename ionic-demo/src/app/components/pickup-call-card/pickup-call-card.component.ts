import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickup-call-card',
  templateUrl: './pickup-call-card.component.html',
  styleUrls: ['./pickup-call-card.component.scss'],
})
export class PickupCallCardComponent  implements OnInit {
  @Input() showFooter: boolean = false;
  @Input() showHeader: boolean = false;
  @Input() status: string = '';
  @Input() updateAt: string = '';
  @Input() createAt: string = '';
  @Input() notes: string = '';
  @Input() value: string = '';

  constructor() { }

  ngOnInit() {}

}
