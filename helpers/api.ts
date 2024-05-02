export const API = {
  products: {
    getThree: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/getTopThree`,
    getColors: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/getColors`,
    getById: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/byId`,
    all: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/all`,
    getByColor: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/getByColor`,
    getByCategory: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/getByCategory`,
    edit: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/edit`,
    getAllWithDiscontinued: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/allWithDiscontinued`,
    delete: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/delete`,
    create: `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/create`,
  },
  image: {
    get: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    upload: `${process.env.NEXT_PUBLIC_DOMAIN}/api/files/uploadFile`,
    delete: `${process.env.NEXT_PUBLIC_DOMAIN}/api/files/deleteFile`,
  },
  reviews: {
    getThree: `${process.env.NEXT_PUBLIC_DOMAIN}/api/reviews/getTop`,
    getAll: `${process.env.NEXT_PUBLIC_DOMAIN}/api/reviews/getAll`,
    addReview: `${process.env.NEXT_PUBLIC_DOMAIN}/api/reviews/create`,
    delete: `${process.env.NEXT_PUBLIC_DOMAIN}/api/reviews/delete`,
  },
  delivery: {
    getAddresses: `${process.env.NEXT_PUBLIC_DOMAIN}/api/delivery/getAdresses`,
    getWarehouses: `${process.env.NEXT_PUBLIC_DOMAIN}/api/delivery/getWarehouses`,
  },
  prices: {
    getAll: `${process.env.NEXT_PUBLIC_DOMAIN}/api/prices/getAll`,
    edit: `${process.env.NEXT_PUBLIC_DOMAIN}/api/prices/edit`,
  },
  orders: {
    create: `${process.env.NEXT_PUBLIC_DOMAIN}/api/orders/create`,
    getAll: `${process.env.NEXT_PUBLIC_DOMAIN}/api/orders/all`,
    getById: `${process.env.NEXT_PUBLIC_DOMAIN}/api/orders/getById`,
    getByCusomerName: `${process.env.NEXT_PUBLIC_DOMAIN}/api/orders/getByName`,
  },
  auth: {
    reg: `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/register`,
    log: `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/login`,
  },
};
