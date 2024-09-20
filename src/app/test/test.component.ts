import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'test-component',
  standalone: true,
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  headers: HttpHeaders;
  constructor(public httpClient: HttpClient) {
    let headers = new HttpHeaders();
    this.headers = headers.set('x-api-key', '1234');
  }
  @Input() myinput = '';

  something = 'my test component';
  getData = () =>{
    this.httpClient.get('https://jsonplaceholder.typicode.com/posts', {headers:this.headers}).subscribe((data) => {
      console.log(data);
    })
  }
  ngOnInit() {
    this.getData();
  }
}
