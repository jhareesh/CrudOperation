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
  //variable to store the data from html below
  data1:any;

  //defining variable of creation form ngModel textBoxes
  nametemplatecreate : any;
  phonetemplatecreate : any;
  emailtemplatecreate : any;

  //defining variable for modification form ngModel textBoxes 
  nametemplateModify : any;
  phonetemplateModify : any;
  emailtemplateModify : any;
  tsId : any //to store the id of data
  index : any //to store the index of data

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

  //defining function
  onSubmitCreate(dataCreate:any)
  {
    //using http and getting url specified in the App.componet.url
    // subscribing it and using the arrow function to store the data and pushed simultaneously
    this.http.post(this.url,dataCreate.value).subscribe(res=>{
      this.data1.push(res)
    })
  }

  //for deletion 
  onDelete(deletedata:any)
  {
    //using http and getting url specified in the App.componet.url
    // subscribing it and using the arrow function to delete the data and remove from json server simultaneously
    this.http.delete(this.url+"/"+deletedata.id).subscribe(()=>{
      //performing deletion on one element by using index
      this.data1.splice(this.data1.indexOf(deletedata),1)
    })
  }

  //defining method for update
  onUpdate(element:any)
  {
    //sending the data to the textboxes by using storing the elements data in the ngModel textBoxes Variables
    this.nametemplateModify = element.namejson
    this.emailtemplateModify = element.emailjson
    this.phonetemplateModify = element.phonejson
    
    //storing id and index of the element
    this.tsId = element.id
    this.index = this.data1.indexOf(element)
  } 

  //definig method for modify
  onModify(dataModify : any)
  {
    this.http.put(this.url+"/"+this.tsId,dataModify.value).subscribe(()=>{
      this.data1[this.index] = dataModify.value
    })
  }
}
