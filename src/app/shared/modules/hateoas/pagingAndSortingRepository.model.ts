import { Href, Repository } from './repository.model';

export class PagingAndSortingRepository<T> extends Repository<T> {
  constructor(
    public _embedded: T,
    public _links: {
      self: Href;
      templated: boolean;
    },
    public page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    }
  ) {
    super(_embedded, _links);
  }
}
