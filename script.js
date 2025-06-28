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
  },
  {
    enunciado: "Quais os efeitos sociais das redes sociais?",
    alternativas: [
      { texto: "Aproximam pessoas.", afirmacao: "Você acredita que as redes sociais conectam pessoas." },
      { texto: "Podem causar isolamento.", afirmacao: "Você percebeu os riscos do isolamento digital." }
    ]
  },
  {
    enunciado: "O que a automação pode significar para a indústria?",
    alternativas: [
      { texto: "Maior eficiência e produção.", afirmacao: "Você entendeu que a automação melhora a eficiência." },
      { texto: "Desemprego e requalificação.", afirmacao: "Você considerou o impacto na requalificação profissional." }
    ]
  },
  {
    enunciado: "Como a tecnologia pode ajudar o meio ambiente?",
    alternativas: [
      { texto: "Monitorando e reduzindo impactos.", afirmacao: "Você reconheceu o papel da tecnologia na sustentabilidade." },
      { texto: "Pode gerar poluição eletrônica.", afirmacao: "Você está atento à poluição tecnológica." }
    ]
  }
];

let atual = 0;
let historiaFinal = "";

botaoIniciar.addEventListener("click", () => {
  telaInicial.classList.add("escondido");
  caixaPrincipal.classList.remove("escondido");
  iniciarJogo();
});

function iniciarJogo() {
  atual = 0;
  historiaFinal = "";
  textoResultado.textContent = "";
  botaoReiniciar.classList.add("escondido");
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
  botaoReiniciar.classList.remove("escondido");

  // Falar o resultado em voz alta
  if ('speechSynthesis' in window) {
    const fala = new SpeechSynthesisUtterance(historiaFinal.trim());
    fala.lang = 'pt-BR';
    window.speechSynthesis.speak(fala);
  }
}

botaoReiniciar.addEventListener("click", iniciarJogo);

// Confetes animados

function criarConfete() {
  const confete = document.createElement("div");
  confete.classList.add("confete");

  confete.style.left = Math.random() * window.innerWidth + "px";
  confete.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
  const size = 8 + Math.random() * 12;
  confete.style.width = size + "px";
  confete.style.height = size + "px";
  confete.style.animationDuration = 3 + Math.random() * 3 + "s";
  confete.style.animationDelay = Math.random() * 5 + "s";

  document.body.appendChild(confete);

  setTimeout(() => {
    confete.remove();
  }, 7000);
}

function soltarConfetes() {
  setInterval(criarConfete, 300);
}

window.addEventListener("load", soltarConfetes);
