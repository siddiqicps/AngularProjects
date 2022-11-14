import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from '../List';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {
  addListForm = new FormGroup({
    _id: new FormControl(''),
    books_id: new FormControl('')
  })

  fav_lists: List[] = []
  constructor(public dialogRef: MatDialogRef<AddListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.fav_lists = this.getLists()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updated_list = this.updateList()
    this.dataService.addList(updated_list).subscribe((res:any)=>{
      this.dialogRef.close(res);
    })
    
  }

  updateList(){
    const lists = this.getLists()
    lists.map((list:any) => {
      if(list._id === this.addListForm.value['_id' ]
        && !(list.books_id.includes(this.data.book_id))){
        list.books_id.push(this.data.book_id)
      }
    })
    return lists
  }

  getLists(){
    const lists = JSON.parse(localStorage.getItem('lists') || '{}')
    return lists
  }

}