import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  constructor(private readonly http: HttpClient) {}

  checkIfAddedToFavorite(photo: IMarsImagePhotoDto): boolean {
    return this.favoritePhotos.includes(photo);
  }

  getImages({
    page = 1,
    earthDate = this.#todayFormatted,
  }): HttpMarsImagesDto {
    const params = `earth_date=${earthDate}&page=${page}&api_key=${
      this.#apiKey
    }`;

    return this.http
      .get<IMarsImagesDto>(`${this.#hostUrl}${this.#apiUrl}?${params}`, {
        observe: 'response',
      })
      .pipe(
        tap(
          // En cas de réponse normale, on ne garde pas l'historique
          () => {},
          // Utiliser le localstorage pour stocker les modifications de favoris
          (error: unknown) => {
            console.error('HTTP ERROR | ' + error);
          },
        ),
      );
  }

  dateToStringInApiFormat(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    console.warn(year, month, day);
    return `${year}-${month}-${day}`;
  }
}
