# 📄 CurriculumLattes

> **Plataforma web para extração, visualização e gerenciamento de dados do Currículo Lattes**

[![Java](https://img.shields.io/badge/Java-Backend-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Frontend-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![CSS](https://img.shields.io/badge/CSS-Estilização-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![HTML](https://img.shields.io/badge/HTML-Markup-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Como Usar](#-como-usar)
- [API Reference](#-api-reference)
- [Contribuindo](#-contribuindo)
- [Autores](#-autores)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **CurriculumLattes** é uma aplicação web full-stack desenvolvida para facilitar o acesso e a visualização de informações contidas nos Currículos Lattes da Plataforma CNPq. A ferramenta permite que pesquisadores, instituições e gestores de ciência e tecnologia extraiam, organizem e consultem dados acadêmicos de forma ágil e intuitiva, sem a necessidade de navegar manualmente pelo portal do CNPq.

### Motivação

O Currículo Lattes é o padrão nacional de registro da vida pregressa e atual dos pesquisadores brasileiros. No entanto, a extração automatizada e a visualização estruturada de seus dados ainda é um desafio técnico relevante — especialmente para projetos de análise bibliométrica, gestão de grupos de pesquisa e relatórios institucionais. Este projeto nasce para resolver essa lacuna.

---

## ✨ Funcionalidades

- 🔍 **Busca e extração** de dados a partir do identificador Lattes (ID numérico)
- 👤 **Visualização do perfil** do pesquisador: dados pessoais, formação acadêmica, área de atuação
- 📚 **Listagem de produções bibliográficas**: artigos, livros, capítulos, trabalhos em eventos
- 🏛️ **Vínculos institucionais** e histórico de atuação profissional
- 🎓 **Orientações** concluídas e em andamento
- 📊 **Projetos de pesquisa** e participação em grupos de pesquisa
- 🌐 **Interface web responsiva** para consulta via browser
- ⚙️ **API REST** para integração com outros sistemas

---

## 🛠 Tecnologias Utilizadas

### Back-end
| Tecnologia | Versão | Descrição |
|---|---|---|
| Java | 11+ | Linguagem principal do servidor |
| Spring Boot | 2.x | Framework para API REST |
| Maven / Gradle | — | Gerenciamento de dependências |
| XML Parsing | — | Leitura e parsing do XML Lattes |

### Front-end
| Tecnologia | Descrição |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e layout responsivo |
| JavaScript (ES6+) | Interatividade e consumo da API |

---

## 🏗 Arquitetura

O projeto segue uma arquitetura **cliente-servidor** desacoplada:

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENTE                          │
│                                                         │
│   [ HTML ]  ──►  [ CSS ]  ──►  [ JavaScript ]          │
│                                      │                  │
│                               fetch / AJAX              │
└──────────────────────────────────────┼──────────────────┘
                                       │ HTTP / REST
┌──────────────────────────────────────┼──────────────────┐
│                       SERVIDOR       │                  │
│                                      ▼                  │
│              [ Spring Boot Controllers ]                │
│                          │                              │
│               [ Service / Business Layer ]              │
│                          │                              │
│               [ XML Parser - Lattes API ]               │
│                          │                              │
│              [ Plataforma CNPq / XML Lattes ]           │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Java JDK 11** ou superior → [Download](https://adoptium.net/)
- **Maven 3.6+** ou **Gradle** → [Download Maven](https://maven.apache.org/download.cgi)
- **Node.js** (opcional, para servir o front-end localmente) → [Download](https://nodejs.org/)
- **Git** → [Download](https://git-scm.com/)

---

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/Myrodian/CurriculumLattes.git
cd CurriculumLattes
```

### 2. Back-end (Java / Spring Boot)
basta rodar o projeto no arquivo principal `BackEndApplication.java`

O servidor será iniciado em: `http://localhost:8080`

### 3. Front-end

Digite no terminal:

```bash
cd front_end
npm start
```

Acesse: `http://localhost:3000`

---

## 📁 Estrutura de Pastas

```
CurriculumLattes/
│
├── back_end/                   # Código do servidor Java
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/           # Classes Java (controllers, services, models)
│   │   │   └── resources/      # application.properties, configurações
│   │   └── test/               # Testes unitários e de integração
│   ├── pom.xml                 # Dependências Maven
│   └── README.md
│
├── front_end/                  # Código do cliente web
│   ├── index.html              # Página principal
│   ├── css/                    # Folhas de estilo
│   ├── js/                     # Scripts JavaScript
│   └── assets/                 # Imagens e recursos estáticos
│
└── README.md                   # Este arquivo
```

---

## 💡 Como Usar

1. Com a aplicação em execução, acesse `http://localhost:3000` no navegador.
2. Insira o **ID Lattes** do pesquisador no campo de busca (ex: `1234567890123456`).
3. Clique em **Buscar** para carregar os dados do currículo.
4. Navegue pelas abas para visualizar as diferentes seções: produção bibliográfica, formação, orientações, projetos etc.

> 💡 **Dica**: O ID Lattes de um pesquisador pode ser encontrado na URL do seu currículo no site do CNPq: `http://lattes.cnpq.br/<ID>`

---

## 📡 API Reference

A API REST exposta pelo back-end segue o padrão RESTful:

### `GET /api/curriculo/{id}`

Retorna os dados completos do currículo Lattes para o ID informado.

**Parâmetros:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | `string` | ID numérico do Currículo Lattes |

**Exemplo de resposta:**

```json
{
  "nome": "João da Silva",
  "nacionalidade": "Brasileira",
  "formacao": [
    {
      "nivel": "Doutorado",
      "area": "Ciência da Computação",
      "instituicao": "Universidade de São Paulo",
      "ano_conclusao": 2015
    }
  ],
  "producao_bibliografica": {
    "artigos": 42,
    "livros": 3,
    "capitulos": 10
  }
}
```

**Códigos de resposta:**

| Código | Descrição |
|---|---|
| `200 OK` | Currículo encontrado e retornado com sucesso |
| `404 Not Found` | Currículo não encontrado para o ID informado |
| `500 Internal Server Error` | Erro interno ao processar o currículo |

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** este repositório
2. Crie uma **branch** para sua feature:
   ```bash
   git checkout -b feature/minha-feature
   ```
3. **Commit** suas alterações:
   ```bash
   git commit -m "feat: adiciona funcionalidade X"
   ```
4. **Push** para sua branch:
   ```bash
   git push origin feature/minha-feature
   ```
5. Abra um **Pull Request** descrevendo suas mudanças.

### Padrão de commits

Este projeto adota o [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Alterações na documentação |
| `style:` | Formatação, sem mudança de lógica |
| `refactor:` | Refatoração de código |
| `test:` | Adição ou correção de testes |

---

## 👥 Autores

Desenvolvido por:

- **Myrodian** — [@Myrodian](https://github.com/Myrodian)

---

## 📄 Licença

Este projeto é um trabalho de faculdade voltado para a melhoria do site. Que se torna necessaria para os pesquisadores

---

<div align="center">


[🔼 Voltar ao topo](#-curriculumlattes)

</div>
