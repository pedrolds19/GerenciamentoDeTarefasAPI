# 📌 API de Gerenciamento de Tarefas

Projeto desenvolvido em ASP.NET Core com foco em práticas de back-end, como: criação e consumo de APIs, Entity Framework Core com SQLite, testes automatizados com xUnit, versionamento com Git e documentação com Swagger.

---

## 🛠️ Tecnologias e Conceitos Utilizados

- ✅ ASP.NET Core 8 (API REST)
- ✅ Entity Framework Core (ORM)
- ✅ SQLite (banco de dados leve e portável)
- ✅ Injeção de Dependência
- ✅ Repository e Service Pattern
- ✅ AutoMapper
- ✅ xUnit (Testes de Unidade)
- ✅ Swagger (OpenAPI)
- ✅ Suporte a JSON e XML
- ✅ Versionamento com Git

---

### Pré-requisitos

- Visual Studio 2022 (com .NET 8)
- .NET SDK 8.0 instalado
- SQLite (opcional, o EF Core cria o arquivo `.db` automaticamente)

## ⚙️ Configuração e Execução

### Como rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/GerenciamentoDeTarefasAPI.git
   cd GerenciamentoDeTarefasAPI

2. Restaure os pacotes:
   
   dotnet restore

3. Crie o banco de dados:
   
   dotnet ef database update

4. Execute a aplicação:
   
   dotnet run

5. Acesse a documentação interativa (Swagger):
   https://localhost:5001/swagger
 

## 🔍 Endpoints Principais

| Verbo  | Rota                | Descrição                     |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/tarefas`      | Lista todas as tarefas        |
| GET    | `/api/tarefas/{id}` | Retorna uma tarefa específica |
| POST   | `/api/tarefas`      | Cria uma nova tarefa          |
| PUT    | `/api/tarefas/{id}` | Atualiza uma tarefa           |
| DELETE | `/api/tarefas/{id}` | Remove uma tarefa             |


## ✅ Estrutura do Projeto
GerenciamentoDeTarefasAPI
├── Controllers/
├── Data/
│   └── AppDbContext.cs
├── Models/
├── Repositories/
│   ├── Interfaces/
│   └── Implementações/
├── Services/
│   ├── Interfaces/
│   └── Implementações/
├── Tests/
│   └── Testes com xUnit/
├── Program.cs
└── appsettings.json


## 👨‍💻 Autor
Desenvolvido por Pedro Ferreira

📧 pedrofls19@gmail.com

🎯 Projeto com fins de estudo e portfólio profissional.
