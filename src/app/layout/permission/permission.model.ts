import { PagingAndSortingRepository } from '../../shared/modules/hateoas/pagingAndSortingRepository.model';
import { Href } from '../../shared/modules/hateoas/repository.model';
import { Entity } from '../../shared/modules/hateoas/entity.model';

export class PermissionRepository extends PagingAndSortingRepository<PermissionAcessor> {}

export interface PermissionAcessor {
  permissionTrees: Permission[];
}

export class Permission extends Entity {
  constructor(
    public nodePath?: string,
    public description?: string,
    public _links?: {
      self: Href,
      permissionTree: Href,
      parent: Href,
      yabiUser: Href
    },
  ) {
    super(_links);
  }
}


