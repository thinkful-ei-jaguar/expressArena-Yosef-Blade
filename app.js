const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Johnny!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response 
  res.send(greeting);
});

app.get('/sum', (req, res) => {
  const aNumber = parseInt(req.query.a);
  const bNumber = parseInt(req.query.b);
  const sum = (aNumber + bNumber).toString();
  res.send(`The sum of ${aNumber} and ${bNumber} is ${sum}.`);
});

app.get('/cypher', (req, res) => {
  const text = req.query.text;
  const shift = parseInt(req.query.shift);
  
  const textArr = text.split('');
  
  let mappedText = textArr.map(character => {
    const charNumber = character.charCodeAt(0);
    
    const shiftedNumber = charNumber + shift;
    
    return character = String.fromCharCode(shiftedNumber);
    
  });
  mappedText = mappedText.join('');

  res.send(`Encoded: ${mappedText} `);

});

app.get('/lotto', (req, res) => {
  let inputArr = req.query.numbers;

  inputArr = inputArr.map(number => parseInt(number));
  const randomArr = Array.from({length: 6}, () => Math.floor(Math.random() * 20));
  console.log(inputArr, randomArr);
  let count = 0;
  inputArr.map((number) => {
    if ((!!randomArr.filter(value => value === number).length)) return count+=1;
  });

  if (count <= 1) {
    res.send('Sorry, you lose');
  } else if (count >= 2) {
    res.send('Congratulations, you win a free ticket!');
  } else if (count === 5) {
    res.send('Congratulations!  You win $100!');
  } else {
    res.send('Wow!  Unbelievable!  You could have won the mega millions!');
  }
});

app.listen(8001, () => {
  console.log('Express server is listening on port 8001!');
});