
# 🏪 Sistema de Catálogo de Produtos

Um sistema completo de gerenciamento de catálogo de produtos com **backend em .NET 8+ e + Entity Framework** e **frontend em React + Vite**.

---

## 📋 Sumário
- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Decisões Técnicas](#decisões-técnicas)
- [Desafios Enfrentados](#desafios-enfrentados)
- [Melhorias Futuras](#melhorias-futuras)

---

## 🎯 Visão Geral

Aplicação full-stack para gerenciar um catálogo de produtos com funcionalidades de:
- ✅ CRUD completo de produtos
- ✅ Filtros avançados (categoria, disponibilidade, busca por nome)
- ✅ Dashboard com métricas e estatísticas
- ✅ Modo claro/escuro
- ✅ Validações em tempo real
- ✅ Pluralização correta de textos
- ✅ Pré-visualização de imagens

---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Motivo |
|-----------|--------|--------|
| **.NET** | 8.0 | Performance, type-safe, arquitetura moderna |
| **Entity Framework Core** | 8.0 | ORM poderoso para abstração de dados |
| **SQL Server** | Último | Banco de dados robusto e confiável |
| **Newtonsoft.Json** | 13.0.3 | Serialização/desserialização de JSON |
| **CORS** | Nativo | Permitir requisições do frontend |

### Frontend
| Tecnologia | Versão | Motivo |
|-----------|--------|--------|
| **React** | 18+ | Biblioteca UI reativa e componetizada |
| **Vite** | 8.0+ | Build tool ultra-rápido |
| **Axios** | 1.x | Client HTTP simples e confiável |
| **JavaScript ES6+** | - | Sintaxe moderna e legível |

---

## 📁 Arquitetura do Projeto

```
Catalogo_Produtos/
├── Backend/                          # API .NET
│   ├── Controllers/
│   │   └── ProdutosController.cs    # Endpoints da API
│   ├── Domain/
│   │   └── Entities/         
│   │      └── Produto.cs            # Entidade principal
│   ├── Infrastructure/
│   │   ├── Data/
│   │      └── AppDbContext.cs       # DbContext
│   │   └── Migrations/              # Histórico do banco
│   │      └── InitialCreate.cs
│   │      └── AppDbContextModelSnapshot
│   ├── appsettings.json             # Configuração
│   └── Program.cs                   # Setup da aplicação
│
└── Frontend/
    └── catalogo-produtos-frontend/
        ├── src/
        │   ├── components/
        │   │   ├── Header.jsx        # Barra de navegação e filtros
        │   │   ├── ProductCard.jsx   # Card individual do produto
        │   │   ├── ProductModal.jsx  # Modal para criar/editar
        │   │   ├── DeleteModal.jsx   # Modal de confirmação
        │   │   └── Dashboard.jsx     # Dashboard com estatísticas
        │   ├── pages/
        │   │   └── Home.jsx          # Página principal
        │   ├── services/
        │   │   └── api.js            # Configuração do Axios
        │   ├── contexts/
        │   │   └── ThemeContext.jsx  # Gerenciamento de tema
        │   ├── App.jsx               # Componente raiz
        │   └── main.jsx              # Entry point
        ├── index.html
        ├── vite.config.js
        └── package.json
```

### Justificativa da Estrutura

**Backend (.NET):**
- **Controllers**: Separa lógica de requisição/resposta
- **Models**: Centraliza definições de dados
- **Data**: Isolamento da camada de persistência (DbContext e migrations)
- Segue padrão RESTful e convenções do .NET

**Frontend (React):**
- **components/**: Componentes reutilizáveis e isolados
- **pages/**: Páginas específicas (facilita expansão multi-página)
- **services/**: Centraliza requisições à API (single source of truth)
- **contexts/**: Estado global (tema) sem necessidade de Redux
- Organização escalável e fácil de manter

---

## 🚀 Instalação e Execução

### ⚙️ Pré-requisitos
- **.NET SDK 8.0+** ([Download](https://dotnet.microsoft.com/download))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **SQL Server** (ou LocalDB)
- **Git**

### Backend (.NET)

```bash
# 1. Navegar para o diretório do backend
cd Backend

# 2. Restaurar dependências
dotnet restore

# 3. Atualizar banco de dados (se houver migrations)
dotnet ef database update

# 4. Executar a aplicação
dotnet run
# API estará em: http://localhost:5198
```

**Verificar se está rodando:**
```bash
curl http://localhost:5198/api/produtos
```

### Frontend (React)

```bash
# 1. Navegar para o diretório do frontend
cd Frontend/catalogo-produtos-frontend

# 2. Instalar dependências
npm install

# 3. Executar em modo desenvolvimento
npm run dev
# Acesse em: http://localhost:5174/
```

**Build para produção:**
```bash
npm run build
# Arquivos gerados em: dist/
```


## ✨ Funcionalidades Implementadas

### 📋 Gerenciamento de Produtos
- ✅ **Listar produtos** com paginação visual
- ✅ **Criar novo produto** com validação
- ✅ **Editar produto existente**
- ✅ **Deletar produto** com confirmação
- ✅ **Ativar/desativar produtos**

### 🔍 Filtros e Buscas
- ✅ **Busca por nome** (em tempo real)
- ✅ **Filtro por categoria** (7 categorias)
- ✅ **Filtro por disponibilidade** (Todos/Disponíveis/Sem Estoque)
- ✅ **Ordenação** (Recentes, Preço ↑↓, Alfabética)

### 📊 Dashboard
- ✅ **Total de produtos** (ativos/inativos)
- ✅ **Valor total em estoque**
- ✅ **Preço médio** dos produtos
- ✅ **Produtos com estoque baixo** (< 10 unidades)
- ✅ **Produtos sem estoque**
- ✅ **Top 5 mais caros** e **Top 5 mais baratos**
- ✅ **Distribuição por categoria** com valores

### 🎨 UI/UX
- ✅ **Tema claro/escuro** com persistência de preferência
- ✅ **Pré-visualização de imagens** com suporte a URLs externas
- ✅ **Cards responsivos** com feedback visual
- ✅ **Modal elegante** para criar/editar
- ✅ **Pluralização automática** (1 produto vs 2+ produtos)
- ✅ **Estados de carregamento** com spinner
- ✅ **Mensagens de erro** úteis

### ✔️ Validações
- **Backend**: Valida todas as entradas (nome, preço, estoque, etc.)
- **Frontend**: Feedback em tempo real com mensagens de erro
- **Limites**: Nome máx 100 chars, descrição máx 500 chars

---

## 🧠 Decisões Técnicas

### 1️⃣ Por que .NET 8+ e + Entity Framework Core?

**Decisão**: Usar .NET para o backend em vez de Node.js/Express

**Justificativa:**
- ✅ **Type-safe**: C# compilado detecta erros em tempo de compilação
- ✅ **Performance**: .NET é significativamente mais rápido que Node.js
- ✅ **Entity Framework**: ORM poderoso com LINQ para queries complexas
- ✅ **Indústria**: Muito usado em grandes empresas (confiabilidade)
- ✅ **Escalabilidade**: Melhor para aplicações grandes

### 2️⃣ Por que React + Vite e não Next.js?

**Decisão**: SPA (Single Page Application) com React + Vite

**Justificativa:**
- ✅ **Vite**: Build 10-100x mais rápido que Webpack/Create React App
- ✅ **Simples**: Para um projeto de prova, SPA é mais direto que Next.js
- ✅ **Aprendizado**: Mostrando um domínio de React puro vs framework wrapper
- ✅ **Flexibilidade**: Controle total sem abstrações desnecessárias
- ✅ **Separação de responsabilidades**: Frontend e Backend completamente desacoplados

### 3️⃣ Filtros no Frontend vs Backend?

**Decisão**: Filtro de disponibilidade no **frontend**, buscas no **backend**

**Justificativa:**
- ✅ **Disponibilidade**: Filtro simples em-memória (reduz latência)
- ✅ **Busca/Categoria**: Backend porque precisa filtrar no banco
- ✅ **UX**: Resposta instantânea ao clicar em "Disponíveis"
- ✅ **Escalabilidade**: Backend filtra grandes datasets

```javascript
// Frontend - Instantâneo
const disponibilidade = produtos.filter(p => p.estoque > 0);

// Backend - Para muitos dados
GET /api/produtos?nome=teclado&categoria=Eletrônicos
```

### 4️⃣ Separação de Responsabilidades

**Componentes:**
- `Header.jsx`: UI de filtros (sem lógica complexa)
- `ProductCard.jsx`: Renderização do card (reutilizável)
- `ProductModal.jsx`: Form com validação
- `Dashboard.jsx`: Apenas agregação de dados
- `Home.jsx`: Orquestração (gerencia estado e fluxos)

**Services:**
- `api.js`: Centraliza todas as requisições (fácil mudar base URL)

**Contexts:**
- `ThemeContext.jsx`: Estado global (tema) - evita prop drilling

**Resultado**: Código testável, mantível e reutilizável

### 5️⃣ Modelo de Dados (Entidade Produto)

```csharp
public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; }           // Obrigatório, máx 100
    public string Descricao { get; set; }      // Opcional, máx 500
    public decimal Preco { get; set; }         // > 0
    public int Estoque { get; set; }           // >= 0
    public string Categoria { get; set; }      // Ex: "Eletrônicos"
    public string ImagemUrl { get; set; }      // Opcional
    public bool Ativo { get; set; }            // true/false
    public DateTime DataCadastro { get; set; } // Auto-populado
}
```

**Justificativa:**
- ✅ Campos essenciais para um catálogo
- ✅ Validações refletem regras de negócio
- ✅ `DataCadastro` para auditoria
- ✅ `Ativo` para soft delete lógico

### 6️⃣ Pluralização Automática

**Problema original**: "1 produtos" em vez de "1 produto"

**Solução**:
```javascript
const pluralize = (count, singular, plural) => 
  count === 1 ? singular : plural;

// Uso:
{pluralize(produtosAtivos, 'ativo', 'ativos')}
// "1 ativo" ou "5 ativos"
```

**Por que não usar library?**
- ✅ Regras simples em português
- ✅ Controle total

### 7️⃣ Tratamento de Imagens

**Problema**: URLs do Google Imagens não funcionam (CORS)

**Solução**:
- ✅ Suporta URLs de **Unsplash, Pexels, Pixabay, Imgur**
- ✅ Pré-visualização em container elegante
- ✅ Tratamento de erro com mensagem clara
- ✅ Reset automático ao mudar URL

```jsx
{!imageError ? (
  <img src={form.imagemUrl} onError={() => setImageError(true)} />
) : (
  <div>❌ Erro ao carregar imagem</div>
)}
```

---

## 🚧 Desafios Enfrentados

### 1️⃣ Filtro de Disponibilidade Não Funcionava

**Problema**: Ao selecionar "Disponíveis", qualquer produto aparecia

**Root Cause**: 
- Backend não estava suportando o parâmetro `disponibilidade`
- Frontend passava o parâmetro, mas era ignorado

**Solução Implementada**:
```javascript
// Antes: Dependia do backend
api.get("/produtos", { params: { disponibilidade } })

// Depois: Filtro no frontend
const filtrarProdutos = (items) => {
  if (disponibilidade === "disponiveis") return items.filter(p => p.estoque > 0);
  if (disponibilidade === "semEstoque") return items.filter(p => p.estoque === 0);
  return items;
}
```

**Aprendizado**: Validar end-to-end (backend → frontend) e não assumir que a API funciona

---

### 2️⃣ Pluralização Incorreta no Dashboard

**Problema**: "1 produtos" em vez de "1 produto"

**Solução**:
```javascript
const pluralize = (count, singular, plural) => count === 1 ? singular : plural;

// Aplicado em 5+ lugares (dashboard, estatísticas, etc)
```

**Resultado**: UI natural e profissional

---

### 3️⃣ Pré-visualização de Imagens

**Problema**: URLs do Google Imagens são bloqueadas por CORS

**Solução**:
1. Documentar fontes válidas (Unsplash, Pexels)
2. Implementar erro gracioso com try/catch via `onError`
3. Container elegante para visualizar antes de salvar

**Resultado**: UX melhorada com feedback claro

---

### 4️⃣ Modo Claro/Escuro

**Desafio**: Sincronizar tema em múltiplos componentes

**Solução**: 
```javascript
// ThemeContext.jsx - Estado global
const [isDarkMode, setIsDarkMode] = useState(
  localStorage.getItem('theme') === 'dark'
);

// Persiste no localStorage
useEffect(() => {
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}, [isDarkMode]);
```

**Resultado**: Tema persiste entre abas e sessões

---

## 🔮 Melhorias Futuras

### Curto Prazo
- [ ] Search de produtos do lado do servidor (melhor performance)
- [ ] Paginação na listagem (ex: 10 itens por página)
- [ ] Validação de email no backend se houver usuários
- [ ] Testes unitários (xUnit no .NET, Vitest no React)

### Médio Prazo
- [ ] **Autenticação** (JWT com roles: admin/vendedor/cliente)
- [ ] **Autorização** (apenas admin pode deletar produtos)
- [ ] **Upload de imagens** (em vez de apenas URLs)
- [ ] **Histórico de alterações** (audit log)
- [ ] **Relatórios em PDF** (dashboard exportável)

### Longo Prazo
- [ ] **Carrinho de compras** (persistir em localStorage)
- [ ] **Checkout** com integração de pagamento (Stripe)
- [ ] **Notificações** (email quando produto volta ao estoque)
- [ ] **Sistema de reviews** (avaliações de produtos)
- [ ] **Mobile app** (React Native ou Flutter)
- [ ] **Cache** (Redis) para melhor performance
- [ ] **Search avançado** (Elasticsearch)

### Arquitetura Futura (Com mais tempo)
```
Backend:
- Repository Pattern (abstração do EF)
- Aplicação Services Layer (lógica de negócio)
- Dependency Injection completo
- SOLID principles rigorosamente aplicados

Frontend:
- Redux Toolkit (estado global complexo)
- React Query (fetching de dados)
- Vitest + React Testing Library (100% coverage)
- Component library (Storybook)
```

---

## 📊 Comparação: O que Faria Diferente com Mais Tempo

| Aspecto | Atual | Melhorado | Motivo |
|---------|-------|-----------|---------|
| **Lógica de negócio** | Controllers | Services Layer | Testabilidade |
| **Estado** | Context + useState | Redux Toolkit | Escalabilidade |
| **Filtros** | Frontend (simples) | Backend + Redis | Performance em escala |
| **Testes** | Nenhum | 80%+ coverage | Confiabilidade |
| **Validação** | Básica | FluentValidation | Rules engine |
| **Autenticação** | Nenhuma | JWT + Roles | Segurança |
| **Deploy** | Local | Docker + CI/CD | Produção |
| **Docs API** | Swagger manual | Swagger automático | Manutenção |

### O que foi bem implementado:
1. ✅ **CRUD completo** funcionando perfeitamente
2. ✅ **Separação de responsabilidades** clara
3. ✅ **UI/UX responsiva** e intuitiva
4. ✅ **Tratamento de erros** gracioso
5. ✅ **Validações** em frontend e backend
6. ✅ **Performance** otimizada (Vite, React puro)
7. ✅ **Documentação** clara (este README)

### Como fui além:
1. **Filtro de disponibilidade** funcionando corretamente
2. **Pluralização correta** (UX detail)
3. **Dashboard com estatísticas** (feature extra)
4. **Tema claro/escuro** com persistência
5. **Pré-visualização de imagens** elegante
6. **Explicação técnica completa** (este README)

# Ver logs do backend
dotnet run -v

# Ver logs do frontend
npm run dev
