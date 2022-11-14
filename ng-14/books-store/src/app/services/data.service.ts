import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

import { Book } from '../book';
import {environment} from "../../environments/environment";
import { List } from '../List';

const base = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    const books = JSON.parse(localStorage.getItem('books') || '{}')
    const booksObsrv = new Observable<Book[]>(observer => {
        observer.next(books)
        observer.complete()
    })
    return booksObsrv
  }

  addList(data: any): Observable<List[]> {
    localStorage.setItem('lists', JSON.stringify(data))
    const listsObsrv = new Observable<List[]>(observer => {
      observer.next(data)
      observer.complete()
    })
    return listsObsrv
  }

  getAllListBooks(listId: number): Observable<Book[]> {
    const lists = JSON.parse(localStorage.getItem('lists') || '{}')
    const selectedList = lists.find((list: any) => {
      return list._id === listId
    })
    const listBooksId = selectedList.books_id
    let books: Book[] = []
    JSON.parse(localStorage.getItem('books') || '{}').forEach((book:any) => {
      const index = listBooksId.indexOf(book._id)
      if(index >= 0 ){
        books[index] = book
      }
    })

    const booksObsrv = new Observable<Book[]>(observer => {
        observer.next(books)
        observer.complete()
    })
    return booksObsrv
  }

  getAllLists(): Observable<List[]> {
    const lists = JSON.parse(localStorage.getItem('lists') || '{}')
    const listsObsrv = new Observable<List[]>(observer => {
        observer.next(lists)
        observer.complete()
    })
    return listsObsrv
  }

  getlistById(listId: number): Observable<List> {
    const list = JSON.parse(localStorage.getItem('lists') || '{}').find((list:any) => {
      return list._id === listId
    })
    const listObsrv = new Observable<List>(observer => {
        observer.next(list)
        observer.complete()
    })
    return listObsrv
  }

  
}
