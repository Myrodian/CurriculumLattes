# CurriculumLattes

> Plataforma web para gerenciamento de currículos acadêmicos no estilo Lattes, com autenticação, perfis de usuário e registro de produção acadêmica.

[![Java](https://img.shields.io/badge/Java_21-Backend-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.5-API-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React_19-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Banco-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Execução com Docker](#execução-com-docker)
- [Execução local (desenvolvimento)](#execução-local-desenvolvimento)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [API Reference](#api-reference)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Contribuindo](#contribuindo)
- [Autores](#autores)

---

## Sobre o Projeto

O **CurriculumLattes** é uma aplicação full-stack que permite a pesquisadores, estudantes e administradores gerenciar seus dados acadêmicos: produção bibliográfica, projetos de ensino, trabalhos técnicos e apresentações.

O sistema conta com autenticação via JWT, controle de acesso por perfis (Administrador, Pesquisador, Estudante) e uma interface inspirada na Plataforma Lattes do CNPq.

---

## Funcionalidades

- Cadastro e autenticação de usuários (JWT via Basic Auth)
- Perfis de acesso: `ROLE_ADMINISTRADOR`, `ROLE_PESQUISADOR`, `ROLE_ESTUDANTE`
- Feed de publicações acadêmicas
- Página de perfil do usuário
- Registro de produção acadêmica:
  - Apresentações de trabalho
  - Produtos tecnológicos
  - Projetos de ensino
  - Trabalhos técnicos
- Rotas protegidas no frontend com redirecionamento automático
- Banco de dados persistente via volume Docker

---

## Tecnologias

### Back-end
| Tecnologia | Versão |
|---|---|
| Java | 21 |
| Spring Boot | 3.5 |
| Spring Security | JWT via Basic Auth |
| Spring Data JPA | Hibernate + PostgreSQL |
| Spring Mail | SMTP |
| Springdoc OpenAPI | Swagger UI |
| PostgreSQL | 16 |

### Front-end
| Tecnologia | Versão |
|---|---|
| React | 19 |
| React Router DOM | v6 |
| Axios | — |

### Infraestrutura
| Ferramenta | Uso |
|---|---|
| Docker + Docker Compose | Orquestração dos containers |
| Nginx | Serve o frontend em produção |
| pgAdmin 4 | Interface visual do banco de dados |

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│  Browser  :3000                                             │
│  React 19 + React Router + Axios                            │
│  AuthContext (JWT no localStorage)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST (Basic Auth → JWT)
┌──────────────────────────▼──────────────────────────────────┐
│  Spring Boot :8080                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐ │
│  │ Resource │  │ Service  │  │   JPA    │  │ JwtFilter  │ │
│  │ (REST)   │→ │(Business)│→ │Repository│  │ + Security │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│  PostgreSQL :5432                                           │
│  Volume persistente: curriculumlattes_postgres_data         │
└─────────────────────────────────────────────────────────────┘
```

### Camadas do back-end

```
resources/    → Controllers REST (camada HTTP)
services/     → Regras de negócio, implementa UserDetailsService
repositories/ → Interfaces Spring Data JPA
entities/     → Entidades JPA (User, Perfil, Address, BasicForm)
dto/          → Objetos de requisição/resposta
config/       → Segurança, JWT, CORS, PasswordEncoder
projections/  → Projeções JPA para queries de segurança
```

### Fluxo de autenticação

1. `POST /auth/login` com header `Authorization: Basic base64(email:senha)`
2. Backend valida credenciais e retorna dados do usuário
3. Frontend armazena as credenciais em Base64 no `localStorage` como token
4. Todas as requisições seguintes incluem o header `Authorization: Basic {token}`
5. `PrivateRoute` verifica `isAuthenticated` do `AuthContext` antes de renderizar páginas protegidas

---

## Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recomendado para subir tudo junto)

Para desenvolvimento local sem Docker:
- Java 21
- Maven 3.9+
- Node.js 20+
- PostgreSQL 16

---

## Execução com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/Myrodian/CurriculumLattes.git
cd CurriculumLattes
```

### 2. Configure as variáveis de ambiente (opcional)

```bash
cp .env.example .env
# edite .env com seus valores (JWT_SECRET, credenciais de e-mail, etc.)
```

Sem o `.env`, o Docker Compose usa os valores padrão definidos no `docker-compose.yml`.

### 3. Suba os containers

```bash
docker compose up --build
```

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend (API) | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| pgAdmin | http://localhost:5050 |

**Login padrão do pgAdmin:** `admin@admin.com` / `admin`

**Conexão ao banco no pgAdmin:**
- Host: `db`
- Port: `5432`
- Database: `lattes`
- Username/Password: `lattes`

### Usuários seed (criados na primeira inicialização)

| E-mail | Senha | Perfil |
|---|---|---|
| `Glauberson@gmail.com` | `123456` | Administrador |
| `claudio@gmail.com` | `123456` | Pesquisador + Estudante |

---

## Execução local (desenvolvimento)

### Back-end

```bash
cd back_end
./mvnw spring-boot:run
```

Requer PostgreSQL rodando em `localhost:5432` com banco `lattes` e usuário `lattes`.
Se preferir, suba apenas o banco via Docker:

```bash
docker compose up db
```

URLs úteis:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Health check: `http://localhost:8080/auth/health`

### Front-end

```bash
cd front_end
npm install
npm start
```

Acesse: `http://localhost:3000`

---

## Estrutura de Pastas

```
CurriculumLattes/
├── back_end/
│   ├── src/main/java/Project/back_end/
│   │   ├── config/          # SecurityConfig, PasswordConfig
│   │   ├── dto/             # UserDTO, UserInsertDTO, AuthDTO, PerfilDTO
│   │   ├── entities/        # User, Perfil, Address, BasicForm
│   │   ├── projections/     # UserDetailsProjection
│   │   ├── repositories/    # UserRepository, PerfilRepository
│   │   ├── resources/       # UserResource, AuthResource
│   │   └── services/        # UserService
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql         # Seed inicial (perfis + usuários)
│   ├── Dockerfile
│   └── pom.xml
│
├── front_end/
│   ├── src/
│   │   ├── api/             # api.js (Axios + interceptors)
│   │   ├── components/      # PrivateRoute
│   │   ├── context/         # AuthContext
│   │   └── pages/           # LoginPage, CadastroPage, FeedPage, ProfilePage,
│   │                        # ApresentacaoPage, ProdutoPage,
│   │                        # ProjetoEnsinoPage, TrabalhosTecnicosPage
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## API Reference

A documentação completa está disponível no Swagger UI em `http://localhost:8080/swagger-ui.html`.

### Endpoints principais

| Método | Endpoint | Acesso | Descrição |
|---|---|---|---|
| `POST` | `/auth/login` | Público | Autenticação (Basic Auth) |
| `GET` | `/auth/health` | Público | Health check |
| `POST` | `/users` | Público | Cadastro de novo usuário |
| `GET` | `/users` | Autenticado | Lista usuários (paginado) |
| `GET` | `/users/{id}` | Autenticado | Busca usuário por ID |
| `PUT` | `/users/{id}` | Autenticado | Atualiza usuário |
| `DELETE` | `/users/{id}` | Autenticado | Remove usuário |

### Exemplo de cadastro

```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@email.com",
    "cpf": "123.456.789-09",
    "password": "senha123",
    "perfils": [{ "id": 2 }]
  }'
```

### Perfis disponíveis

| ID | Role |
|---|---|
| 1 | `ROLE_ADMINISTRADOR` |
| 2 | `ROLE_PESQUISADOR` |
| 3 | `ROLE_ESTUDANTE` |

---

## Variáveis de Ambiente

Copie `.env.example` para `.env` e ajuste conforme necessário:

| Variável | Padrão | Descrição |
|---|---|---|
| `POSTGRES_USER` | `lattes` | Usuário do banco |
| `POSTGRES_PASSWORD` | `lattes` | Senha do banco |
| `JWT_SECRET` | *(valor padrão)* | Chave HMAC-SHA512 para assinar tokens (mínimo 64 chars) |
| `JWT_DURATION` | `86400` | Expiração do token em segundos (24h) |
| `CORS_ORIGINS` | `http://localhost:3000` | Origens permitidas pelo CORS |
| `EMAIL_HOST` | `smtp.gmail.com` | Servidor SMTP |
| `EMAIL_PORT` | `587` | Porta SMTP |
| `EMAIL_USERNAME` | *(vazio)* | E-mail para envio |
| `EMAIL_PASSWORD` | *(vazio)* | Senha do e-mail |
| `PGADMIN_EMAIL` | `admin@admin.com` | Login do pgAdmin |
| `PGADMIN_PASSWORD` | `admin` | Senha do pgAdmin |

---

## Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b feat/minha-feature`
3. Commit seguindo Conventional Commits: `git commit -m "feat: adiciona X"`
4. Abra um Pull Request

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Documentação |
| `refac:` | Refatoração |
| `test:` | Testes |

---

## Autores

- **Myrodian** — [@Myrodian](https://github.com/Myrodian)

---

Este projeto é um trabalho acadêmico desenvolvido para o IFMG — Instituto Federal de Minas Gerais, câmpus Formiga.

[Voltar ao topo](#curriculumlattes)
