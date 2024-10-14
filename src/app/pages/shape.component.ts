import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { switchMap } from 'rxjs';

import { Shape } from '@models/shape.model';
import { ShapeService } from '@services/shape.service';

@Component({
  selector: 'adaptaes-page-shape',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: 'shape.component.html',
  styleUrl: 'shape.component.scss',
})
export default class ShapeComponent {
  private readonly routeSnapshot = inject(ActivatedRoute);
  private readonly shapeService = inject(ShapeService);
  protected shape = signal<Shape | undefined>(undefined);
  private readonly routeSubscription = this.routeSnapshot.params
    .pipe(
      takeUntilDestroyed(),
      switchMap((p) => this.shapeService.getById(p['id']))
    )
    .subscribe((r) => this.shape.set(r));
}
