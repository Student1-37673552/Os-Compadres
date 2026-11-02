// Conteúdo editável do site. No futuro, estes dados passam a vir do painel de gestão.
// Para mostrar um preço, trocar o texto do prato por um objeto: { nome: "Bife à Compadres", preco: "00,00 €" }
window.COMPADRES = {
  // Índice 0 = domingo, como em Date.getDay()
  horario: [
    { dia: "Domingo", turnos: [["12:00", "15:00"], ["18:30", "22:00"]] },
    { dia: "Segunda-feira", turnos: [] },
    { dia: "Terça-feira", turnos: [] },
    { dia: "Quarta-feira", turnos: [["12:00", "15:00"], ["18:30", "22:00"]] },
    { dia: "Quinta-feira", turnos: [["12:00", "15:00"], ["18:30", "22:00"]] },
    { dia: "Sexta-feira", turnos: [["12:00", "15:00"], ["18:30", "22:00"]] },
    { dia: "Sábado", turnos: [["12:00", "15:00"], ["18:30", "22:00"]] }
  ],

  novidades: [
    "Bacalhau assado na cama, com grelos, batata a murro e beterraba",
    "Fatiota de coelho com batata frita e grelos salteados",
    "Arroz de gambas com grão"
  ],

  // Galeria. A primeira fotografia aparece maior e a segunda deve ser vertical.
  galeria: [
    { src: "assets/img/galeria-esplanada.jpg", largura: 1200, altura: 900, legenda: "Esplanada", alt: "Esplanada coberta à noite, com mesas postas e janelas amplas" },
    { src: "assets/img/galeria-entrada.jpg", largura: 1200, altura: 1442, legenda: "Vitrina", alt: "Vitrina refrigerada à entrada, por baixo da tabuleta do restaurante" },
    { src: "assets/img/galeria-sala-1.jpg", largura: 450, altura: 350, legenda: "Sala", alt: "Mesas postas com toalhas brancas, com a garrafeira ao fundo" },
    { src: "assets/img/galeria-sala-2.jpg", largura: 450, altura: 350, legenda: "Sala", alt: "Vista geral da sala, com várias mesas postas" },
    { src: "assets/img/galeria-sala-3.jpg", largura: 450, altura: 350, legenda: "Sala", alt: "Sala com candeeiros suspensos e grandes janelas" }
  ],

  // Grupos. Sem capacidade, essa linha não aparece; sem menus, a lista de menus também não.
  // ATENÇÃO: capacidade e menus de exemplo, a substituir antes de publicar.
  grupos: {
    capacidade: "00 pessoas",
    menus: [
      { nome: "Menu de exemplo A", preco: "00,00 € por pessoa", pratos: ["Entrada de exemplo", "Prato de exemplo", "Sobremesa de exemplo", "Bebidas de exemplo"] },
      { nome: "Menu de exemplo B", preco: "00,00 € por pessoa", pratos: ["Entrada de exemplo", "Prato de exemplo", "Sobremesa de exemplo", "Bebidas de exemplo"] }
    ]
  },

  // Destaque no topo da carta de vinhos. Sem opções, não aparece; o preço é opcional, por exemplo preco: "00,00 €".
  vinhoDaCasa: {
    descricao: "A escolha simples para acompanhar a refeição.",
    opcoes: [
      { nome: "Tinto" },
      { nome: "Branco" }
    ]
  },

  // Carta de vinhos. Um tipo sem vinhos não aparece no site; sem nenhum vinho, o separador também não.
  // Os vinhos são agrupados automaticamente pelo texto de "regiao", por isso tem de estar escrito sempre da mesma forma.
  // A região e o preço são opcionais; os vinhos sem região aparecem em "Outras regiões".
  // Para o sommelier, um vinho pode indicar as refeições a que combina: combina: ["carnes", "porco"].
  // Se nenhum vinho indicar uma refeição, o sommelier usa os "tipos" definidos em sommelier, mais abaixo.
  // ATENÇÃO: entradas de exemplo, a substituir pela carta real antes de publicar.
  vinhos: [
    {
      tipo: "Tintos",
      vinhos: [
        { nome: "Vinho tinto de exemplo", regiao: "Região A", preco: "00,00 €" },
        { nome: "Vinho tinto de exemplo", regiao: "Região A", preco: "00,00 €" },
        { nome: "Vinho tinto de exemplo", regiao: "Região B", preco: "00,00 €" }
      ]
    },
    {
      tipo: "Brancos",
      vinhos: [
        { nome: "Vinho branco de exemplo", regiao: "Região A", preco: "00,00 €" },
        { nome: "Vinho branco de exemplo", regiao: "Região B", preco: "00,00 €" }
      ]
    },
    {
      tipo: "Rosés",
      vinhos: [
        { nome: "Vinho rosé de exemplo", regiao: "Região A", preco: "00,00 €" }
      ]
    },
    {
      tipo: "Espumantes",
      vinhos: [
        { nome: "Espumante de exemplo", regiao: "Região B", preco: "00,00 €" }
      ]
    }
  ],

  // Refeições do sommelier. "tipos" está por ordem de preferência e usa os nomes de tipo da carta de vinhos.
  // ATENÇÃO: sugestões gerais, a validar pelo restaurante antes de publicar.
  sommelier: [
    {
      id: "carnes",
      nome: "Bifes e carnes grelhadas",
      exemplos: "Tomahawk, chuletón, naco, bifes",
      sugestao: "Um tinto encorpado acompanha bem a intensidade da carne grelhada.",
      tipos: ["Tintos"]
    },
    {
      id: "porco",
      nome: "Porco preto, alheira e coelho",
      exemplos: "Secretos, pianinho, alheira, fatiota de coelho",
      sugestao: "Um tinto de corpo médio combina com estas carnes sem as dominar. Um rosé também é boa opção.",
      tipos: ["Tintos", "Rosés"]
    },
    {
      id: "bacalhau",
      nome: "Bacalhau",
      exemplos: "Bacalhau à Casa",
      sugestao: "Um branco com corpo acompanha o azeite e os grelos. Quem prefere tinto pode optar por um mais leve.",
      tipos: ["Brancos", "Tintos"]
    },
    {
      id: "peixe",
      nome: "Peixe grelhado",
      exemplos: "Dourada, robalo, salmão, linguado",
      sugestao: "Um branco fresco respeita o sabor delicado do peixe.",
      tipos: ["Brancos"]
    },
    {
      id: "marisco",
      nome: "Marisco e gambas",
      exemplos: "Amêijoas à Bulhão Pato, arroz de gambas",
      sugestao: "Um branco fresco ou um espumante equilibram os sabores do mar.",
      tipos: ["Brancos", "Espumantes"]
    },
    {
      id: "picante",
      nome: "Caril e picante",
      exemplos: "Caril de gambas, gambas com malagueta",
      sugestao: "Um rosé ou um branco fresco ajudam a suavizar o picante.",
      tipos: ["Rosés", "Brancos"]
    },
    {
      id: "petiscos",
      nome: "Petiscos para partilhar",
      exemplos: "Moelas, enchidos, ovos rotos, pregos",
      sugestao: "Um rosé ou um espumante acompanham bem uma mesa com sabores variados.",
      tipos: ["Rosés", "Espumantes", "Tintos"]
    },
    {
      id: "vegetariano",
      nome: "Pratos vegetarianos",
      exemplos: "À Brás sem frango, hambúrguer de legumes",
      sugestao: "Um branco ou um rosé leves deixam brilhar os legumes.",
      tipos: ["Brancos", "Rosés"]
    },
    {
      id: "sobremesa",
      nome: "Sobremesa",
      exemplos: "Doces caseiros, fruta da época",
      sugestao: "Um espumante é uma forma fresca de terminar a refeição.",
      tipos: ["Espumantes"]
    }
  ],

  ementa: [
    {
      categoria: "Especialidades",
      pratos: [
        "Chuletón com batata frita e arroz de feijão",
        "Tomahawk com batata frita e arroz de feijão (3 pessoas)",
        "Naco da vazia selado com gambas",
        "Naco da vazia em cama de grelos e batata frita, com molho de mostarda e mel",
        "Arroz de gambas com grão",
        "Caril de gambas picante com arroz basmati e frutos secos",
        "Bacalhau à Casa com grelos, batata a murro, beterraba e azeite quente (2 pessoas)",
        "Fatiota de coelho com grelos salteados, batata frita, beterraba e molho vinagrete"
      ]
    },
    {
      categoria: "Petiscos",
      pratos: [
        "Pão de alho",
        "Pão torrado com manteiga",
        "Ovos rotos com plumilha de presunto",
        "Espargos com farinheira e ovo",
        "Farinheira com ovo",
        "Pernas de rã",
        "Gambas à Guilho",
        "Gambas com malagueta",
        "Gambas à Brás",
        "Moelas em molho de tomate",
        "Pica-pau de vaca",
        "Amêijoas à Bulhão Pato",
        "Morcela assada",
        "Enchidos salteados",
        "Prego no bolo do caco",
        "Prego no pão"
      ]
    },
    {
      categoria: "Carne",
      pratos: [
        "Secretos na grelha",
        "Pianinho na grelha",
        "Alheira de caça com grelos, batata frita e ovo estrelado",
        "Alheira mirandesa com grelos, batata frita e ovo estrelado",
        "Bife na frigideira",
        "Bife à Compadres",
        "Bife à pimenta",
        "Bife grelhado com manteiga de ervas, salada e batata frita",
        "Bife à café",
        "Bife à Portugal",
        "Bife à portuguesa com batata frita às rodelas e bacon",
        "Bife com natas",
        "Bife à mostarda",
        "Bitoque à Casa"
      ]
    },
    {
      categoria: "Peixe",
      pratos: [
        "Dourada grelhada",
        "Robalo na grelha",
        "Salmão na grelha",
        "Peixe-espada preto na grelha",
        "Linguado na grelha"
      ]
    },
    {
      categoria: "Vegetariano",
      pratos: [
        "À Brás sem frango",
        "Hambúrguer de legumes com salada ou grelos salteados"
      ]
    },
    {
      categoria: "Menu infantil",
      pratos: [
        "Prego no prato",
        "Salsichas no prato com ovo",
        "Hambúrguer no prato com ovo"
      ]
    },
    {
      categoria: "Couvert e pão",
      pratos: [
        "Queijo",
        "Pão",
        "Azeitonas",
        "Manteiga (unidade)",
        "Prato de presunto de pata negra",
        "Pão de alho com queijo",
        "Pão torrado",
        "Pão torrado com manteiga"
      ]
    },
    {
      categoria: "Acompanhamentos",
      pratos: [
        "Molho cocktail ou maionese de alho",
        "Ovo",
        "Salada de pimentos",
        "Salada de tomate",
        "Salada mista",
        "Grelos ou feijão-verde salteado",
        "Arroz",
        "Batatas fritas"
      ]
    },
    {
      categoria: "Sobremesas",
      pratos: [
        "Cheesecake",
        "Mel e noz",
        "Pudim de ovos",
        "Tarte de mousse de chocolate crocante",
        "Mousse",
        "Baba de camelo",
        "Serradura",
        "Pavlova",
        "Folhado de ovo",
        "Pão de rala",
        "Queijo conventual",
        "Encharcado de chocolate",
        "Quindim",
        "Tarte de amêndoa",
        "Molotof",
        "Tecolameco",
        "Tarte Rainha Santa Isabel",
        "Sericaia",
        "Fruta da época"
      ]
    },
    {
      categoria: "Bebidas",
      grupos: [
        { titulo: "Sangria", pratos: ["Sangria tinta", "Sangria branca", "Sangria espumante 1,3 l"] },
        {
          titulo: "Cervejas e sidras",
          pratos: [
            "Sagres garrafa",
            "Super Bock garrafa",
            "Super Bock pressão",
            "Super Bock Stout garrafa",
            "Super Bock Stout pressão",
            "Super Bock Free sem álcool",
            "Cerveja Seleção 1927",
            "Somersby"
          ]
        },
        {
          titulo: "Outras bebidas",
          pratos: [
            "Vinho da casa tinto ou branco",
            "Água Vitalis",
            "Pedras Salgadas",
            "Pedras Limão",
            "Refrigerantes",
            "Café / descafeinado"
          ]
        }
      ]
    }
  ]
};
