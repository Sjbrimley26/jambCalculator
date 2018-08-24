import {
  startCase,
  toLower
} from "lodash";

import {
  compose
} from "lodash/fp";

const titleCase = compose(
  startCase,
  toLower
);

module.exports = {
  titleCase
};

