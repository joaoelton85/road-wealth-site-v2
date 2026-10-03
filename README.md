# ROAD Wealth — V15

Versão completa do site institucional ROAD Wealth.

## Principais ajustes da V15

- tipografia e alinhamentos dos grandes títulos;
- cabeçalho e rodapé refinados;
- texto de “Onde estamos” uniformizado;
- segunda linha das plataformas nacionais centralizada;
- ticker TradingView protegido contra estados intermediários de carregamento;
- linha de fontes/atraso fora da faixa preta, sobre fundo Areia;
- comportamento responsivo revisado.

## Estrutura para GitHub

O conteúdo deste projeto deve permanecer diretamente na raiz do repositório:

- `src/`
- `public/`
- `package.json`
- `astro.config.mjs`
- `wrangler.jsonc`

### Importante ao carregar um ZIP manualmente no GitHub

No Windows, **extraia o arquivo ZIP para uma pasta normal antes do upload**. Não arraste arquivos diretamente de dentro da visualização de pasta compactada do Windows. Depois de extrair, selecione o conteúdo da pasta (`src`, `public` e arquivos da raiz) e carregue tudo junto.

## Build

```bash
npm install
npm run build
```

Deploy configurado no Cloudflare Workers com:

```bash
npx wrangler deploy
```
