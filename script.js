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


function reiniciarJogo() {
  // Reseta variáveis globais
  tentativas = 0;
  limiteTentativas = 20;
  paresEncontrados = 0;
  cartasViradas = [];
  nomesVirados = [];
  bloquearTabuleiro = false;

  // Atualiza placares
  atualizarPlacar();
  atualizarTentativasRestantes();

  // Embaralha novamente
  cartasArray.sort(() => Math.random() - 0.5);

  // Recria o tabuleiro
  criarTabuleiro();
}
// ======== FUNÇÃO CHECAR PAR ========
function checarPar() {
  tentativas++;
  atualizarPlacar();
  bloquearTabuleiro = true;

  if (nomesVirados[0] === nomesVirados[1]) {
    cartasViradas.forEach((c) => c.classList.add('matched'));
    paresEncontrados++;

    if (paresEncontrados === cartasArray.length / 2) {
      setTimeout(() => alert(`🏆 Vitória em ${tentativas} tentativas!`), 300);
    }

    resetarSelecao();
  } else {
    limiteTentativas--;
    atualizarTentativasRestantes();

    // Espera 1 segundo antes de desvirar
    setTimeout(() => {
      cartasViradas.forEach((c) => c.classList.remove('virada'));
      resetarSelecao();

      // Depois de desvirar, verifica se acabou o limite
      if (limiteTentativas <= 0) {
        setTimeout(() => alert('💀 GAME OVER! Tente novamente.'), 300);
      }
    }, 1000);
  }
}

// ======== FUNÇÕES AUXILIARES ========
function atualizarPlacar() {
  placar.textContent = `Tentativas: ${tentativas}`;
}

function atualizarTentativasRestantes() {
  tentativasRestantes.textContent = `Tentativas Restantes: ${limiteTentativas}`;
}

function resetarSelecao() {
  cartasViradas = [];
  nomesVirados = [];
  bloquearTabuleiro = false;
}

// ======== FUNÇÃO DICA ========
document.getElementById('btn-dica').addEventListener('click', () => {
  const naoEncontradas = [...document.querySelectorAll('.carta:not(.matched)')];
  if (naoEncontradas.length < 2) return;

  // Pega um par aleatório ainda não virado
  const nomesRestantes = {};
  naoEncontradas.forEach((c) => {
    nomesRestantes[c.dataset.nome] = (nomesRestantes[c.dataset.nome] || 0) + 1;
  });

  const par = Object.keys(nomesRestantes).find((n) => nomesRestantes[n] === 2);
  if (!par) return;

  const cartasDoPar = naoEncontradas.filter((c) => c.dataset.nome === par);
  cartasDoPar.forEach((c) => c.classList.add('virada'));

  // Desvira depois de 3 segundos
  setTimeout(() => {
    cartasDoPar.forEach((c) => {
      if (!c.classList.contains('matched')) c.classList.remove('virada');
    });
  }, 3000);
});

// ======== FUNÇÃO TEMA ESCURO ========
const botaoTema = document.getElementById('btn-tema');
botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  botaoTema.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Modo Claro'
    : '🌙 Modo Escuro';
});
