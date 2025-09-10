import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './shared/components/card/card';
import { TodoInputComponent } from './features/todo-input/todo-input';
import { TodoService } from './services/todo';
import { Todo } from './models/todo';
import { TodoListComponent } from './features/todo-list/todo-list';
import { StatsComponent } from './features/stats/stats';

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    TodoInputComponent,
    TodoListComponent,
    StatsComponent,
  ],
  template: `
    <main style="max-width:720px;margin:2rem auto;font-family:system-ui,arial">
      <app-card>
        <h2 header>Angular 20 — Todo App</h2>

        <div style="margin-bottom:.75rem;display:flex;gap:.5rem;align-items:center">
          <label>Filter:</label>
          <select [(ngModel)]="filter" (ngModelChange)="applyFilter()">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button (click)="clearCompleted()">Clear completed</button>
        </div>

        <app-todo-input (add)="add($event)"></app-todo-input>

        <app-todo-list
          [todos]="filteredTodos"
          (toggle)="toggle($event)"
          (remove)="remove($event)"
          (edit)="edit($event)"
        >
        </app-todo-list>

        <app-stats [total]="todos.length" [remaining]="remainingCount"></app-stats>
      </app-card>
    </main>
  `,
  styles: [
    `
      .note {
        color: #2563eb;
      }
    `,
  ],
})
export class AppComponent {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  filter: Filter = 'all';

  constructor(private readonly todoSvc: TodoService) {}

  ngOnInit() {
    this.refresh();
  }

  add(title: string) {
    this.todoSvc.add(title);
    this.refresh();
  }
  toggle(id: number) {
    this.todoSvc.toggleTodoChangeStatus(id);
    this.refresh();
  }
  remove(id: number) {
    this.todoSvc.deleteTodo(id);
    this.refresh();
  }
  edit(e: { id: number; title: string }) {
    this.todoSvc.updateTodoTitle(e.id, e.title);
    this.refresh();
  }
  clearCompleted() {
    this.todoSvc.clearCompletedTodos();
    this.refresh();
  }

  private refresh() {
    this.todos = this.todoSvc.getAllTodos();
    this.applyFilter();
  }

  get remainingCount(): number {
    return this.todos.reduce((n, t) => n + (t.completed ? 0 : 1), 0);
  }

  applyFilter() {
    switch (this.filter) {
      case 'active':
        this.filteredTodos = this.todos.filter((t) => !t.completed);
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter((t) => t.completed);
        break;
      default:
        this.filteredTodos = this.todos;
    }
  }
}
