import { Href } from './repository.model';

export class Entity {
  private _id: number;

  constructor(
    public _links?: {
      self: Href;
    }
  ) {}

  get uri(): string {
    return this._links.self.href;
  }

  get id(): number {
    return this._id || parseInt(this._links.self.href.split('/').slice(-1)[0], 10);
  }

  set id(id: number) {
    this._id = id;
  }
}
