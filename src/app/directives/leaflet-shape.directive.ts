import { Directive, inject, input, OnDestroy, signal } from '@angular/core';

import * as L from 'leaflet';
import { LeafletDirective } from './leaflet.directive';
import { ShapeService } from '@services/shape.service';
import { Shape } from '@models/shape.model';

@Directive({
  selector: '[leaflet-shape]',
  standalone: true,
  host: {
    class: 'leaflet_shape',
  },
})
export class LeafletShapeDirective implements OnDestroy {
  private readonly leafletDirective = inject(LeafletDirective, { host: true });
  private readonly shapeService = inject(ShapeService);
  readonly shape = input.required<Shape>();
  readonly index = input.required<number>();
  private readonly layer = signal<L.GeoJSON | null>(null);

  ngOnInit() {
    this.layer.set(
      L.geoJSON(this.shape() as GeoJSON.GeoJsonObject, {
        style: { className: 'leaflet_shape_layer' },
      }).addTo(this.leafletDirective.map)
    );
    // if (this.shape().properties.id === '3200102') {
    //   this.shapeService
    //     .postShape({
    //       addressId: this.index() + 1,
    //       geometry: this.shape().geometry,
    //     })
    //     .subscribe();
    // }
  }

  ngOnDestroy() {
    this.leafletDirective.map.removeLayer(this.layer()!);
  }
}
