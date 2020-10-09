import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Chart} from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {



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

    public width = 500;
    public height = 350;
    public margin = 50;
    public radius = Math.min(this.width, this.height) / 2;
    public svg;
    public colors;





    public createSvg(): void {
      this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }
  public key = function(d){ return d.data.label; };

  private createColors(data): void {
    console.log(data);
    this.colors = d3.scaleOrdinal()
    //.domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
    .domain(data.map(d => d.budget))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
}



  private drawChart(data): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.value));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(data))
    .enter()
    .append('text')
    .text(d => d.data.label)
    .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
}

  constructor(private http: HttpClient, public dataService: DataService) {
    const el = document.getElementById('myChart');
    console.log('Is myChart there?', el);
    this.dataService.returnData();
   }




  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      //debugger;
      //console.log(res);
      for(let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;

    }
    //this.createChart();
      this.createChart2();
      let data = this.dataSource.datasets[0].data;
      let labels = this.dataSource.labels;
      //console.log(data);
      //console.log(labels);
      function randomData (){
      return labels.map( function(label, i){
      return { label: label, value: data[i] }
  });
}
console.log(this.dataService.returnData());
    this.createSvg();
    this.createColors(randomData());
    this.drawChart(randomData());
    });

  }



  createChart() {
    let ctx = document.getElementById("myChart");
    let myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
        //this.dataService.returnData()
    });
}

createChart2() {
  let ctx = document.getElementById("myChart");
  let myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataService.dataSource
      //this.dataService.returnData()
  });
}

}
