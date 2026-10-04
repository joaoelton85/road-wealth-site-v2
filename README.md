# ROAD Wealth — V25

Revisão focada em tornar a faixa de mercados confiável no mobile.

## Principais ajustes da V25

- removido do mobile o Web Component da TradingView que podia permanecer indefinidamente em “Carregando…”;
- desktop e mobile passam a usar a mesma integração legada da TradingView, carregada por `s3.tradingview.com`;
- no mobile, o ticker usa modo `regular`, preservando mais espaço por indicador sem aplicar `scale()` ao conteúdo;
- `MERCADOS` permanece fixo à esquerda e a faixa continua em uma única linha;
- cada modo possui estado de prontidão independente, evitando interferência ao alternar entre mobile e desktop;
- se o provedor não responder, após 9 segundos o texto muda para “Cotações temporariamente indisponíveis”, eliminando o carregamento infinito;
- desktop mantém a configuração `adaptive`;
- demais recursos da V24 são preservados;
- marcador técnico atualizado para `25.0.0`.

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
