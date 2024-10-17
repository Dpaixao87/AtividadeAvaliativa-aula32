// Lista de imagens para o jogo, com cada imagem aparecendo duas vezes para formar os pares.
const images = [
    './assets/MT03.jpg', './assets/MT03.jpg',
    './assets/R1.jpg', './assets/R1.jpg',
    './assets/R3.jpg', './assets/R3.jpg',
    './assets/R6.jpg', './assets/R6.jpg',
    './assets/R7.jpg', './assets/R7.jpg',
    './assets/R9.jpg', './assets/R9.jpg',
    './assets/R15.jpg', './assets/R15.jpg',
    './assets/Yamaha.png', './assets/Yamaha.png'
];

// Elementos do DOM para o tabuleiro do jogo e exibição do timer.
let gameBoard = document.getElementById('jogo');
let timerDisplay = document.getElementById('timer');

// Variáveis para armazenar cartas viradas, cartas combinadas, tempo e timer.
let flippedCards = [];
let matchedCards = [];
let seconds = 0;
let timer;

// Inicializa o jogo, configurando o timer e criando o tabuleiro.
function initGame() {
    clearInterval(timer); // Limpa o timer anterior.
    seconds = 0; // Reinicia o tempo.
    timerDisplay.textContent = 'Tempo: 0s'; // Reinicia a exibição do tempo.
    matchedCards = []; // Limpa as cartas combinadas.
    flippedCards = []; // Limpa as cartas viradas.
    createBoard(); // Cria um novo tabuleiro.
}

// Cria o tabuleiro do jogo, embaralhando as cartas.
function createBoard() {
    gameBoard.innerHTML = ''; // Limpa o tabuleiro atual.
    shuffleCards(); // Embaralha as cartas.
    
    // Para cada imagem, cria uma caixa.
    images.forEach(image => {
        const card = document.createElement('div'); // Cria um elemento div para a caixa.
        card.classList.add('Yamaha'); // Adiciona a classe a caixa.
        card.dataset.value = image; // Armazena o valor da imagem.
        card.style.backgroundImage = ''; // Limpa a imagem inicial.
        card.addEventListener('click', () => flipCard(card)); // Adiciona um evento de clique na caixa.
        gameBoard.appendChild(card); // Adiciona caixa ao tabuleiro.
    });
}

// Embaralha a lista de imagens aleatoriamente.
function shuffleCards() {
    images.sort(() => 0.5 - Math.random()); // Embaralha as imagens.
}

// Evento de virada de uma caixa.
function flipCard(card) {
    // Verifica se é possível virar a caixa.
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.style.backgroundImage = `url(${card.dataset.value})`; // Define a imagem da caixa.
        card.classList.add('flipped'); // Marca a caixa como virado.
        flippedCards.push(card); // Adiciona a caixa à lista de virados.

        // Se for a primeira caixa virada, inicia o timer.
        if (flippedCards.length === 1) {
            startTimer();
        }

        // Se as duas caixas estiverem virados, verifica se eles combinam.
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000); // Verifica a combinação após um segundo.
        }
    }
}

// Verifica se as duas caixas viradas combinam.
function checkMatch() {
    const [firstCard, secondCard] = flippedCards; // Desestrutura as caixas viradas.
    
    // Compara os valores dos cartões.
    if (firstCard.dataset.value === secondCard.dataset.value) {
        // Se combinarem, marca os cartões como combinados.
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard); // Adiciona os cartões combinados à lista.
        checkGameOver(); // Verifica se o jogo terminou.
    } else {
        // Se não combinarem, vira os cartões de volta após um pequeno atraso.
        firstCard.style.backgroundImage = '';
        secondCard.style.backgroundImage = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }
    
    flippedCards = []; // Limpa a lista de cartões virados.
}

// Verifica se todas as cartas foram combinadas, indicando que o jogo terminou.
function checkGameOver() {
    if (matchedCards.length === images.length) {
        clearInterval(timer); // Para o timer.
        alert(` Você é um mestre das memórias! Finalizou o jogo em ${seconds} segundos.`); // Exibe uma mensagem de sucesso.
    }
}

// Inicia o timer para contar o tempo do jogo.
function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            seconds++; // Incrementa os segundos.
            timerDisplay.textContent = `Tempo: ${seconds}s`; // Atualiza a exibição do tempo.
        }, 1000);
    }
}

// Adiciona um evento para reiniciar o jogo quando o botão "MISTURAR" é clicado.
document.getElementById('MISTURAR').addEventListener('click', initGame);

// Inicializa o jogo ao carregar a página.
initGame();
