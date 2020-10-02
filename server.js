const express = require('express');
const app = express();
const port = 3000;
var budget = require('./server.json');
app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.json(budget);
    
});

/*var myBudget = JSON.parse(budget, function(key, value){
    return new value;
});*/

console.log('My budget is', budget);

console.log('The type of the budget is', typeof budget);

console.log('The length of the budget is', Object.keys(budget).length);

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
  });