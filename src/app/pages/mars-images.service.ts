import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../shared/local-storage.service';

import {
  IMarsImagePhotoDto,
  IMarsImagesDto,
} from '@shared/models/mars-images-dto.model';

type HttpMarsImagesDto = Observable<HttpResponse<IMarsImagesDto>>;

@Injectable({
  providedIn: 'root',
})
export class MarsImagesService {
  readonly #hostUrl = 'https://api.nasa.gov';
  readonly #apiUrl = '/mars-photos/api/v1/rovers/curiosity/photos';
  readonly #apiKey = 'r3x72x8gOvw0yqkDmrjqHu10JWItLGovv4P1Xdg8';

  readonly #todayFormatted = this.dateToStringInApiFormat(new Date());

  favoritePhotos: IMarsImagePhotoDto[] = [];

  readonly key = 'favoritePhotos';

  constructor(
    private readonly http: HttpClient,
    private readonly lsService: LocalStorageService,
  ) {
    this.#initLS();
  }

  #initLS(): void {
    // récupère les photos, pouvant etre undefined
    const photos = this.lsService.getItem<IMarsImagePhotoDto[]>(this.key);
    // si déjà existant, on l'assigne
    if (photos) this.favoritePhotos = photos;
    // si inexistant, on le crée
    else this.lsService.setItem(this.key, []);
  }

  checkIfAddedToFavorite(photo: IMarsImagePhotoDto): boolean {
    const photos = this.lsService.getItem<IMarsImagePhotoDto[]>(this.key);
    const exists = photos?.find((_photo) => _photo.id === photo.id);
    if (exists) return true;
    return false;
  }

  getImages({
    page = 1,
    earthDate = this.#todayFormatted,
  }): HttpMarsImagesDto {
    const params = `earth_date=${earthDate}&page=${page}&api_key=${
      this.#apiKey
    }`;

    return this.http.get<IMarsImagesDto>(
      `${this.#hostUrl}${this.#apiUrl}?${params}`,
      {
        observe: 'response',
      },
    );
  }

  savePhoto(photo: IMarsImagePhotoDto): void {
    this.favoritePhotos.push(photo);
    this.lsService.setItem(this.key, this.favoritePhotos);
  }

  removePhoto(photoToRemove: IMarsImagePhotoDto): void {
    const photos = this.lsService.getItem<IMarsImagePhotoDto[]>(this.key);
    if (photos) {
      const newPhotos = photos.filter(
        (photo) => photo.id !== photoToRemove.id,
      );
      this.favoritePhotos = newPhotos;
      this.lsService.setItem(this.key, newPhotos);
    }
  }

  dateToStringInApiFormat(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return `${year}-${month}-${day}`;
  }
}
