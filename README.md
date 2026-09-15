# Angular Click Outside

A standalone Angular directive for detecting pointer events outside an element.

## Features

- Signal-based inputs
- Signal-based outputs
- Dropdown and modal support
- Excluded elements support
- Runs outside Angular Zone
- Automatic event cleanup

## Usage
```typescript
import { Component, signal } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ClickOutsideDirective],
  template: `
<button
#toggle
type="button"
(click)="open.set(!open())"
>
Toggle
</button>

@if (open()) {
<section
appClickOutside
[exclude]="[toggle]"
(clickOutside)="open.set(false)"
>
Menu content
</section>
}
  `,
})
export class MenuComponent {
  readonly open = signal(false);
}
