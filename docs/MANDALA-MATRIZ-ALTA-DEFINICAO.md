# Mandala ROAD — matriz de alta definição (não publicada)

## Objetivo
Restaurar uma peça visual única para **Investimentos, Legado, Capital e Planejamento**,
fiel à identidade institucional e sem os retângulos sobrepostos usados temporariamente
no componente de produção.

## Arquivos
- **Matriz vetorial/editável**: `public/assets/road-mandala-master-1254.svg`.
- **Prova em resolução original**: `public/assets/road-mandala-master-1254.png`.
- **Prova ampliada sem redimensionar o PNG antigo**: `public/assets/road-mandala-master-2508.png`,
  gerada novamente a partir do SVG vetorial e da fonte Montserrat 400.
- **Imagem remendada atualmente em produção**: `road-areas-approved.webp`, **não substituir
  antes da aprovação do acabamento**.

## Critérios
O mesmo peso de fonte (Montserrat 400) em todos os títulos e subtítulos,
fundo contínuo, símbolo oficial preservado e arcos integrados.
A largura dos títulos é adaptada ao comprimento, mas a família tipográfica
não muda entre áreas. A exportação web otimizada será produzida somente
**depois da validação desta matriz em alta resolução**.

## Publicação
Este branch e a prova PNG não alteram `src/components/RoadMandala.astro` e
não ativam qualquer imagem nova no site público.

## Revisão de visibilidade do símbolo

A transparência do símbolo central passou de 83,5% para 40% (opacidade de 16,5% para 60%).
O restante da composição é preservado e as duas exportações 1254/2508px são feitas
com a mesma fonte Montserrat 400 a partir da matriz SVG, sem alterações ao site público.

## Publicação da arte aprovada

Em 10/11/2026, a matriz com marca central a 60% de opacidade foi aprovada.
O componente do site passa a utilizar as exportações WebP de 1254 e 2508 px
em `srcset`, derivadas das matrizes PNG sem alteração do desenho.
Os arquivos SVG e PNG de alta definição ficam preservados como originais.
O antigo `road-areas-approved.webp` fica arquivado e não é utilizado pelo componente.
