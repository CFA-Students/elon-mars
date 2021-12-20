import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../shared/local-storage.service';

import {
  IMarsImagePhotoDto,
  IMarsImagesDto,
} from '@shared/models/mars-images-dto.model';

@Injectable({
  providedIn: 'root',
})
export class MarsImagesService {
  readonly #hostUrl = 'https://api.nasa.gov';
  readonly #apiUrl = '/mars-photos/api/v1/rovers/curiosity/photos';
  readonly #apiKey = 'r3x72x8gOvw0yqkDmrjqHu10JWItLGovv4P1Xdg8';

  readonly #lsKey = 'favoritePhotos';

  readonly #todayFormatted = this.dateToStringInApiFormat(new Date());

  get favoritePhotos(): IMarsImagePhotoDto[] {
    return this.lsService.getItem<IMarsImagePhotoDto[]>(this.#lsKey) ?? [];
  }

  constructor(
    private readonly http: HttpClient,
    private readonly lsService: LocalStorageService,
  ) {
    this.#initLS();
  }

  #initLS(): void {
    // récupère les photos, pouvant etre undefined
    const photos = this.lsService.getItem<IMarsImagePhotoDto[]>(
      this.#lsKey,
    );
    // si inexistant, on initialise
    if (!photos) this.lsService.setItem(this.#lsKey, []);
  }

  getImages({
    page = 1,
    earthDate = this.#todayFormatted,
  }): Observable<IMarsImagesDto> {
    const params = `earth_date=${earthDate}&page=${page}&api_key=${
      this.#apiKey
    }`;

    return this.http.get<IMarsImagesDto>(
      `${this.#hostUrl}${this.#apiUrl}?${params}`,
    );
  }

  checkIfAddedToFavorite(photoToCheck: IMarsImagePhotoDto): boolean {
    const photos = this.lsService.getItem<IMarsImagePhotoDto[]>(
      this.#lsKey,
    );
    const photo = photos?.find((photo) => photo.id === photoToCheck.id);
    if (photo) return true;
    return false;
  }

  savePhoto(photo: IMarsImagePhotoDto): void {
    const photos =
      this.lsService.getItem<IMarsImagePhotoDto[]>(this.#lsKey) ?? [];
    photos.push(photo);
    this.lsService.setItem(this.#lsKey, photos);
  }

  removePhoto(photoToRemove: IMarsImagePhotoDto): void {
    const photos = this.lsService.getItem<IMarsImagePhotoDto[]>(
      this.#lsKey,
    );

    if (!photos) return;

    const newPhotos = photos.filter(
      (photo) => photo.id !== photoToRemove.id,
    );
    this.lsService.setItem(this.#lsKey, newPhotos);
  }

  dateToStringInApiFormat(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return `${year}-${month}-${day}`;
  }
}
