import { Component, OnInit } from '@angular/core';
import { Book } from './book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'books-store';

  ngOnInit(){
    this.storeBooks()
  }

  storeBooks(){
    const books = [
      {_id: 1, book_title: "Dune", year: 1965, author_name: "Frank Herbert"},
      {_id: 2, book_title: "Ender's Game", year: 1985, author_name: "Orson Scott Card"},
      {_id: 3, book_title: "1984", year: 1949, author_name: "George Orwell"},
      {_id: 4, book_title: "Fahrenheit 451", year: 1953, author_name: "Ray Bradbury"},
      {_id: 5, book_title: "Brave New World", year: 1932, author_name: "Aldous Huxley"},
    ]
    localStorage.setItem('books', JSON.stringify(books));
  }
}
