import { Component, OnInit , Input, OnChanges} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-my-add',
  templateUrl: './my-add.component.html',
  styleUrls: ['./my-add.component.css']
})
export class MyAddComponent implements OnChanges {
  @Input() legs;
  heroForm: any;
  constructor( private fb: FormBuilder) {
    this.createForm();
   }
   createForm() {
    this.heroForm = this.fb.group({
      name: '',
      
      power: '',
      sidekick: ''
    });
  }
   ngOnChanges() {
    this.heroForm.reset({
      name: this.legs.name
    });
   
  }
  ngOnInit() {
  } 

}
