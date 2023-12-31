import { marked } from "marked";
import { useDispatch, useSelector } from "react-redux";
import { add as addToCart, remove as removeFromCart } from "../redux/cartSlice";
import {
  add as addToWishlist,
  remove as removeFromWishlist,
} from "../redux/wishlistSlice";
import { RootState } from "../redux/store";
import { IProduct } from "../types/";
import Button from "./Button";
import { AddedtoCart, AddtoCart, Bookmark, Whatsapp } from "./icons";
import ImagesSlider from "./ImagesSlider";
import Head from "next/head";
import Navigation from "./Navigation";
import Pricing from "./Card/Pricing";

interface Props {
  product: IProduct;
  asPath: string;
}

const Product = ({ product, asPath }: Props) => {
  const cart = useSelector((state: RootState) => state.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.attributes.title,
    image: product.attributes.images?.data.map(img => `${process.env.NEXT_PUBLIC_HOST}${img.attributes.url}`),
    description: product.attributes.description || "",
    url: `${process.env.NEXT_PUBLIC_HOST}/product/${product.id}`,
    productID: product.id,
    mpn: product.attributes.model || "",
    brand: {
      "@type": "Brand",
      name: product.attributes.brand?.data?.attributes?.name || "",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "MAHcodes",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.4",
      reviewCount: "89",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      name: product.attributes.title,
      description: product.attributes.description || "",
      price: product.attributes.price,
      priceValidUntil: "2023-11-05",
      itemCondition: product.attributes.condition
        ?.toLowerCase()
        .startsWith("new")
        ? "http://schema.org/NewCondition"
        : "http://schema.org/UsedCondition",
      availability:
        product.attributes.availability! > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Canadian Souq",
      },
    },
  };

  const TITLE = `Canadian Souq | ${product.attributes.title}`;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="title" content={TITLE} />
        <meta name="description" content={product.attributes.description || ""} />
        <meta name="theme-color" content="#242424" />
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_HOST}/images/logo.svg`}
          type="image/x-icon"
        />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#242424" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOST}/product/${product.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:description" content={product.attributes.description || ""} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images${product.attributes.images?.data[0].attributes.url}`} />
        <meta property="og:site_name" content="Canadian Souq" />
        <meta
          name="twitter:description"
          content={product.attributes.description || ""}
        />
        <meta
          name="twitter:image"
          content={product.attributes.images?.data[0].attributes.url}
        />
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd),
          }}
        />
      </Head>

      <div className="container grid lg:grid-cols-productSliderAndInfo gap-x-6 overflow-x-hidden">
        <Navigation />
        <ImagesSlider
          images={product.attributes.images!}
          alt={product.attributes.title!}
        />
        <div className="flex-1 w-full mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{product.attributes.title}</h1>
            <Pricing
              cost={product.attributes?.cost}
              price={product.attributes.price}
            />
          </div>
          <div className="flex items-stretch gap-2 my-4">
            <a
              href={`https://wa.me/+96181921320/?text=Hello,%20I%20saw%20this...%20${process.env.NEXT_PUBLIC_HOST || ""
                }${asPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                size="lg"
                className="w-full group"
                icon={<Whatsapp fill="rgb(230 230 230)" />}
              >
                Order Now
              </Button>
            </a>
            {cart.some((item) => item.prod.id === product.id) ? (
              <Button
                variant="secondary"
                title="Remove item from Cart"
                size="lg"
                onClick={() => dispatch(removeFromCart(product.id))}
                icon={<AddedtoCart />}
              />
            ) : (
              <Button
                variant="secondary"
                title="Add item to Cart"
                size="lg"
                onClick={() => dispatch(addToCart(product))}
                icon={<AddtoCart />}
              />
            )}
            {wishlist.some((item) => item.id === product.id) ? (
              <Button
                variant="secondary"
                title="Remove item from Wishlist"
                size="lg"
                onClick={() => dispatch(removeFromWishlist(product.id))}
                icon={<Bookmark clr="fill-black" />}
              />
            ) : (
              <Button
                variant="secondary"
                title="Add item to Wishlist"
                size="lg"
                onClick={() => dispatch(addToWishlist(product))}
                icon={<Bookmark />}
              />
            )}
          </div>
          <div className="grid grid-cols-productInfo gap-x-6 gap-y-4">
            <Info
              title="Availability"
              text={
                product.attributes.availability! > 0
                  ? "In Stock"
                  : "Out of Stock"
              }
              className={`${product.attributes.availability! > 0
                  ? "text-success"
                  : "text-danger"
                } font-bold`}
            />
            {product.attributes.brand?.data?.attributes?.name ? (
              <Info
                title="Brand"
                text={product.attributes.brand.data.attributes.name}
              />
            ) : null}
            {product.attributes.model ? (
              <Info title="Model" text={product.attributes.model} />
            ) : null}
            <Info title="Condition" text={product.attributes.condition!} />
            {product.attributes.description ? (
              <Info title="Description" className="col-span-2">
                <div
                  className="col-span-2"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(product.attributes.description || ""),
                  }}
                />
              </Info>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

interface InfoProps {
  title: string;
  text?: string;
  className?: string;
  children?: JSX.Element;
}

const Info = ({ title, text, className, children }: InfoProps) => (
  <>
    <h4 className="text-gray font-bold text-base">{title}:</h4>
    {text && <h2 className={`${className} text-lg`}>{text}</h2>}
    {children}
  </>
);

export default Product;
