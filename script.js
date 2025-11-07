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

// ======== FUNÇÃO VIRAR CARTA ========
function virarCarta(e) {
  const carta = e.currentTarget;
  if (bloquearTabuleiro || carta.classList.contains('virada') || carta.classList.contains('matched')) return;

  carta.classList.add('virada');
  cartasViradas.push(carta);
  nomesVirados.push(carta.dataset.nome);

  if (cartasViradas.length === 2) {
    checarPar();
  }
}
// ======== FUNÇÃO REINICIAR ========
const botaoReiniciar = document.getElementById('btn-reiniciar') || document.getElementById('restart-btn');

if (botaoReiniciar) {
  botaoReiniciar.addEventListener('click', reiniciarJogo);
}

function reiniciarJogo() {
  tentativas = 0;
  limiteTentativas = 20;
  paresEncontrados = 0;
  cartasViradas = [];
  nomesVirados = [];
  bloquearTabuleiro = false;

  atualizarPlacar();
  atualizarTentativasRestantes();

  cartasArray.sort(() => Math.random() - 0.5);
  criarTabuleiro();
}

