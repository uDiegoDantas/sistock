# Relatório de Desenvolvimento – Projeto SisStock

**Alunos:** Diego Dantas e Reinaldo Alves  
**Disciplina:** Dispositivos Moveis
**Instituição:** UFRN – CERES Caicó/RN  
**Data:** 09/06/2025

---

## 📌 Etapas Concluídas

### 1. Definição das Entidades Representativas dos Casos de Uso

Após análise dos casos de uso para o sistema de controle de estoque, definimos as seguintes **entidades principais**, que representam os elementos fundamentais do sistema:

- **Usuário:** responsável por registrar e gerenciar operações no sistema.
- **Categoria:** representa os grupos ou tipos de produtos disponíveis.
- **Produto:** entidade principal que representa os itens armazenados.
- **Estoque:** gerencia a quantidade atual de cada produto, entrada e saída.
- **Log:** registra as ações realizadas no sistema (inserção, edição, remoção).

Essas entidades cobrem os casos de uso centrais de um sistema de estoque, como **cadastro de produtos**, **controle de entradas/saídas**, e **monitoramento de operações**.

---

### 2. Desenvolvimento das Telas Iniciais

Implementamos também as **telas iniciais** do sistema, com foco em usabilidade e organização:

- **Tela de Login:** para autenticação dos usuários no sistema.
- **Tela de Dashboard:** exibe as informações principais e métricas do estoque.
- **Tela de Cadastro de Categorias:** permite gerenciar os grupos de produtos.
- **Tela de Cadastro de Produtos:** interface para criar e editar produtos.
- **Tela de Controle de Estoque:** onde se realiza o lançamento de entradas e saídas.
- **Tela de Logs:** exibe o histórico de ações realizadas por cada usuário.

As telas foram desenvolvidas com base na arquitetura MVC, seguindo boas práticas de separação de responsabilidades e uso de padrões REST na API.

---

## ✅ Conclusão

Até o momento, foram realizadas as seguintes entregas:

- Modelagem inicial do banco de dados com entidades baseadas nos casos de uso;
- Desenvolvimento das telas principais do sistema (autenticação, gerenciamento e controle de estoque);
- Organização do código com rotas RESTful, banco relacional e interface funcional.

Os próximos passos incluem:

- Implementar a funcionalidade de relatórios;
- Melhorar a autenticação com níveis de acesso;
- Realizar implementação de coleta de dados através de planilhas.

---

**Diego Dantas**  
**Reinaldo Alves**
