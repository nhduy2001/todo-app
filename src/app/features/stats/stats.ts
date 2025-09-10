import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="font-size:.9rem;opacity:.9">
      Total: {{ total }} | Remaining: {{ remaining }} | Completed: {{ total - remaining }}
    </div>
  `,
})
export class StatsComponent {
  @Input() total = 0;
  @Input() remaining = 0;
}
