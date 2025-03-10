import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { ShapeService } from '@services/shape.service';
import { RiskAreaService } from '@services/risk-area.service';
import { LeafletDirective } from '@directives/leaflet.directive';
import { LeafletShapeDirective } from '@directives/leaflet-shape.directive';
import { LeafletRiskAreaDirective } from '@directives/leaflet-risk-area.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LeafletDirective,
    LeafletShapeDirective,
    LeafletRiskAreaDirective,
  ],
  template: `
    <div leaflet>
      @for(shape of shapes(); track $index) {
        <span leaflet-shape [shape]="shape" [index]="$index"></span>
      } 
      @for(riskArea of riskAreas(); track $index) {
        <span leaflet-risk-area [riskArea]="riskArea" [index]="$index"></span>
      }
    </div>
    <router-outlet />
  `,
})
export class AppComponent {
  private readonly shapeService = inject(ShapeService);
  private readonly riskAreaService = inject(RiskAreaService);

  protected shapes = toSignal(this.shapeService.getShapes());
  protected riskAreas = toSignal(this.riskAreaService.getRiskAreas());
}
