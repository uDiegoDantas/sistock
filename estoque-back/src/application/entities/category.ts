export interface CategoryProps {
  name: string;
}

export class Category {
  private _id?: number;
  private props: CategoryProps;

  constructor(props: CategoryProps, id?: number) {
    this._id = id ?? undefined;
    this.props = props;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }
}
