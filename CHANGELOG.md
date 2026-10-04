# CHANGELOG — ROAD Wealth

## V28 — 04/10/2026

- Revisão específica de compatibilidade mobile/Android, sem alteração do conteúdo institucional.
- Reforçado o esquema claro da ROAD no mobile com `color-scheme: light only`, meta adicional de esquema claro e superfícies Areia protegidas contra conversão automática de tema.
- Ticker mobile preserva `displayMode: regular`, mantendo preço e variações completas.
- Ticker mobile volta a usar transparência sobre fundo preto controlado pela ROAD, evitando cartões claros e reduzindo a moldura visual do widget.
- Adicionado recorte de 1 px e remoção explícita de `border`, `outline` e `box-shadow` no iframe/viewport do ticker para ocultar bordas externas no Android.
- Desktop permanece inalterado.
- Marcador técnico atualizado para `ROAD_BUILD=28.0.0`.

## V27 — 04/10/2026

- Correção concentrada exclusivamente no painel de indicadores mobile.
- Mobile volta ao modo `regular` do ticker legado, recuperando a faixa contínua em uma única linha e a exibição completa de preço e variações.
- Mantido o fundo escuro não transparente introduzido na V26, evitando o retorno dos cartões brancos.
- Preservados `MERCADOS` fixo à esquerda, lista de indicadores, fallback de carregamento e comportamento do desktop.
- Marcador técnico atualizado para `ROAD_BUILD=27.0.0`.

## V26 — 04/10/2026

- Ajuste visual do ticker mobile após a V25.
- Modo mobile alterado de `regular` para `compact`, reduzindo tipografia e dimensões internas dos indicadores.
- `isTransparent` passa a ser `false` no mobile para preservar o fundo escuro do próprio widget e impedir o surgimento de cartões brancos.
- Tema `dark`, linha única, lista de indicadores e identificação fixa `MERCADOS` foram preservados.
- Desktop permanece inalterado.
- Marcador técnico atualizado para `ROAD_BUILD=26.0.0`.

## V25 — 04/10/2026

- Removido do mobile o Web Component da TradingView introduzido nas V23/V24, que podia permanecer preso no placeholder de carregamento.
- Mobile passa a usar o mesmo embed legado da TradingView já empregado no desktop, reduzindo a quantidade de integrações diferentes no mesmo componente.
- Modo mobile configurado como `regular`, sem `scale()`, mantendo mais espaço por indicador e uma única linha.
- Estados de prontidão de desktop e mobile passam a ser independentes.
- Adicionado timeout de 9 segundos: em falha de rede/provedor, o placeholder troca para `Cotações temporariamente indisponíveis` em vez de carregar indefinidamente.
- `MERCADOS` permanece fixo à esquerda e a lista de indicadores da V24 foi preservada.
- Marcador técnico atualizado para `ROAD_BUILD=25.0.0`.

## V24 — 04/10/2026

- Ticker mobile passa a carregar o Web Component da TradingView pelo embed oficial estático `type="module"`.
- Removido `item-size="compact"`, dando mais espaço horizontal a cada indicador.
- Adicionado `hide-chart` para priorizar nome, valor e variação na faixa.
- Altura disponível do ticker mobile ampliada para 54 px, sem dividir o conteúdo em duas linhas.
- `MERCADOS` continua fixo à esquerda; desktop não foi alterado.
- Refinamentos da Calculadora de IR da V23 e proteção de assets da V22 foram preservados.
- Marcador técnico atualizado para `ROAD_BUILD=24.0.0`.

## V23 — 04/10/2026

- Brent removido da faixa de mercados e do painel Mercados & Ferramentas.
- Mobile retrato volta a mostrar indicadores ao vivo usando o Web Component horizontal compacto da TradingView, em vez do iframe antigo que vinha deformando o conteúdo.
- `MERCADOS` permanece fixo à esquerda, sem marca TradingView externa duplicada.
- Campos monetários da Calculadora de IR passam a ser formatados em BRL ao perder foco, incluindo casas decimais `,00`.
- Campos e textos de ajuda da calculadora foram reorganizados em duas colunas alinhadas no desktop e uma coluna no mobile.
- Limites de incentivos passam a usar apenas o cenário efetivamente informado; espaço adicional de PGBL não é mais presumido como aporte.
- Potencial de PGBL continua sendo mostrado separadamente como simulação.
- Tipografia da metodologia da Calculadora de IR alinhada ao padrão Questrial / Montserrat / Inter do restante do site.
- Resumo lateral preservado.
- Proteção de static assets da V22 preservada.
- Marcador técnico atualizado para `ROAD_BUILD=23.0.0`.

## V22 — 04/10/2026

- Adicionado `dist/__road-build.json` com versão, commit SHA e identificador único do build.
- O marcador é gerado depois do Astro e antes da validação/deploy, forçando uma alteração inequívoca no conjunto de static assets a cada publicação.
- A validação automática passa a exigir o marcador `ROAD_BUILD=22.0.0` também no arquivo de build.
- Preservados integralmente os recursos da V21: Calculadora de IR 2026, banner de chamada e faixa mobile própria de Mercados.
- Objetivo desta versão: contornar publicação de assets antigos apesar de um build novo e validado.

## V21 — 04/10/2026

- Mobile retrato deixa de carregar o ticker tape da TradingView; a faixa superior passa a ser própria da ROAD, em uma única linha, com chamada para Mercados & Ferramentas.
- Desktop preserva o ticker da TradingView com os indicadores funcionais.
- Removida a reserva externa `TradingView` criada na V19, eliminando duplicidade de marca e disputa de espaço.
- Criado protótipo da Calculadora de IR 2026 em `/calculadora-ir/`, voltado ao ano-calendário 2026 / exercício 2027.
- Entradas da calculadora incluem rendimentos do titular e dependentes, previdência oficial, IR retido, dependentes, educação, despesas médicas, pensão, PGBL e incentivos.
- Resultado compara deduções legais e desconto simplificado e estima limite/espaço de PGBL e referências para incentivos.
- Home recebe banner específico para a Calculadora de IR; o painel Mercados & Ferramentas também passa a apontar para ela.
- Build passa a apagar `dist` antes de gerar a versão, evitando publicação de arquivos antigos.
- `wrangler.jsonc` passa a executar `npm run build` antes de deploy manual via Wrangler.
- Marcador técnico atualizado para `ROAD_BUILD=21.0.0` e validação automática ampliada.

## V20 — 04/10/2026

- Removidos da faixa de mercados os tickers de S&P 500, Nasdaq 100, Soja, Milho e Trigo por não estarem renderizando de forma confiável no widget atual.
- Mantidos IBOV, IFIX, SMLL, IVVB11, USD/BRL, EUR/BRL, Ouro, Brent, DI Jan/30, DI Jan/35 e Bitcoin.
- Painel Mercados & Ferramentas revisado para refletir somente a lista efetivamente exibida.
- Marcador técnico atualizado para `ROAD_BUILD=20.0.0`.
- Verificação automática do build passa a impedir a reintrodução acidental dos cinco indicadores removidos.

## V19 — 04/10/2026

- Barra de mercados reorganizada em três zonas: identificação `MERCADOS`, área de cotações e espaço dedicado à marca TradingView.
- No mobile retrato, removida a transformação `scale()` do iframe; o widget usa `compact` nativo e recorte vertical para evitar deformação de textos e números.
- Adicionados S&P 500, Nasdaq 100, Brent, Soja, Milho e Trigo à faixa, mantendo IBOV, IFIX, SMLL, IVVB11, câmbio, ouro, DI e Bitcoin.
- Conteúdo do painel Mercados & Ferramentas atualizado para refletir as novas referências e links.
- Banners editoriais passam a aparecer também de forma contextual nas páginas A ROAD, Investimentos, Patrimônio e Conhecimento, um convite por página.
- CTA dos banners ocupa a largura do painel no mobile para melhorar leitura e ação sem recorrer a pop-ups ou animações.
- Preservados o vídeo de Entre Rios sem texto adicional e o encerramento preto/safe area do rodapé.
- Marcador técnico atualizado para `ROAD_BUILD=19.0.0`.
- Validação automática do build passa a conferir indicadores adicionais, área TradingView e banners contextuais das páginas internas.

## V18 — 04/10/2026

- Recalibrado o ticker no mobile após a inclusão da identificação fixa `MERCADOS`: altura de 30 px restaurada, área do rótulo reduzida e geometria da fita preservada.
- Os três callouts da Home foram transformados em banners editoriais claramente delimitados, com painel interno e hierarquia visual própria.
- Removidos do bloco do vídeo em `Onde estamos` o título `CONHEÇA ENTRE RIOS`, o texto explicativo adicional e a barra/divisor introduzidos na V16.
- O vídeo permanece em carregamento sob demanda e sem alteração dos textos originais da seção.
- Fundo estrutural de `html/body` alterado para preto, enquanto `main` mantém o fundo Areia, evitando faixa clara após o rodapé.
- Rodapé passa a preencher também a `safe-area-inset-bottom` em dispositivos móveis.
- Meta viewport passa a usar `viewport-fit=cover` para permitir o preenchimento correto da área inferior em aparelhos compatíveis.
- Marcador técnico atualizado para `ROAD_BUILD=18.0.0`.
- Verificação automática do build reforçada para exigir três banners e impedir a volta dos textos removidos do vídeo.

## V17 — 04/10/2026

- Versão de reconciliação após auditoria do histórico V15/V16 e do artefato efetivamente servido em produção.
- Criada uma identificação permanente `MERCADOS` à esquerda do ticker, separada da área carregada pela TradingView.
- Mantidos DI1F30 e DI1F35 entre os indicadores da faixa superior.
- CTA do cabeçalho alterado de `Converse com a ROAD` para `Entre em contato`.
- Removido o tratamento em cápsula/círculo do CTA de contato.
- Removido o botão circular flutuante de contato.
- Preservados os três callouts editoriais da Home e o vídeo `Conheça Entre Rios`.
- Adicionado marcador técnico `ROAD_BUILD=17.0.0` ao HTML por meio de meta tag e atributo no body.
- O script de build passa a executar uma verificação de integridade do HTML gerado, bloqueando o deploy se banners, vídeo, identificação de versão, contato ou ticker não estiverem presentes.

## V16 — 03/10/2026

- Removida a faixa física de fontes/atraso sob o ticker; a informação agora é sobreposta, transparente e fora do fluxo da página.
- Revisada a detecção de prontidão da TradingView com observação de todo o container, varredura inicial, polling temporário e fallback controlado, evitando o estado permanente de carregamento.
- Placeholder do ticker simplificado para um estado neutro, sem a mensagem “Carregando cotações…”.
- Faixa Café da Home revisada com centralização vertical efetiva, margens normalizadas e tipografia explicitamente padronizada.
- Adicionadas chamadas editoriais para Mercados & Ferramentas, Check-up ROAD e Conhecimento.
- Botão da chamada de Mercados abre diretamente o painel lateral existente.
- Página “Onde estamos” passa a incluir o bloco “Conheça Entre Rios”, com vídeo do YouTube em carregamento sob demanda.
- Adicionadas diretivas de tema claro e `theme-color` para preservar a paleta Areia em navegadores Android.
- Rodapé alterado de Café para preto, com textos e marca em Areia.

## V15 — 03/10/2026

- Padronização dos títulos grandes (`h1`, `h2` e chamada editorial) em Questrial, mesma escala, peso e altura de linha.
- Alinhamento da faixa Café da Home à mesma malha da seção seguinte, com centralização vertical revisada.
- Navegação principal reposicionada para uma composição mais central; CTA permanece destacado à direita.
- Logo do rodapé equiparado ao tamanho óptico do logo do cabeçalho.
- Texto explicativo de “Onde estamos” uniformizado em fonte e tamanho.
- Plataformas nacionais reorganizadas: 6 logos na primeira linha e 5 centralizados na segunda.
- Barra de mercado mantida compacta, com fonte reduzida e geometria fixa.
- Estado intermediário da TradingView passa a ficar oculto durante a inicialização; um placeholder estável ocupa a mesma altura até o iframe concluir o carregamento e estabilizar.
- Preconexão com a TradingView adicionada para reduzir latência de inicialização.
- Informações de atraso/fontes removidas da segunda faixa preta e levadas para texto discreto Café sobre fundo Areia; versão compacta em notebooks.
- Ajustes responsivos preservam a consistência tipográfica e a geometria do ticker.

## V14

Base limpa publicada no novo repositório `road-wealth-site-v2`, com estrutura correta na raiz do GitHub.
