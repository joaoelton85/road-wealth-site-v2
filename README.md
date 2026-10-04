# ROAD Wealth — V19

Revisão focada na experiência de navegação, especialmente em mobile, e na barra de mercados.

## Principais ajustes da V19

- ticker dividido em três zonas estáveis: `MERCADOS` à esquerda, cotações no centro e uma área dedicada à marca TradingView à direita;
- no mobile retrato, removida a escala CSS aplicada sobre o iframe da TradingView; o widget passa a usar o modo compacto nativo e apenas recorte vertical, preservando a proporção de textos e números;
- faixa de mercados ampliada com S&P 500, Nasdaq 100, Brent, Soja, Milho e Trigo, além dos indicadores já existentes;
- Mercados & Ferramentas atualizado para refletir a nova cobertura de Brasil, exterior, juros, moedas, energia, metais, agro e cripto;
- os banners deixam de existir apenas na Home: cada página interna principal recebe um único convite contextual, relacionado ao conteúdo que o visitante acabou de consultar;
- no mobile, o CTA do banner ocupa toda a largura disponível para tornar a ação inequívoca sem aumentar a agressividade visual;
- vídeo de Entre Rios e encerramento preto do rodapé permanecem como definidos na V18;
- marcador técnico atualizado para `19.0.0` e validação automática ampliada para as páginas internas.

## Build

```bash
npm install
npm run build
```

O build executa o Astro e depois `scripts/verify-build.mjs`. O deploy só prossegue quando os elementos críticos da Home, páginas internas, ticker e vídeo são encontrados no HTML gerado.

Deploy configurado no Cloudflare Workers com `npx wrangler deploy`.
