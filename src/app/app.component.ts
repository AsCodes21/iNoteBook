import { Component } from '@angular/core';
import { Note } from './Notes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  localItem:any;
  view_title:string = "";
  view_description:string = "";
  title:string = "";
  description:string = "";
  edit_title:string = "";
  edit_description:string = "";
  element:any;
  note:Note[] = [];
  constructor(){
    this.localItem = localStorage.getItem("note")
    if(this.localItem == null){
      this.note = []
    }
    else{
      this.note =  JSON.parse(this.localItem)
    }
  } 
  addNote(){
    if(this.title && this.description != ""){
    const newNote:Note = {
      title:this.title,
      description:this.description,
      dis:this.description.slice(0,45)+"..."
    }
    this.note.push(newNote)      
    }
    this.title = "";
    this.description = "";
    localStorage.setItem("note",JSON.stringify(this.note));
  }
  viewNote(note:Note){
    this.view_title = note.title;
    this.view_description = note.description;
  }
  editNote(note:Note){
    if(this.edit_title&& this.edit_description != ""){
      note.title = this.edit_title;
      note.description = this.edit_description;    
      localStorage.setItem("note",JSON.stringify(this.note));  
    }
  }
  clickEdit(note:Note){
    this.edit_title = note.title;
    this.edit_description = note.description;
  }
  deleteNote(note:Note){
    const index = this.note.indexOf(note)     
    this.note.splice(index,1)
    localStorage.setItem("note",JSON.stringify(this.note));
  }
  copyNote(note:Note){
    let text = note.description;
    navigator.clipboard.writeText(text);
  }
}
