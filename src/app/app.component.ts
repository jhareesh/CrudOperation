import { Component } from '@angular/core';
//importing the httpClient
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CrudOperation';
  // reading from the json of person
  url = "http://localhost:3000/person"
  data1:any

  //creating an constructor to read the data to store it in html
  constructor(private http:HttpClient)
  {
    //using http and getting url specified in the App.componet.url
    // subscribing it and using the arrow function to store the data
    http.get(this.url).subscribe(datafromjson=>{
      //storing it in data1 
      this.data1 = datafromjson
    })

  }


}
