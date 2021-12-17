interface IMarsImagePhotoCameraDto {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

interface IMarsImagePhotoRoverDto {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

export interface IMarsImagePhotoDto {
  id: number;
  sol: number;
  camera: IMarsImagePhotoCameraDto;
  img_src: string;
  earth_date: string;
  rover: IMarsImagePhotoRoverDto;
}

export interface IMarsImagesDto {
  photos: IMarsImagePhotoDto[];
}
