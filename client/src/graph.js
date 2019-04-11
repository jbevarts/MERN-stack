// client/graph.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {VictoryChart, VictoryTheme, VictoryBar} from 'victory';

export function showGraph(forms) {
     const data = [
         {quarter: 1, earnings: 100},
         {quarter: 2, earnings: 500},
         {quarter: 3, earnings: 11000},
         {quarter: 4, earnings: 19000}
     ];
 
     const newData = forms.map((form) =>({
         formId: form.id, salary: form.salary }));
 
     const myElement = (
              <div>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryBar data={newData} x="formId" y="salary" />
              </VictoryChart>
              </div>);
      ReactDOM.render(myElement, document.getElementById("para"));
   

}
