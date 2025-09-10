import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoItemComponent } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  template: `
    <ul style="list-style:none;padding:0;margin:0">
      @for (t of todos; track t.id) {
      <app-todo-item
        [todo]="t"
        (toggle)="toggle.emit($event)"
        (remove)="remove.emit($event)"
        (edit)="edit.emit($event)"
      ></app-todo-item>
      }
    </ul>

    @if (todos.length === 0) {
    <p style="opacity:.75">No tasks yet</p>
    }
  `,
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number; title: string }>();

  @ViewChildren(TodoItemComponent) items!: QueryList<TodoItemComponent>;
  ngAfterViewInit() {
    console.log('Rendered items:', this.items.length);
  }
}
