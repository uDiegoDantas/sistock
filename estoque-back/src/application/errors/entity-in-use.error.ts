export class EntityInUseError extends Error {
  constructor(entityName = 'entity') {
    super(`Essa ${entityName} já está em uso.`);
  }
}
