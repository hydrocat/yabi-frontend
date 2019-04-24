export interface Href {
  href: string;
}

//
// Each exentesion must contain a field in which the name is
// specified in acessorName; It's type must be an array of
// the desired Entities.
//
// Example of a person Acessor:
//
// interface PersonAcessor extends Acessor {
//  acessorName: 'people';
//  people: Person[];
// }
//
export interface Acessor {
  acessorName: string;
}

export class Repository<A extends Acessor> {
  constructor(
    public _embedded: A,
    public _links: {
      self: Href;
      templated: boolean;
    }
  ) {}
}
