import { Component } from '@angular/core';
import { MyProjectService } from "./my-project.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from "lodash";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MyProjectService]
})
export class AppComponent {
  title = 'app';
  ngModelCount = { count: "" };
  copyRateObject: any;     // user enter number for copy
  totalcharge: any;           // for all rate total
  resRateTotal = {};           //for all rate total
  tatalCount = 0;
  rhsTotalRate = 0;           // initail value to make sum
  responseObject: any;         // all rate response hold
  rhsResponse = {};
  forRHSCopy: any;
  pushToArray = [];
  rhsResObject = {};
  selectedLegs: any;
  selectedLegsIndex: number;
  popUptitil: any;
  alertStyles = {
    'display': 'none'
  };

  public loginForm = this.fb.group({
    charge_name: ["", Validators.required],
    amount: ["", Validators.required],
    basis: ["", Validators.required],
    Final_Amount: ["", Validators.required]
  });

  constructor(public apiSerivce: MyProjectService, public fb: FormBuilder) {
    this.getAllDataResponse();
  }
  getAllDataResponse() {
    this.apiSerivce.getAllData().subscribe(data => {


      this.totalcharge = data.leg_data;
      this.getTotal(this.totalcharge);
      this.responseObject = _.cloneDeep(data);
    });
  }



  getTotal(objectResponse) {
    for (let i = 0; i < objectResponse.length; i++) {
      let rateCardObject = objectResponse[i]['rate_card_obj'].card_charges;
      for (let i = 0; i < rateCardObject.length; i++) {

        this.tatalCount += parseInt(rateCardObject[i]['total'])
      }
      objectResponse[i]['rate_card_meta']['totalRate'] = this.tatalCount;
      objectResponse[i]['rate_card_meta']['charge_currency'] = rateCardObject[0].charge_currency;
      this.tatalCount = 0;
    }
  }

  getNumberForCopy(count, obj, inputNumber) {

    let pushToArray = [];


    if (count === 'copylegs') {

     var marginObject= this.calculaterFInalPriceUsingMargin(inputNumber,obj);
      let clickedObject = _.cloneDeep(marginObject)
      pushToArray.push(clickedObject);
      this.rhsResObject['leg_data'] = pushToArray;
      this.getTotal(this.rhsResObject);
      //this.rhsResObject.push(this.copySingleLegs['leg_data'])
    }
    else {
      // this.rhsResObject['leg_data']=obj;
      let clickedObject = Object.assign({}, this.responseObject)
      this.rhsResObject = clickedObject;
      this.getTotal(this.rhsResObject);
    }


    // this.getRHSTotal(this.rhsResObject);
  }
  calculaterFInalPriceUsingMargin(margin,object){
    let chageMarginObject=object.rate_card_obj.card_charges;

    for (let i = 0; i <object.rate_card_obj.card_charges.length; i++) {
      let marginPrice= parseInt(object.rate_card_obj.card_charges[i]['amount'])+parseInt(margin);
      object.rate_card_obj.card_charges[i]['marginPrice']=marginPrice;
    }
    return object;

  }
  getRHSTotal(object) {
    this.rhsTotalRate = 0;
    for (let i = 0; i < object.length; i++) {
      this.rhsTotalRate += parseInt(object[i]['total'])
    }
  }

  deleteSelected(object, deleteObject, loopIndex) {

    this.rhsResObject['leg_data'][loopIndex].rate_card_obj.card_charges.splice(deleteObject, 1)
    console.log(object);
    this.getTotal(this.rhsResObject['leg_data']);
  }

  getDataForAdd(text, slectedIndex) {
    this.popUptitil = text;
    this.alertStyles = {
      'display': 'block'
    };

    this.selectedLegsIndex = slectedIndex;
    if (text === 'Update') {
      this.loginForm = this.fb.group({
        charge_name: [slectedIndex.charge_name, Validators.required],
        amount: [slectedIndex.amount, Validators.required],
        basis: [slectedIndex.basis, Validators.required],
        Final_Amount: ["", Validators.required]
      });
    }
    else {
      this.loginForm = this.fb.group({
        charge_name: ["", Validators.required],
        amount: ["", Validators.required],
        basis: ["", Validators.required],
        Final_Amount: ["", Validators.required]
      });
    }
  }
  closePopUp() {
    this.alertStyles = {
      'display': 'none'
    };
  }
  addLEGS(event, update) {

    if (update === 'update') {


    } else {
      let objectSumbmit = {
        total: "0",
        charge_name: this.loginForm.value.charge_name,
        amount: this.loginForm.value.amount,
        basis: this.loginForm.value.basis,
        Final_Amount: this.loginForm.value.Final_Amount
      }
      this.rhsResObject['leg_data'][this.selectedLegsIndex].rate_card_obj.card_charges.push(objectSumbmit)
      this.getTotal(this.rhsResObject['leg_data']);
      this.alertStyles = {
        'display': 'none'
      };
    }
  }
}