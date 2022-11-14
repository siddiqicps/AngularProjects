import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Book } from '../book';
import { DataService } from '../services/data.service';
import { SharedService } from '../services/shared.service';
import { List } from '../List';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];
  book_id!: number;
  public displayedColumns = ['book_title', 'year', 'author_name', 'action'];
  dataList = new MatTableDataSource<Book>();
  dataListLength: number = 0;
  selection: any;
  lists: List[] = [];
  constructor(private dataService: DataService
    , private sharedService: SharedService
    ,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllListBooks()
    this.getLists()
  }

  getAllListBooks(){
    const listId = this.sharedService.listId
    this.dataService.getAllListBooks(listId)
      .subscribe((res: any)=>{
        console.log(res);
        this.dataList.data = res;
        this.dataListLength = res.length;
      })
  }

  getLists(){
    this.dataService.getAllLists()
      .subscribe((res: any)=>{
        this.lists = res;
      })
  }

  removeDialog(book_id: number = 0): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then(result => {
      result.isConfirmed ?  this.removeBookFromList(book_id) : ''
    });
  }

  removeBookFromList(id: number){
    const listId = this.sharedService.listId
    this.lists.forEach((list:any) => {
      if(list._id == listId){
        list.books_id.forEach((book_id:number, index: number) => {
          if(book_id === id){
            list.books_id.splice(index,1)
          }
        });
      }
    })
    this.dataService.addList(this.lists)
      .subscribe((res: any)=>{
        res ? this.getAllListBooks() : this.failureNotification('Unable to perform action')
      })
  }

  successNotification(msg:string) {
    Swal.fire('Done', msg , 'success');
  }

  failureNotification(msg:string) {
    Swal.fire('Error', msg , 'error');
  }

  moveUp(id: number){
    const listId = this.sharedService.listId;
    let flag = false;
    this.lists.forEach((list:any) => {
      if(list._id == listId){
        list.books_id.forEach((book_id:number, index: number) => {
          if(book_id === id && !flag){
            const temp = list.books_id[index - 1];
            list.books_id[index - 1] = list.books_id[index];
            list.books_id[index] = temp;
            flag = true
          }
        });
      }
    })
    this.dataService.addList(this.lists)
      .subscribe((res: any)=>{
        res ? this.getAllListBooks() : this.failureNotification('Unable to perform action')
      })

  }

  moveDown(id: number){
    const listId = this.sharedService.listId
    let flag = false;
    this.lists.forEach((list:any) => {
      if(list._id === listId){
        list.books_id.forEach((book_id:number, index: number) => {
          if(book_id === id && !flag){
            const temp = list.books_id[index + 1]
            list.books_id[index + 1] = list.books_id[index]
            list.books_id[index] = temp
            flag = true
          }
        });
      }
    })
    this.dataService.addList(this.lists)
      .subscribe((res: any)=>{
        res ? this.getAllListBooks() : this.failureNotification('Unable to perform action')
      })
  }

}
