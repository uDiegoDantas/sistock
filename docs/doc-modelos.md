# Documento de Modelos

## Modelo Conceitual

### Diagrama de Classes usando Mermaid

```mermaid
classDiagram
    Account : +int id
    Account : +String name
    Account : +String password
    Account : +boolean isActive
    Account : +int userType

    Category : +int id
    Category : +String name
    Category : +boolean isActive

    Product : +int id
    Product : +String name
    Product : +Float preco
    Product : +int categoryId
    Product : +boolean isActive

    Log : +int id
    Log : +Date date
    Log : +int stockId
    Log : +int accountId

    Stock: +int id
    Stock: +int quantity
    Stock: +int productId
```

### Descrição das Entidades

Descrição sucinta das entidades presentes no sistema.

| Entidade | Descrição   |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Usuário   | Entidade abstrata para representar informações gerais dos Usuários                                                  |
| Categoria   | Entidade abstrata para representar informações gerais das Categorias                                                  |
| Produto   | Entidade abstrata para representar informações gerais das Produtos                                                  |
| Log   | Entidade abstrata para representar informações gerais das Logs. Nele é possível buscar um log através de uma Data|
| Estoque   | Entidade abstrata para representar informações gerais dos Estoques. Nele é possível alterar ou diminuir a quantidade. |

## Modelo de Dados (Entidade-Relacionamento)

```mermaid
erDiagram
    Account {
        int id PK
        string name
        string password
        boolean isActive
        int userType
    }
    Account ||--o{ Log : "cria"

    Category {
        int id PK
        string name
        boolean isActive
    }

    Product {
        int id PK
        string name
        float price
        boolean isActive
        int categoryId FK
    }
    Category ||--o{ Product : "possui"

    Log {
        int id PK
        Date date
        int stockId FK 
        int accountId FK
    }

    Stock {
        int id PK
        int quantity
        int productId FK
    }
    Stock ||--o{ Log : "possui"
    Stock ||--|| Product : "tem"
```

### Dicionário de Dados

|   Tabela   | Laboratório |
| ---------- | ----------- |
| Account  | Armazena as informações de um laboratório acadêmico. |
| Category | Armazena as categorias que serão utilizadas no relacionamento com os Produtos. |
| Product | Contém os diversos produtos presentes no sistmea. |
| Stock | Armazena as informações do estoque em si. |
| Log | Armazena os logs relacionados ao movimento de estoque. |

|  Nome         | Descrição                        | Tipo de Dado | Tamanho | Restrições de Domínio |
| ------------- | -------------------------------- | ------------ | ------- | --------------------- |
| id                 | identificador gerado pelo SGBD                | INT       | --     | PK / Identity |
| name               | nome da entidade                               | VARCHAR      | 30     | Not Null |
| password           | senha do usuário                              | VARCHAR      | 30     | Not Null |
| userType            | identificador do tipo da conta            | INT      | --     | Not Null |
| price              | preço do produto                              | FLOAT       | --     | Not Null |
| categoryId       | id da categoria relacionado        | INT       | --     | FK / Not Null |
| date  | data de movimentação do log                   | DATE         | --     | Not Null |
| stockId         | id do estoque relacionado              | INT       | 150    | FK / Not Null |
| quantity         | quantidade do estoque                         | INT          | --     | Not Null |
| productId         | id do produto relacionado          | INT       | --     | FK / Unique / Not Null |