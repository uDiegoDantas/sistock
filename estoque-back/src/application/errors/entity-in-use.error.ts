export class EntityInUseError extends Error {
  constructor(entityName = 'entity') {
    super(`This ${entityName} is in use.`);
  }
}
