import { Component, OnInit } from '@angular/core';

import {
  IMarsImagePhotoDto,
  IMarsImagesDto,
} from '@shared/models/mars-images-dto.model';

import { MarsImagesService } from '../mars-images.service';

@Component({
  selector: 'app-today-pictures-gallery',
  templateUrl: './pictures-by-day-gallery.component.html',
  styleUrls: ['./pictures-by-day-gallery.component.scss'],
})
export class PicturesByDayGalleryComponent implements OnInit {
  readonly today = new Date();
  selectedDate = this.today;
  photos: IMarsImagePhotoDto[] = [];

  constructor(private readonly marsImagesService: MarsImagesService) {}

  ngOnInit(): void {
    this.fetchPhotosPerPage();
  }

  fetchPhotosPerPage(page = 1): void {
    // formatted `selectedDate` for api param
    const earthDate = this.marsImagesService.dateToStringInApiFormat(
      this.selectedDate,
    );

    this.marsImagesService
      .getImages({ page, earthDate })
      .subscribe((dto: IMarsImagesDto) => {
        if (dto) this.photos = dto.photos;
        else console.error('dto null');
      });
  }
}
