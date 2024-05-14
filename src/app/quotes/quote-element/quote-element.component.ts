import {Component, Input, OnInit} from '@angular/core';
import {Quote} from "../quote.model";

@Component({
  selector: 'app-quote-element',
  templateUrl: './quote-element.component.html',
  styleUrls: ['./quote-element.component.scss'],
})
export class QuoteElementComponent  implements OnInit {

  @Input() quote: Quote = {id: 'q3', text: 'Novi', userId: 'xxx', author: 'Text', imageUrl:''};
  constructor() { }

  ngOnInit() {}

}
