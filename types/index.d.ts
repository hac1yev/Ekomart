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
  title: string;
  life: string;
  discount: number | string;
  price: number | string;
  brand: string;
  tags: OptionType[];
  categories: OptionType[];
  type: OptionType | number | string;
  status: OptionType | number | string;
  image: {
    [key: string]: string;
  };
  description: string;
  additionalInfo: string;
};

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