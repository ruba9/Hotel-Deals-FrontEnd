import { Component,OnInit } from '@angular/core';
import axios from 'axios'
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms"; //FORMS
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Expedia deals';
  hotelDealsList=[]
  public myForm: FormGroup;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(){
    this.myForm = this._fb.group({
      'destination': ['', Validators.required],
      'Start Date': [''],
      'End Date': [true],
      'Price': ['0'],
      'number of travelers': ['0']
    });
    axios.get('https://hotel-deals-exp.herokuapp.com/deals') 
    .then(response => {
      this.hotelDealsList=response.data
      console.log(this.hotelDealsList)
    })
    .catch(error => {console.log(error)
    })
  }
  onSubmit(){
    var expediaUrl = `https://ex-deals.herokuapp.com/deals`

    if (this.myForm.controls['destination'])
      expediaUrl = expediaUrl + `?&destination=${this.myForm.controls['destination'].value}`


    axios.get(expediaUrl)
      .then(response => {
        this.hotelDealsList = response.data;
        console.log(this.hotelDealsList)
      }).catch(error => console.log(error))

      }
}
