import fs from 'fs';
const path = './models/previousStates.json';

export async function readState(lotName) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  return data[lotName] || null;
}

export async function writeState(lotName, newState) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data[lotName] = newState;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
