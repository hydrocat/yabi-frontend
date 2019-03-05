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
