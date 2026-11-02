(function () {
  "use strict";

  var dados = window.COMPADRES;

  function criar(tag, classe, texto) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
  }

  function emMinutos(hora) {
    var partes = hora.split(":");
    return Number(partes[0]) * 60 + Number(partes[1]);
  }

  // O estado depende sempre da hora de Lisboa, mesmo que o visitante esteja noutro fuso horário.
  function agoraEmLisboa() {
    var partes = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Lisbon",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());
    var valor = {};
    partes.forEach(function (p) { valor[p.type] = p.value; });
    return {
      dia: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(valor.weekday),
      minutos: Number(valor.hour) * 60 + Number(valor.minute)
    };
  }

  function estadoAtual() {
    var agora = agoraEmLisboa();
    var hoje = dados.horario[agora.dia].turnos;

    for (var i = 0; i < hoje.length; i++) {
      if (agora.minutos >= emMinutos(hoje[i][0]) && agora.minutos < emMinutos(hoje[i][1])) {
        return { aberto: true, texto: "Aberto agora, até às " + hoje[i][1] };
      }
      if (agora.minutos < emMinutos(hoje[i][0])) {
        return { aberto: false, texto: "Fechado agora. Abre hoje às " + hoje[i][0] };
      }
    }

    for (var n = 1; n <= 7; n++) {
      var indice = (agora.dia + n) % 7;
      var turnos = dados.horario[indice].turnos;
      if (turnos.length) {
        var quando = n === 1 ? "amanhã" : dados.horario[indice].dia.toLowerCase();
        return { aberto: false, texto: "Fechado agora. Abre " + quando + " às " + turnos[0][0] };
      }
    }
    return { aberto: false, texto: "Fechado agora" };
  }

  function mostrarEstado() {
    var el = document.querySelector("[data-estado]");
    var estado = estadoAtual();
    el.classList.toggle("estado--aberto", estado.aberto);
    el.querySelector("[data-estado-texto]").textContent = estado.texto;
  }

  function mostrarHorario() {
    var corpo = document.querySelector("[data-horario]");
    var hoje = agoraEmLisboa().dia;
    // Mostra a semana a começar à segunda-feira
    [1, 2, 3, 4, 5, 6, 0].forEach(function (i) {
      var dia = dados.horario[i];
      var linha = criar("tr", i === hoje ? "hoje" : "");
      var nome = criar("th", "", dia.dia);
      nome.scope = "row";
      if (i === hoje) nome.appendChild(criar("span", "hoje__marca", "hoje"));
      linha.appendChild(nome);
      var horas = dia.turnos.map(function (t) { return t[0] + "–" + t[1]; }).join(" · ");
      linha.appendChild(criar("td", "", horas || "Encerrado"));
      corpo.appendChild(linha);
    });
  }

  function mostrarNovidades() {
    var lista = document.querySelector("[data-novidades]");
    dados.novidades.forEach(function (n) { lista.appendChild(criar("li", "", n)); });
  }

  function listaDePratos(pratos) {
    var ul = criar("ul", "ementa__lista");
    pratos.forEach(function (prato) {
      var nome = typeof prato === "string" ? prato : prato.nome;
      var li = criar("li");
      li.appendChild(criar("span", "ementa__nome", nome));
      if (prato.preco) li.appendChild(criar("span", "ementa__preco", prato.preco));
      ul.appendChild(li);
    });
    return ul;
  }

  // Agrupa pela ordem da lista; os vinhos sem região ficam no fim
  function porRegiao(vinhos) {
    var regioes = [];
    vinhos.filter(function (v) { return v.regiao; }).forEach(function (v) {
      var regiao = regioes.filter(function (r) { return r.titulo === v.regiao; })[0];
      if (!regiao) {
        regiao = { titulo: v.regiao, pratos: [] };
        regioes.push(regiao);
      }
      regiao.pratos.push(v);
    });
    var semRegiao = vinhos.filter(function (v) { return !v.regiao; });
    if (semRegiao.length) {
      regioes.push({ titulo: regioes.length ? "Outras regiões" : "", pratos: semRegiao });
    }
    return regioes;
  }

  function categoriaVinhos() {
    var grupos = dados.vinhos
      .filter(function (t) { return t.vinhos.length; })
      .map(function (t) { return { titulo: t.tipo, regioes: porRegiao(t.vinhos) }; });
    var temVinhoDaCasa = dados.vinhoDaCasa.opcoes.length > 0;
    if (!grupos.length && !temVinhoDaCasa) return null;
    return { categoria: "Carta de vinhos", grupos: grupos, vinhoDaCasa: temVinhoDaCasa };
  }

  function blocoVinhoDaCasa() {
    var bloco = criar("div", "vinho-casa");
    var texto = criar("div");
    texto.appendChild(criar("h3", "vinho-casa__titulo", "Vinho da casa"));
    if (dados.vinhoDaCasa.descricao) texto.appendChild(criar("p", "", dados.vinhoDaCasa.descricao));
    bloco.appendChild(texto);
    bloco.appendChild(listaDePratos(dados.vinhoDaCasa.opcoes));
    return bloco;
  }

  function grelhaDeRegioes(regioes) {
    var grelha = criar("div", "ementa__regioes");
    regioes.forEach(function (regiao) {
      var bloco = criar("div");
      if (regiao.titulo) bloco.appendChild(criar("h4", "ementa__regiao", regiao.titulo));
      bloco.appendChild(listaDePratos(regiao.pratos));
      grelha.appendChild(bloco);
    });
    return grelha;
  }

  function mostrarEmenta() {
    var separadores = document.querySelector("[data-separadores]");
    var paineis = document.querySelector("[data-paineis]");
    var botoes = [];
    var vinhos = categoriaVinhos();
    var categorias = vinhos ? dados.ementa.concat(vinhos) : dados.ementa;

    // Sem carta de vinhos, o texto da casa fica sem ligação para ela
    document.querySelectorAll("[data-abrir-vinhos]").forEach(function (ligacao) {
      if (vinhos) {
        ligacao.addEventListener("click", function () { selecionar(categorias.length - 1); });
      } else {
        ligacao.replaceWith(ligacao.textContent);
      }
    });

    function selecionar(indice, focar) {
      botoes.forEach(function (botao, i) {
        var ativo = i === indice;
        botao.setAttribute("aria-selected", String(ativo));
        botao.tabIndex = ativo ? 0 : -1;
        document.getElementById(botao.getAttribute("aria-controls")).hidden = !ativo;
      });
      // No telemóvel os separadores deslizam: mantém o ativo à vista
      separadores.scrollLeft = botoes[indice].offsetLeft - separadores.offsetLeft - 20;
      if (focar) botoes[indice].focus();
    }

    categorias.forEach(function (secao, i) {
      var botao = criar("button", "ementa__separador", secao.categoria);
      botao.type = "button";
      botao.id = "separador-" + i;
      botao.setAttribute("role", "tab");
      botao.setAttribute("aria-controls", "painel-" + i);
      botao.addEventListener("click", function () { selecionar(i); });
      separadores.appendChild(botao);
      botoes.push(botao);

      var painel = criar("div", "ementa__painel");
      painel.id = "painel-" + i;
      painel.setAttribute("role", "tabpanel");
      painel.setAttribute("aria-labelledby", botao.id);
      painel.tabIndex = 0;
      if (secao.vinhoDaCasa) painel.appendChild(blocoVinhoDaCasa());
      if (secao.grupos) {
        secao.grupos.forEach(function (grupo) {
          painel.appendChild(criar("h3", "ementa__grupo", grupo.titulo));
          painel.appendChild(grupo.regioes ? grelhaDeRegioes(grupo.regioes) : listaDePratos(grupo.pratos));
        });
      } else {
        painel.appendChild(listaDePratos(secao.pratos));
      }
      paineis.appendChild(painel);
    });

    separadores.addEventListener("keydown", function (e) {
      var atual = botoes.indexOf(document.activeElement);
      if (atual === -1) return;
      var alvo = null;
      if (e.key === "ArrowRight") alvo = (atual + 1) % botoes.length;
      if (e.key === "ArrowLeft") alvo = (atual - 1 + botoes.length) % botoes.length;
      if (e.key === "Home") alvo = 0;
      if (e.key === "End") alvo = botoes.length - 1;
      if (alvo !== null) {
        e.preventDefault();
        selecionar(alvo, true);
      }
    });

    selecionar(0);
  }

  function todosOsVinhos() {
    var lista = [];
    dados.vinhos.forEach(function (t) {
      t.vinhos.forEach(function (v, ordem) {
        lista.push({ nome: v.nome, regiao: v.regiao, preco: v.preco, combina: v.combina || [], tipo: t.tipo, ordem: ordem });
      });
    });
    return lista;
  }

  function sugerirVinhos(refeicao, preferencia) {
    var vinhos = todosOsVinhos();
    var indicados = vinhos.filter(function (v) { return v.combina.indexOf(refeicao.id) !== -1; });
    var base = indicados.length ? indicados : vinhos.filter(function (v) { return refeicao.tipos.indexOf(v.tipo) !== -1; });

    // Alterna entre os tipos sugeridos, para não preencher tudo só com o primeiro
    function peso(v) { return v.ordem * 10 + refeicao.tipos.indexOf(v.tipo); }
    base.sort(function (a, b) { return peso(a) - peso(b); });

    if (preferencia) {
      var escolhidos = base.filter(function (v) { return v.tipo === preferencia; });
      if (!escolhidos.length) escolhidos = vinhos.filter(function (v) { return v.tipo === preferencia; });
      base = escolhidos;
    }
    return base.slice(0, 3);
  }

  function opcao(nome, valor, titulo, detalhe, marcada) {
    var label = criar("label", "opcao");
    var input = criar("input");
    input.type = "radio";
    input.name = nome;
    input.value = valor;
    input.checked = Boolean(marcada);
    var caixa = criar("span", "opcao__caixa", titulo);
    if (detalhe) caixa.appendChild(criar("small", "", detalhe));
    label.appendChild(input);
    label.appendChild(caixa);
    return label;
  }

  function mostrarSommelier() {
    var seccao = document.getElementById("sommelier");
    var vinhos = todosOsVinhos();
    // Sem vinhos na carta, não há nada para sugerir
    if (!vinhos.length) {
      seccao.hidden = true;
      document.querySelector('a[href="#sommelier"]').hidden = true;
      return;
    }

    var formulario = seccao.querySelector("form");
    var resultado = seccao.querySelector("[data-resultado]");
    var refeicoes = seccao.querySelector("[data-refeicoes]");
    var preferencias = seccao.querySelector("[data-preferencias]");

    dados.sommelier.forEach(function (r) {
      refeicoes.appendChild(opcao("refeicao", r.id, r.nome, r.exemplos));
    });
    preferencias.appendChild(opcao("preferencia", "", "Sem preferência", "", true));
    dados.vinhos.forEach(function (t) {
      if (t.vinhos.length) preferencias.appendChild(opcao("preferencia", t.tipo, t.tipo));
    });

    function atualizar() {
      var id = formulario.elements.refeicao.value;
      var preferencia = formulario.elements.preferencia.value;
      var refeicao = dados.sommelier.filter(function (r) { return r.id === id; })[0];
      if (!refeicao) return;

      var sugeridos = sugerirVinhos(refeicao, preferencia);
      var classica = !preferencia || refeicao.tipos.indexOf(preferencia) !== -1;

      resultado.textContent = "";
      resultado.appendChild(criar("h3", "sommelier__titulo", "Para " + refeicao.nome.toLowerCase()));
      resultado.appendChild(criar("p", "sommelier__sugestao", classica
        ? refeicao.sugestao
        : "Não é a combinação mais clássica, mas o melhor vinho é o de que mais gosta. " + refeicao.sugestao));

      if (sugeridos.length) {
        var ul = criar("ul", "sommelier__vinhos");
        sugeridos.forEach(function (v) {
          var li = criar("li");
          var nome = criar("span", "sommelier__vinho", v.nome);
          nome.appendChild(criar("small", "", [v.tipo.replace(/s$/, ""), v.regiao].filter(Boolean).join(" · ")));
          li.appendChild(nome);
          if (v.preco) li.appendChild(criar("span", "ementa__preco", v.preco));
          ul.appendChild(li);
        });
        resultado.appendChild(ul);
      } else {
        resultado.appendChild(criar("p", "", "De momento não temos um vinho deste tipo na carta. A nossa equipa ajuda-o a escolher outro."));
      }
    }

    formulario.addEventListener("change", function () {
      atualizar();
      // No telemóvel a sugestão fica por baixo das opções
      if (formulario.elements.refeicao.value) {
        seccao.querySelector(".sommelier__resposta").scrollIntoView({ block: "nearest" });
      }
    });
    formulario.addEventListener("submit", function (e) { e.preventDefault(); });
  }

  function ativarMenuMovel() {
    var botao = document.querySelector(".topo__menu");
    var nav = document.getElementById("navegacao");

    function definir(aberto) {
      botao.setAttribute("aria-expanded", String(aberto));
      nav.classList.toggle("aberta", aberto);
    }

    botao.addEventListener("click", function () {
      definir(botao.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") definir(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") definir(false);
    });
  }

  mostrarEstado();
  setInterval(mostrarEstado, 60000);
  mostrarHorario();
  mostrarNovidades();
  mostrarEmenta();
  mostrarSommelier();
  ativarMenuMovel();
  document.querySelector("[data-ano]").textContent = new Date().getFullYear();
})();
