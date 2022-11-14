import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  bookId!: number;
  listId!: number;

  constructor() { }
}
