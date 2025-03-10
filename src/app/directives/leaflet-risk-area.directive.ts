import { Directive, inject, input, OnDestroy, signal } from '@angular/core';

import * as L from 'leaflet';
import { LeafletDirective } from './leaflet.directive';
import { RiskArea } from '@models/risk-areas.model';

@Directive({
  selector: '[leaflet-risk-area]',
  standalone: true,
  host: {
    class: 'leaflet_shape',
  },
})
export class LeafletRiskAreaDirective implements OnDestroy {
  private readonly leafletDirective = inject(LeafletDirective, { host: true });
  // private readonly shapeService = inject(ShapeService);
  readonly riskArea = input.required<RiskArea>();
  readonly index = input.required<number>();
  private readonly layer = signal<L.GeoJSON | null>(null);

  ngOnInit() {
    // Adiciona o Layer (Shape)
    this.layer.set(
      L.geoJSON(this.riskArea() as GeoJSON.GeoJsonObject, {
        style: { className: 'leaflet_risk_area_layer' },
      }).addTo(this.leafletDirective.map)
    );

    // Adiciona o Tooltip do Layer (Shape)
    this.layer()!.bindTooltip(
      `
      <h2><strong>Area de Risco</strong></h2>
      <h2>Local: <strong>${this.riskArea().properties.LOCAL}</strong></h2>
      `,
      {
        className: 'leaflet-risk-area-tooltip',
      }
    );
  }

  ngOnDestroy() {
    this.leafletDirective.map.removeLayer(this.layer()!);
  }
}
