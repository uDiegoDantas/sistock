export class EntityInUseException extends Error {
  constructor(entityName = 'entity') {
    super(`This ${entityName} is in use.`);
  }
}
