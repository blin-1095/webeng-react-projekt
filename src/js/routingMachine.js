import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutingMachineLayer = (props) => {

  const { waypoints } = props;
  const instance = L.Routing.control({
    waypoints,
    lineOptions: {
      styles: [{ color: "#7EFF03", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
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