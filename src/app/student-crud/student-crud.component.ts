import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { NgIfContext } from '@angular/common';

import { Istudent } from '../model/std';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { GetConfirmComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.scss'],
})
export class StudentCrudComponent implements OnInit {
  isInEditMode = false;

  i: any;
  stdArr: Istudent[] = [
    {
      fname: 'Jhon',
      lname: 'Doe',
      Email: 'Jhon@gmail.com',
      contact: 34567899,
      stdId: '345',
    },
    {
      fname: 'May',
      lname: 'Doe',
      Email: 'may@gmail.com',
      contact: 3456789989,
      stdId: '235',
    },
    {
      fname: 'June',
      lname: 'Doe',
      Email: 'June@gmail.com',
      contact: 34567899,
      stdId: '455',
    },
  ];
  noStd!: TemplateRef<NgIfContext<boolean>> | null;
  constructor(private _matDialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}
  uuid = () => {
    return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
      /[xy]/g,
      (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === 'x' ? random : (random & 0x3) | 0x8;
        return value.toString(16);
      }
    );
  };

  editId!: string;
  @ViewChild('fname') fname!: ElementRef;
  @ViewChild('lname') lname!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;
  onStdAdd() {
    let fnameVal = this.fname.nativeElement.value;
    let lnameVal = this.lname.nativeElement.value;

    if (fnameVal.length === 0 || lnameVal.value === 0) {
      this._snackBar.open('please enter first name and last name!', 'close', {
        duration: 1500,
        verticalPosition: 'top',
      });
      return;
    }
    let std_obj: Istudent = {
      fname: this.fname.nativeElement.value,
      lname: this.lname.nativeElement.value,
      Email: this.email.nativeElement.value,
      contact: this.contact.nativeElement.value,
      stdId: this.uuid(),
    };
    this.fname.nativeElement.value = '';
    this.lname.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.contact.nativeElement.value = '';

    console.log(std_obj);
    this.stdArr.push(std_obj);
  }
  trackById(index: number, todo: Istudent) {
    return todo.stdId;
  }

  onRemove(id: string) {
    let Matconfi = new MatDialogConfig();
    Matconfi.disableClose = true;
    Matconfi.width = '500px';
    let matDilogref = this._matDialog.open(GetConfirmComponent, Matconfi);
    matDilogref.afterClosed().subscribe((res) => {
      if (res) {
        let getIndex = this.stdArr.findIndex((s) => s.stdId === id);
        let std = this.stdArr.splice(getIndex, 1);
        this._snackBar.open(
          `This student ${std[0].fname} ${std[0].lname} with id ${id} Removed successfully!!!`,
          'close',
          {
            duration: 1500,
            horizontalPosition: 'left',
            verticalPosition: 'top',
          }
        );
      }
    });
  }
  onEdit(std: Istudent) {
    this.fname.nativeElement.value = std.fname;
    this.lname.nativeElement.value = std.lname;
    this.email.nativeElement.value = std.Email;
    this.contact.nativeElement.value = std.contact;
    this.editId = std.stdId;

    this.isInEditMode = true;
  }
  onUpdate() {
    let updated_obj: Istudent = {
      fname: this.fname.nativeElement.value,
      lname: this.lname.nativeElement.value,
      Email: this.email.nativeElement.value,
      contact: this.contact.nativeElement.value,
      stdId: this.editId,
    };
    this.fname.nativeElement.value = '';
    this.lname.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.contact.nativeElement.value = '';

    let getIndex = this.stdArr.findIndex((s) => s.stdId === this.editId);
    this.stdArr[getIndex] = updated_obj;
    this.isInEditMode = false;
    this._snackBar.open(
      `This student ${updated_obj.fname} ${updated_obj.lname} with id ${this.editId} Updated Successfully!!! `,
      `close`,
      {
        horizontalPosition: 'left',
        verticalPosition: 'top',
        duration: 3000,
      }
    );
  }
}
