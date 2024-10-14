import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { LeafletDirective } from '@directives/leaflet.directive';
import { LeafletShapeDirective } from '@directives/leaflet-shape.directive';
import { ShapeService } from '@services/shape.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeafletDirective, LeafletShapeDirective],
  template: `
    <div leaflet>
      @for(shape of shapes(); track $index) {
      <span leaflet-shape [shape]="shape" [index]="$index"></span>
      }
    </div>
    <router-outlet />
  `,
})
export class AppComponent {
  private readonly shapeService = inject(ShapeService);
  protected shapes = toSignal(this.shapeService.getShapes());
}
