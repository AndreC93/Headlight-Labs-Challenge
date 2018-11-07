/** Constants */

const ROWS = 20;
const COLS = 20;
const NODES_URL = 'http://headlight-tournament-1.herokuapp.com/nodes';
const BOTS_URL = 'http://headlight-tournament-1.herokuapp.com/bots';


/** State functions */

/**
 * All mineral nodes and bots, refreshed every second
 */
const state = {
  nodes: {},
  bots: {},
};

/**
 * Fetches all known information about mineral nodes, and updates
 * the state object with that node information
 */
async function refresh (str) {
  let result;
  let payload;

  if (str === 'node') {
    result = await axios.get(NODES_URL);
    payload = result.data['Nodes'];
  } else {
    result = await axios.get(BOTS_URL);
    payload = result.data['Bots'];
  }

  let newState = {};
  for (let i = 0; i < payload.length; i++) {
    let load = payload[i];
    if (!newState[load.Location.X]) {
      newState[load.Location.X] = {};
    }
    if (!newState[load.Location.X][load.Location.Y]) newState[load.Location.X][load.Location.Y] = [];
    newState[load.Location.X][load.Location.Y].push(load);
  }
  if (str === 'node') {
    state.nodes = newState;
  } else {
    state.bots = newState;
  }
}

/** Display functions */

/**
 * Determines the appropriate color for this grid cell,
 * based on whether a node, bot, both, or neither is located
 * within this grid cell
 */
function colorClass (x, y) {
  let nodes = state.nodes;
  let bots = state.bots;

  let nodePresent = nodes[x] && nodes[x][y];
  let botPresent = bots[x] && bots[x][y];

  if (!nodePresent && !botPresent) { // Empty
    return 'white';
  } else if (nodePresent && botPresent) {
    return 'purple';
  } else if (nodePresent) {
    return 'blue';
  } else {
    return 'red';
  }

}


/** App functions */

/**
 * Draws all the cells to the DOM. Adds an appropriate color class depending on whether this grid cell
 * contains a mineral node, a bot, or both.
 */
function paint () {
  const grid = document.getElementById("grid");
  grid.innerHTML = '';

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add(colorClass(i, j));
      if (state.nodes[i] && state.nodes[i][j]) {
        const len = state.nodes[i][j].length;
        if (len > 1) {
          cell.classList.add('multiNode');
          cell.innerText = state.nodes[i][j].length;
        }
      }
      grid.appendChild(cell);
    }
  }
}

/**
 * Main run loop. Every 1s, fetch nodes and bots and re-paint everything.
 */
function start () {
  setInterval(() => {
    refresh('node');
    refresh('bot');
    paint();
  }, 1000)
}


/**
 * Kicks off the run loop once the DOM loads.
 */
document.addEventListener('DOMContentLoaded', () => {
  paint();
  start();
})
