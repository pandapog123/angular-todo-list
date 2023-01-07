import { Todo } from './../models/todo';
import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
})
export class TodoComponent {
  currentTodo: Todo = {
    checked: false,
    id: Math.random().toString(),
    label: '',
  };

  error = '';
  showError = false;

  handleChange(element: HTMLInputElement) {
    this.currentTodo.label = element.value;
  }

  handleFormSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.currentTodo.label == '') {
      this.throwError('Text Field Cannot be Empty');

      return;
    }

    this.todoService.createTodo(this.currentTodo);

    this.currentTodo = {
      checked: false,
      id: Math.random().toString(),
      label: '',
    };
  }

  throwError(msg: string) {
    this.error = msg;
    this.showError = true;
  }

  closeError() {
    this.error = '';
    this.showError = false;
  }

  constructor(public todoService: TodoService) {}
}
