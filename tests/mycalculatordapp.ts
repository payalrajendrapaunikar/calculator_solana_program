import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Mycalculatordapp } from '../target/types/mycalculatordapp';
import { assert} from 'chai';
import { describe } from 'mocha';



describe('create the calcaulator',async()=> {


    //configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider);


     console.log('the provider wallet public key : \n',provider.wallet.publicKey.toString());
     console.log('the provider balance before creating account is : ');

   

     //Add your test here .
     const calculatorAccount = anchor.web3.Keypair.generate();

      console.log('the user generate public key : \n ',calculatorAccount.publicKey.toString());
      console.log('the generated secret key : \n',calculatorAccount.secretKey);

    const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;

    //console.log('the program is : \n', program);

    it('Is create calculator', async() => {

       

         const balanceOfWalletBeforeCreationAccount = await provider.connection.getBalance(provider.publicKey);

         console.log('the balnce before creation of calculator account is : ',balanceOfWalletBeforeCreationAccount);
       
       const tx = await program.methods.create('Welcome to solana calculator').accounts({
        calculator : calculatorAccount.publicKey,
        user : provider.wallet.publicKey,
        
       }).signers([calculatorAccount]).rpc();


       console.log('your transaction signature',tx);

       const balanceOfWalletAfterCreationAccount = await provider.connection.getBalance(provider.publicKey);

       console.log('the balnce after creation of calculator account is : ',balanceOfWalletAfterCreationAccount);

       const account = await program.account.calculator.fetch(calculatorAccount.publicKey);
       assert.ok(account.greeting == 'Welcome to solana calculator');

    });



   


  it('add two number', async()=> {

    await program.methods.add(
      new anchor.BN(4) ,new anchor.BN(6)
    ).accounts({

      calculator : calculatorAccount.publicKey

    }).rpc();


    const getCalculatorAccount = await program.account.calculator.fetch(calculatorAccount.publicKey);

    assert.ok(getCalculatorAccount.result.eq(new anchor.BN(10)))

  });


  it('sub two number',async()=> {

    await program.methods.sub(new anchor.BN(3), new anchor.BN(5)).accounts({
      
      calculator : calculatorAccount.publicKey,
    }).rpc();

    const getCalculatorAccount = await program.account.calculator.fetch(calculatorAccount.publicKey);
    assert.ok(getCalculatorAccount.result.eq(new anchor.BN(2)));

  });


  it('mul two number',async()=> {

    await program.methods.mul(new anchor.BN(3), new anchor.BN(5)).accounts({
      
      calculator : calculatorAccount.publicKey,
    }).rpc();

    const getCalculatorAccount = await program.account.calculator.fetch(calculatorAccount.publicKey);
    assert.ok(getCalculatorAccount.result.eq(new anchor.BN(15)));

  });


  it('div two number',async()=> {

    await program.methods.div(new anchor.BN(3), new anchor.BN(5)).accounts({
      
      calculator : calculatorAccount.publicKey,
    }).rpc();

    const getCalculatorAccount = await program.account.calculator.fetch(calculatorAccount.publicKey);
    assert.ok(getCalculatorAccount.result.eq(new anchor.BN(0)));
    assert.ok(getCalculatorAccount.remainder.eq(new anchor.BN(3)))

  })
 


});