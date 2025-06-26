import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";


const MPL_CORE_PROGRAM_ID = new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");

const keypair = Keypair.fromSecretKey(new Uint8Array(bs58.decode(wallet)));
const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("snehendu098", "utf8");
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

const program: Program<Turbin3Prereq> = new Program(IDL, provider);

const account_seeds = [Buffer.from("prereqs"), keypair.publicKey.toBuffer()];
const [account_key, _account_bump] =
PublicKey.findProgramAddressSync(account_seeds, program.programId);

const mintCollection = new PublicKey("5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2");
const mintTs = Keypair.generate();

// (async () => {
//   try {
//     const txHash = await program.methods.initialize("snehendu098").accountsPartial({
//       user: keypair.publicKey,
//       account: account_key,
//       system_program: SYSTEM_PROGRAM_ID
//     }).signers([keypair]).rpc();

//     console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
//   } catch (err) {
//     console.error(`Oops, something went wrong: ${err}`);
//   }
// })();

(async () => {
  try {
    const txHash = await program.methods.submitTs().accountsPartial({
      user: keypair.publicKey,
      account: account_key,
      collection: mintCollection,
      mint: mintTs.publicKey,
      system_program: SYSTEM_PROGRAM_ID,
      mpl_core_program: MPL_CORE_PROGRAM_ID
    }).signers([keypair, mintTs]).rpc();

    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txHash}?cluster=devnet`);

  } catch (err) {
    console.error(`Oops, something went wrong: ${err}`);
  }
})()