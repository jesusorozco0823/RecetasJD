import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  characters: Character[] = []

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(){
    this.http.get<{ results: Character[] }>('https://rickandmortyapi.com/api/character').subscribe(res => {
      console.log(res);
      this.characters = res.results;
    })
  }

}
