# 🚀 API de Rede Social

Uma API backend completa de rede social, desenvolvida com foco em boas práticas, escalabilidade e arquitetura limpa.

Permite gerenciamento de usuários, posts, comentários e curtidas (em posts e comentários), com autenticação obrigatória.

---

## ✨ Funcionalidades

* 👤 Cadastro e autenticação de usuários
* 📝 Criação e gerenciamento de posts
* 💬 Comentários em posts
* ❤️ Curtidas em posts e comentários
* 🔐 Autenticação via JWT
* ⏰ Jobs automatizados com cron
* 📩 Envio de emails com fila/processamento
* ⚡ Cache com Redis

---

## 🛠️ Tecnologias Utilizadas

* ⚡ **Fastify** – Framework HTTP performático
* 🗄️ **Prisma** – ORM para banco de dados
* 🐳 **Docker** – Containerização
* 🔐 **JWT** – Autenticação
* 🔑 **bcryptjs** – Hash de senha
* 📬 **Nodemailer** – Envio de emails
* ⏱️ **node-cron** – Agendamento de tarefas
* 🧠 **Zod** – Validação de dados
* ⚡ **ioredis** – Cache
* 🧪 **Vitest** – Testes unitários
* 🧹 **Biome** – Linter e formatter
* 🤖 **Dependabot** – Atualização automática de dependências

---

## 🧱 Arquitetura

O projeto segue princípios de **Clean Architecture**:

* 📦 Separação por camadas (Use Cases, Repositories, Providers)
* 🔌 Injeção de dependências
* 🧪 Testes unitários com mocks
* 🔍 Lógica de negócio isolada

---

## 📂 Estrutura do Projeto

```bash
src/
  ├── @types/
  ├── constants/
  ├── env/
  ├── http/
  ├── libs/
  ├── providers/
  ├── repositories/
  ├── templates/
  ├── use-cases/
  ├── utils/
  ├── app.ts
  └── server.ts
```

---

## ⚙️ Configuração do Ambiente

### 🔴 IMPORTANTE

Antes de rodar o projeto, você deve criar o arquivo `.env`.

Use o `.env.example` como base:

```bash
cp .env.example .env
```

---

## 🚀 Como rodar o projeto

### 🔹 1. Clonar o repositório

```bash
git clone https://github.com/Mello-Davi/TarefaPrimeiraSemanaNodeJS.git
cd TarefaPrimeiraSemanaNodeJS
```

---

### 🔹 2. Subir os containers

```bash
docker-compose up -d
```

---

### 🔹 3. Instalar dependências

```bash
npm install
```

---

### 🔹 4. Rodar migrations

```bash
npx prisma migrate dev
```

---

### 🔹 5. Rodar o projeto em desenvolvimento

```bash
npm run start:dev
```

---

## 🧪 Testes

```bash
npm run test
```

### Com watch:

```bash
npm run test:watch
```

### Com coverage:

```bash
npm run test:coverage
```

---

## 🧹 Lint e Formatação

```bash
npm run lint
npm run format
```

---

## 🔄 Workflows

O projeto utiliza:

* ✅ GitHub Actions
* 🤖 Dependabot para atualização automática
* 🔍 Verificação de qualidade de código

---

## 📬 Funcionalidades Extras

* 📩 Envio de emails automatizados
* ⏰ Execução de tarefas com cron jobs
* ⚡ Cache com Redis
* 🧠 Validação robusta com Zod

---
