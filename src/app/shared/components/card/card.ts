import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
    <div class="card" style="border:1px solid #e5e7eb;border-radius:1rem;padding:1rem">
      <div class="card-header" style="font-weight:600;margin-bottom:.5rem">
        <ng-content select="[header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: ``
})
export class CardComponent {}
