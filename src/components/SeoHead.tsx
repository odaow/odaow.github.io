import { Helmet } from "react-helmet-async";

type SeoHeadProps = {
  title: string;
  description: string;
  image?: string;
  url?: string;
};

const SeoHead = ({ title, description, image, url }: SeoHeadProps) => {
  const canonicalUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const previewImage =
    image ??
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImage} />
    </Helmet>
  );
};

export default SeoHead;

