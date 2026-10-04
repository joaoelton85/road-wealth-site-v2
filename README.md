# ROAD Wealth — V23

Revisão focada em recuperar os indicadores ao vivo no mobile e refinar a experiência da Calculadora de IR 2026.

## Principais ajustes da V23

- Brent removido da faixa de mercados e do painel Mercados & Ferramentas por não retornar dados úteis no widget atual;
- desktop preserva o ticker TradingView já utilizado, agora somente com os símbolos funcionais;
- mobile retrato volta a exibir cotações ao vivo, mas deixa de usar o iframe antigo: passa a usar o novo Web Component horizontal compacto da TradingView;
- a identificação `MERCADOS` continua fixa à esquerda e não há uma segunda marca TradingView criada pela ROAD;
- a Calculadora de IR formata campos monetários em BRL ao sair do campo, inclusive transformando valores inteiros em formato `R$ 0,00`;
- campos da calculadora passam a ficar alinhados em uma coluna principal e as explicações ficam em uma coluna lateral, empilhadas na mesma ordem; no mobile, ajuda e campo voltam a uma única coluna;
- o cálculo dos incentivos deixa de presumir que o usuário completará o espaço adicional de PGBL;
- eventual aporte adicional de PGBL permanece apenas como cenário potencial, separado dos limites de incentivos;
- tipografia da seção metodológica foi alinhada ao padrão editorial do restante do site;
- o resumo lateral da calculadora foi preservado;
- proteção contra assets antigos criada na V22 permanece ativa;
- marcador técnico atualizado para `23.0.0`.

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
