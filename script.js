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

// ======== EMBARALHAR ========
cartasArray.sort(() => Math.random() - 0.5);

// ======== CRIAR TABULEIRO ========
const tabuleiro = document.getElementById('tabuleiro');
const placar = document.getElementById('placar');
const tentativasRestantes = document.getElementById('tentativas-restantes');

function criarTabuleiro() {
  tabuleiro.innerHTML = '';
  cartasArray.forEach((item) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.nome = item.nome;

    const frente = document.createElement('div');
    frente.classList.add('face', 'frente');
    frente.textContent = item.img;

    const verso = document.createElement('div');
    verso.classList.add('face', 'verso');
    verso.textContent = '❓';

    carta.appendChild(frente);
    carta.appendChild(verso);
    carta.addEventListener('click', virarCarta);
    tabuleiro.appendChild(carta);
  });
}

criarTabuleiro();
atualizarPlacar();
