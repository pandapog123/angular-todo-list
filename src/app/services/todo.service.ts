import { Todo } from './../models/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  private createLocalStore(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  createTodo(todo: Todo) {
    this.todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  checkTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);

    this.todos[index].checked = !this.todos[index].checked;

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  removeChecked() {
    this.todos = this.todos.filter((todo) => {
      return todo.checked == false;
    });

    console.log(
      this.todos.filter((todo) => {
        return todo.checked == false;
      }),
      this.todos
    );

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  constructor() {
    let localStore = localStorage.getItem('todos') || '[]';

    if (!localStore) {
      this.todos = [];

      this.createLocalStore(this.todos);

      return;
    }

    let parsedLocalStore = JSON.parse(localStore);

    if (!(parsedLocalStore instanceof Array)) {
      this.todos = [];

      this.createLocalStore(this.todos);

      return;
    }

    this.todos = parsedLocalStore;
  }
}
