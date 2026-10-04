# CHANGELOG — ROAD Wealth

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
