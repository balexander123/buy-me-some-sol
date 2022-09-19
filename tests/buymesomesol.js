const anchor = require("@project-serum/anchor");
const { PublicKey } = require('@solana/web3.js');

describe("buymesomesol", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const baseAccount = anchor.web3.Keypair.generate();
  const provider = anchor.AnchorProvider.env();
  const { SystemProgram } = anchor.web3; 

  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.Buymesomesol;
    const tx = await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log("initialize transaction signature", tx);
  });

  it("It can create creator account", async () => {
    const program = anchor.workspace.Buymesomesol;
    const tx = await program.rpc.createCreator("apraX568","Apratim Mehta",{
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      }
    });
    console.log("create account transaction signature", tx);
  });
});
