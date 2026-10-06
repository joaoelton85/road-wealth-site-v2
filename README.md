# ROAD Wealth — V43

Correção controlada da faixa de mercados no mobile, partindo da V26.

## Principais ajustes da V35

- preservado o embed legado e o carregamento estável da V26;
- o mobile tenta primeiro o modo `regular`, para manter ticker, valor e variação na mesma linha;
- fundo escuro do widget continua forçado com `isTransparent: false` no mobile;
- removida a liberação prematura do painel mobile antes do evento real de carregamento do iframe;
- se o modo `regular` não carregar, há fallback automático para `compact`, evitando painel vazio;
- `MERCADOS` permanece fixo à esquerda;
- desktop permanece inalterado;
- marcador técnico atualizado para `35.0.0`.
