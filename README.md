# ROAD Wealth — V22

Revisão corretiva do pipeline de publicação de assets estáticos.

## Ajuste principal

A V21 foi gerada corretamente no GitHub/Workers Builds, mas a própria Version URL continuou exibindo conteúdo antigo. Esse padrão é compatível com um problema conhecido de upload/deduplicação de Workers Static Assets, no qual um novo deploy pode reutilizar assets antigos mesmo quando o build produziu arquivos diferentes.

A V22 adiciona uma proteção específica:

- o diretório `dist` continua sendo apagado antes de cada build;
- após o Astro gerar os arquivos, o build cria `dist/__road-build.json`;
- esse arquivo contém versão, commit SHA e Build UUID/timestamp, tornando cada coleção de assets inequivocamente diferente;
- a verificação automática exige o marcador `22.0.0` antes de permitir o deploy;
- todo o conteúdo funcional da V21 é preservado: Calculadora de IR 2026, banner, ticker mobile próprio, vídeo e demais ajustes.

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
