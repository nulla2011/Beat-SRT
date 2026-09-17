import './style.css';
import validate from './validate';
import generateSRT from './generateSRT';

const startH: HTMLInputElement = document.querySelector('#startH')!;
const startM: HTMLInputElement = document.querySelector('#startM')!;
const startS: HTMLInputElement = document.querySelector('#startS')!;
const lengthH: HTMLInputElement = document.querySelector('#lengthH')!;
const lengthM: HTMLInputElement = document.querySelector('#lengthM')!;
const lengthS: HTMLInputElement = document.querySelector('#lengthS')!;
const BPM: HTMLInputElement = document.querySelector('#BPM')!;
const sigTop: HTMLInputElement = document.querySelector('#sigTop')!;
const sigBottom: HTMLInputElement = document.querySelector('#sigBottom')!;
const button: HTMLButtonElement = document.querySelector('#generate')!;

const validateAll = () => {
  validate(startH, 'H');
  validate(lengthH, 'H');
  validate(startM, 'M');
  validate(lengthM, 'M');
  validate(startS, 'S');
  validate(lengthS, 'S');
  validate(BPM, 'BPM');
  validate(sigTop, 'Beat');
  validate(sigBottom, 'Beat');
};
const generate = () => {
  button.addEventListener('click', () => {
    const SRT = generateSRT(
      { H: parseInt(startH.value), M: parseInt(startM.value), S: parseFloat(startS.value) },
      { H: parseInt(lengthH.value), M: parseInt(lengthM.value), S: parseFloat(lengthS.value) },
      parseFloat(BPM.value),
      parseInt(sigTop.value),
      parseInt(sigBottom.value)
    );
    const blob = new Blob([SRT], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${BPM.value}.srt`;
    a.click();
    URL.revokeObjectURL(url);
  });
};

const main = () => {
  validateAll();
  generate();
};

main();
