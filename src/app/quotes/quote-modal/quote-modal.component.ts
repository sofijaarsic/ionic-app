import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-quote-modal',
  templateUrl: './quote-modal.component.html',
  styleUrls: ['./quote-modal.component.scss'],
})
export class QuoteModalComponent  implements OnInit {
  @ViewChild('f', {static: true}) form: NgForm;
  @Input() title: string;
  @Input() author: string;
  @Input() text: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }
  onAddQuote() {
    this.modalCtrl.dismiss(
      {
        quoteData: {
          author: this.form.value['author'],
          text: this.form.value['text']
        }
      },
      'confirm'
    );
  }

}
