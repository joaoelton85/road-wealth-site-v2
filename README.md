# ROAD Wealth — V24

Revisão focada exclusivamente na faixa de mercados no mobile.

## Principais ajustes da V24

- o ticker mobile continua em uma única linha;
- o Web Component da TradingView passa a ser carregado pelo embed oficial estático `type="module"`, em vez de importação dinâmica;
- removido o modo `compact`, permitindo que cada ticker use uma área horizontal maior;
- o gráfico interno do ticker é ocultado para privilegiar símbolo, cotação e variação;
- a altura disponível no mobile foi ampliada para 54 px, evitando compressão vertical;
- `MERCADOS` permanece fixo à esquerda;
- desktop permanece inalterado;
- todos os refinamentos da Calculadora de IR da V23 são preservados;
- proteção contra publicação de assets antigos continua ativa;
- marcador técnico atualizado para `24.0.0`.

## Build e deploy

```bash
npm install
npm run build
npm run deploy
```

No Workers Builds:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Branch: `main`
