import { Component, OnInit } from '@angular/core';

import { IMarsImagePhotoDto } from '@shared/models/mars-images-dto.model';

import { MarsImagesService } from '../mars-images.service';

@Component({
  selector: 'app-user-pictures-gallery',
  templateUrl: './user-pictures-gallery.component.html',
  styleUrls: ['./user-pictures-gallery.component.scss'],
})
export class UserPicturesGalleryComponent implements OnInit {
  readonly today = new Date();
  selectedDate = this.today;
  photos: IMarsImagePhotoDto[] = [];

  constructor(private readonly marsImagesService: MarsImagesService) {}

  ngOnInit(): void {
    this.photos = this.marsImagesService.favoritePhotos;
  }
}
