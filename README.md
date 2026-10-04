# ROAD Wealth — V18

Revisão focada em experiência mobile e clareza visual dos elementos de convite do site.

## Principais ajustes da V18

- ticker mobile recalibrado após a inclusão da área fixa `MERCADOS`, restaurando a altura estável da faixa e reduzindo o espaço reservado ao rótulo;
- os três convites da Home passam a ter aparência inequívoca de banners editoriais, com painel interno, contorno, profundidade sutil e CTA destacado;
- o vídeo de Entre Rios permanece integrado em `Onde estamos`, mas sem qualquer título, comentário ou divisor adicional criado para o vídeo;
- o documento passa a terminar estruturalmente em preto, com o conteúdo principal mantendo fundo próprio;
- o rodapé incorpora a safe area inferior do aparelho para evitar qualquer faixa Areia após o encerramento no mobile;
- marcador técnico atualizado para `18.0.0`;
- verificação automática do build reforçada para exigir os três banners e impedir a volta dos textos removidos do vídeo.

## Build

```bash
npm install
npm run build
```

O build executa o Astro e, em seguida, `scripts/verify-build.mjs`. O deploy só deve prosseguir quando a verificação terminar com sucesso.

Deploy configurado no Cloudflare Workers com `npx wrangler deploy`.
