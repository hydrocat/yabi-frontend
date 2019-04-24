import { PagingAndSortingRepository } from '../../shared/modules/hateoas/pagingAndSortingRepository.model';
import { Href } from '../../shared/modules/hateoas/repository.model';
import { Entity } from '../../shared/modules/hateoas/entity.model';

export class DirectoryRepository extends PagingAndSortingRepository<DirectoryAcessor> {}

export interface DirectoryAcessor {
  directories: HateoasDirectory[];
}

export class HateoasDirectory extends Entity {
  constructor(
    public connectionString?: string,
    public name?: string,
    public username?: string,
    public password?: string,
    public _links?: {
      self: Href;
      directory: Href;
    }
  ) {
    super(_links);
  }
}
