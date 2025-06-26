import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

import wallet from "./Turbin3-wallet.json";

console.log(bs58.decode(wallet).toJSON());
