export interface Href {
  href: string;
}

export class Repository<T> {
  constructor(
    public _embedded: T,
    public _links: {
      self: Href;
      templated: boolean;
    }
  ) {}
}
