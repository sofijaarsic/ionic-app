import {Component, OnDestroy, OnInit} from '@angular/core';
import {Quote} from "../quote.model";
import {QuotesService} from "../quotes.service";
import {ModalController, ViewWillEnter} from "@ionic/angular";
import {QuoteModalComponent} from "../quote-modal/quote-modal.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, ViewWillEnter, OnDestroy {
  quotes: Quote[];
  quotesSub: Subscription;
  constructor(private quotesService: QuotesService, private modalCtrl: ModalController) {
   //this.quotes = this.quotesService.quotes;
  }
  ngOnInit() {
    this.quotesSub = this.quotesService.quotes.subscribe((quotes) => {
      this.quotes = quotes;
    })
  }
  ionViewWillEnter() {
    this.quotesService.getQuotes().subscribe();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: QuoteModalComponent,
      componentProps: {title: 'Add quote'}
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
      this.quotesService.addQuote(data.quoteData.author, data.quoteData.text)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
  ngOnDestroy() {
    if(this.quotesSub) {
      this.quotesSub.unsubscribe();
    }
  }
}
