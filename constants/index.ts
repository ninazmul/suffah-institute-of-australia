export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Services",
    route: "/services",
  },
  {
    label: "Ask Question",
    route: "/qna",
  },
  {
    label: "Events",
    route: "/events",
  },
  {
    label: "Resources",
    route: "/resources",
  },
  {
    label: "Gallery",
    route: "/gallery",
  },
  {
    label: "About Us",
    route: "/about",
  },
  {
    label: "Contact Us",
    route: "/contact",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const Committee = [
  {
    position: "President",
    name: "Md Shamsul Islam",
  },
  {
    position: "Vice President",
    name: "Md Sakawat Hossain",
  },
  {
    position: "Treasurer",
    name: "Md Didarul Alam",
  },
  {
    position: "General Secretary",
    name: "Md Abul Hossain",
  },
  {
    position: "Public Officer",
    name: "(Acting) Md Abul Hossain",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: {
    adult: "",
    kids: "",
    infant: "",
  },
  isFree: false,
  url: "",
};

export const registrationDefaultValues = {
  firstName: "",
  lastName: "",
  address: "",
  number: "",
  email: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  emergencyContactRelation: "",
  signature: "",
  date: new Date(),
  status: "pending",
};

export const successStoryDefaultValues = {
  title: "",
  description: "",
  outcome: "",
  date: new Date(),
};

export const communityServiceResourceDefaultValues = {
  category: "",
  name: "",
  address: "",
  city: "",
  state: "",
  website: "",
  contact: "",
};

export const islamicResourceDefaultValues = {
  category: "",
  fileName: "",
  link: "",
};
