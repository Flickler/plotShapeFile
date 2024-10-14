import { Directive, ElementRef, inject, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Directive({
  selector: '[leaflet]',
  standalone: true,
  host: {
    id: 'map',
  },
})
export class LeafletDirective implements OnDestroy {
  private readonly el = inject(ElementRef).nativeElement;
  readonly map = this.createMap(this.el);

  ngOnDestroy() {
    this.removeMap(this.map);
  }

  createMap(el: HTMLElement) {
    const map = L.map(el, { zoom: 8, minZoom: 8 }).setView(
      [-19.715833, -40.316944],
      8
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.setMaxBounds(
      L.latLngBounds(L.latLng(-17.78, -42.22), L.latLng(-21.48, -39.02))
    );

    return map;
  }

  removeMap(map: L.Map) {
    map.remove();
  }
}
