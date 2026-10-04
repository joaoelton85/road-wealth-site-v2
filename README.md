# ROAD Wealth — V21

Revisão focada em estabilidade de deploy, experiência mobile e protótipo de planejamento de IRPF 2026.

## Principais ajustes da V21

- no mobile retrato, o iframe do ticker da TradingView deixa de ser carregado; entra uma faixa própria da ROAD, em uma única linha, com acesso direto a Mercados & Ferramentas;
- no desktop, o ticker da TradingView continua disponível com a lista funcional já validada;
- removida a área externa duplicada de marca TradingView, evitando concorrência visual com a atribuição do próprio widget;
- criada a página `/calculadora-ir/` com protótipo de cálculo para ano-calendário 2026 / exercício 2027;
- a calculadora considera rendimentos do titular e dependentes, INSS/RPPS, dependentes, pessoas com educação, despesas educacionais, despesas médicas não reembolsadas, pensão alimentícia, PGBL, IR retido e incentivos;
- o cálculo compara deduções legais e desconto simplificado, estima o limite de PGBL de 12%, espaço adicional e efeito estimado no IR;
- incentivos para Criança e Adolescente, Pessoa Idosa, Cultura e Esporte entram como referência de planejamento, com ressalva sobre elegibilidade e limites específicos;
- a Home passa a chamar a Calculadora de IR 2026 em um dos três banners editoriais principais;
- Mercados & Ferramentas passa a incluir acesso direto à calculadora;
- antes de cada build, o diretório `dist` é apagado para impedir reaproveitamento de artefato antigo;
- `wrangler.jsonc` passa a exigir `npm run build` em deploys manuais via Wrangler;
- marcador técnico atualizado para `21.0.0` e validação automática ampliada.

## Build e deploy

```bash
npm install
npm run build
npm run deploy
```

O build limpa `dist`, executa o Astro e valida os elementos críticos da V21. Em deploy manual via Wrangler, o build também é acionado antes do upload dos assets.

> No Workers Builds da Cloudflare, mantenha o **Build command** como `npm run build` e o **Deploy command** como `npx wrangler deploy` ou `npm run deploy`. O painel da Cloudflare não herda o custom build do Wrangler para Workers Builds.
