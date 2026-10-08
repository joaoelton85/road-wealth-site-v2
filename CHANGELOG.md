# CHANGELOG — ROAD Wealth

## V52 — 08/10/2026

- Consolida editorialmente a relação entre ROAD e Rede Meu Patrimônio, preservando a ROAD como marca e voz principal.
- Cabeçalho desktop passa a exibir ROAD e a assinatura oficial horizontal da Rede Meu Patrimônio lado a lado; no mobile, a assinatura da Rede permanece oculta para preservar legibilidade.
- Rodapé remove o texto “Faz parte da” e mantém apenas as duas assinaturas oficiais, com a Rede em posição secundária.
- “A ROAD” ganha o capítulo “A Rede”, explicando relacionamento ROAD, estrutura regulatória/tecnológica da Meu Patrimônio, consolidação, plataformas e Big Numbers da Rede.
- Big Numbers utilizados: + R$ 1 bi de patrimônio sob consultoria, +500 famílias e NPS 95, identificados como dados divulgados pela Meu Patrimônio.
- Página Investimentos passa a separar claramente o papel da ROAD no relacionamento e acompanhamento do papel da Meu Patrimônio na estrutura da Consultoria.
- O bloco multiplaforma passa a explicar a estrutura institucional por trás das plataformas parceiras.
- “Avisos legais e regulatórios” no rodapé passa a levar à seção explicativa de Investimentos.
- Política de Privacidade passa a distinguir os dados coletados diretamente pelo site ROAD dos fluxos que possam ocorrer em plataformas e serviços da Meu Patrimônio.
- Ticker, Destaques, Calculadora, Check-up e demais áreas funcionais permanecem inalterados.
- Marcador técnico atualizado para `ROAD_BUILD=52.0.0`.

## V51 — 08/10/2026

- Incorpora ao site o endosso institucional oficial da Rede Meu Patrimônio, conforme o Manual de Marca v1.0.
- O rodapé passa a exibir a assinatura horizontal branca oficial da Rede, em posição e escala secundárias à marca ROAD.
- A seção “Quem somos” em A ROAD passa a incluir a frase “Faz parte da Rede Meu Patrimônio” acompanhada da assinatura horizontal verde oficial.
- Os arquivos SVG são utilizados sem filtro, recoloração, alteração de proporção ou reconstrução.
- A Meu Patrimônio não é incluída na grade de plataformas, preservando sua função de endosso institucional.
- Cabeçalho e ticker permanecem inalterados.
- Marcador técnico atualizado para `ROAD_BUILD=51.0.0`.

## V50.1 — 07/10/2026

- Mantém as quatro bolinhas centralizadas na parte inferior da faixa Destaque.
- Remove o padding inferior aplicado ao conteúdo dos slides, devolvendo o texto ao centro vertical e ao mesmo eixo óptico da palavra `DESTAQUE`.
- Nenhuma outra área do site foi alterada.

## V49.1 — 07/10/2026

- Hotfix técnico sem alteração visual.
- Corrige a vírgula ausente entre os verbetes `Yield` e `CBDC` no Glossário e marca a build como `49.0.1` para diferenciar inequivocamente o checkout corrigido no Cloudflare.

## V49 — 07/10/2026

- Reconstruída diretamente sobre a árvore da V44, última versão confirmada em produção no Cloudflare.
- Reaplica em um único conjunto coerente as alterações convergidas entre V45 e V48: remoção dos banners intermediários; quarto Destaque para Conhecimento; logos monocromáticos e uniformes; maior largura editorial; números 01–05 destacados; tipografia institucional; refinamentos da Calculadora de IR; e Glossário com 160 verbetes.
- O ticker e a infraestrutura funcional da V44 foram preservados.
- As camadas `v45.css`, `v46.css`, `v47.css` e `v48.css` não são carregadas pela V49.
- O verificador de build volta a ser curto e objetivo.
- Marcador técnico atualizado para `ROAD_BUILD=49.0.0`.

## V48 — 07/10/2026

- Revisão efetiva do escopo aprovado, partindo da `road-wealth-site-v2/main`.
- A palavra DESTAQUE passa a usar a classe `road-highlights__label-text` esperada pelos estilos do topo, corrigindo a divergência entre componente e CSS.
- Os marcadores 01–05 recebem classe própria `planning-step-number`, 38 px no desktop e 30 px no mobile, em Café sólido, evitando dependência do seletor genérico de `span`.
- Planejamento, Áreas de Atuação e Consultoria Independente mantêm largura editorial integral com seletores explícitos.
- Logos nacionais e internacionais passam a compartilhar caixa óptica de 140 × 40 px no desktop e tratamento monocromático grafite consistente.
- Hero e seções principais da Home recebem redução moderada de altura e padding, preservando a sensação de espaço.
- Tipografia institucional de contatos é reafirmada em Home, Contato e Onde estamos.
- Calculadora de IR tem Hero/cabeçalho mais compactos, metadados simples, critérios com escala editorial revisada e CTA pós-resultado preservado.
- A camada redundante `v47.css` deixa de ser carregada; V48 passa a ser a única camada final sobre V46.
- Ticker, e-mail transacional, DNS e WhatsApp definitivo permanecem fora do escopo.
- Marcador técnico atualizado para `ROAD_BUILD=48.0.0`.

## V47 — 07/10/2026

- Publicação de consolidação da revisão visual discutida após a V46, mantendo como base exclusiva o repositório `road-wealth-site-v2`.
- Criada a camada final `v47.css` para reafirmar no bundle publicado o tratamento monocromático dos logos, a hierarquia 01–05 do Planejamento, o alinhamento da faixa Destaque, a padronização de contatos e os refinamentos da Calculadora de IR.
- O novo arquivo CSS força geração de asset diferente da V46, reduzindo o risco de reaproveitamento de bundle anterior na publicação.
- Mantidas as remoções dos banners intermediários e a concentração dos acessos em Destaque.
- Mantidos fora desta rodada o envio transacional de e-mails e o WhatsApp empresarial definitivo.
- Marcador técnico atualizado para `ROAD_BUILD=47.0.0`.

## V46 — 07/10/2026

- Correção explícita dos três blocos apontados na Home: Planejamento Financeiro, Áreas de Atuação e Consultoria Independente passam a ocupar toda a largura editorial disponível, sem o limite residual de 1.240 px.
- Os textos introdutórios desses três blocos deixam de herdar limites de largura que geravam quebras e palavras isoladas apesar de haver espaço horizontal disponível.
- Etapas 01–05 do Planejamento recebem números ainda mais marcantes: 34 px no desktop, Café sólido e alinhamento numérico uniforme.
- As cinco caixas de Planejamento passam a usar exatamente o mesmo padding lateral e vertical no desktop, eliminando diferenças entre primeira e última coluna.
- Mantidas integralmente as demais alterações da V45.
- Marcador técnico atualizado para `ROAD_BUILD=46.0.0`.

## V45 — 07/10/2026

- Revisão geral de acabamento e consistência visual, sem alterar a operacionalização de e-mail ou WhatsApp.
- Home com Hero mais compacto e transição mais curta para o conteúdo seguinte.
- Textos editoriais passam a aproveitar melhor a largura útil; o bloco Consultoria Independente e outros conteúdos textuais deixam de ficar limitados a colunas excessivamente estreitas.
- Etapas 01–05 do planejamento recebem números maiores, em Café, com presença visual mais clara.
- Logos das plataformas nacionais e internacionais passam a receber tratamento monocromático em grafite/cinza escuro.
- Banners intermediários do corpo das páginas foram removidos; Check-up, Calculadora, Mercados & Ferramentas e Conhecimento ficam concentrados na faixa Destaque do topo.
- Informações de endereço, e-mail e contato passam a seguir uma escala tipográfica compartilhada entre Home, Contato e Onde estamos.
- Calculadora de IR: removido o uso público da palavra “Protótipo”; os antigos badges viram cabeçalho da simulação no bloco branco; critérios recebem tipografia revisada; resultado passa a oferecer “Ficou em dúvida? Fale com a gente”, levando à página de Contato enquanto o WhatsApp empresarial não está operacional.
- Glossário ampliado de 153 para 160 verbetes, com Pix, Open Finance, Open Insurance, Drex, CBDC, Tokenização e Diferimento / diferido.
- Mantidos o topo persistente da V43 e os ajustes mobile/privacidade da V44.
- Marcador técnico atualizado para `ROAD_BUILD=45.0.0`.

## V44 — 06/10/2026

- Corrigida a hierarquia de camadas no mobile/tablet: o cabeçalho e o menu aberto passam a ficar acima das faixas Mercados e Destaque.
- A página Conhecimento recebe padronização tipográfica dos textos explicativos, com Inter, escala consistente e line-height 1,55.
- O texto de Perspectivas deixa de expor uma diretriz editorial interna e passa a falar diretamente com o cliente.
- Publicada a página Privacidade e Cookies, com linguagem direta e aderente à configuração atual do site.
- A política informa o tratamento local do Check-up ROAD e da Calculadora de IR, além de esclarecer que o formulário Faça parte da ROAD ainda não transmite dados enquanto não houver backend.
- Serviços de terceiros atualmente presentes são descritos de forma específica: Cloudflare, TradingView, YouTube em modo youtube-nocookie e Google Fonts.
- O site informa que, na configuração atual, a ROAD não utiliza por iniciativa própria cookies de publicidade comportamental nem ferramenta própria de analytics ou marketing.
- O canal de privacidade passa a ser contato@roadwealth.com.br.
- Os itens Política de Privacidade e Cookies no rodapé passam a ser links reais para a nova página.
- Mantidos integralmente o topo persistente, ClientRouter e ticker regular da V43.
- Marcador técnico atualizado para `ROAD_BUILD=44.0.0`.

## V43 — 06/10/2026

- A navegação interna passa a usar o ClientRouter do Astro 7, evitando recarregamentos completos entre páginas do próprio site.
- O bloco superior (cabeçalho, Mercados, Destaque e nota da fonte) passa a usar persistência entre navegações internas.
- As transições visuais padrão foram desativadas para que a troca de páginas aconteça abaixo do topo sem o efeito de “piscar” toda a estrutura.
- O menu ativo agora é recalculado após cada navegação; Glossário e Calculadora de IR continuam vinculados visualmente a Conhecimento.
- O ticker desktop deixa o modo adaptativo e passa ao modo regular, evitando que o TradingView alterne automaticamente para uma apresentação compacta de duas linhas conforme a largura calculada.
- Mercados & Ferramentas e o menu mobile foram tornados compatíveis com a navegação persistente, com handlers únicos e delegados.
- O conteúdo do Glossário e das demais páginas permanece inalterado.
- Marcador técnico atualizado para `ROAD_BUILD=43.0.0`.

## V42 — 06/10/2026

- Publicado o Glossário ROAD em página própria dentro de Conhecimento.
- Primeira versão com 153 verbetes em ordem alfabética, busca textual, filtro por tema e navegação A–Z.
- Cada verbete usa linguagem didática com duas camadas: `O que é` e `Por que isso importa`.
- Termos relacionados são conectados por `Veja também`, evitando definições isoladas quando os conceitos pertencem ao mesmo assunto.
- Produtos de renda fixa bancária e privada exibem, quando aplicável, emissor/estrutura e indicação simplificada de cobertura do FGC.
- Incluídos os indicadores e tickers citados no site: IBOV, IFIX, SMLL, IVVB11, USD, EUR, USD/BRL, EUR/BRL, Bitcoin, Ouro e contratos DI Jan/30 e DI Jan/35.
- Incluídos conceitos de renda fixa, crédito privado, FIDC, estruturas subordinadas, fundos, estratégias de ações, câmbio, bancos, previdência, tributação, custos e modelos de remuneração.
- Letra Financeira diferencia emissões com e sem subordinação e menciona, de forma didática, estruturas de Nível II e Capital Complementar, sem transformar o glossário em material regulatório.
- Conteúdo contra-checado com B3, ANBIMA, Banco Central, Portal do Investidor/CVM, FGC, SUSEP e fontes primárias de produtos.
- Página Conhecimento passa a apontar diretamente para o Glossário ROAD.
- Marcador técnico atualizado para `ROAD_BUILD=42.0.0`.

## V41 — 06/10/2026

- Revisão pontual da linguagem pública para separar posicionamento interno de comunicação externa.
- Removida da Home a autoatribuição `Segura, sofisticada, próxima e transparente.`.
- O teaser da ROAD passa a usar `Patrimônio também é relacionamento.`, demonstrando proximidade e cuidado por meio da forma de trabalhar.
- O bloco Propósito em A ROAD deixa de listar atributos do Branding Book e passa a descrevê-los por ações: entender objetivos, explicar decisões com clareza e acompanhar mudanças ao longo do tempo.
- O Branding Book permanece como guia interno de tom e posicionamento; o site manifesta esses princípios sem autoelogio.
- Marcador técnico atualizado para `ROAD_BUILD=41.0.0`.

## V40 — 06/10/2026

- Home reorganizada para explicar com clareza o que a ROAD faz logo na primeira navegação.
- Lema passa a `Seu patrimônio, / seu legado, / seu caminho.`, reforçando a conexão final com o nome ROAD.
- Hero passa a declarar: `Consultoria de Investimentos e planejamento patrimonial para famílias e negócios com patrimônio no Brasil e no exterior.`
- Novo bloco de posicionamento destaca proximidade, clareza, cuidado, transparência e relacionamento de longo prazo.
- Novo processo de planejamento em cinco etapas: Entender, Organizar, Planejar, Implementar e Acompanhar.
- Investimentos, Legado, Estratégia e Decisões ganham definições mais claras; Estratégia passa a representar o plano financeiro e Decisões as escolhas patrimoniais relevantes ao longo do caminho.
- Plataformas nacionais e internacionais passam a aparecer na Home para tornar evidente a estrutura multiplaforma.
- Página A ROAD passa a operar como narrativa guiada em carrossel editorial com rotação de 15 segundos: Consultoria → Por que Wealth? → Origem da Marca → Quem somos → Propósito → Onde estamos → Faça parte da ROAD.
- Removida a aba História.
- Os quatro quadros de Como funciona a Consultoria recebem Café mais profundo para ganhar destaque sobre fundo claro.
- O painel de Destaques recebe Café mais escuro, criando transição visual entre o ticker preto e o Hero.
- Fundos claros e escuros foram redistribuídos para evitar concentração excessiva de Café.
- Marcador técnico atualizado para `ROAD_BUILD=40.0.0`.

## V39 — 06/10/2026

- Correção focada no carregamento do Ticker Tape mobile do TradingView.
- O Web Component mobile passa a tentar primeiro o host `widgets.tradingview-widget.com`, utilizado pela geração atual dos widgets.
- Se essa origem não registrar o componente, o site tenta automaticamente a origem alternativa `www.tradingview-widget.com`.
- Se ambas falharem, o layout permanece estável com a mensagem `Carregando cotações…`.
- Desktop, Destaques, Hero e alternância cromática da Home permanecem inalterados.
- Marcador técnico atualizado para `ROAD_BUILD=39.0.0`.

## V38 — 06/10/2026

- Ticker mobile separado novamente do desktop, usando o Ticker Tape horizontal compacto atual do TradingView para evitar a deformação em duas linhas do widget legado adaptativo.
- Removido o logo TradingView adicional criado na V37; permanece apenas a identidade nativa/dinâmica do próprio widget.
- Se o componente mobile não carregar, permanece a mensagem `Carregando cotações…`.
- MERCADOS e DESTAQUE continuam com tipografia e largura uniformes; ambos passam a ficar centralizados em seus blocos.
- DESTAQUE permanece sozinho no bloco da esquerda e as bolinhas continuam dentro do banner imediatamente ao lado.
- Hero preservado com fundo Café, foto e lema em três linhas.
- A alternância Café/Areia é invertida nas seções seguintes da Home: História passa a Areia, A ROAD a Café, Check-up a Café, Investimentos a Areia e Contato a Café.
- A nota `B3 · 15 min de atraso | via TradingView` continua sem fundo, borda ou faixa própria.
- Marcador técnico atualizado para `ROAD_BUILD=38.0.0`.

## V37 — 06/10/2026

- Ticker simplificado para um único embed do TradingView em desktop e mobile, eliminando o modo `compact` e a possibilidade de voltar à composição em duas linhas.
- Em falha ou demora do TradingView, o painel mantém a geometria e permanece em `Carregando cotações…`.
- Criada reserva mínima à direita da barra apenas para o símbolo do TradingView; os indicadores terminam antes dela e não passam por trás da marca.
- MERCADOS e DESTAQUE permanecem com exatamente a mesma largura, fonte, peso, espaçamento e alinhamento.
- As três bolinhas passam a ficar dentro da área do banner imediatamente ao lado de DESTAQUE, e não sob a palavra nem em coluna independente.
- O banner de Destaques deixa o fundo Areia e passa a usar Café com gradiente discreto, sem fotografias ou ilustrações.
- A nota `B3 · 15 min de atraso | via TradingView` fica sem faixa, fundo ou borda, sobreposta discretamente abaixo do banner.
- O conteúdo do Hero sobe no desktop.
- O lema do Hero passa a três linhas: `Seu patrimônio,` / `seu caminho,` / `seu legado.`
- Foto do Hero, Contato em Areia e demais páginas permanecem inalterados.
- Marcador técnico atualizado para `ROAD_BUILD=37.0.0`.

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
