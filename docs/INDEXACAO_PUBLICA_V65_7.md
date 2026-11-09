# ROAD Wealth — V65.7: publicação aberta para buscadores e IAs

## Situação conferida no código
- Site oficial: `https://roadwealth.com.br/`.
- Prévia/ambiente de testes: `https://road-wealth-site.joaoelton.workers.dev/`.
- Bloqueios anteriores: `public/robots.txt` com `Disallow: /`; `src/layouts/BaseLayout.astro` emitia uma meta de bloqueio por padrão.
- `public/_headers` não existia; `wrangler.jsonc` e `src/worker.js` não continham `X-Robots-Tag`.
- `astro.config.mjs` já utilizava o domínio oficial no campo `site`. Faltava a integração de sitemap.

## Arquivos corrigidos

### public/robots.txt — conteúdo completo
```text
User-agent: *
Allow: /
Sitemap: https://roadwealth.com.br/sitemap-index.xml
```

### astro.config.mjs — conteúdo completo
```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://roadwealth.com.br',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !/^https:\/\/roadwealth\.com\.br\/404\/?$/.test(page),
    }),
  ],
});
```

### package.json — conteúdo completo
```json
{
  "name": "road-wealth-site",
  "private": true,
  "version": "65.7.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "npm run clean && astro build && node scripts/write-build-marker.mjs && node scripts/verify-build.mjs",
    "preview": "astro preview",
    "deploy": "wrangler deploy",
    "clean": "node scripts/clean-dist.mjs",
    "test": "node --test tests/*.test.mjs"
  },
  "dependencies": {
    "astro": "7.3.5",
    "@fontsource/montserrat": "^5.2.8",
    "@astrojs/sitemap": "^3.7.4"
  },
  "devDependencies": {
    "wrangler": "latest",
    "sharp": "^0.34.3"
  }
}
```

### src/layouts/BaseLayout.astro — arquivo completo
O arquivo é extenso, incluindo persistência do cabeçalho, TradingView, integração de scripts e comportamento mobile. Para evitar omitir trechos e comprometer o site, utilize o **arquivo completo presente no repositório**:
[BaseLayout.astro da V65.7](https://github.com/joaoelton85/road-wealth-site-v2/blob/main/src/layouts/BaseLayout.astro).

O resultado deve conter:
- Meta description, Open Graph e canonical.
- `<link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />`.
- **Nenhum** `<meta name="robots" content="noindex,nofollow" />`, nem propriedade booleana que o reative.

O `public/sitemap.xml` manual anterior foi removido para evitar duplicação. O Astro gera o índice e `sitemap-0.xml` na compilação.

## Verificar a publicação sem programar

1. Abra [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Entre em **Workers & Pages** e abra o Worker chamado **road-wealth-site**.
3. Em **Deployments**, confirme que a implantação mais recente da branch principal foi concluída sem erro após a V65.7.
4. Abra [https://roadwealth.com.br/robots.txt](https://roadwealth.com.br/robots.txt): deve exibir as três linhas de liberação acima.
5. Abra [https://roadwealth.com.br/sitemap-index.xml](https://roadwealth.com.br/sitemap-index.xml): deve exibir XML com referência a `https://roadwealth.com.br/sitemap-0.xml`.
6. Abra [https://roadwealth.com.br/sitemap-0.xml](https://roadwealth.com.br/sitemap-0.xml): deve listar URLs canônicas da ROAD, começando por `https://roadwealth.com.br/`.
7. Abra a home, no navegador, e verifique que o conteúdo e os menus permanecem funcionais.
8. Se as páginas continuam sem acesso por mecanismos externos, revise regras de segurança da Cloudflare (Security > Events, Bot protection/WAF, Access) para conferir se robôs públicos recebem desafios ou bloqueios. O arquivo robots não contorna WAF.

### Inscrição Google
1. Entre em https://search.google.com/search-console
2. Clique em **Adicionar propriedade** e selecione **Domínio**.
3. Informe `roadwealth.com.br` (sem `https://`).
4. Copie o registro TXT de verificação fornecido pelo Google e crie-o no provedor de DNS que está autoritativo para o domínio.
5. Clique em **Verificar** no Search Console.
6. Abra **Sitemaps**, no menu lateral, e informe `sitemap-index.xml` (ou o URL completo).
7. Envie. Em **Inspeção de URL**, peça indexação da home e das páginas institucionais principais. A indexação pode levar dias ou semanas e não é garantida.

### Inscrição Bing
1. Entre em https://www.bing.com/webmasters
2. Verifique o domínio ou importe a propriedade do Search Console (se disponível).
3. Envie `https://roadwealth.com.br/sitemap-index.xml` na seção **Sitemaps**.

### Descoberta e leitura por IAs
`User-agent: *\nAllow: /` permite rastreamento também por crawlers de IA que respeitam robots.txt. Isso **não obriga** nenhuma IA a utilizar ou citar o site. Confira eventual WAF e restrições de bots na Cloudflare, pois uma autorização no robots.txt não remove bloqueios de firewall.

### Cuidado com o workers.dev
A URL de testes usa o mesmo pacote estático e pode ficar acessível aos robôs. Cada página tem agora um link `rel="canonical"` apontando para `https://roadwealth.com.br`, mas isso é um sinal, não uma garantia absoluta de não indexação do subdomínio. Se não quiser expor o ambiente de testes, desative a rota `workers.dev` para esse Worker no painel da Cloudflare, mantendo o domínio personalizado; ou configure um redirecionamento por host com revisão específica. Não utilize o workers.dev como propriedade principal no Search Console.

## Não foi alterado
- Painel TradingView, ticker, identidade, check-up, IR, e-mails, D1, layout, mandala ou scripts de interação.
- Domínio, bindings do Worker, DNS e regras de proteção da Cloudflare (essas configurações externas exigem verificação na conta).
