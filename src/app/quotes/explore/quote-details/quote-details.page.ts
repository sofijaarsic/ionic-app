import {Component, OnDestroy, OnInit} from '@angular/core';
import {Quote} from "../../quote.model";
import {ActivatedRoute} from "@angular/router";
import {QuotesService} from "../../quotes.service";
import {LoadingController, ModalController, NavController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {QuoteModalComponent} from "../../quote-modal/quote-modal.component";

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.page.html',
  styleUrls: ['./quote-details.page.scss'],
})
export class QuoteDetailsPage implements OnInit, OnDestroy {
  quote: Quote = {id: 'q3', text: 'Novi', userId: 'xxx', author: 'Text', imageUrl:''}
  isLoading: boolean = false;
  private quoteSub: Subscription;
  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private quotesService: QuotesService, private loadingCtrl: LoadingController, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      // this.quote = this.quotesService.getQuote(paramMap.get('quoteId'));
      if (!paramMap.has("quoteId")) {
        this.navCtrl.navigateBack("/quotes/tabs/explore");
        return;
      }

      this.isLoading = true;
      this.quoteSub = this.quotesService.getQuote(paramMap.get('quoteId')).subscribe(
        (quote) => {
          this.quote = quote;
          this.isLoading = false;
        }
      )
    })
  }

  //TODO dodati alert koji pita korisnika da li je siguran da hoce da obrise citat
  async onDeleteQuote() {
    const loading = await this.loadingCtrl.create({message: 'Deleting...'});
    await loading.present();

    this.quotesService.deleteQuote(this.quote.id).subscribe(async () => {
      await loading.dismiss();
      this.navCtrl.navigateBack('/quotes/tabs/explore');
    });
  }

  async onEditQuote() {
    const modal = await this.modalCtrl.create({
      component: QuoteModalComponent,
      componentProps: {title: 'Edit quote', author: this.quote.author, text: this.quote.text}
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.quotesService
        .editQuote(
          this.quote.id,
          data.quoteData.author,
          data.quoteData.text,
          this.quote.imageUrl,
          this.quote.userId)
        .subscribe((res) => {
          this.quote.text = data.quoteData.text;
          this.quote.author = data.quoteData.author;
        });
    }
  }
  ngOnDestroy() {
    if (this.quoteSub) {
      this.quoteSub.unsubscribe();
    }
  }

}
