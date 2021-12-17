import { Component, OnInit, Input } from '@angular/core';

import { IMarsImagePhotoDto } from '@shared/models/mars-images-dto.model';

@Component({
  selector: 'app-thumbnail-view',
  templateUrl: './thumbnail-view.component.html',
  styleUrls: ['./thumbnail-view.component.scss'],
})
export class ThumbnailViewComponent implements OnInit {
  @Input() photos: IMarsImagePhotoDto[] = [];
  @Input() emptyMessage = "Aucune photo n'a été trouvé pour cette date.";

  get isEmpty(): boolean {
    return this.photos.length <= 0;
  }

  ngOnInit(): void {}
}
