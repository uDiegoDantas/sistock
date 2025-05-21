# Tarefa P02 - Emerson da Silva Santos

## Funções
### Função 9:
Esta função em PostgreSQL retorna a quantidade de movimentações registradas (logs) feitas por um usuário específico, identificado pelo seu `accountId`.

```sql
CREATE OR REPLACE FUNCTION count_logs_by_account(acc_id INT)
RETURNS INT AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM "Log" WHERE "accountId" = acc_id);
END;
$$ LANGUAGE plpgsql;
```

### Função 10:
Esta função retorna a data da última movimentação de estoque registrada para um produto específico, identificado por seu `productId`. Ela utiliza uma junção entre as tabelas `Log` e `Stock` para localizar o log mais recente.

```sql
CREATE OR REPLACE FUNCTION get_last_stock_log_date(pid INT)
RETURNS TIMESTAMP AS $$
BEGIN
  RETURN (
    SELECT MAX("date")
    FROM "Log"
    JOIN "Stock" ON "Stock"."id" = "Log"."stockId"
    WHERE "Stock"."productId" = pid
  );
END;
$$ LANGUAGE plpgsql;
```

