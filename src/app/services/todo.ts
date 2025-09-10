import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly storageKey = 'todos-ng20';
  private todoList: Todo[] = this.loadFromStorage();

  private loadFromStorage(): Todo[] {
    try { return JSON.parse(localStorage.getItem(this.storageKey) ?? '[]'); }
    catch { return []; }
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todoList));
  }

  private findTodoById(id: number): Todo | undefined {
    return this.todoList.find(todo => todo.id === id);
  }

  getAllTodos(): Todo[] {
    return [...this.todoList];
  }

  add(title: string) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
      createdAt: Date.now(),
    };
    
    this.todoList.unshift(newTodo);
    this.saveToStorage();
  }

  toggleTodoChangeStatus(id: number) {
    const todo = this.findTodoById(id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToStorage();
    }
  }

  updateTodoTitle(id: number, newTitle: string) {
    const todo = this.todoList.find(x => x.id === id);

    if (todo) {
      todo.title = newTitle.trim();
      this.saveToStorage();
    }
  }

  deleteTodo(id: number) {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    this.saveToStorage();
  }

  clearCompletedTodos() {
    this.todoList = this.todoList.filter(todo => !todo.completed);
    this.saveToStorage();
  }
}
