export const title = 'React PWA';

export const email = 'gbos360@hotmail.com';

export const messages = {
  app: {
    crash: {
      title: 'Oooops... Sorry, I guess, something went wrong. You can:',
      options: {
        email: `contact with author by this email - ${email}`,
        reset: 'Press here to reset the application',
      },
    },
  },
  loader: {
    fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
  },
  images: {
    failed: 'something went wrong during image loading :(',
  },
  404: 'Hey bro? What are you looking for?',
};

export const defaultLoaderOptions = {
  delay: 300,
  minimumLoading: 700,
};

export const defaultMetaTags = {
  image: '/cover.png',
  description: 'Starter kit for modern web applications',
};
