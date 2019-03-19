import { PagingAndSortingRepository } from '../../shared/modules/hateoas/pagingAndSortingRepository.model';
import { Href } from '../../shared/modules/hateoas/repository.model';
import { Entity } from '../../shared/modules/hateoas/entity.model';

export class QueryRepository extends PagingAndSortingRepository<QueryAcessor> {}

export interface QueryAcessor {
  sqlQueries: HateoasQuery[];
}

export class HateoasQuery extends Entity {
  constructor(
    public name?: string,
    public command?: string,
    public description?: string,
    public _links?: {
      self: Href;
      sqlQuery: Href,
      permission: Href,
      directory: Href,
    }
  ) {
    super(_links);
  }

  toQuery(): Query {
    const query = <Query>Object.assign(new Query(), this);
    query.id = this.id;
    query.permission = this._links.permission.href;
    query.directory = this._links.directory.href;
    return query;
  }
}

export class Query {
  constructor(
    public name?: string,
    public description?: string,
    public id?: number,
    public command?: string,
    public permission?,
    public directory?
  ) {}
}
