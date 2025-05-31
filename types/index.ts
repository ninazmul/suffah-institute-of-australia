// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: {
      adult: string;
      kids?: string;
      infant?: string;
    };
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: {
      adult: string;
      kids?: string;
      infant?: string;
    };
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetEventsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedEventsByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  price: {
    adult: string;
    kids?: string;
    infant?: string;
  };
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ADMIN PARAMS
export type CreateAdminParams = {
  Name: string;
  Email: string;
};

// ====== QNA PARAMS
export type CreateQnaParams = {
  Question: string;
  Answer?: string;
  QuestionLikes?: {
    count: number;
    likedBy: string[];
  };
  AnswerLikes?: {
    count: number;
    likedBy: string[];
  };
};

// ====== ISLAMIC RESOURCE PARAMS
export type CreateIslamicResourceParams = {
  category: string;
  fileName: string;
  link: string;
};

// ====== COMMUNITY SERVICE RESOURCE PARAMS
export type CreateCommunityServiceResourceParams = {
  category: string;
  name: string;
  address: string;
  city: string;
  state: string;
  website?: string;
  contact?: string;
};

// ====== GALLERY PARAMS
export type AddPhotoParams = {
  Title: string;
  Image: string;
};

// ====== BANNER PARAMS
export type AddBannerParams = {
  Title: string;
  Image: string;
};

// ====== REGISTRATION PARAMS
export type RegistrationParams = {
  firstName: string;
  lastName: string;
  address: string;
  number: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelation: string;
  signature?: string;
  date: Date;
  status: string;
};

// ====== FREE ORDER PARAMS
export type FreeOrderParams = {
  name: string;
  address: string;
  number: string;
  email: string;
  date: Date;
  eventTitle: string;
  eventId: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerName: string;
  buyerEmail: string;
  buyerNumber: string;
  adults: number;
  kids: number;
  infants: number;
  note?: string;
};

export type CreateOrderParams = {
  eventId: string;
  buyerName: string;
  buyerEmail: string;
  buyerNumber: string;
  totalAmount: number;
  createdAt: Date;
  adults: number;
  kids: number;
  infants: number;
  note?: string;
};

export type getOrdersByEmailParams = {
  email: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};
