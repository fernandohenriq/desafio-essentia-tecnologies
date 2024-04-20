export interface DefaultRepository<Entity> {
  save(entity: Entity): Promise<Entity>;
  findOne(where: Where<Entity>): Promise<Entity | null>;
  findMany(search: Search<Entity>): Promise<Entity[]>;
  remove(entity: Entity): Promise<void>;
}
