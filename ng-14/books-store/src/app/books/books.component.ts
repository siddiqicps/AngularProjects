import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Book } from '../book';
import { DataService } from '../services/data.service';
import { SharedService } from '../services/shared.service';
import { NewListComponent } from '../new-list/new-list.component';
import { SelectionModel } from '@angular/cdk/collections';
import { AddListComponent } from '../add-list/add-list.component';
import { List } from '../List';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  book_id!: number;
  public displayedColumns = ['select', 'book_title', 'year', 'author_name', 'action'];
  dataList = new MatTableDataSource<Book>();
  selection: any;
  lists: List[] = [];

  constructor(private dataService: DataService
    ,private dialog: MatDialog
    ,private sharedService: SharedService
    ,private _router: Router) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.lists = this.getAllLists();
    const initialSelection:any = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Book>(allowMultiSelect, initialSelection);
  }

  getAllBooks(){
    this.dataService.getAllBooks()
      .subscribe((res: any)=>{
        console.log(res);
        this.dataList.data = res;
      })
  }

  getAllLists(){
    const lists = JSON.parse(localStorage.getItem('lists') || '{}')
    return lists
  }

  openDialog(book_id: number = 0): void {
    const dialogRef = this.dialog.open(NewListComponent, {
      width: '450px',
      data: {"popup_title": "Create List"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lists = this.getAllLists()
      result ? result.length > 0 ?  this.successNotification('List created successfully.') : this.failureNotification('Error occured in creating new list.') : ''
    });
  }

  openAddDialog(book_id: number = 0): void {
    const dialogRef = this.dialog.open(AddListComponent, {
      width: '450px',
      data: {"book_id": book_id, "popup_title": "Add To List"}
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? result.length > 0 ?  this.successNotification('Added to list successfully.') : this.failureNotification('Error occured in adding to list.') : ''
    });
  }

  successNotification(msg:string) {
    Swal.fire('Done', msg , 'success');
  }

  failureNotification(msg:string) {
    Swal.fire('Error', msg , 'error');
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataList.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataList.data.forEach(row => this.selection.select(row));
  }

  onListChange(e: any){
    console.log(e)
    this.sharedService.listId = e.value
    this._router.navigate(['/list-books']);
  }

}
