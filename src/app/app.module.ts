import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ResizeService } from './shared/services/resize.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PicturesByDayGalleryComponent } from './pages/pictures-by-day-gallery/pictures-by-day-gallery.component';
import { UserPicturesGalleryComponent } from './pages/user-pictures-gallery/user-pictures-gallery.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ErrorComponent } from './pages/error/error.component';
import { ThumbnailViewComponent } from './components/thumbnail-view/thumbnail-view.component';
import { ThumbnailItemComponent } from './components/thumbnail-item/thumbnail-item.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    PicturesByDayGalleryComponent,
    UserPicturesGalleryComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    ThumbnailViewComponent,
    ThumbnailItemComponent,
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [ResizeService, MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
