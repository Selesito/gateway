export interface IShopOne {
  id?: number;
  shopName?: string | null;
  owner?: string | null;
  category?: string | null;
  email?: string | null;
}

export class ShopOne implements IShopOne {
  constructor(
    public id?: number,
    public shopName?: string | null,
    public owner?: string | null,
    public category?: string | null,
    public email?: string | null
  ) {}
}

export function getShopOneIdentifier(shopOne: IShopOne): number | undefined {
  return shopOne.id;
}
