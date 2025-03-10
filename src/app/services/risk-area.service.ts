import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { RiskArea } from '@models/risk-areas.model';

@Injectable({
  providedIn: 'root',
})
export class RiskAreaService {
  private readonly http = inject(HttpClient);
  private readonly path = environment.RiskAreaApiUrl;

  getRiskAreas() {
    return this.http.get<RiskArea[]>(this.path);
  }
}
