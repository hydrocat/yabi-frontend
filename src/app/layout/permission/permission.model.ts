import { PagingAndSortingRepository } from '../../shared/modules/hateoas/pagingAndSortingRepository.model';
import { Href, Acessor } from '../../shared/modules/hateoas/repository.model';
import { Entity } from '../../shared/modules/hateoas/entity.model';

export class PermissionRepository extends PagingAndSortingRepository<
  PermissionAcessor
> {}

export class PermissionAcessor implements Acessor {
  constructor(
    public acessorName = 'permissionTrees',
    public permissionTrees?: HateoasPermission[]
  ) {}
}

export class HateoasPermission extends Entity {
  constructor(
    public nodePath?: string,
    public description?: string,
    public _links?: {
      self: Href;
      permissionTree: Href;
      parent: Href;
      yabiUser: Href;
    }
  ) {
    super(_links);
  }

  toPermission(): Permission {
    return new Permission(
      this.id,
      this.nodePath,
      this.description,
      this._links.parent.href
    );
  }
}

export class Permission {
  constructor(
    public id?: number,
    public nodePath?: string,
    public description?: string,
    public parent?: string
  ) {}

  get uri(): string {
    console.log(`permission ${this.id} has unknown uri`);
    throw new Error(`permission ${this.id} has unknown uri`);
  }

  toHateoas(): HateoasPermission {
    const p = new HateoasPermission(this.nodePath, this.description);
    p.id = this.id;
    p._links.parent.href = this.parent;
    return p;
  }
}
