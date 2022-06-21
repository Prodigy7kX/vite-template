import { Helmet } from 'react-helmet-async';

import { title as appTitle, defaultMetaTags } from '@/config';

type MetaProps = {
  description?: string;
  meta?: Array<{ name: string; content: string }>;
  title?: string;
  image?: string;
  appendAppTitle?: boolean;
  children?: React.ReactNode;
};

const Meta: React.FC<MetaProps> = ({
  description = defaultMetaTags.description,
  meta = [],
  title = appTitle,
  appendAppTitle = false,
  image = defaultMetaTags.image,
}) => {
  return (
    <Helmet
      title={appendAppTitle ? `${appTitle} | ${title}` : title}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: image,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ].concat(meta)}
    />
  );
};

export default Meta;
