import { uniqueId } from "lodash";
import Wormhole from "./wormholes";
import Ship from "./ships";
import { MWD, AB, ZPME } from "./modules";
import AppStore from "./app";
import GuiState from "./gui";

const wormholes = [
  new Wormhole("default", "L477", 2000000000),
  new Wormhole(uniqueId("wh_"), "B520", 5000000000),
  new Wormhole(uniqueId("wh_"), "D792", 3000000000),
  new Wormhole(uniqueId("wh_"), "C140", 3000000000),
  new Wormhole(uniqueId("wh_"), "C391", 5000000000),
  new Wormhole(uniqueId("wh_"), "C248", 5000000000),
  new Wormhole(uniqueId("wh_"), "Z142", 3000000000)
];

const ships = [
  new Ship("default", "Megathron", 196800000, [
    new MWD(uniqueId("mod_"), "500MN Mwd", 50000000)
  ]),
  new Ship(uniqueId("ship_"), "Hic", 162000000, [
    new MWD(uniqueId("mod_"), "50MN Mwd", 5000000),
    new AB(uniqueId("mod_"), "100MN Ab", 50000000),
    new ZPME(uniqueId("mod_"), "ZPME", 80)
  ])
];

const appStore = new AppStore(wormholes, ships);
const guiStore = new GuiState();

export { appStore, guiStore };
