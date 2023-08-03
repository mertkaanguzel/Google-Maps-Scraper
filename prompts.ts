import { createInterface } from "readline";
import { ILocation } from "./types";

const setLocation = (
  Location: ILocation,
  latitude: string,
  longtitude: string
) => {
  Location.latitude = latitude;
  Location.longitude = longtitude;
};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      resolve(answer);
    })
  );
}

async function prompt() {
  const searchTerm = await ask("What is your search term? ");
  let latitude = await ask(
    "What is the latitude of the location you want to search? "
  );
  let longitude = await ask(
    "What is the longtitude of the location you want to search? "
  );
  rl.close();

  if (!latitude) {
    latitude = "39.9334"; //Default latitude for Ankara if the answer is empty
  }
  if (!longitude) {
    longitude = "32.8597"; //Default longitude for Ankara if the answer is empty
  }

  return [searchTerm.replace(/ /g, "+"), latitude, longitude];
}

export default prompt;
