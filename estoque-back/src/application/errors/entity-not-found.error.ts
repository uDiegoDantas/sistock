export class EntityNotFoundError extends Error {
  constructor(entityName: string = 'Entity') {
    super(`${entityName} not found.`);
  }
}
