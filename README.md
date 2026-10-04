# ROAD Wealth — V20

Revisão corretiva da faixa de mercados.

## Ajustes da V20

- removidos da faixa os símbolos que não estavam renderizando de forma confiável no widget atual: S&P 500, Nasdaq 100, Soja, Milho e Trigo;
- mantidos IBOV, IFIX, SMLL, IVVB11, USD/BRL, EUR/BRL, Ouro, Brent, DI Jan/30, DI Jan/35 e Bitcoin;
- o painel Mercados & Ferramentas foi alinhado à mesma lista funcional, sem referências que o ticker não entrega;
- a validação automática passa a falhar caso os cinco indicadores removidos reapareçam no HTML;
- marcador técnico atualizado para `20.0.0`.

## Build

```bash
npm install
npm run build
```

O build executa o Astro e depois `scripts/verify-build.mjs`.
