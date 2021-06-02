import { sanityClient, urlFor } from "../sanity";
import { groq } from "next-sanity";
import AHomeMap from "../components/AHomeMap";
import StarRating from "../components/StarRating";
import { avgRate } from "../helpers";
import Link from "next/link";
import {
  Grommet,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image as GrImage,
} from "grommet";
import {
  Home as HomeIcone,
  FormNext,
  Notification,
  ChatOption,
} from "grommet-icons";

export default function Home({ properties }) {
  let locations = properties.map((p) => p.location);
  return (
    <Grommet plain>
      <Box wrap margin="small" direction="row">
        {properties && (
          <Box wrap width="large" flex="grow" direction="row">
            {properties.map((p) => {
              let rate = p.reviews ? avgRate(p.reviews) : 0;
              return (
                <Card
                  width="300px"
                  margin="small"
                  background="light-1"
                  key={p._id}
                >
                  <CardBody pad="medium">
                    <Box>
                      <GrImage fit="cover" src={urlFor(p.mainImage).url()} />
                      <p>{p.name}</p>
                    </Box>
                  </CardBody>
                  <CardFooter
                    pad={{ horizontal: "small" }}
                    background="light-2"
                  >
                    <p>
                      ${p.price} / beds: {p.beds}
                    </p>
                    <>
                      <StarRating value={rate} />
                    </>

                    <Link href={`properties/${p.slug.current}`}>
                      <Button primary>
                        <FormNext color="white" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </Box>
        )}
        <Box direction="row" width="300px" height="300px" margin="small">
          <AHomeMap locations={locations} />
        </Box>
      </Box>
    </Grommet>
  );
}

export const getServerSideProps = async () => {
  const propertyQuery = '*[_type == "property"]';
  const properties = await sanityClient.fetch(propertyQuery);

  return { props: { properties } };
};
