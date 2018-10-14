import { uniqueId } from "lodash";
import Wormhole from "./wormholes";
import Ship from "./ships";
import { MWD, AB, ZPME } from "./modules";
import AppStore from "./app";

const wormholes = [
  new Wormhole(uniqueId("wh_"), "L477", 2000000000),
  new Wormhole(uniqueId("wh_"), "B520", 5000000000),
  new Wormhole(uniqueId("wh_"), "D792", 3000000000),
  new Wormhole(uniqueId("wh_"), "C140", 3000000000),
  new Wormhole(uniqueId("wh_"), "C391", 5000000000),
  new Wormhole(uniqueId("wh_"), "C248", 5000000000),
  new Wormhole(uniqueId("wh_"), "Z142", 3000000000)
];

const ships = [
  new Ship(uniqueId("ship_"), "Megathron", 1968000, [
    new MWD(uniqueId("mod_"), "500MN Mwd", 50000000)
  ]),
  new Ship(uniqueId("ship_"), "Hic", 1620000, [
    new MWD(uniqueId("mod_"), "50MN Mwd", 5000000),
    new AB(uniqueId("mod_"), "100MN Ab", 50000000),
    new ZPME(uniqueId("mod_"), "ZPME", 80)
  ])
];

export default new AppStore(wormholes, ships);
