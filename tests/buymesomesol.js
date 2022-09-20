const anchor = require("@project-serum/anchor");
const { PublicKey } = require('@solana/web3.js');
const { assert } = require("console");
const chai = require('chai');
const expect = chai.expect;

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
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 Creator List :', account.creatorList[0].username);
    expect(account.creatorList[0].username.toString()).to.equal("apraX568");
    expect(account.creatorList[0].name.toString() == "Apratim Mehta");
    console.log("create account transaction signature", tx);
  });

  it("It can create supporter account", async () => {
    const program = anchor.workspace.Buymesomesol;
    const tx = await program.rpc.createSupporter("Apratim Mehta", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      }
    });
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    expect(account.supporterList[0].name.toString()).to.equal("Apratim Mehta");
    console.log("create supporter transaction signature", tx);
  });

  it("can add a message", async () => {
    const program = anchor.workspace.Buymesomesol;
    const creatorPubkey = new PublicKey('69e2mCepiCTdZfjedvWnZfunwhYFc1qo2Tmf1CTpNoQJ')
    const tx = await program.rpc.addMessage(creatorPubkey, "Nice Work 👍", "1.1",{
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      }
    });
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    expect(account.messages[0].message.toString()).to.equal("Nice Work 👍");
    console.log("create message transaction signature", tx);
  });

});
