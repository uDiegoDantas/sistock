# Documento de User Stories

## Descrição

Este documento descreve os User Stories criados a partir da Lista de Requisitos no [Documento 001 - Documento de Visão](doc-visao.md). Este documento também pode ser adaptado para descrever Casos de Uso. Modelo de documento baseado nas características do processo easYProcess (YP).

## Histórico de revisões

| Data       | Versão  | Descrição                          | Autor                          |
| :--------- | :-----: | :--------------------------------: | :----------------------------- |
| 02/04/2025 | 0.0.1   | Template e descrição do documento  | Reinaldo Alves |
| 03/04/2025 | 0.0.2   | Detalhamento do User Story US01    | Emerson Silva |
| 03/04/2025 | 0.0.3   | Detalhamento do User Story US02    | Emerson Silva |

### User Story US01 - Manter Categoria
|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | O sistema deve manter um operações de adicionar, alterar, remover e listar as categorias dentro de si. Como atributo, a categoria tem apenas o seu nome, que deve ser único. Os usuários podem fazer todas as operações com as categorias.

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| RF01.01          | Inserir Categoria |
| RF01.02          | Listar Categoria  |
| RF01.03          | Alterar Categoria|
| RF01.04          | Excluir Categoria |

|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 4 h                                 | 
| **Tempo Gasto (real):**   |                                     | 
| **Tamanho Funcional**     | 5 PF                                | 
| **Analista**              | Reinaldo Alves                      | 
| **Desenvolvedor**         | João Pedro                          | 
| **Revisor**               | Emerson Silva                       | 
| **Testador**              | Diego Dantas                        | 


| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**      | **Descrição** |
| **TA01.01** | O usuário não deve conseguir inserir ou alterar categorias com nomes repetidos |
| **TA01.02** | O usuário não deve conseguir remover categorias que possuem produtos ativos |


### User Story US02 - Manter Produto
|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | O sistema deve manter um operações de adicionar, alterar, remover e listar os produtos dentro de si. Como atributos, os produtos possuem nome, preço e uma chave que a relaciona com a sua categoria. Os usuários podem fazer todas as operações com os produtos.

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| RF02.01          | Inserir Produto |
| RF02.02          | Listar Produto  |
| RF02.03          | Alterar Produto|
| RF02.04          | Excluir Produto |

|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 6 h                                 | 
| **Tempo Gasto (real):**   |                                     | 
| **Tamanho Funcional**     | 10 PF                                | 
| **Analista**              | Diego Dantas                        | 
| **Desenvolvedor**         | Reinaldo Alves                      | 
| **Revisor**               | João Pedro                          | 
| **Testador**              | Emerson Silva                       | 


| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**      | **Descrição** |
| **TA02.01** | O usuário não deve conseguir inserir ou atualizar produtos com nomes inválidos |
| **TA02.02** | O usuário não deve conseguir inserir ou atualizar produtos com preço menor ou igual a zero |
