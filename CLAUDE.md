# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com o código deste repositório.

## Visão Geral

Monorepo full-stack: backend Java 21 + Spring Boot 3.5 (`back_end/`) e frontend React 19 (`front_end/`). A aplicação é uma plataforma de gerenciamento de usuários com autenticação JWT, identificada como "Plataforma Lattes".

## Comandos

### Back-end (a partir de `back_end/`)

```bash
./mvnw spring-boot:run       # Inicia o servidor em http://localhost:8080
./mvnw test                  # Executa todos os testes
./mvnw clean install         # Build completo
./mvnw test -Dtest=NomeDaClasse # Executa um único teste
```

URLs úteis em desenvolvimento:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`)
- Health: `http://localhost:8080/auth/health`

### Front-end (a partir de `front_end/`)

```bash
npm start        # Servidor de desenvolvimento em http://localhost:3000
npm test         # Jest em modo watch
npm run build    # Build de produção → build/
```

## Arquitetura

### Camadas do back-end

```
resources/   → Controllers REST (camada HTTP)
services/    → Regras de negócio, implementa UserDetailsService
repositories/→ Interfaces Spring Data JPA
entities/    → Entidades JPA (User, Perfil)
dto/         → Objetos de requisição/resposta (Java records)
config/      → Segurança, JWT, CORS, codificação de senha
projections/ → Projeções JPA para consultas de segurança
```

### Segurança e fluxo JWT

1. `POST /auth/login` → `AuthResource` → `AuthenticationManager` → retorna JWT
2. `JwtAuthFilter` intercepta todas as requisições, valida o token via `JwtUtil` e define o `SecurityContext`
3. Rotas públicas: `/auth/**`, `POST /users`, `/h2-console/**`
4. JWT assinado com HS512, expiração em 24h (configurável via variável `JWT_DURATION`)

### Estado e roteamento do front-end

- `AuthContext` (React Context) armazena `token` + `user`; persistido no `localStorage`
- `api.js` (instância Axios): interceptor de requisição injeta `Authorization: Bearer {token}`; interceptor de resposta redireciona para `/login` em caso de 401
- `PrivateRoute` envolve páginas protegidas — verifica `isAuthenticated` do contexto
- Rotas: `/login` (pública), `/dashboard` (protegida), `*` → redireciona para `/login`

### Banco de dados

Apenas H2 em memória (`create-drop`). O schema é recriado a cada reinício do backend — dados iniciais ficam em `src/main/resources/import.sql`. Não há banco de dados persistente configurado.

### Relacionamentos principais

- `User` ↔ `Perfil`: ManyToMany via tabela de junção `tb_user_perfil`
- Roles seguem a convenção do Spring Security: `ROLE_USER`, `ROLE_ADMIN`
- `User` implementa `UserDetails`; `UserService` implementa `UserDetailsService`

### Variáveis de ambiente (back-end)

| Variável | Finalidade |
|---|---|
| `EMAIL_HOST/PORT/USERNAME/PASSWORD` | SMTP (Spring Mail) |
| `JWT_DURATION` | Duração do token em segundos (padrão: 86400) |
| `CORS_ORIGINS` | Origem permitida do frontend (padrão: `http://localhost:3000`) |
| `CLIENT_ID`, `CLIENT_SECRET` | Placeholders OAuth2 (ainda não utilizados) |

A URL base da API no frontend está definida diretamente em `front_end/src/api/api.js` como `http://localhost:8080`.
