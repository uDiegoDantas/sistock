export class EntityNotFoundError extends Error {
  constructor(entityName: string = 'Entity') {
    super(`${entityName} não encontrado(a).`);
  }
}
