# ROAD Wealth | Faça Parte da ROAD — V65.3

## O que já funciona no código
- Formulário no capítulo **Faça parte da ROAD** da página A ROAD.
- POST `/api/talent-apply`, com validação de entrada no Worker, proteção Cloudflare Turnstile (`road_talent_apply`), mesma infraestrutura de limitação de requisições e origem obrigatória `https://roadwealth.com.br`.
- Primeiro, envio da apresentação a **contato@roadwealth.com.br** pelo binding `EMAIL` já usado pelo Check-up. Este é o **recebimento operacional principal** enquanto não houver D1.
- Depois do envio interno bem-sucedido, tentativa de confirmação automática para o profissional, informando que não há promessa de vaga ou processo seletivo.
- O Worker só retorna confirmação de recebimento se o envio interno for aceito pelo provedor.
- A seção não avança automaticamente para outra enquanto o formulário estiver aberto.
- Nenhuma mudança de Resend ou serviço de e-mail: é Cloudflare Email Sending.

## Ativação futura do banco de talentos (separado dos leads)
O código **não** cria banco Cloudflare automaticamente nem pressupõe uma ligação inexistente. Até a criação do binding, os dados ficam apenas na caixa de e-mail institucional.

1. Na conta Cloudflare correta, criar um banco D1 dedicado, por exemplo `road-talentos`:
   `npx wrangler d1 create road-talentos`
2. Copiar o **database_id real** informado pelo Cloudflare. Adicionar ao `wrangler.jsonc`:
   `"d1_databases":[{"binding":"TALENTS_DB","database_name":"road-talentos","database_id":"<ID REAL>"}]`
3. Aplicar o esquema no banco correto:
   `npx wrangler d1 execute road-talentos --remote --file=migrations/talents/0001_road_talents.sql`
4. Deploy e teste controlado com dados fictícios, confirmando o registro e o recebimento de e-mails.
5. O acesso de consulta não deve ser disponibilizado em endpoints públicos. Use o painel Cloudflare/D1 ou um painel autenticado futuro.

## Consultas restritas, quando o D1 existir
```sql
SELECT name,email,phone,interest_area,market_experience,custody_range,status,last_seen_at
FROM road_talent_candidates ORDER BY last_seen_at DESC;
SELECT interest_area,status,COUNT(*) AS total
FROM road_talent_candidates GROUP BY interest_area,status ORDER BY total DESC;
```

## Controle e privacidade
- O banco é **separado** do `road-leads` usado para oportunidades comerciais.
- Armazena nome, contatos, LinkedIn opcional, experiência, faixa autodeclarada de carteira, área de interesse, texto de apresentação, data de consentimento, data de inscrição e status.
- A cada nova inscrição pelo mesmo e-mail, o perfil é atualizado sem apagar seu status de acompanhamento.
- Não há upload de currículos, documentos de identidade, listas ou nomes de clientes.
- A ROAD deve definir prazo de retenção compatível com seu banco de talentos e revisar/excluir inscrições periodicamente. A exclusão também deve abranger o e-mail institucional, respeitadas obrigações aplicáveis. Nenhuma rotina automática de retenção foi implantada.
- O consentimento para guardar dados e eventual contato profissional **não** autoriza campanhas promocionais.
- Recomenda-se criar, em etapa posterior, um painel protegido para classificação, histórico de contato e exclusões auditáveis.

## Teste manual antes de divulgar
Abrir A ROAD > Faça parte, preencher perfil fictício, concluir Turnstile e enviar uma vez. Conferir a notificação em contato@ e a confirmação no e-mail informado. Verificar que erros no envio não produzem falsa mensagem de sucesso. Avaliar também o fluxo no iPhone.
