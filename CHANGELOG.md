# Changelog

## V14 — reconstruída a partir da V12 (V13 descartada por problema de build) + correção de build real

- A V13 apresentou erro de build e foi descartada como base.
- V14 parte do código-fonte da V12; nenhuma mudança na lógica visual do ticker em relação à V12.
- **Causa real do erro de build**: o `package.json` fixava `"astro": "latest"`, e a versão mais nova resolvida (astro@7.3.5) passou a validar como JavaScript o conteúdo de qualquer `<script>`, mesmo com `is:inline`. O bloco de configuração do widget TradingView era JSON puro (`{ "symbols": [...] }`), que não é JavaScript válido como instrução solta, e isso quebrava o build com `CompilerError: Expected a semicolon...` em `MarketTicker.astro:13:23`.
- Correção: a configuração do widget foi movida para o frontmatter do componente (um objeto JS normal) e injetada no `<script>` via `set:html={JSON.stringify(tickerConfig)}`, que não passa pela checagem de sintaxe JS do Astro.
- `astro` fixado em `7.3.5` no `package.json` (em vez de `latest`), para que o build não quebre de novo com uma atualização futura do pacote.
- Mantém o tema nativo do TradingView: `colorTheme: dark`, `isTransparent: true`, `displayMode: adaptive`.
- Mantém a escala menor da barra: 0,76 no desktop e 0,74 no mobile.
- Mantém a centralização óptica vertical da prévia V8.
- Mantém DI1F30 e DI1F35, unidades seletivas e faixa inferior de fontes/delay.
- Nenhuma outra área do site foi alterada em relação à V12.
