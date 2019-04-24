import { Entity } from '../../shared/modules/hateoas/entity.model';
import { Href, Acessor } from '../../shared/modules/hateoas/repository.model';
import { PagingAndSortingRepository } from '../../shared/modules/hateoas/pagingAndSortingRepository.model';

export class UserRepository extends PagingAndSortingRepository<UserAcessor> {}

export class UserAcessor implements Acessor {
    constructor(
        public acessorName = 'yabiUsers',
        public yabiUsers?: Entity[]
    ) {}
}

export class HateoasUser extends Entity {
    constructor(
        public name?: string,
        public role?: string,
        public username?: string,
        public enabled?: boolean,
        public authorities?: {authority: string}[],
        public password?: string,
        public accountNonExpired?: boolean,
        public accountNonLocked?: boolean,
        public credentialsNonExpired?: boolean,
        public _links?: {
            self: Href,
            yabiUser: Href,
            permissions: Href
        }
    ) {
        super(_links);
    }
}
