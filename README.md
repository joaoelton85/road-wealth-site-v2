# ROAD Wealth — V16

Versão completa do site institucional ROAD Wealth, consolidando os refinamentos visuais e de interação posteriores à V15.

## Principais ajustes da V16

- ticker TradingView com inicialização mais robusta e sem estado permanente de “Carregando”;
- informação de fontes/atraso sem faixa própria, apenas como texto sobre o fundo natural da página;
- faixa Café da Home com centralização vertical e tipografia revisadas;
- três chamadas editoriais na Home para Mercados & Ferramentas, Check-up ROAD e Conhecimento;
- bloco “Conheça Entre Rios” com vídeo do YouTube carregado somente após interação;
- proteção de tema claro para preservar a cor Areia em navegadores Android;
- rodapé alterado para preto + Areia, reforçando o encerramento visual do site.

## Build

```bash
npm install
npm run build
```

Deploy configurado no Cloudflare Workers com `npx wrangler deploy`.
