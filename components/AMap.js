import { Map, Marker } from "pigeon-maps";

export function AMap(location) {
  let { lat, lng } = location;
  return (
    <Map height={"100%"} defaultCenter={[lat, lng]} defaultZoom={11}>
      <Marker width={50} anchor={[lat, lng]} />
    </Map>
  );
}
export default AMap;
