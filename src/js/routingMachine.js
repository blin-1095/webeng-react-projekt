import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

/**
 * Calculates route between given coordinates
 * @param {*} props Coordinates of the starting and ending points of the route
 * @returns {L.Routing.Control} instance of the routing machine
 */
const createRoutingMachineLayer = (props) => {

  const { waypoints } = props;
  const instance = L.Routing.control({
    waypoints,
    lineOptions: {
      styles: [{ color: "#7EFF03", weight: 4 }]
    },
    addWaypoints: false,
    routeWhileDragging: true,
    routeDragInterval: 500,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
    collapsible: true,
    router: new L.Routing.osrmv1({
      language: 'de',
      profile: 'car'
    }),
    plan: new L.Routing.plan(waypoints, {
      createMarker: () =>  { return null; }
    })
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);


export default RoutingMachine;