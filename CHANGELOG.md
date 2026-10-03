# CHANGELOG — ROAD Wealth

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
