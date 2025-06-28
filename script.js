const telaInicial = document.querySelector(".tela-inicial");
const botaoIniciar = document.querySelector(".iniciar-btn");
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.querySelector(".botao-reiniciar");

const perguntas = [
  {
    enunciado: "Como a tecnologia impacta o mercado de trabalho?",
    alternativas: [
      { texto: "Cria novas oportunidades.", afirmacao: "A tecnologia trouxe novas profissões." },
      { texto: "Elimina empregos antigos.", afirmacao: "Alguns empregos deixaram de existir com a automação." }
    ]
  },
  {
    enunciado: "Como a tecnologia afeta a educação?",
    alternativas: [
      { texto: "Facilita o aprendizado com IA.", afirmacao: "Você valorizou o uso de IA na educação." },
      { texto: "Pode dificultar se usada sem critério.", afirmacao: "Você demonstrou preocupação com o uso excessivo da tecnologia." }
    ]
  }
];

let atual = 0;
let historiaFinal = "";

botaoIniciar.addEventListener("click", () => {
  new Audio("click2.wav").play();
  telaInicial.classList.add("escondido");
  caixaPrincipal.classList.remove("escondido");
  iniciarJogo();
});

function iniciarJogo() {
  atual = 0;
  historiaFinal = "";
  textoResultado.textContent = "";
  botaoReiniciar.style.display = "none";
  mostrarPergunta();
}

function mostrarPergunta() {
  if (atual >= perguntas.length) {
    mostrarResultado();
    return;
  }

  const pergunta = perguntas[atual];
  caixaPerguntas.textContent = pergunta.enunciado;
  caixaAlternativas.innerHTML = "";

  pergunta.alternativas.forEach((alt) => {
    const botao = document.createElement("button");
    botao.textContent = alt.texto;
    botao.classList.add("botao-alternativa");
    botao.addEventListener("click", () => {
      new Audio("click.mp3").play();
      historiaFinal += alt.afirmacao + " ";
      atual++;
      mostrarPergunta();
    });
    caixaAlternativas.appendChild(botao);
  });
}

function mostrarResultado() {
  caixaPerguntas.textContent = "Em 2049...";
  textoResultado.textContent = historiaFinal.trim();
  caixaAlternativas.innerHTML = "";
  botaoReiniciar.style.display = "inline-block";
}

botaoReiniciar.addEventListener("click", iniciarJogo);
