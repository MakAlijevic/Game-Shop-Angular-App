import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './shared/card/card.component';
import { MinBannerComponent } from './min-banner/min-banner.component';
import { MaxBannerComponent } from './max-banner/max-banner.component';
import { CategoryCardComponent } from './main-page/category-card/category-card.component';
import { MidBannerComponent } from './mid-banner/mid-banner.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { GenresPageComponent } from './genres-page/genres-page.component';
import { ProductDetailsModalComponent } from './shared/product-details-modal/product-details-modal.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { CheckoutModalComponent } from './checkout-modal/checkout-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainPageComponent,
    CardComponent,
    MinBannerComponent,
    MaxBannerComponent,
    CategoryCardComponent,
    MidBannerComponent,
    SearchPageComponent,
    GenresPageComponent,
    ProductDetailsModalComponent,
    CartModalComponent,
    CheckoutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
