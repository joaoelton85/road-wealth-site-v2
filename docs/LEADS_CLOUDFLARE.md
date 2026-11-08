# ROAD Wealth — e-mails e cadastro de leads (V65.2)

O envio dos resultados usa **Cloudflare Email Sending**, binding `EMAIL`, já existente; sem Resend e sem serviço novo de e-mail.

## Notificações internas já disponíveis
O binding `EMAIL` também pode enviar uma notificação interna para `contato@roadwealth.com.br` com nome, e-mail, telefone, origem, data e indicador de aceite de marketing, mas **sem valores ou respostas**. A variável `LEAD_NOTIFICATIONS=enabled` está prevista no `wrangler.jsonc`; uma falha de notificação interna não bloqueia o resultado do visitante. Este registro na caixa de e-mail é transitório, não substitui CRM ou D1; não enviar ofertas a pessoas sem aceite expresso.

## Ativação do cadastro no Cloudflare D1
1. No projeto Cloudflare correto, criar um banco D1 chamado `road-leads` (ou reutilizar um banco dedicado existente):
   `npx wrangler d1 create road-leads`
2. Copiar o `database_id` retornado pelo Cloudflare e incluir em `wrangler.jsonc`:
   `"d1_databases": [{"binding":"LEADS_DB","database_name":"road-leads","database_id":"<ID REAL>"}]`
3. Executar a migração no ambiente remoto, depois de conferir a conta/banco:
   `npx wrangler d1 execute road-leads --remote --file=migrations/0001_road_leads.sql`
4. Fazer deploy e testar um envio de Check-up e outro da calculadora, com e sem aceite de marketing.
5. Verificar os registros no dashboard D1 (ou por `wrangler d1 execute`). Não publicar um endpoint de leitura sem proteção de acesso.

**Não há database_id inventado no repositório.** Até configurar o binding `LEADS_DB`, o envio de e-mails continua funcionando, mas o cadastro de leads NÃO é persistido. Uma falha de gravação não deve impedir a entrega do relatório; ela é registrada em log técnico sem dados pessoais.

## Consultas iniciais
```sql
SELECT email, name, phone, marketing_opt_in, deliveries, last_seen_at
FROM road_leads ORDER BY last_seen_at DESC;
SELECT origin, COUNT(*) total FROM road_lead_events GROUP BY origin;
```

## Privacidade e operação
- Nome e telefone são opcionais; o e-mail é obrigatório somente para pedir o envio.
- Consentimento do envio e aceite de comunicações são distintos. Quem não aceitou marketing **não deve integrar ações comerciais automatizadas**.
- O banco não recebe respostas de diagnóstico, valores de imposto, rendimentos, dados de dependentes ou destinações.
- Somente equipe autorizada deve consultar o D1 pelo painel Cloudflare; não disponibilizar listagem pública.
- Implantar rotina operacional de revisão e exclusão de registros, com prazo de retenção definido pela ROAD, e atendimento a pedidos de acesso/correção/exclusão. O site não implementa ainda descadastro automático ou painel de CRM.
- Não confundir logs da Cloudflare e dados gravados no D1: são tratamentos distintos.
