import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import {QuoteElementComponent} from "../quote-element/quote-element.component";
import {QuoteModalComponent} from "../quote-modal/quote-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule
  ],
    declarations: [ExplorePage, QuoteElementComponent, QuoteModalComponent]
})
export class ExplorePageModule {}
