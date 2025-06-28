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
    enunciado: "Como a tecnologia influencia as relações sociais?",
    alternativas: [
      { texto: "Aproxima pessoas mesmo à distância.", afirmacao: "A tecnologia conectou você a amigos distantes." },
      { texto: "Afasta as pessoas no convívio presencial.", afirmacao: "Você percebe que as interações presenciais diminuíram." }
    ]
  },
  {
    enunciado: "Qual o papel da tecnologia na saúde?",
    alternativas: [
      { texto: "Melhora diagnósticos e tratamentos.", afirmacao: "Você acredita que a tecnologia salvou vidas." },
      { texto: "Pode gerar dependência de soluções automáticas.", afirmacao: "Você se preocupa com o uso excessivo de dispositivos na saúde." }
    ]
  },
  {
    enunciado: "Como a tecnologia afeta o meio ambiente?",
    alternativas: [
      { texto: "Ajuda no monitoramento ambiental.", afirmacao: "Você valoriza o uso de sensores e dados para proteger o planeta." },
      { texto: "Contribui para o aumento do lixo eletrônico.", afirmacao: "Você reconhece o impacto do descarte tecnológico no ambiente." }
    ]
  },
  {
    enunciado: "A tecnologia pode afetar a criatividade?",
    alternativas: [
      { texto: "Estimula a criação com novas ferramentas.", afirmacao: "Você acredita que a IA impulsiona a criatividade humana." },
      { texto: "Pode limitar a imaginação quando tudo é automatizado.", afirmacao: "Você teme que a automação reduza o pensamento criativo." }
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

  // Tornar o resultado falado
  const fala = new SpeechSynthesisUtterance(textoResultado.textContent);
  fala.lang = "pt-BR";
  speechSynthesis.speak(fala);
}

botaoReiniciar.addEventListener("click", iniciarJogo);
