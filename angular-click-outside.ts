import {
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  inject,
  input,
  output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  readonly enabled = input(true);
  readonly exclude = input<readonly Element[]>([]);
  readonly clickOutside = output<PointerEvent>();

  constructor() {
    if (typeof document === 'undefined') {
      return;
    }

    const listener = (event: PointerEvent) => {
      if (!this.enabled()) {
        return;
      }

      const path = event.composedPath();
      const host = this.host.nativeElement;

      const isInsideHost = path.includes(host);
      const isExcluded = this.exclude().some(element =>
        path.includes(element)
      );

      if (isInsideHost || isExcluded) {
        return;
      }

      this.zone.run(() => {
        this.clickOutside.emit(event);
      });
    };

    this.zone.runOutsideAngular(() => {
      document.addEventListener('pointerdown', listener, true);
    });

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('pointerdown', listener, true);
    });
  }
}
