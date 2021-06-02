import { Map, Marker, ZoomControl } from "pigeon-maps";

export function AMap({ locations }) {
  let { lat, lng } = locations[0];
  return (
    <Map
      height={"100%"}
      width={"100%"}
      defaultCenter={[lat, lng]}
      defaultZoom={7}
    >
      <ZoomControl />
      {locations.map((location) => {
        return (
          <Marker
            color="blueviolet"
            width={50}
            anchor={[location.lat, location.lng]}
            key={Math.random()}
          />
        );
      })}
    </Map>
  );
}
export default AMap;
