import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutingMachineLayer = (ownPosition, position) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(ownPosition),
      L.latLng(position)
    ],
    lineOptions: {
      styles: [{ color: "#7EFF03", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

//const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export function RoutingMachine({ownPosition, position}) {

  const instance = createControlComponent(createRoutingMachineLayer(ownPosition, position));
  console.log("instance");
  return instance;
}

export default RoutingMachine;