import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

  const faucet = await stdlib.getFaucet();
  const balBn = await stdlib.balanceOf(faucet);

  const addr = stdlib.formatAddress(faucet);
  const bal = stdlib.formatCurrency(balBn);
  console.log(`${addr} has ${bal} ${stdlib.standardUnit}`);

  stdlib.assert(stdlib.gt(balBn, 0), `Faucet has funds`);
