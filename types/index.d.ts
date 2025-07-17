type ProductDetailRatingItem = {
  star: number;
  count: number;
};

declare type ProductCardType = {
  id: number;
  discount: number;
  image: StaticImageData;
  liked?: number;
  title: string;
  price: number;
  value: number;
  brand: string;
};

declare type ProductCardModalType = {
  image: StaticImageData;
  title: string;
  description: string;
  price: number;
  value: number;
  reviewCount: number;
  categories: string[];
  tags: string[];
};

declare type ProductType = {
  id: number;
  discount: number;
  image: StaticImageData;
  title: string;
  description: string;
  additionalInfo: string;
  price: number;
  value: number;
  reviewCount: number;
  life: string;
  createdAt: Date;
  views: number;
  type: number;
  liked?: number;
  status: number;
  type_content: string;
  status_content: string;
  brand: string;
  salesCount: number;
  inStock: number;
  categories: string[];
  tags: string[];
  ratingResult: ProductDetailRatingItem[];
};

declare type AddProductSelectType = {
  [key: string]: {
    value: number;
    label: string;
  }[]
};

declare type OptionType = { value: number; label: string };

declare type ProductItem = {
  [key: string]: string | number | OptionType[] | { [key: string]: string }
}

declare type ProductDetailContentType = {
  id: number;
  brand: string;
  title: string;
  categories: stirng[];
  tags: string[];
  liked?: number;
  description: string;
  price: number;
  value: number;
  life: string;
  type_content: string;
  image: StaticImageData;
  ratingResult: ProductDetailRatingItem[];
};

declare type ProductDetailAdditionalInfoType = {
  id: number;
  additionalInfo: string;
  brand: string;
  type_content: string;
  status_content: string;
};

declare type ProductDetailRatingResultType = {
  ratingResult: ProductDetailRatingItem[];
}

declare type RatingType = {
  star: null | number;
  reviewMessage: string;
}

declare type CartItem = {
  productId: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

declare type NotificationObjType = {
  id: number;
  userId: number;
  title: string;
  description: string;
  type: string;
  url: string;
  isRead: boolean;
  created_at: string;
}