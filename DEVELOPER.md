# 📦 Sellit — Desafio Backend

Este repositório contém a implementação do **Desafio de Backend** proposto pela equipe da Sellit.

A aplicação consiste em uma API RESTful desenvolvida com foco em qualidade de código, performance e boas práticas de engenharia.

---

## 🚀 Stack utilizada

- **Next.js** com App Router e TypeScript
- **PostgreSQL** (via Docker) como banco de dados relacional
- **Drizzle ORM** como camada de acesso ao banco de dados
- **Zod** para validação robusta de entrada de dados
- **Docker Compose** para orquestração local do banco

---

## 🗂️ Estrutura do projeto

```plaintext
/src/app/api/products/route.ts           → POST /products e GET /products?term=xxx
/src/app/api/products/[id]/route.ts      → GET /products/:id
/src/db/schema.ts                        → Definição da tabela products
/src/db/index.ts                         → Conexão com o banco via Drizzle
/src/types/product.ts                    → Tipos auxiliares da aplicação
drizzle.config.ts                        → Configuração do Drizzle ORM
DEVELOPER.md                             → Documentação técnica do projeto
docker-compose.yml                       → Serviço PostgreSQL
.env                                     → Variáveis de ambiente

```
---

# ⚙️ Como rodar o projeto localmente

## Clonar o repositório

```bash
git clone https://github.com/gleniodev/sellit.git
cd sellit
```
---

## Instalar as dependências

```bash
npm install
```
---

## Subir o banco de dados com Docker
Certifique-se de ter o Docker e Docker Compose instalados.

```bash
docker compose up -d
```
Isso iniciará um container com PostgreSQL na porta 5432.

---

## Configurar variáveis de ambiente
Crie um arquivo .env na raiz com o seguinte conteúdo:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sellit
```
---

## Gerar e aplicar migrations

```bash
npx drizzle-kit generate
npx drizzle-kit push
```
---

## Rodar a aplicação

```bash
npm run dev
```

A API estará disponível em:

```bash
http://localhost:3000/api/products
```
---
# 📌 Endpoints implementados

## POST /api/products

Descrição: Cria um novo produto.

Body esperado:
```bash
{
  "category_id": "ULID",
  "name": "string",
  "description": "string",
  "producer_name": "string",
  "producer_email": "string",
  "cover": "url",
  "thumbnail": "url",
  "price": number
}
```
Resposta: 201 Created com os dados do produto criado.

---

## GET /api/products/:id

**Descrição:** Retorna um produto específico pelo seu ID.

**Resposta:**

- 200 OK com os dados do produto.

- 404 Not Found se o produto não existir.

---

## GET /api/products?term=xxx

**Descrição:** Busca o produto que mais se aproxime do termo informado no campo name ou producer_name.

**Resposta:**

- 200 OK com os dados do produto mais relevante.

- 404 Not Found se nenhum produto for encontrado.

---

# 🔍 Considerações de implementação

- Utilização de ulid() para geração de IDs únicos e ordenáveis.

- Conversão explícita de price para string no insert e para number na resposta, devido ao comportamento do tipo numeric no PostgreSQL.

- Uso de InferInsertModel do Drizzle para garantir tipagem correta nas operações de insert.

- Datas created_at e updated_at retornadas em formato ISO 8601, conforme padrão do desafio.

- Busca textual implementada com ILIKE no PostgreSQL para garantir busca case-insensitive e flexível.

- Aplicação projetada com foco em separação de responsabilidades, legibilidade e extensibilidade.

---

# 🛠️ Possíveis melhorias futuras

- Implementação de paginação para buscas múltiplas.

- Inclusão de testes automatizados com Jest + Supertest.

- Implementação de cache em consultas frequentes.

- Deploy automatizado com CI/CD.

---

# 🚀 Deploy em produção

**Para ambiente de produção, recomenda-se:**

- Uso de banco de dados gerenciado (ex: Supabase, Railway, NeonDB).

- Variáveis de ambiente seguras e não comitadas.

- Configuração adequada de CORS e segurança.

- Monitoramento de performance da API.