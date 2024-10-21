import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [ CommonModule, MatButton, MatIcon ],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.scss'
})
export class FavouriteComponent implements OnInit{
  
  @Input() fav_img = 'images/star-filled.png';
  @Input() non_fav_img = 'images/star-empty.png'
  @Input() selected:boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  

  constructor() { }

  ngOnInit(): void {
    let favourite_location = localStorage.getItem('favourite');

  }

  public toggleSelected() {
    //deselect all so only one can be selected at a time????
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
    
  }

}

