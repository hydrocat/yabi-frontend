export interface Href {
  href: string;
}

//
// Each exentesion must contain a field in which the name is
// specified in acessorName; It's type must be an array of
// the desired Entities.
//
// Example of a person Accessor:
//
// interface PersonAccessor extends Accessor {
//  acessorName: 'people';
//  people: Person[];
// }
//
export interface Accessor {
  acessorName: string;
}

export class Repository<A extends Accessor> {
  constructor(
    public _embedded: A,
    public _links: {
      self: Href;
      templated: boolean;
    }
  ) {}
}
