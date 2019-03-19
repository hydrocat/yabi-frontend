import { Href } from './repository.model';

export class Entity {
  constructor(
    public _links?: {
      self: Href;
    }
  ) {}

  get uri(): string {
    return this._links.self.href;
  }

  get id(): number {
    return parseInt(this._links.self.href.split('/').slice(-1)[0], 10);
  }
}
