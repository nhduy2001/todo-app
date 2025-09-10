import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../shared/directives/highlight';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, FormsModule, HighlightDirective],
  template: `
    <li
      [ngClass]="{ done: todo.completed }"
      appHighlight
      style="display:flex;gap:.5rem;align-items:center;padding:.25rem .5rem;border-radius:.5rem"
    >
      <input type="checkbox" [checked]="todo.completed" (change)="toggle.emit(todo!.id)" />

      @if (!editing) {
      <span (dblclick)="startEdit()">{{ todo.title }}</span>
      } @else {
      <input
        [ngModel]="tempTitle"
        (ngModelChange)="tempTitle = $event"
        (keyup.enter)="save()"
        (blur)="save()"
      />
      }
      <button (click)="remove.emit(todo!.id)" aria-label="remove">✕</button>
    </li>
  `,
  styles: [
    `
      .done {
        text-decoration: line-through;
        opacity: 0.7;
      }
    `,
  ],
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number; title: string }>();

  editing = false;
  tempTitle = '';

  ngOnChanges(changes: SimpleChanges) {}
  ngDoCheck() {}
  ngOnDestroy() {}

  startEdit() {
    this.editing = true;
    this.tempTitle = this.todo.title;
  }
  save() {
    if (!this.editing) return;
    this.editing = false;
    const t = this.tempTitle.trim();
    if (t && t !== this.todo.title) this.edit.emit({ id: this.todo.id, title: t });
  }
}
