export class Query {

    name: string;
    description: string;
    command: string;
    id: number;

    constructor(httpQuery: any) {
        this.name = httpQuery.name;
        this.description = httpQuery.description;
        this.id = this.getId(httpQuery['_links']['self']['href']) ;
    }

    private getId(selfLink: string): number {
        const tokens = selfLink.split('/');
        return Number( tokens[tokens.length - 1] );
    }
}
