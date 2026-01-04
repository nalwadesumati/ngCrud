import {
  Component,
  ElementRef,
  OnInit,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { Itodo } from '../model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoArr: Itodo[] = [
    { todoItem: 'javascript', todoId: '123' },
    { todoItem: 'Angular', todoId: '124' },
    // { todoItem: 'typescript', todoId: '125' },
    // { todoItem: 'nodejs', todoId: '126' },
  ];
  @ViewChild('todoItem')
  todoItem!: ElementRef<HTMLInputElement>;
  @ViewChild('inputControl') inputControl!: ElementRef<HTMLInputElement>;
  isEditMode = false;
  editedTodoId!: string;

  // todoItem!: string;
  // todoId !:string;
  constructor() {}

  ngOnInit(): void {}

  onTodoAdd() {
    const todoObj: Itodo = {
      todoItem: this.todoItem.nativeElement.value,
      todoId: Date.now().toString(),
    };
    this.todoArr.push(todoObj);
    console.log(todoObj);
    this.todoItem.nativeElement.value = '';
  }
  onEdit(todo: Itodo) {
    this.isEditMode = true;
    this.todoItem.nativeElement.value = todo.todoItem;
    this.editedTodoId = todo.todoId;
  }
  onUpdate() {
    const onUpdatedObj: Itodo = {
      todoId: this.editedTodoId,
      todoItem: this.todoItem.nativeElement.value,
    };
    const index = this.todoArr.findIndex((t) => t.todoId === this.editedTodoId);
    this.todoArr[index] = onUpdatedObj;
    this.isEditMode = false;
    this.todoItem.nativeElement.value = '';
    this.editedTodoId = '';
  }

  onRemove(id: string) {
    this.todoArr = this.todoArr.filter((t) => t.todoId !== id);
  }
  trackById(index: number, todo: Itodo) {
    return todo.todoId;
  }
}
