import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  listForm = new FormGroup({
    _id: new FormControl(''),
    list_title: new FormControl(''),
    books_id: new FormControl('')
  })


  constructor(public dialogRef: MatDialogRef<NewListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.getMaxId())
    const id = this.getMaxId() + 1
    const new_list = { "_id": id, "list_title": this.listForm.value['list_title'], "books_id": [] }
    let listPayload = this.getList().length > 0 ? this.getList() : []
    console.log(listPayload)
    listPayload.push(new_list)
    this.dataService.addList(listPayload).subscribe((res:any)=>{
      this.dialogRef.close(res);
    })
    
  }

  getMaxId(){
    const lists = JSON.parse(localStorage.getItem('lists') || '{}')
    const id = lists.length > 0 ? lists[lists.length - 1]._id : 0
    return id
  }

  getList(){
    const lists = JSON.parse(localStorage.getItem('lists') || '{}')
    return lists
  }

}
