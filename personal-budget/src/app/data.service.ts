import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dataSource = {
    datasets: [
        {
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#gg6384',
            '#aba2eb',
            '#af6b19',
            ],
        }
    ],
    labels: []
};

  constructor(private http: HttpClient) {}


  returnData(){
      this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      //debugger;
      //console.log(res);
      for(let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;

    }
      let data = this.dataSource.datasets[0].data;
      let labels = this.dataSource.labels;

      function randomData (){
        return labels.map( function(label, i){
        return { label: label, value: data[i] }
    });
  }

    });
    }

   }

