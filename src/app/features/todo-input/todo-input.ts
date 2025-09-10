import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../shared/directives/highlight';

@Component({
  selector: 'app-todo-input',
  imports: [FormsModule, HighlightDirective],
  template: `
    <form (ngSubmit)="submit()" style="display:flex;gap:.5rem;align-items:center">
      <input
        #title
        name="title"
        type="text"
        [(ngModel)]="value"
        placeholder="Add a new task..."
        required
        appHighlight
        style="padding:.5rem;border:1px solid #ddd;border-radius:.5rem;flex:1"
      />
      <button type="submit">Add</button>
    </form>
  `,
})
export class TodoInputComponent {
  @Output() add = new EventEmitter<string>();

  value = '';

  @ViewChild('title') titleInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.titleInput.nativeElement.focus();
  }

  submit() {
    if (!this.value.trim()) return;
    this.add.emit(this.value);
    this.value = '';
    queueMicrotask(() => this.titleInput.nativeElement.focus());
  }
}
