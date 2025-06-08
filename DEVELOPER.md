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

---

# ⚙️ Como rodar o projeto localmente

## Clonar o repositório

```
git clone https://github.com/gleniodev/sellit.git
cd sellit
```
---

## Instalar as dependências

```
npm install
```
---

## Subir o banco de dados com Docker
Certifique-se de ter o Docker e Docker Compose instalados.

```bash
docker compose up -d
```bash
Isso iniciará um container com PostgreSQL na porta 5432.

4## Configurar variáveis de ambiente
Crie um arquivo .env na raiz com o seguinte conteúdo:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sellit
```bash

## Gerar e aplicar migrations

```bash
npx drizzle-kit generate
npx drizzle-kit push
```bash

## Rodar a aplicação

```bash
npm run dev
```bash

A API estará disponível em:

```bash
http://localhost:3000/api/products
```bash
