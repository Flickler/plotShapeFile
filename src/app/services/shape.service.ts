import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { CreateAddress, CreateShape, Shape } from '@models/shape.model';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  private readonly http = inject(HttpClient);
  private readonly path = environment.apiUrl + '/shapes';
  private readonly dotnetPath = environment.dotnetApiUrl;

  getShapes() {
    return this.http.get<Shape[]>(this.path);
  }

  postAddress(address: CreateAddress) {
    return this.http.post<null>(this.dotnetPath + '/addresses', address);
  }

  postShape(shape: CreateShape) {
    return this.http.post<null>(this.dotnetPath + '/shapes', shape);
  }
}
