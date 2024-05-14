import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave} from "@ionic/angular";

@Component({
  selector: 'app-fun-facts',
  templateUrl: './fun-facts.page.html',
  styleUrls: ['./fun-facts.page.scss'],
})
export class FunFactsPage implements OnInit, OnDestroy, ViewWillEnter, ViewWillLeave, ViewDidEnter, ViewDidLeave {

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

}
