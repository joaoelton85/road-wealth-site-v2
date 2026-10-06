export type GlossaryItem = {
  term: string;
  definition: string;
  why: string;
  tags: string[];
  fgc?: "SIM" | "NÃO";
  issuer?: string;
  related?: string[];
};

export const glossaryItems: GlossaryItem[] = [
  {
    "term": "Ação",
    "definition": "Uma pequena parte de uma empresa. Quem compra uma ação passa a ter participação econômica naquela companhia e fica exposto à valorização ou desvalorização do negócio.",
    "why": "Ajuda a entender por que ações podem oscilar bastante: o preço reflete expectativas sobre empresas, lucros, juros e economia.",
    "tags": [
      "Bolsa",
      "Renda variável"
    ],
    "related": [
      "Bolsa de Valores",
      "Dividendos",
      "IBOV"
    ]
  },
  {
    "term": "Alocação de ativos",
    "definition": "É a forma de distribuir o patrimônio entre diferentes tipos de investimento, como renda fixa, ações, fundos, imóveis, moedas e ativos internacionais.",
    "why": "A combinação entre os investimentos costuma ser tão importante quanto a escolha de cada produto isoladamente.",
    "tags": [
      "Carteira",
      "Planejamento"
    ],
    "related": [
      "Diversificação",
      "Rebalanceamento",
      "Correlação"
    ]
  },
  {
    "term": "Amortização",
    "definition": "É a devolução gradual de parte de uma dívida ou do valor principal de um investimento.",
    "why": "Em financiamentos reduz o saldo devedor; em alguns investimentos pode representar devoluções parciais do capital antes do vencimento final.",
    "tags": [
      "Bancos & crédito",
      "Renda fixa"
    ],
    "related": [
      "SAC",
      "Tabela Price",
      "Vencimento"
    ]
  },
  {
    "term": "Aporte",
    "definition": "É a entrada de novos recursos em um investimento, fundo, previdência ou carteira.",
    "why": "Aportes recorrentes podem ser parte importante de um planejamento de longo prazo.",
    "tags": [
      "Carteira",
      "Previdência"
    ],
    "related": [
      "PGBL",
      "VGBL",
      "Alocação de ativos"
    ]
  },
  {
    "term": "AuM",
    "definition": "Sigla de Assets under Management, ou ativos sob gestão/acompanhamento. É uma medida do volume de patrimônio associado a uma gestora, fundo ou serviço.",
    "why": "Também pode ser usado como base de cálculo de alguns modelos de remuneração.",
    "tags": [
      "Custos & remuneração",
      "Mercado"
    ],
    "related": [
      "Fee sobre patrimônio",
      "Fee fixo"
    ]
  },
  {
    "term": "Aval",
    "definition": "É uma garantia pessoal em que alguém assume responsabilidade pelo pagamento de determinada obrigação caso o devedor não pague.",
    "why": "Quem concede aval pode ter seu patrimônio exposto à dívida de outra pessoa ou empresa.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "Fiança",
      "Garantia",
      "Garantia real"
    ]
  },
  {
    "term": "BDR",
    "definition": "É um certificado negociado no Brasil que representa valores mobiliários emitidos no exterior, como ações ou ETFs estrangeiros.",
    "why": "Permite exposição a ativos internacionais por meio da infraestrutura do mercado brasileiro.",
    "tags": [
      "Bolsa",
      "Exterior"
    ],
    "related": [
      "ETF",
      "Exposição cambial",
      "Moeda-base"
    ]
  },
  {
    "term": "Benchmark",
    "definition": "É uma referência usada para comparar o desempenho de um investimento ou estratégia.",
    "why": "Um fundo de ações pode se comparar ao Ibovespa; um fundo de renda fixa, ao CDI ou a um índice de títulos públicos.",
    "tags": [
      "Mercado",
      "Carteira"
    ],
    "related": [
      "CDI",
      "IBOV",
      "IMA-B"
    ]
  },
  {
    "term": "Bitcoin",
    "definition": "É um ativo digital negociado em uma rede descentralizada chamada Bitcoin, sem um banco central ou empresa responsável por sua emissão.",
    "why": "Seu preço pode variar muito e, no site da ROAD, aparece como uma referência de mercado cotada em dólares.",
    "tags": [
      "Mercados & índices",
      "Ativos digitais"
    ],
    "related": [
      "USD",
      "Volatilidade"
    ]
  },
  {
    "term": "Bolsa de Valores",
    "definition": "É o ambiente organizado em que são negociados ativos como ações, ETFs, fundos imobiliários e contratos futuros.",
    "why": "No Brasil, a principal infraestrutura de negociação é a B3.",
    "tags": [
      "Bolsa",
      "Mercado"
    ],
    "related": [
      "Ação",
      "ETF",
      "FII",
      "Ticker"
    ]
  },
  {
    "term": "Câmbio",
    "definition": "É a conversão de uma moeda em outra, como reais em dólares ou euros.",
    "why": "O valor final depende da cotação utilizada, do spread de câmbio, de tributos e, eventualmente, de outras tarifas.",
    "tags": [
      "Câmbio & exterior"
    ],
    "related": [
      "Taxa de câmbio",
      "Spread de câmbio",
      "USD/BRL",
      "EUR/BRL"
    ]
  },
  {
    "term": "Carência",
    "definition": "É o período em que determinado recurso ainda não pode ser resgatado, movimentado ou utilizado nas condições normais do produto.",
    "why": "Um investimento pode ter vencimento longo e, ao mesmo tempo, uma carência específica para resgate.",
    "tags": [
      "Renda fixa",
      "Bancos & crédito"
    ],
    "related": [
      "Liquidez",
      "Vencimento"
    ]
  },
  {
    "term": "CDB",
    "definition": "Certificado de Depósito Bancário. É um título de renda fixa emitido por bancos para captar recursos.",
    "why": "O investidor empresta dinheiro ao banco e recebe a remuneração combinada. Pode ser prefixado, pós-fixado ou indexado à inflação.",
    "tags": [
      "Renda fixa",
      "Bancário"
    ],
    "fgc": "SIM",
    "issuer": "Banco ou instituição financeira autorizada a emitir CDB",
    "related": [
      "CDI",
      "Prefixado",
      "Pós-fixado",
      "FGC"
    ]
  },
  {
    "term": "CDI",
    "definition": "É uma referência muito usada no mercado brasileiro para operações de curtíssimo prazo entre instituições financeiras.",
    "why": "Muitos investimentos de renda fixa e fundos são comparados a um percentual do CDI, como 100% do CDI.",
    "tags": [
      "Juros",
      "Renda fixa"
    ],
    "related": [
      "Selic",
      "Pós-fixado",
      "Benchmark"
    ]
  },
  {
    "term": "Cedente",
    "definition": "É quem transfere um direito de receber para outra pessoa, empresa ou estrutura, como pode acontecer em um FIDC.",
    "why": "Ajuda a entender de onde vieram os créditos que compõem uma carteira de recebíveis.",
    "tags": [
      "FIDC",
      "Crédito estruturado"
    ],
    "related": [
      "Direitos creditórios",
      "FIDC",
      "Sacado"
    ]
  },
  {
    "term": "CET",
    "definition": "Custo Efetivo Total. É uma medida do custo completo de uma operação de crédito, incluindo juros e outros encargos obrigatórios previstos na contratação.",
    "why": "Duas propostas podem ter taxas de juros parecidas e CETs diferentes. Para comparar crédito, o CET costuma ser mais útil do que olhar apenas a taxa anunciada.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "Financiamento",
      "Empréstimo",
      "Taxa efetiva"
    ]
  },
  {
    "term": "Cheque especial",
    "definition": "É uma linha de crédito pré-aprovada ligada à conta corrente, usada quando o saldo disponível não é suficiente.",
    "why": "É crédito, não dinheiro disponível do cliente, e normalmente possui custo elevado.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "Conta corrente",
      "Crédito rotativo",
      "CET"
    ]
  },
  {
    "term": "Come-cotas",
    "definition": "É uma antecipação periódica do Imposto de Renda em determinados fundos de investimento, feita por meio da redução da quantidade de cotas do investidor.",
    "why": "Afeta a forma como o imposto é recolhido ao longo do tempo e não se aplica a todos os tipos de fundo.",
    "tags": [
      "Fundos",
      "Tributação"
    ],
    "related": [
      "Fundo de investimento",
      "Cota"
    ]
  },
  {
    "term": "Commission-based",
    "definition": "Modelo em que parte ou toda a remuneração vem de comissões ligadas à distribuição, contratação ou negociação de produtos e serviços financeiros.",
    "why": "Produtos diferentes podem gerar remunerações diferentes. Por isso, é importante entender como o profissional ou a instituição é remunerado.",
    "tags": [
      "Custos & remuneração"
    ],
    "related": [
      "Fee-based",
      "Fee-only",
      "Rebate"
    ]
  },
  {
    "term": "Concentração",
    "definition": "É o quanto uma carteira depende de um mesmo investimento, emissor, setor, moeda ou tipo de risco.",
    "why": "Concentrações elevadas podem fazer com que um único problema tenha impacto maior sobre o patrimônio.",
    "tags": [
      "Carteira",
      "Risco"
    ],
    "related": [
      "Diversificação",
      "Risco de crédito",
      "Alocação de ativos"
    ]
  },
  {
    "term": "Consolidação de carteira",
    "definition": "É a reunião de investimentos mantidos em diferentes instituições em uma visão única.",
    "why": "Permite avaliar o patrimônio como um conjunto, identificando concentrações, riscos e sobreposições que podem não aparecer quando cada conta é analisada separadamente.",
    "tags": [
      "Carteira",
      "Planejamento"
    ],
    "related": [
      "Custódia",
      "Alocação de ativos",
      "Diversificação"
    ]
  },
  {
    "term": "Conta corrente",
    "definition": "É uma conta bancária usada para movimentar dinheiro, realizar pagamentos, receber valores e contratar serviços financeiros.",
    "why": "Saldo em conta corrente não é a mesma coisa que dinheiro aplicado em investimentos.",
    "tags": [
      "Bancos & crédito"
    ],
    "fgc": "SIM",
    "issuer": "Instituição financeira",
    "related": [
      "Saldo disponível",
      "Cheque especial",
      "FGC"
    ]
  },
  {
    "term": "Conta remunerada",
    "definition": "É uma conta em que o saldo pode receber alguma remuneração conforme as regras da instituição.",
    "why": "É importante entender se o dinheiro permanece como depósito, é automaticamente aplicado em outro produto e quais regras de liquidez e proteção se aplicam.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "Conta corrente",
      "CDB",
      "Liquidez"
    ]
  },
  {
    "term": "Coobrigação",
    "definition": "É uma situação em que, além do devedor principal, outra parte também assume responsabilidade pelo pagamento em determinadas condições.",
    "why": "Pode oferecer uma fonte adicional de pagamento, mas a qualidade dessa obrigação também precisa ser analisada.",
    "tags": [
      "Crédito estruturado",
      "Bancos & crédito"
    ],
    "related": [
      "Garantia",
      "Risco de crédito",
      "FIDC"
    ]
  },
  {
    "term": "Correlação",
    "definition": "É uma medida de quanto dois investimentos costumam se mover de forma parecida ou diferente.",
    "why": "Ativos que não se comportam da mesma forma podem ajudar na diversificação de uma carteira.",
    "tags": [
      "Carteira",
      "Risco"
    ],
    "related": [
      "Diversificação",
      "Alocação de ativos",
      "Volatilidade"
    ]
  },
  {
    "term": "Cota",
    "definition": "É uma fração de um fundo ou veículo de investimento. O patrimônio do investidor é representado pela quantidade de cotas que possui multiplicada pelo valor de cada cota.",
    "why": "O valor da cota varia conforme o desempenho dos ativos e as regras do produto.",
    "tags": [
      "Fundos"
    ],
    "related": [
      "Fundo de investimento",
      "FIDC",
      "FII"
    ]
  },
  {
    "term": "Cota mezanino",
    "definition": "Em estruturas de FIDC que utilizam essa camada, é uma cota subordinada às cotas seniores, mas com prioridade em relação à cota subordinada mais júnior.",
    "why": "Fica no meio da estrutura de risco: tende a assumir mais perdas antes da cota sênior, mas depois da camada mais subordinada.",
    "tags": [
      "FIDC",
      "Crédito estruturado"
    ],
    "fgc": "NÃO",
    "related": [
      "FIDC",
      "Cota sênior",
      "Cota subordinada",
      "Subordinação"
    ]
  },
  {
    "term": "Cota sênior",
    "definition": "Em um FIDC, é a classe que tem prioridade sobre as cotas subordinadas para recebimentos, amortizações e resgates, conforme as regras do fundo.",
    "why": "A subordinação das outras cotas cria uma camada de proteção para a cota sênior, embora isso não elimine o risco do investimento.",
    "tags": [
      "FIDC",
      "Crédito estruturado"
    ],
    "fgc": "NÃO",
    "related": [
      "FIDC",
      "Cota mezanino",
      "Cota subordinada",
      "Subordinação"
    ]
  },
  {
    "term": "Cota subordinada",
    "definition": "Em um FIDC, é uma classe que fica atrás de outras cotas na ordem de recebimento e pode absorver perdas antes delas.",
    "why": "Funciona como uma camada de proteção para cotas com maior prioridade, como as seniores.",
    "tags": [
      "FIDC",
      "Crédito estruturado"
    ],
    "fgc": "NÃO",
    "related": [
      "FIDC",
      "Cota sênior",
      "Cota mezanino",
      "Subordinação"
    ]
  },
  {
    "term": "CRA",
    "definition": "Certificado de Recebíveis do Agronegócio. É um título ligado a direitos de recebimento do setor do agronegócio, estruturado por uma securitizadora.",
    "why": "O risco depende da estrutura da operação, dos devedores, das garantias e da qualidade dos créditos que dão suporte ao título.",
    "tags": [
      "Renda fixa",
      "Crédito privado"
    ],
    "fgc": "NÃO",
    "issuer": "Companhia securitizadora",
    "related": [
      "CRI",
      "Crédito privado",
      "Risco de crédito",
      "Securitização"
    ]
  },
  {
    "term": "Crédito",
    "definition": "É a concessão de recursos a alguém que se compromete a devolvê-los no futuro, geralmente com juros ou outra forma de remuneração.",
    "why": "Pode aparecer tanto do lado de quem toma dinheiro emprestado quanto do lado de quem investe em títulos de dívida.",
    "tags": [
      "Bancos & crédito",
      "Renda fixa"
    ],
    "related": [
      "Empréstimo",
      "Financiamento",
      "Risco de crédito"
    ]
  },
  {
    "term": "Crédito privado",
    "definition": "É o conjunto de investimentos em dívidas emitidas ou originadas por empresas e instituições privadas, e não diretamente pelo Tesouro Nacional.",
    "why": "Pode oferecer remuneração adicional, mas envolve risco de crédito do emissor, devedor ou estrutura.",
    "tags": [
      "Renda fixa",
      "Crédito privado"
    ],
    "related": [
      "Debênture",
      "CRA",
      "CRI",
      "Spread de crédito"
    ]
  },
  {
    "term": "Crédito rotativo",
    "definition": "É o crédito usado quando uma obrigação não é paga integralmente e o saldo restante é financiado, como pode ocorrer no cartão de crédito.",
    "why": "Pode ter custo elevado e merece atenção ao CET e ao prazo para quitação.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "CET",
      "Refinanciamento",
      "Cheque especial"
    ]
  },
  {
    "term": "CRI",
    "definition": "Certificado de Recebíveis Imobiliários. É um título ligado a direitos de recebimento do setor imobiliário, estruturado por uma securitizadora.",
    "why": "O risco depende dos créditos que sustentam a operação, dos devedores, das garantias e da estrutura contratual.",
    "tags": [
      "Renda fixa",
      "Crédito privado"
    ],
    "fgc": "NÃO",
    "issuer": "Companhia securitizadora",
    "related": [
      "CRA",
      "Crédito privado",
      "Risco de crédito",
      "Securitização"
    ]
  },
  {
    "term": "Curva de juros",
    "definition": "É uma representação das taxas de juros esperadas ou negociadas para diferentes prazos.",
    "why": "Ajuda a entender por que um investimento de dois anos pode ter taxa diferente de outro com vencimento em dez anos.",
    "tags": [
      "Juros",
      "Renda fixa"
    ],
    "related": [
      "DI Futuro",
      "Duration",
      "Marcação a mercado"
    ]
  },
  {
    "term": "Custódia",
    "definition": "É a guarda e o registro dos ativos financeiros em nome do investidor por uma instituição responsável.",
    "why": "A instituição de custódia pode ser diferente de quem faz a recomendação ou o acompanhamento dos investimentos.",
    "tags": [
      "Mercado",
      "Carteira"
    ],
    "related": [
      "Consolidação de carteira",
      "Instituição financeira"
    ]
  },
  {
    "term": "Debênture",
    "definition": "É um título de dívida emitido por uma empresa. Ao investir, o comprador está emprestando recursos à companhia nas condições da emissão.",
    "why": "A remuneração precisa ser analisada junto com o risco da empresa, o prazo, as garantias e a possibilidade de negociação no mercado secundário.",
    "tags": [
      "Renda fixa",
      "Crédito privado"
    ],
    "fgc": "NÃO",
    "issuer": "Empresa não financeira ou sociedade autorizada a emitir debêntures",
    "related": [
      "Crédito privado",
      "Spread de crédito",
      "Rating",
      "Mercado secundário"
    ]
  },
  {
    "term": "Derivativo",
    "definition": "É um contrato cujo valor depende de outro ativo ou referência, como juros, moedas, índices, ações ou commodities.",
    "why": "Pode ser usado para proteção, ajuste de exposição ou estratégias mais complexas. O risco depende da forma como é utilizado.",
    "tags": [
      "Mercado",
      "Proteção"
    ],
    "related": [
      "Hedge",
      "Opção",
      "DI Futuro"
    ]
  },
  {
    "term": "DI Futuro",
    "definition": "É um contrato negociado na B3 que reflete taxas de juros para diferentes vencimentos, tendo como referência a taxa DI.",
    "why": "É usado pelo mercado para proteção e para expressar expectativas sobre juros futuros. No site da ROAD, ajuda a visualizar referências de prazo mais longo.",
    "tags": [
      "Juros",
      "Mercados & índices"
    ],
    "related": [
      "CDI",
      "Curva de juros",
      "DI Jan/30 e DI Jan/35"
    ]
  },
  {
    "term": "DI Jan/30 e DI Jan/35",
    "definition": "São referências de contratos futuros de DI com vencimento em janeiro de 2030 e janeiro de 2035.",
    "why": "As taxas mostradas não são uma aplicação direta nem uma promessa de retorno; são preços de mercado que ajudam a observar a estrutura de juros esperada para esses prazos.",
    "tags": [
      "Juros",
      "Mercados & índices"
    ],
    "related": [
      "DI Futuro",
      "Curva de juros",
      "Marcação a mercado"
    ]
  },
  {
    "term": "Direitos creditórios",
    "definition": "São valores que uma pessoa ou empresa tem direito de receber no futuro, como parcelas, duplicatas, mensalidades ou recebíveis comerciais.",
    "why": "São a matéria-prima de muitos FIDCs e operações de securitização.",
    "tags": [
      "FIDC",
      "Crédito estruturado"
    ],
    "related": [
      "FIDC",
      "Cedente",
      "Securitização"
    ]
  },
  {
    "term": "Diversificação",
    "definition": "É a distribuição do patrimônio entre diferentes investimentos, emissores, setores, moedas ou estratégias.",
    "why": "Busca reduzir a dependência de uma única fonte de risco. Diversificar não elimina perdas, mas pode tornar a carteira mais equilibrada.",
    "tags": [
      "Carteira",
      "Risco"
    ],
    "related": [
      "Alocação de ativos",
      "Correlação",
      "Concentração"
    ]
  },
  {
    "term": "Dividendos",
    "definition": "São parcelas de lucro ou resultados que uma empresa pode distribuir aos seus acionistas.",
    "why": "Fazem parte do retorno potencial de uma ação, junto com a valorização ou desvalorização do preço.",
    "tags": [
      "Bolsa",
      "Renda variável"
    ],
    "related": [
      "Ação",
      "IBOV"
    ]
  },
  {
    "term": "Drawdown",
    "definition": "É a queda de um investimento entre um ponto de máxima e o menor valor atingido depois, antes de uma recuperação.",
    "why": "Ajuda a responder uma pergunta prática: quanto o investimento chegou a cair no pior trecho observado?",
    "tags": [
      "Risco",
      "Carteira"
    ],
    "related": [
      "Volatilidade",
      "Sharpe"
    ]
  },
  {
    "term": "Duration",
    "definition": "É uma medida que ajuda a estimar o quanto o preço de um título de renda fixa pode reagir a mudanças nas taxas de juros.",
    "why": "Em geral, quanto maior a duration, maior tende a ser a sensibilidade do preço às mudanças de juros.",
    "tags": [
      "Renda fixa",
      "Risco"
    ],
    "related": [
      "Marcação a mercado",
      "Curva de juros",
      "IMA-B"
    ]
  },
  {
    "term": "Emissor",
    "definition": "É quem cria e assume a obrigação de um título financeiro, como um banco que emite CDB ou uma empresa que emite debêntures.",
    "why": "Entender quem é o emissor ajuda a identificar de quem depende o pagamento do investimento.",
    "tags": [
      "Renda fixa",
      "Crédito privado"
    ],
    "related": [
      "Risco de crédito",
      "Rating"
    ]
  },
  {
    "term": "Empréstimo",
    "definition": "É uma operação de crédito em que uma instituição libera recursos para o cliente, que os devolve ao longo do tempo conforme as condições contratadas.",
    "why": "Para comparar empréstimos, é importante observar prazo, CET, garantias e possibilidade de quitação antecipada.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "CET",
      "Financiamento",
      "Amortização"
    ]
  },
  {
    "term": "ETF",
    "definition": "Exchange Traded Fund, ou fundo de índice negociado em bolsa. É um fundo cujas cotas podem ser compradas e vendidas no mercado como uma ação.",
    "why": "Costuma ser usado para obter exposição a um índice, setor, país, moeda ou classe de ativos de forma simples.",
    "tags": [
      "Bolsa",
      "Fundos"
    ],
    "related": [
      "IVVB11",
      "IBOV",
      "Ticker"
    ]
  },
  {
    "term": "EUR",
    "definition": "Código internacional do euro, moeda utilizada por países da zona do euro.",
    "why": "No site da ROAD aparece como referência para câmbio e exposição internacional.",
    "tags": [
      "Câmbio & exterior",
      "Mercados & índices"
    ],
    "related": [
      "EUR/BRL",
      "Câmbio"
    ]
  },
  {
    "term": "EUR/BRL",
    "definition": "É a cotação que indica quantos reais correspondem a um euro.",
    "why": "Serve como referência para conversões entre euro e real, mas a taxa efetivamente oferecida ao cliente pode incluir spread e outros custos.",
    "tags": [
      "Câmbio & exterior",
      "Mercados & índices"
    ],
    "related": [
      "EUR",
      "Spread de câmbio",
      "Taxa de câmbio"
    ]
  },
  {
    "term": "Exposição cambial",
    "definition": "É a parcela do patrimônio cujo valor pode ser afetado pela variação de uma moeda estrangeira.",
    "why": "Um investimento internacional pode subir em sua moeda de origem e ainda assim ter resultado diferente em reais por causa do câmbio.",
    "tags": [
      "Câmbio & exterior",
      "Carteira"
    ],
    "related": [
      "Hedge cambial",
      "USD/BRL",
      "EUR/BRL"
    ]
  },
  {
    "term": "Fee fixo",
    "definition": "É um valor previamente combinado pelo serviço, sem depender diretamente do volume financeiro de cada produto utilizado.",
    "why": "Ajuda o cliente a saber antecipadamente quanto pagará pelo serviço contratado.",
    "tags": [
      "Custos & remuneração"
    ],
    "related": [
      "Fee-based",
      "Fee-only",
      "Fee sobre patrimônio"
    ]
  },
  {
    "term": "Fee sobre patrimônio",
    "definition": "É uma cobrança calculada como percentual do patrimônio acompanhado, assessorado ou gerido, conforme o contrato do serviço.",
    "why": "O valor pago varia conforme o volume patrimonial usado como base de cálculo.",
    "tags": [
      "Custos & remuneração"
    ],
    "related": [
      "AuM",
      "Fee fixo",
      "Fee-based"
    ]
  },
  {
    "term": "Fee-based",
    "definition": "Termo usado para modelos em que existe cobrança direta pelo serviço de aconselhamento ou gestão. Dependendo da estrutura e do mercado, pode coexistir com outras formas de remuneração.",
    "why": "Não deve ser entendido automaticamente como sinônimo de ausência de comissões; é preciso conhecer a estrutura de remuneração efetiva.",
    "tags": [
      "Custos & remuneração"
    ],
    "related": [
      "Fee-only",
      "Fee fixo",
      "Commission-based"
    ]
  },
  {
    "term": "Fee-only",
    "definition": "Expressão usada para indicar uma relação em que a remuneração pelo aconselhamento vem do próprio cliente, sem depender de comissões de distribuição de produtos naquela relação.",
    "why": "Ajuda a distinguir modelos de remuneração, mas o contrato e as regras aplicáveis sempre devem ser observados.",
    "tags": [
      "Custos & remuneração"
    ],
    "related": [
      "Fee-based",
      "Commission-based",
      "Fee fixo"
    ]
  },
  {
    "term": "FGC",
    "definition": "Fundo Garantidor de Créditos. É uma entidade privada que oferece garantia para determinados depósitos e títulos emitidos por instituições associadas, dentro de regras e limites próprios.",
    "why": "Ter cobertura do FGC não significa risco zero. A garantia depende do produto, da instituição e dos limites vigentes.",
    "tags": [
      "Renda fixa",
      "Bancário"
    ],
    "related": [
      "CDB",
      "LCI",
      "LCA",
      "LC",
      "LIG",
      "Letra Financeira"
    ]
  },
  {
    "term": "Fiança",
    "definition": "É uma garantia pessoal em que uma pessoa ou empresa se compromete a cumprir uma obrigação caso o devedor principal não pague.",
    "why": "Pode gerar responsabilidade patrimonial para quem presta a fiança.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "Aval",
      "Garantia",
      "Garantia real"
    ]
  },
  {
    "term": "FIDC",
    "definition": "Fundo de Investimento em Direitos Creditórios. É um fundo que investe principalmente em direitos de recebimento, como parcelas, duplicatas ou outros créditos.",
    "why": "O risco depende da qualidade dos créditos, da estrutura do fundo e da posição de cada classe de cota.",
    "tags": [
      "FIDC",
      "Crédito estruturado"
    ],
    "fgc": "NÃO",
    "related": [
      "Direitos creditórios",
      "Cota sênior",
      "Cota mezanino",
      "Cota subordinada",
      "Subordinação"
    ]
  },
  {
    "term": "FII",
    "definition": "Fundo de Investimento Imobiliário. É um fundo que investe em imóveis, direitos ou ativos ligados ao setor imobiliário, conforme sua política.",
    "why": "Suas cotas podem ser negociadas em bolsa e o preço pode variar mesmo quando os imóveis ou créditos da carteira não mudam de valor na mesma proporção.",
    "tags": [
      "Fundos",
      "Imobiliário"
    ],
    "fgc": "NÃO",
    "related": [
      "IFIX",
      "Cota",
      "Bolsa de Valores"
    ]
  },
  {
    "term": "Financiamento",
    "definition": "É uma operação de crédito normalmente ligada à compra de um bem ou projeto específico, como imóvel, veículo ou equipamento.",
    "why": "Prazo, CET, sistema de amortização, garantias e possibilidade de antecipação alteram bastante o custo final.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "CET",
      "SAC",
      "Tabela Price",
      "Garantia real"
    ]
  },
  {
    "term": "Fundo de investimento",
    "definition": "É uma estrutura coletiva em que recursos de vários investidores são reunidos e aplicados segundo uma política definida.",
    "why": "O investidor compra cotas do fundo e fica exposto à carteira e às regras daquele veículo.",
    "tags": [
      "Fundos"
    ],
    "fgc": "NÃO",
    "related": [
      "Cota",
      "Taxa de administração",
      "Taxa de performance",
      "Come-cotas"
    ]
  },
  {
    "term": "Fundo multimercado",
    "definition": "É um fundo que pode combinar diferentes mercados e estratégias, como juros, moedas, ações e crédito, dentro de sua política de investimento.",
    "why": "Dois fundos multimercado podem ter comportamentos muito diferentes; é importante entender a estratégia e o nível de risco.",
    "tags": [
      "Fundos",
      "Estratégias"
    ],
    "fgc": "NÃO",
    "related": [
      "Hedge fund",
      "IHFA",
      "Long & Short"
    ]
  },
  {
    "term": "Ganho de capital",
    "definition": "É o ganho obtido quando um ativo é vendido por valor superior ao seu custo de aquisição, considerando as regras aplicáveis.",
    "why": "Pode ter tratamento tributário próprio dependendo do ativo e da operação.",
    "tags": [
      "Tributação",
      "Patrimônio"
    ],
    "related": [
      "Rentabilidade",
      "Imposto de Renda"
    ]
  },
  {
    "term": "Garantia",
    "definition": "É um mecanismo que busca aumentar a segurança de uma obrigação, oferecendo uma fonte adicional de pagamento caso o devedor não cumpra o contrato.",
    "why": "Garantia reduz alguns riscos, mas não torna uma operação automaticamente segura ou sem possibilidade de perda.",
    "tags": [
      "Bancos & crédito",
      "Crédito privado"
    ],
    "related": [
      "Garantia real",
      "Aval",
      "Fiança"
    ]
  },
  {
    "term": "Garantia real",
    "definition": "É uma garantia ligada a um bem ou direito específico, como um imóvel, veículo ou recebível.",
    "why": "Em caso de inadimplência, esse bem ou direito pode ser usado conforme as regras do contrato para ajudar a satisfazer a dívida.",
    "tags": [
      "Bancos & crédito",
      "Crédito privado"
    ],
    "related": [
      "Garantia",
      "Financiamento"
    ]
  },
  {
    "term": "Hedge",
    "definition": "É uma estratégia de proteção usada para reduzir o impacto de movimentos desfavoráveis em juros, moedas, preços ou outros riscos.",
    "why": "Hedge não busca necessariamente aumentar retorno; muitas vezes seu objetivo principal é reduzir uma exposição indesejada.",
    "tags": [
      "Proteção",
      "Mercado"
    ],
    "related": [
      "Derivativo",
      "Hedge cambial"
    ]
  },
  {
    "term": "Hedge cambial",
    "definition": "É uma proteção contra variações de moeda estrangeira.",
    "why": "Pode ser usada quando o investidor quer reduzir o efeito do dólar, euro ou outra moeda sobre determinado investimento ou obrigação.",
    "tags": [
      "Câmbio & exterior",
      "Proteção"
    ],
    "related": [
      "Exposição cambial",
      "Hedge",
      "USD/BRL"
    ]
  },
  {
    "term": "Hedge fund",
    "definition": "É uma expressão internacional para fundos que utilizam estratégias flexíveis em diferentes mercados. No Brasil, a comparação mais próxima costuma ser com fundos multimercado de gestão ativa.",
    "why": "Não existe uma única estratégia de hedge fund; é necessário olhar como cada fundo investe e controla riscos.",
    "tags": [
      "Fundos",
      "Estratégias"
    ],
    "related": [
      "IHFA",
      "Fundo multimercado",
      "Long Biased",
      "Long & Short"
    ]
  },
  {
    "term": "IBOV",
    "definition": "É a forma abreviada de Ibovespa, principal índice de referência do mercado de ações brasileiro.",
    "why": "Representa uma carteira teórica de ações e units negociadas na B3 que atendem aos critérios do índice. No site da ROAD, funciona como um termômetro do mercado acionário local.",
    "tags": [
      "Mercados & índices",
      "Bolsa"
    ],
    "related": [
      "Ação",
      "Benchmark",
      "SMLL"
    ]
  },
  {
    "term": "IFIX",
    "definition": "Índice de Fundos de Investimentos Imobiliários da B3. Acompanha o desempenho de uma carteira teórica de FIIs negociados no mercado brasileiro.",
    "why": "É uma referência para observar o comportamento do mercado de fundos imobiliários.",
    "tags": [
      "Mercados & índices",
      "Fundos"
    ],
    "related": [
      "FII",
      "Benchmark"
    ]
  },
  {
    "term": "IHFA",
    "definition": "Índice de Hedge Funds ANBIMA. É uma referência para fundos de gestão ativa que, no Brasil, se aproximam do universo dos multimercados.",
    "why": "Pode ser usado como referência para comparar o comportamento de estratégias flexíveis de gestão.",
    "tags": [
      "Mercados & índices",
      "Fundos"
    ],
    "related": [
      "Hedge fund",
      "Fundo multimercado",
      "Benchmark"
    ]
  },
  {
    "term": "IMA-B",
    "definition": "É um índice da ANBIMA formado por títulos públicos federais indexados ao IPCA.",
    "why": "Ajuda a acompanhar o comportamento de títulos públicos ligados à inflação e é usado como benchmark de estratégias de renda fixa.",
    "tags": [
      "Mercados & índices",
      "Renda fixa"
    ],
    "related": [
      "IPCA",
      "IMA-B 5",
      "IMA-B 5+",
      "Duration"
    ]
  },
  {
    "term": "IMA-B 5",
    "definition": "É uma parcela da família IMA-B composta por títulos públicos indexados ao IPCA com vencimento de até cinco anos.",
    "why": "Por concentrar prazos menores, tende a ter comportamento diferente do IMA-B de vencimentos mais longos.",
    "tags": [
      "Mercados & índices",
      "Renda fixa"
    ],
    "related": [
      "IMA-B",
      "IMA-B 5+",
      "Duration"
    ]
  },
  {
    "term": "IMA-B 5+",
    "definition": "É uma parcela da família IMA-B composta por títulos públicos indexados ao IPCA com vencimentos iguais ou superiores a cinco anos.",
    "why": "Títulos mais longos costumam ser mais sensíveis às mudanças das taxas de juros.",
    "tags": [
      "Mercados & índices",
      "Renda fixa"
    ],
    "related": [
      "IMA-B",
      "IMA-B 5",
      "Duration"
    ]
  },
  {
    "term": "Imposto de Renda",
    "definition": "É um tributo que pode incidir sobre rendimentos, ganhos e resgates conforme o tipo de investimento e as regras vigentes.",
    "why": "O tratamento tributário varia entre produtos; por isso, comparar retornos líquidos pode ser mais útil do que olhar apenas a rentabilidade bruta.",
    "tags": [
      "Tributação"
    ],
    "related": [
      "Ganho de capital",
      "PGBL",
      "VGBL",
      "Come-cotas"
    ]
  },
  {
    "term": "Inadimplência",
    "definition": "É o não pagamento de uma obrigação no prazo ou nas condições combinadas.",
    "why": "Em investimentos de crédito, níveis maiores de inadimplência podem afetar a capacidade de pagamento e o valor dos ativos.",
    "tags": [
      "Crédito privado",
      "Risco"
    ],
    "related": [
      "Risco de crédito",
      "FIDC",
      "Direitos creditórios"
    ]
  },
  {
    "term": "Inflação",
    "definition": "É o aumento generalizado dos preços de bens e serviços ao longo do tempo, reduzindo o poder de compra do dinheiro.",
    "why": "Por isso, um retorno positivo em reais pode ainda representar pouco ganho real se a inflação do período for elevada.",
    "tags": [
      "Economia",
      "Planejamento"
    ],
    "related": [
      "IPCA",
      "Rentabilidade real",
      "Juros reais"
    ]
  },
  {
    "term": "Instituição financeira",
    "definition": "É uma organização autorizada a prestar determinados serviços financeiros, como receber depósitos, conceder crédito, custodiar ativos ou intermediar operações, conforme sua autorização.",
    "why": "Bancos, financeiras, corretoras e outras instituições podem exercer papéis diferentes dentro de uma mesma relação financeira.",
    "tags": [
      "Bancos & crédito",
      "Mercado"
    ],
    "related": [
      "Custódia",
      "CDB",
      "Conta corrente"
    ]
  },
  {
    "term": "IOF",
    "definition": "Imposto sobre Operações Financeiras. Pode incidir em operações como crédito, câmbio, seguros e determinados investimentos, conforme as regras vigentes.",
    "why": "Pode alterar o custo final de uma operação e deve ser separado de spreads e tarifas.",
    "tags": [
      "Tributação",
      "Bancos & crédito"
    ],
    "related": [
      "Câmbio",
      "Spread de câmbio",
      "CET"
    ]
  },
  {
    "term": "IPCA",
    "definition": "Índice Nacional de Preços ao Consumidor Amplo. É uma das principais referências de inflação no Brasil.",
    "why": "É usado em planejamento financeiro e como indexador de diversos investimentos, contratos e títulos públicos.",
    "tags": [
      "Economia",
      "Renda fixa"
    ],
    "related": [
      "Inflação",
      "IMA-B",
      "Rentabilidade real"
    ]
  },
  {
    "term": "IVVB11",
    "definition": "É o ticker de um ETF listado na B3 que busca acompanhar, em reais, o desempenho do S&P 500 por meio de uma estrutura de fundo de índice.",
    "why": "Permite exposição às grandes empresas americanas por meio de um produto negociado no Brasil, com resultado também influenciado pelo câmbio.",
    "tags": [
      "ETF",
      "Exterior",
      "Mercados & índices"
    ],
    "related": [
      "ETF",
      "Ticker",
      "Exposição cambial",
      "USD"
    ]
  },
  {
    "term": "Juros compostos",
    "definition": "São juros calculados sobre o valor acumulado, fazendo com que os rendimentos também passem a gerar novos rendimentos.",
    "why": "Esse efeito pode ser relevante em horizontes longos, tanto em investimentos quanto em dívidas.",
    "tags": [
      "Juros",
      "Planejamento"
    ],
    "related": [
      "Juros nominais",
      "Juros reais"
    ]
  },
  {
    "term": "Juros nominais",
    "definition": "São os juros expressos sem descontar o efeito da inflação.",
    "why": "Uma taxa nominal positiva não garante aumento do poder de compra.",
    "tags": [
      "Juros",
      "Economia"
    ],
    "related": [
      "Juros reais",
      "Inflação",
      "Rentabilidade real"
    ]
  },
  {
    "term": "Juros reais",
    "definition": "São os juros considerados depois do efeito da inflação.",
    "why": "Ajudam a avaliar se o patrimônio está aumentando seu poder de compra ao longo do tempo.",
    "tags": [
      "Juros",
      "Economia"
    ],
    "related": [
      "Juros nominais",
      "Inflação",
      "Rentabilidade real"
    ]
  },
  {
    "term": "LC",
    "definition": "Letra de Câmbio. Apesar do nome, não é investimento em moeda estrangeira. É um título de renda fixa emitido por sociedades de crédito, financiamento e investimento.",
    "why": "Funciona como instrumento de captação da instituição emissora e pode contar com cobertura do FGC dentro das regras vigentes.",
    "tags": [
      "Renda fixa",
      "Bancário"
    ],
    "fgc": "SIM",
    "issuer": "Sociedade de crédito, financiamento e investimento",
    "related": [
      "CDB",
      "FGC",
      "Risco de crédito"
    ]
  },
  {
    "term": "LCA",
    "definition": "Letra de Crédito do Agronegócio. É um título de renda fixa emitido por instituição financeira e ligado a operações do agronegócio.",
    "why": "O investidor assume risco da instituição emissora, observadas as regras do produto e da garantia do FGC.",
    "tags": [
      "Renda fixa",
      "Bancário"
    ],
    "fgc": "SIM",
    "issuer": "Instituição financeira",
    "related": [
      "LCI",
      "CDB",
      "FGC"
    ]
  },
  {
    "term": "LCI",
    "definition": "Letra de Crédito Imobiliário. É um título de renda fixa emitido por instituição financeira e ligado a operações do setor imobiliário.",
    "why": "O investidor assume risco da instituição emissora, observadas as regras do produto e da garantia do FGC.",
    "tags": [
      "Renda fixa",
      "Bancário"
    ],
    "fgc": "SIM",
    "issuer": "Instituição financeira",
    "related": [
      "LCA",
      "CDB",
      "FGC"
    ]
  },
  {
    "term": "Letra Financeira",
    "definition": "É um título de renda fixa emitido por instituições financeiras, geralmente usado para captação de prazo mais longo.",
    "why": "Não conta com garantia do FGC. Algumas Letras Financeiras possuem cláusulas de subordinação e podem ser usadas na estrutura de capital regulatório da instituição, o que altera sua prioridade em situações extremas.",
    "tags": [
      "Renda fixa",
      "Bancário"
    ],
    "fgc": "NÃO",
    "issuer": "Instituição financeira autorizada",
    "related": [
      "Subordinação",
      "Risco de crédito",
      "FGC"
    ]
  },
  {
    "term": "LIG",
    "definition": "Letra Imobiliária Garantida. É um título emitido por instituição financeira, apoiado por uma carteira de ativos que segue regras específicas de cobertura e segregação.",
    "why": "Apesar do nome 'garantida', não faz parte da garantia ordinária do FGC. A análise deve considerar a instituição e a estrutura da emissão.",
    "tags": [
      "Renda fixa",
      "Bancário"
    ],
    "fgc": "NÃO",
    "issuer": "Instituição financeira autorizada",
    "related": [
      "LCI",
      "FGC",
      "Risco de crédito"
    ]
  },
  {
    "term": "Liquidez",
    "definition": "É a facilidade e a velocidade com que um investimento pode ser convertido em dinheiro, considerando as regras e condições do mercado.",
    "why": "Um investimento pode ter boa rentabilidade e ainda ser inadequado para um recurso que pode ser necessário em curto prazo.",
    "tags": [
      "Carteira",
      "Renda fixa"
    ],
    "related": [
      "Carência",
      "Vencimento",
      "Mercado secundário"
    ]
  },
  {
    "term": "Long & Short",
    "definition": "É uma estratégia que combina posições compradas e vendidas, buscando ganhar com a diferença de desempenho entre ativos.",
    "why": "O resultado depende menos da direção geral da bolsa e mais da relação entre as posições escolhidas, embora continue havendo riscos.",
    "tags": [
      "Fundos",
      "Estratégias"
    ],
    "related": [
      "Long Only",
      "Long Biased",
      "Hedge fund"
    ]
  },
  {
    "term": "Long Biased",
    "definition": "É uma estratégia de ações que normalmente mantém exposição líquida comprada, mas pode usar posições vendidas ou proteção para reduzir riscos ou explorar diferenças entre empresas.",
    "why": "Fica entre um fundo totalmente comprado e estratégias mais neutras, mas o comportamento varia de gestor para gestor.",
    "tags": [
      "Fundos",
      "Estratégias"
    ],
    "related": [
      "Long Only",
      "Long & Short",
      "Hedge fund"
    ]
  },
  {
    "term": "Long Only",
    "definition": "É uma estratégia de ações predominantemente comprada, em que o gestor busca ganhar principalmente com a valorização dos ativos que seleciona.",
    "why": "Tende a acompanhar mais de perto os movimentos do mercado acionário do que estratégias que podem manter posições vendidas relevantes.",
    "tags": [
      "Fundos",
      "Estratégias"
    ],
    "related": [
      "Long Biased",
      "Long & Short",
      "IBOV"
    ]
  },
  {
    "term": "Marcação a mercado",
    "definition": "É a atualização do valor de um investimento conforme as condições pelas quais ele poderia ser negociado naquele momento.",
    "why": "Por isso, um título de renda fixa pode aparecer com valor maior ou menor antes do vencimento mesmo que sua taxa contratada não tenha mudado.",
    "tags": [
      "Renda fixa",
      "Mercado"
    ],
    "related": [
      "Duration",
      "Curva de juros",
      "Mercado secundário"
    ]
  },
  {
    "term": "Mercado primário",
    "definition": "É onde um título, ação ou cota é oferecido ao investidor na emissão inicial.",
    "why": "O dinheiro captado normalmente vai para o emissor ou para a estrutura que está sendo formada.",
    "tags": [
      "Mercado"
    ],
    "related": [
      "Mercado secundário",
      "Emissor"
    ]
  },
  {
    "term": "Mercado secundário",
    "definition": "É onde investidores negociam entre si ativos que já foram emitidos.",
    "why": "A existência de mercado secundário pode facilitar uma saída antes do vencimento, mas não garante que haverá liquidez ou preço favorável.",
    "tags": [
      "Mercado",
      "Renda fixa"
    ],
    "related": [
      "Liquidez",
      "Marcação a mercado",
      "Debênture"
    ]
  },
  {
    "term": "Moeda-base",
    "definition": "É a moeda usada como referência principal para expressar o valor e os resultados de um investimento ou carteira.",
    "why": "Um fundo pode investir em ativos estrangeiros e ainda divulgar sua cota em reais, por exemplo.",
    "tags": [
      "Câmbio & exterior"
    ],
    "related": [
      "Exposição cambial",
      "USD",
      "EUR"
    ]
  },
  {
    "term": "Opção",
    "definition": "É um derivativo que dá ao comprador um direito relacionado à compra ou venda de um ativo em condições definidas, enquanto o vendedor assume uma obrigação correspondente.",
    "why": "Pode ser usada para proteção ou estratégias específicas, mas exige atenção ao prazo, preço de exercício e risco.",
    "tags": [
      "Mercado",
      "Derivativos"
    ],
    "related": [
      "Derivativo",
      "Hedge"
    ]
  },
  {
    "term": "Ouro",
    "definition": "É um metal precioso negociado globalmente e usado tanto como ativo financeiro quanto como matéria-prima.",
    "why": "Seu preço internacional costuma ser expresso em dólares e pode reagir a juros, moedas, inflação e busca por proteção.",
    "tags": [
      "Mercados & índices",
      "Commodities"
    ],
    "related": [
      "USD",
      "Hedge",
      "Exposição cambial"
    ]
  },
  {
    "term": "PGBL",
    "definition": "Plano Gerador de Benefício Livre. É um plano de previdência complementar aberta com regras próprias de acumulação e tributação.",
    "why": "Para quem atende às condições legais e usa as deduções completas do IR, contribuições podem ser dedutíveis até o limite previsto em lei; no resgate ou renda, o imposto incide sobre o valor tributável conforme as regras do plano.",
    "tags": [
      "Previdência",
      "Tributação"
    ],
    "related": [
      "VGBL",
      "Tabela progressiva",
      "Tabela regressiva"
    ]
  },
  {
    "term": "Portabilidade",
    "definition": "É a transferência de um produto ou relacionamento financeiro entre instituições, conforme as regras aplicáveis, sem necessariamente encerrar a estratégia original.",
    "why": "Pode existir em previdência e crédito, por exemplo, e deve ser avaliada considerando custos, condições e eventuais benefícios.",
    "tags": [
      "Bancos & crédito",
      "Previdência"
    ],
    "related": [
      "Portabilidade de crédito",
      "PGBL",
      "VGBL"
    ]
  },
  {
    "term": "Portabilidade de crédito",
    "definition": "É a transferência de uma dívida de uma instituição para outra, normalmente buscando condições melhores.",
    "why": "Pode reduzir custo financeiro, mas é importante comparar o CET, o prazo e todas as condições da nova operação.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "CET",
      "Refinanciamento",
      "Financiamento"
    ]
  },
  {
    "term": "Pós-fixado",
    "definition": "É um investimento cuja remuneração acompanha uma referência que varia ao longo do tempo, como CDI ou Selic.",
    "why": "O investidor conhece a regra de remuneração, mas não sabe antecipadamente o valor exato que receberá no final.",
    "tags": [
      "Renda fixa"
    ],
    "related": [
      "CDI",
      "Selic",
      "Prefixado"
    ]
  },
  {
    "term": "Poupança",
    "definition": "É um tipo de depósito bancário com regras próprias de remuneração e liquidez.",
    "why": "É simples e possui cobertura do FGC dentro das regras vigentes, mas deve ser comparada com outras alternativas de acordo com objetivo e prazo.",
    "tags": [
      "Bancário",
      "Renda fixa"
    ],
    "fgc": "SIM",
    "issuer": "Instituição financeira",
    "related": [
      "FGC",
      "Liquidez"
    ]
  },
  {
    "term": "Prefixado",
    "definition": "É um investimento em que a taxa de juros é conhecida no momento da contratação.",
    "why": "Se for vendido antes do vencimento, o preço pode variar conforme as taxas de mercado, mesmo que a taxa contratada permaneça a mesma.",
    "tags": [
      "Renda fixa"
    ],
    "related": [
      "Pós-fixado",
      "Marcação a mercado",
      "Duration"
    ]
  },
  {
    "term": "Previdência privada",
    "definition": "É uma forma de acumulação de longo prazo oferecida por planos com regras específicas de contribuição, investimento, portabilidade, resgate e recebimento de renda.",
    "why": "PGBL e VGBL são estruturas diferentes e a escolha depende, entre outros pontos, do objetivo e da situação tributária do cliente.",
    "tags": [
      "Previdência",
      "Planejamento"
    ],
    "related": [
      "PGBL",
      "VGBL",
      "Portabilidade"
    ]
  },
  {
    "term": "Rating",
    "definition": "É uma opinião de uma agência especializada sobre a capacidade de um emissor ou operação cumprir suas obrigações financeiras.",
    "why": "Ajuda na análise de crédito, mas não substitui a avaliação do investimento e pode mudar ao longo do tempo.",
    "tags": [
      "Crédito privado",
      "Risco"
    ],
    "related": [
      "Risco de crédito",
      "Emissor",
      "Spread de crédito"
    ]
  },
  {
    "term": "Rebalanceamento",
    "definition": "É o ajuste de uma carteira para aproximá-la novamente da distribuição de investimentos definida na estratégia.",
    "why": "Depois de movimentos de mercado, alguns ativos podem crescer ou cair mais do que outros e alterar o risco originalmente planejado.",
    "tags": [
      "Carteira",
      "Planejamento"
    ],
    "related": [
      "Alocação de ativos",
      "Diversificação"
    ]
  },
  {
    "term": "Rebate",
    "definition": "É uma parcela de receita ou comissão que pode ser repassada a quem distribui, intermedeia ou mantém relacionamento com determinado produto financeiro.",
    "why": "Entender rebates ajuda o cliente a compreender como diferentes participantes do mercado podem ser remunerados.",
    "tags": [
      "Custos & remuneração"
    ],
    "related": [
      "Commission-based",
      "Fee-based"
    ]
  },
  {
    "term": "Refinanciamento",
    "definition": "É a substituição ou reorganização de uma dívida por uma nova operação, com novas condições de prazo, taxa ou garantia.",
    "why": "Pode melhorar o fluxo financeiro, mas deve ser analisado pelo custo total e não apenas pela redução da parcela mensal.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "CET",
      "Portabilidade de crédito",
      "Financiamento"
    ]
  },
  {
    "term": "Renda fixa",
    "definition": "É o conjunto de investimentos cuja forma de remuneração é definida por uma regra conhecida, como taxa prefixada, percentual do CDI ou inflação mais juros.",
    "why": "Renda fixa não significa preço fixo nem ausência de risco. Crédito, prazo, liquidez e marcação a mercado continuam importantes.",
    "tags": [
      "Renda fixa"
    ],
    "related": [
      "Prefixado",
      "Pós-fixado",
      "Risco de crédito",
      "Marcação a mercado"
    ]
  },
  {
    "term": "Renda variável",
    "definition": "É o conjunto de investimentos cujo retorno não é conhecido previamente e depende da variação de preços, resultados ou outros fatores.",
    "why": "Ações e muitos fundos negociados em bolsa são exemplos comuns.",
    "tags": [
      "Bolsa",
      "Renda variável"
    ],
    "related": [
      "Ação",
      "ETF",
      "Volatilidade"
    ]
  },
  {
    "term": "Rentabilidade",
    "definition": "É o resultado de um investimento em determinado período, normalmente expresso em percentual ou valor financeiro.",
    "why": "É importante observar se o número é bruto ou líquido, nominal ou real e qual período está sendo comparado.",
    "tags": [
      "Carteira",
      "Mercado"
    ],
    "related": [
      "Rentabilidade nominal",
      "Rentabilidade real",
      "Benchmark"
    ]
  },
  {
    "term": "Rentabilidade nominal",
    "definition": "É o retorno de um investimento sem descontar a inflação do período.",
    "why": "Pode mostrar crescimento em reais mesmo quando o aumento do poder de compra foi pequeno.",
    "tags": [
      "Carteira",
      "Economia"
    ],
    "related": [
      "Rentabilidade real",
      "Inflação"
    ]
  },
  {
    "term": "Rentabilidade real",
    "definition": "É o retorno considerado depois do efeito da inflação.",
    "why": "Ajuda a avaliar se o patrimônio ganhou ou perdeu poder de compra.",
    "tags": [
      "Carteira",
      "Economia"
    ],
    "related": [
      "Rentabilidade nominal",
      "IPCA",
      "Juros reais"
    ]
  },
  {
    "term": "Risco de crédito",
    "definition": "É o risco de o emissor ou devedor não pagar uma obrigação como previsto.",
    "why": "Está presente em CDBs, debêntures, CRIs, CRAs, FIDCs e muitos outros investimentos de dívida.",
    "tags": [
      "Risco",
      "Crédito privado"
    ],
    "related": [
      "Emissor",
      "Rating",
      "Spread de crédito"
    ]
  },
  {
    "term": "Risco de liquidez",
    "definition": "É o risco de não conseguir vender ou resgatar um investimento no momento desejado ou de precisar aceitar um preço desfavorável para sair.",
    "why": "Pode ser especialmente relevante em títulos pouco negociados, fundos com prazos de resgate e ativos de mercado restrito.",
    "tags": [
      "Risco",
      "Carteira"
    ],
    "related": [
      "Liquidez",
      "Mercado secundário"
    ]
  },
  {
    "term": "Risco de mercado",
    "definition": "É o risco de perdas causadas por mudanças em preços, juros, moedas, índices ou outros fatores de mercado.",
    "why": "Mesmo investimentos de boa qualidade de crédito podem oscilar por causa das condições de mercado.",
    "tags": [
      "Risco",
      "Mercado"
    ],
    "related": [
      "Volatilidade",
      "Marcação a mercado",
      "Exposição cambial"
    ]
  },
  {
    "term": "SAC",
    "definition": "Sistema de Amortização Constante. É um modelo de financiamento em que a amortização do principal é constante e as parcelas tendem a diminuir ao longo do tempo.",
    "why": "Pode ter comportamento diferente da Tabela Price, principalmente na evolução das parcelas e do saldo devedor.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "Tabela Price",
      "Amortização",
      "Financiamento"
    ]
  },
  {
    "term": "Sacado",
    "definition": "Em operações com recebíveis, é quem deve pagar o crédito que foi cedido ou incluído na estrutura.",
    "why": "A capacidade de pagamento dos sacados pode ser um dos principais riscos de um FIDC ou de outra operação baseada em recebíveis.",
    "tags": [
      "FIDC",
      "Crédito estruturado"
    ],
    "related": [
      "Cedente",
      "Direitos creditórios",
      "Inadimplência"
    ]
  },
  {
    "term": "Saldo disponível",
    "definition": "É o valor que pode ser movimentado imediatamente em uma conta, descontadas as limitações e compromissos já registrados.",
    "why": "Não deve ser confundido com limite de crédito, saldo aplicado ou patrimônio total.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "Conta corrente",
      "Cheque especial"
    ]
  },
  {
    "term": "Securitização",
    "definition": "É a transformação de recebíveis ou créditos em títulos ou estruturas que podem ser financiadas por investidores.",
    "why": "CRI, CRA e diversas operações de FIDC usam mecanismos de securitização.",
    "tags": [
      "Crédito estruturado",
      "Crédito privado"
    ],
    "related": [
      "CRI",
      "CRA",
      "Direitos creditórios"
    ]
  },
  {
    "term": "Selic",
    "definition": "É a taxa básica de juros da economia brasileira e uma referência central para crédito, renda fixa e política monetária.",
    "why": "Mudanças na Selic influenciam o custo do dinheiro e a atratividade relativa de diversos investimentos.",
    "tags": [
      "Juros",
      "Economia"
    ],
    "related": [
      "CDI",
      "Pós-fixado",
      "Curva de juros"
    ]
  },
  {
    "term": "Sharpe",
    "definition": "É um indicador que relaciona o retorno excedente de uma estratégia ao nível de oscilação assumido para obtê-lo.",
    "why": "Pode ajudar a comparar estratégias, mas não deve ser usado sozinho e depende do período e da metodologia adotados.",
    "tags": [
      "Risco",
      "Fundos"
    ],
    "related": [
      "Volatilidade",
      "Drawdown",
      "Rentabilidade"
    ]
  },
  {
    "term": "SMLL",
    "definition": "Índice Small Cap da B3. Acompanha uma carteira teórica de ações e units de empresas de menor capitalização que atendem aos critérios do índice.",
    "why": "É uma referência para observar o comportamento das small caps brasileiras.",
    "tags": [
      "Mercados & índices",
      "Bolsa"
    ],
    "related": [
      "IBOV",
      "Benchmark",
      "Ação"
    ]
  },
  {
    "term": "Spread",
    "definition": "É a diferença entre duas taxas, preços ou referências.",
    "why": "O significado depende do contexto: pode representar custo de intermediação, prêmio de risco ou diferença entre compra e venda.",
    "tags": [
      "Mercado",
      "Custos & remuneração"
    ],
    "related": [
      "Spread bancário",
      "Spread de câmbio",
      "Spread de crédito"
    ]
  },
  {
    "term": "Spread bancário",
    "definition": "É a diferença entre o custo de captação de recursos de uma instituição e as taxas cobradas em suas operações de crédito, dentro de uma análise mais ampla de custos e riscos.",
    "why": "Ajuda a entender por que a taxa cobrada em um empréstimo pode ser muito maior que uma referência de mercado.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "CET",
      "Crédito",
      "Spread"
    ]
  },
  {
    "term": "Spread de câmbio",
    "definition": "É a diferença entre uma cotação de referência da moeda e a cotação efetivamente oferecida ao cliente na conversão.",
    "why": "Um dólar de referência pode estar em determinado valor e a compra ocorrer a uma cotação diferente. IOF e outras tarifas devem ser observados separadamente.",
    "tags": [
      "Câmbio & exterior",
      "Custos & remuneração"
    ],
    "related": [
      "Câmbio",
      "Taxa de câmbio",
      "IOF"
    ]
  },
  {
    "term": "Spread de crédito",
    "definition": "É o prêmio de juros exigido para assumir risco de crédito acima de uma referência considerada mais segura ou comparável.",
    "why": "Quando a percepção de risco aumenta, o spread pode subir e o preço de títulos já emitidos pode cair.",
    "tags": [
      "Crédito privado",
      "Renda fixa"
    ],
    "related": [
      "Risco de crédito",
      "Debênture",
      "Rating",
      "Marcação a mercado"
    ]
  },
  {
    "term": "Subordinação",
    "definition": "É uma ordem de prioridade entre credores ou classes de investimento. Quem está subordinado aceita receber depois de quem tem prioridade.",
    "why": "Em FIDCs, cotas subordinadas podem absorver perdas antes das seniores. Em algumas Letras Financeiras, a subordinação também altera a prioridade de pagamento em situações extremas.",
    "tags": [
      "Crédito estruturado",
      "Renda fixa"
    ],
    "related": [
      "Cota sênior",
      "Cota mezanino",
      "Cota subordinada",
      "Letra Financeira"
    ]
  },
  {
    "term": "Tabela Price",
    "definition": "É um sistema de financiamento com parcelas normalmente iguais no início do contrato, nas quais a proporção entre juros e amortização muda ao longo do tempo.",
    "why": "O comportamento do saldo devedor e do custo ao longo do contrato é diferente do SAC.",
    "tags": [
      "Bancos & crédito"
    ],
    "related": [
      "SAC",
      "Amortização",
      "Financiamento"
    ]
  },
  {
    "term": "Tabela progressiva",
    "definition": "É uma forma de tributação em que a alíquota aumenta conforme a faixa de renda tributável, seguindo as regras vigentes.",
    "why": "Pode ser utilizada em determinadas estruturas de previdência e deve ser avaliada conforme o perfil de renda e resgate.",
    "tags": [
      "Previdência",
      "Tributação"
    ],
    "related": [
      "PGBL",
      "VGBL",
      "Tabela regressiva"
    ]
  },
  {
    "term": "Tabela regressiva",
    "definition": "É uma forma de tributação usada em previdência em que a alíquota diminui conforme aumenta o prazo de permanência de cada contribuição, segundo as regras aplicáveis.",
    "why": "É voltada a horizontes mais longos e deve ser comparada com a tabela progressiva de acordo com o planejamento.",
    "tags": [
      "Previdência",
      "Tributação"
    ],
    "related": [
      "PGBL",
      "VGBL",
      "Tabela progressiva"
    ]
  },
  {
    "term": "Tarifa bancária",
    "definition": "É um valor cobrado por determinados serviços bancários, conforme contrato e regulamentação aplicável.",
    "why": "Tarifa não é a mesma coisa que juros, spread ou imposto e deve ser identificada separadamente na comparação de custos.",
    "tags": [
      "Bancos & crédito",
      "Custos & remuneração"
    ],
    "related": [
      "CET",
      "Spread de câmbio"
    ]
  },
  {
    "term": "Taxa de administração",
    "definition": "É uma cobrança pela administração e gestão de determinados fundos, ETFs ou planos, normalmente expressa como percentual anual.",
    "why": "Reduz o resultado líquido do investidor e deve ser comparada com a proposta e a complexidade do produto.",
    "tags": [
      "Fundos",
      "Custos & remuneração"
    ],
    "related": [
      "Taxa de performance",
      "Fundo de investimento",
      "ETF"
    ]
  },
  {
    "term": "Taxa de câmbio",
    "definition": "É o preço de uma moeda em relação a outra.",
    "why": "USD/BRL, por exemplo, indica quantos reais correspondem a um dólar.",
    "tags": [
      "Câmbio & exterior"
    ],
    "related": [
      "USD/BRL",
      "EUR/BRL",
      "Spread de câmbio"
    ]
  },
  {
    "term": "Taxa de custódia",
    "definition": "É uma cobrança relacionada à guarda ou manutenção de determinados ativos ou contas, quando aplicável.",
    "why": "Pode existir separadamente de taxa de administração, corretagem ou outros custos.",
    "tags": [
      "Custos & remuneração",
      "Mercado"
    ],
    "related": [
      "Custódia",
      "Taxa de administração"
    ]
  },
  {
    "term": "Taxa de performance",
    "definition": "É uma remuneração adicional cobrada em alguns fundos quando o desempenho supera critérios definidos no regulamento.",
    "why": "É importante entender o benchmark, a regra de cálculo e as condições para cobrança.",
    "tags": [
      "Fundos",
      "Custos & remuneração"
    ],
    "related": [
      "Benchmark",
      "Fundo de investimento",
      "IHFA"
    ]
  },
  {
    "term": "Taxa efetiva",
    "definition": "É a taxa que representa o efeito real da capitalização em um período, de acordo com a forma como os juros são calculados.",
    "why": "Pode ser diferente de uma taxa nominal anunciada e ajuda a comparar operações de crédito e investimento.",
    "tags": [
      "Juros",
      "Bancos & crédito"
    ],
    "related": [
      "CET",
      "Juros compostos"
    ]
  },
  {
    "term": "Tesouro Direto",
    "definition": "É o programa que permite a pessoas físicas comprar títulos públicos federais pela internet por meio da infraestrutura do mercado brasileiro.",
    "why": "Os títulos têm risco do governo federal e podem sofrer marcação a mercado antes do vencimento.",
    "tags": [
      "Renda fixa",
      "Títulos públicos"
    ],
    "fgc": "NÃO",
    "issuer": "Tesouro Nacional",
    "related": [
      "Título público",
      "Marcação a mercado",
      "Prefixado",
      "IPCA"
    ]
  },
  {
    "term": "Ticker",
    "definition": "É o código curto usado para identificar um ativo ou referência no mercado.",
    "why": "IVVB11, por exemplo, é o ticker de um ETF; IBOV e SMLL identificam índices mostrados no site.",
    "tags": [
      "Mercados & índices",
      "Bolsa"
    ],
    "related": [
      "IVVB11",
      "IBOV",
      "SMLL"
    ]
  },
  {
    "term": "Título público",
    "definition": "É um título de dívida emitido pelo governo para captar recursos.",
    "why": "No Brasil, títulos públicos federais podem ser acessados por meio do Tesouro Direto e têm preços que variam com as condições de mercado.",
    "tags": [
      "Renda fixa",
      "Títulos públicos"
    ],
    "fgc": "NÃO",
    "issuer": "Governo",
    "related": [
      "Tesouro Direto",
      "Marcação a mercado",
      "IMA-B"
    ]
  },
  {
    "term": "USD",
    "definition": "Código internacional do dólar dos Estados Unidos.",
    "why": "No site da ROAD aparece em referências de câmbio, Bitcoin e ouro.",
    "tags": [
      "Câmbio & exterior",
      "Mercados & índices"
    ],
    "related": [
      "USD/BRL",
      "Câmbio",
      "Bitcoin",
      "Ouro"
    ]
  },
  {
    "term": "USD/BRL",
    "definition": "É a cotação que indica quantos reais correspondem a um dólar dos Estados Unidos.",
    "why": "Serve como referência para conversões entre dólar e real, mas a taxa efetivamente oferecida ao cliente pode incluir spread e outros custos.",
    "tags": [
      "Câmbio & exterior",
      "Mercados & índices"
    ],
    "related": [
      "USD",
      "Spread de câmbio",
      "Taxa de câmbio"
    ]
  },
  {
    "term": "Vencimento",
    "definition": "É a data em que uma obrigação ou investimento chega ao prazo final previsto.",
    "why": "Vencimento não é a mesma coisa que liquidez: alguns produtos podem ser vendidos antes, outros não, e o preço de saída pode variar.",
    "tags": [
      "Renda fixa",
      "Bancos & crédito"
    ],
    "related": [
      "Liquidez",
      "Carência",
      "Mercado secundário"
    ]
  },
  {
    "term": "VGBL",
    "definition": "Vida Gerador de Benefício Livre. É um seguro de pessoas com cobertura por sobrevivência usado para acumulação de longo prazo.",
    "why": "No resgate ou recebimento de renda, o Imposto de Renda incide sobre os rendimentos, conforme as regras aplicáveis. Diferentemente do PGBL, as contribuições não são dedutíveis na declaração de IR.",
    "tags": [
      "Previdência",
      "Tributação"
    ],
    "related": [
      "PGBL",
      "Tabela progressiva",
      "Tabela regressiva"
    ]
  },
  {
    "term": "Volatilidade",
    "definition": "É uma medida de quanto os preços ou retornos de um investimento costumam oscilar.",
    "why": "Volatilidade não é sinônimo de perda, mas ajuda a entender quão instável pode ser o caminho até o resultado.",
    "tags": [
      "Risco",
      "Carteira"
    ],
    "related": [
      "Drawdown",
      "Sharpe",
      "Risco de mercado"
    ]
  },
  {
    "term": "Yield",
    "definition": "É um termo usado para indicar rendimento ou taxa de retorno, mas seu significado exato depende do ativo e da forma de cálculo.",
    "why": "Antes de comparar yields, é importante saber se a referência é corrente, até o vencimento, anualizada ou calculada por outra metodologia.",
    "tags": [
      "Renda fixa",
      "Mercado"
    ],
    "related": [
      "Rentabilidade",
      "Título público",
      "Debênture"
    ]
  }
];
