# ROAD Wealth — V17

Versão de reconciliação do site institucional ROAD Wealth, construída sobre o código consolidado da V16 no repositório limpo `road-wealth-site-v2`.

## Principais ajustes da V17

- identificação `MERCADOS` permanece visível no ticker também depois do carregamento da TradingView;
- a fita de indicadores passa a ocupar somente o espaço à direita dessa identificação;
- CTA principal de contato alterado para `Entre em contato`, sem cápsula/círculo;
- botão flutuante circular de contato removido;
- preservados os três callouts editoriais da Home: Mercados & Ferramentas, Check-up ROAD e Conhecimento;
- preservado o bloco `Conheça Entre Rios` com vídeo sob demanda;
- adicionada identificação técnica `17.0.0` ao HTML publicado;
- o build agora valida automaticamente a presença dos elementos críticos antes do deploy.

## Build

```bash
npm install
npm run build
```

O comando de build executa o Astro e, em seguida, `scripts/verify-build.mjs`. O deploy só deve prosseguir quando essa verificação terminar com sucesso.

Deploy configurado no Cloudflare Workers com `npx wrangler deploy`.
