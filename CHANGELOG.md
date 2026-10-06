# CHANGELOG — ROAD Wealth

## V36 — 06/10/2026

- MERCADOS e DESTAQUE passam a usar exatamente a mesma largura de coluna, tamanho de fonte, peso, espaçamento entre letras, line-height e alinhamento horizontal.
- DESTAQUE volta a ficar sozinho no bloco Café.
- As bolinhas de alternância saem do bloco Café e passam para a área Areia imediatamente ao lado, integradas ao banner e sem caixa/borda própria.
- Mantido o comportamento de um único destaque visível por vez, com rotação automática e navegação pelas bolinhas.
- A direção editorial `Estratégia global para os seus objetivos` não foi incorporada ao site.
- Demais elementos da V35 — hero, fundos editoriais, nota B3, Contato em Areia e ticker — permanecem inalterados.
- Marcador técnico atualizado para `ROAD_BUILD=36.0.0`.

## V35 — 06/10/2026

- Hero da Home atualizado para a composição aprovada com caminho claramente visível conduzindo à igreja, preservando o destaque sutil de luz sobre a construção e recortes responsivos.
- MERCADOS e DESTAQUE passam a compartilhar o mesmo eixo esquerdo e a mesma largura de identificação, reforçando a uniformidade do topo.
- A palavra DESTAQUE ganha maior presença visual e os indicadores de alternância passam a ficar integrados ao próprio bloco Café, sem caixa separada à direita.
- O primeiro destaque passa a convidar: `Como está seu planejamento financeiro? Faça um teste rápido e receba seu diagnóstico.`
- Destaques recebem fundos editoriais discretos por assunto: caminho/diagnóstico no Check-up, referência ao Leão e documentos no IR e terminal/gráficos em Mercados & Ferramentas.
- A faixa de Destaques passa a integrar o topo fixo junto ao painel de indicadores.
- A nota `B3 · 15 min de atraso | via TradingView` passa para imediatamente abaixo do bloco de Destaques, eliminando o conflito visual com o ticker.
- O bloco Contato da Home passa de Café para Areia, recuperando a alternância visual entre as seções.
- A lógica e os símbolos do ticker permanecem inalterados.
- Marcador técnico atualizado para `ROAD_BUILD=35.0.0`.

## V34 — 06/10/2026

- Correção técnica final do verificador de build, sem qualquer alteração visual.
- A validação da Home passa a procurar `Explore Mercados &amp; Ferramentas`, exatamente como o Astro serializa o caractere `&` no HTML final.
- Mantidos integralmente a fotografia da Catedral de Mônaco, o novo hero, o bloco de Destaque, os textos visíveis e a lógica do ticker.
- Marcador técnico atualizado para `ROAD_BUILD=34.0.0`.

## V33 — 06/10/2026

- Correção técnica de publicação da V32, sem alteração visual adicional.
- Removida do verificador da Home a exigência obsoleta do texto `CALCULADORA DE IR 2026`, substituído na V32 pela chamada `Simule seu IR 2026`.
- Mantida a validação da página própria da Calculadora de IR, onde o título `Calculadora de IR 2026` continua correto.
- Preservados integralmente o novo bloco de Destaque, o hero fotográfico, a fotografia autêntica da Catedral de Mônaco e a lógica do ticker.
- Marcador técnico atualizado para `ROAD_BUILD=33.0.0`.

## V32 — 05/10/2026

- Nova direção visual da Home, preservando a V31 como ponto de retorno.
- Cabeçalho mobile volta ao arranjo institucional limpo, com logo à esquerda e menu à direita.
- A área de destaque passa a ficar abaixo da faixa de mercados em desktop e mobile, em uma única peça: bloco Café com `DESTAQUE` e conteúdo Areia com borda Café sutil.
- Textos promocionais passam a usar linguagem natural e tipografia do próprio site: `Faça seu Check-up ROAD`, `Simule seu IR 2026` e `Explore Mercados & Ferramentas`.
- O hero da Home passa a usar fotografia real da Catedral de Nossa Senhora Imaculada, em Mônaco, vista a partir do jardim da ruelle Sainte-Barbe; a imagem é de domínio público e recebe tratamento de contraste em Café, luz sutil sobre a construção e recorte responsivo.
- Lema, textos e CTAs permanecem HTML/CSS com as fontes oficiais do site; nenhum texto é incorporado à fotografia.
- Mantida a lógica do ticker da V29–V31, sem alterações no carregamento das cotações.
- Marcador técnico atualizado para `ROAD_BUILD=32.0.0`.

## V31 — 05/10/2026

- Desktop e mobile passam a usar apresentações diferentes para a área de destaque.
- No desktop, a faixa permanece abaixo dos indicadores, como na V30, com fundo Café e textos Areia.
- No mobile, a faixa larga é removida do fluxo e o destaque passa a ocupar o espaço central já existente entre o logo da ROAD e o botão de menu, sem aumentar a altura do cabeçalho.
- Somente o retângulo central de destaque recebe fundo Café; o restante do cabeçalho permanece Areia.
- O rótulo passa a ser `DESTAQUE`, com tamanho e peso visual maiores, acompanhado pelo nome do recurso em rotação: Check-up ROAD, Calculadora de IR e Mercados & Ferramentas.
- A ordem de prioridade e a rotação de 7 segundos da V30 foram preservadas.
- A lógica do ticker da V29/V30 permanece inalterada.
- Marcador técnico atualizado para `ROAD_BUILD=31.0.0`.

## V30 — 05/10/2026

- Criada uma faixa editorial dinâmica de destaques logo abaixo do painel de mercados, visível em todo o site e independente da integração da TradingView.
- Ordem de prioridade dos destaques: Check-up ROAD, Calculadora de IR 2026 e Mercados & Ferramentas.
- O primeiro destaque ao carregar a página passa a ser sempre o Check-up ROAD.
- Rotação automática a cada 7 segundos, com navegação manual, pausa durante interação e respeito a `prefers-reduced-motion`.
- No mobile, a faixa usa altura fixa e textos compactos para evitar deslocamentos de layout e excesso de ocupação antes do conteúdo principal.
- A identificação `MERCADOS` do ticker recebeu maior peso e tamanho, aproximando-se visualmente das informações dos indicadores.
- Removidas da Home as chamadas grandes redundantes de Mercados & Ferramentas e Calculadora de IR; o convite contextual ao Check-up ROAD foi preservado.
- Mantida integralmente a lógica do ticker da V29, incluindo o modo `regular` com fallback seguro.
- Marcador técnico atualizado para `ROAD_BUILD=30.0.0`.

## V29 — 04/10/2026

- Correção do ticker mobile baseada na V26, sem reutilizar o estado instável da V27/V28.
- Mobile tenta o modo `regular` para manter símbolo, valor e variação em uma única linha.
- Preservado `isTransparent: false` no mobile para manter o fundo escuro.
- O painel mobile deixa de ser marcado como pronto apenas pela existência do iframe; aguarda o carregamento efetivo.
- Se o modo `regular` falhar, o componente tenta automaticamente `compact` antes de declarar indisponibilidade.
- Desktop e demais áreas do site permanecem inalterados.
- Marcador técnico atualizado para `ROAD_BUILD=29.0.0`.

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
