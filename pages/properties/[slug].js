import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Icons,
  Image,
  Carousel,
} from "grommet";
import { getClient, urlFor, PortableText, sanityClient } from "../../sanity";
import AMap from "../../components/AMap";
import StarRating from "../../components/StarRating";
import { avgRate, isPlural } from "../../helpers";

export default function Property({ property: p }) {
  const router = useRouter();

  let rate = avgRate(p.reviews);

  return (
    <>
      <Box align="center">
        <Card height="xlarge" width="xlarge" fill background="light-1">
          <CardHeader pad="large">
            <h1>
              {p.name} <StarRating value={rate} />
            </h1>

            <h2>
              {p.propertyType} hosted by {p.host?.name}
            </h2>
          </CardHeader>
          <CardBody pad="large" justify="between" height="xlarge">
            <Box direction="row" justify="between" margin="small">
              <h3>${p.price} per night</h3>
              <h3>
                {p.beds} bed{isPlural(p.beds)}
              </h3>
              <h4>{p.reviews.length} review</h4>
            </Box>
            <p>{p.description} </p>
            <Box fill margin="small">
              <Image width="medium" src={urlFor(p.mainImage).url()} />
            </Box>
          </CardBody>
        </Card>
        <Box fill margin="small">
          <Carousel fill play={3000}>
            {p.images.map((image) => (
              <Card
                width="100%"
                height="medium"
                pad="small"
                justifySelf="center"
                alignSelf="center"
                background="light-1"
                key={image._key}
              >
                <Image fit="cover" src={urlFor(image.asset).url()} />
                <p>{image.caption}</p>
              </Card>
            ))}
          </Carousel>
        </Box>
        <Box height="medium" width="90%">
          <AMap {...p.location} />
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  let pageSlug = pageContext.query.slug;

  const propertyQuery = `*[_type == "property" && slug.current == $pageSlug][0] {
    name,
    propertyType,
    description,
    mainImage,
    location,
    beds,
    price,
    beds,
    images[]{
      caption,
      asset,
      _key
    },
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      rate,
      reviewDescription,
      traveller->{
      _id,
      name,
      slug,
      image
      },
    },
  }`;
  const property = await sanityClient.fetch(propertyQuery, { pageSlug });

  return { props: { property } };
};
