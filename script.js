// ======== VARIÁVEIS GLOBAIS ========
const cartasArray = [
  { nome: '🐱', img: '🐱' },
  { nome: '🐱', img: '🐱' },
  { nome: '🐶', img: '🐶' },
  { nome: '🐶', img: '🐶' },
  { nome: '🐸', img: '🐸' },
  { nome: '🐸', img: '🐸' },
  { nome: '🐰', img: '🐰' },
  { nome: '🐰', img: '🐰' },
  { nome: '🐼', img: '🐼' },
  { nome: '🐼', img: '🐼' },
  { nome: '🦊', img: '🦊' },
  { nome: '🦊', img: '🦊' },
];

let cartasViradas = [];
let nomesVirados = [];
let tentativas = 0;
let bloquearTabuleiro = false;
let limiteTentativas = 20;
let paresEncontrados = 0;
