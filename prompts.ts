import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, answer => {
    resolve(answer);
  }));
}

async function prompt() {
  const searchTerm = await ask('What is your search term? ');
  const latitude = await ask('What is the latitude of the location you want to search? ');
  const longitude = await ask('What is the longtitude of the location you want to search? ');
  rl.close();
  
  return [searchTerm.replace(/ /g, '+'), latitude, longitude];
}

export default prompt;