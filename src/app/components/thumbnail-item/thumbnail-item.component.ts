import { Component, Input, OnInit } from '@angular/core';

import { IMarsImagePhotoDto } from '@shared/models/mars-images-dto.model';

@Component({
  selector: 'app-thumbnail-item',
  templateUrl: './thumbnail-item.component.html',
  styleUrls: ['./thumbnail-item.component.scss'],
})
export class ThumbnailItemComponent implements OnInit {
  @Input() photo!: IMarsImagePhotoDto;

  get takenBy(): string {
    return `by ${this.photo.rover.name} with ${this.photo.camera.name} camera`;
  }

  get takenAt(): string {
    return `at ${this.photo.earth_date} (${this.photo.sol} sols)`;
  }

  ngOnInit(): void {}
}
