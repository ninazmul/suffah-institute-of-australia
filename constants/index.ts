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
    label: "Our Achievements",
    route: "/achievements",
  },
  {
    label: "Events",
    route: "/events",
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
    label: "Ask Question",
    route: "/qna",
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
