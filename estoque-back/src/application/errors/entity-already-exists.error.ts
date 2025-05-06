export class EntityAlreadyExistsError extends Error {
  constructor(entityName: string = 'Entity') {
    super(`${entityName} já existe.`);
  }
}
