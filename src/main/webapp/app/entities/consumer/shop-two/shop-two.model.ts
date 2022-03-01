export interface IShopTwo {
  id?: number;
  shopName?: string | null;
  owner?: string | null;
  category?: string | null;
  email?: string | null;
}

export class ShopTwo implements IShopTwo {
  constructor(
    public id?: number,
    public shopName?: string | null,
    public owner?: string | null,
    public category?: string | null,
    public email?: string | null
  ) {}
}

export function getShopTwoIdentifier(shopTwo: IShopTwo): number | undefined {
  return shopTwo.id;
}
