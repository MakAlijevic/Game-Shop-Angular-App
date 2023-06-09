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
import { FormsModule } from '@angular/forms';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PurchaseModalComponent } from './purchase-modal/purchase-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegistrationModalComponent } from './registration-modal/registration-modal.component';
import { PurchaseCardComponent } from './purchase-card/purchase-card.component';

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
    CheckoutModalComponent,
    ProfilePageComponent,
    PurchaseModalComponent,
    LoginModalComponent,
    RegistrationModalComponent,
    PurchaseCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
