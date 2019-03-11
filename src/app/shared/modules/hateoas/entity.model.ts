import { Href } from './repository.model';

export class Entity {
  constructor(
    public _links?: {
      self: Href;
    }
  ) {}

  get id() {
    return this._links.self.href;
  }
}
