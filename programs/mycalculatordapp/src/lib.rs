use anchor_lang::prelude::*;

declare_id!("BUxppb9GKCpTdVfvLmWHB8N23chsFNT1cApcMikPAHES");

#[program]
pub mod mycalculatordapp {
    use super::*;

    pub fn create(ctx : Context<Create>,init_message : String)-> Result<()>{

        let calculator =& mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    pub fn add(ctx: Context<Addition>, num1 : i64, num2 : i64)-> Result<()>{

        //retrive the calculator account
        let calculator = & mut ctx.accounts.calculator;

       //set result of calculator account 
       calculator.result = num1 + num2;
       Ok(())
    }

    pub fn sub(ctx:Context<Subtraction>,num1 : i64 , num2 : i64)-> Result<()>{


        //retrive the calculator account
        let calculator = & mut ctx.accounts.calculator;

       //set result of calculator account 
       
       if num1 > num2{
        calculator.result = num1- num2 ;
       }
       else{
        calculator.result = num2 - num1;
       }

       Ok(())

    }


    pub fn mul(ctx:Context<Multiplication>,num1:i64,num2:i64)-> Result<()>{

        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 * num2 ;
        Ok(())
    }


    pub fn div(ctx:Context<Division>,num1:i64,num2:i64)-> Result<()>{

        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1/num2 ;
        calculator.remainder = num1 % num2;
        Ok(())
    }

   
}


#[derive(Accounts)]
pub struct Create<'info>{
    #[account(init,payer = user, space = 264)]
    pub calculator : Account<'info,Calculator>,

    #[account(mut)]
    pub user : Signer<'info>,
    pub system_program : Program<'info,System>,
}

#[derive(Accounts)]
pub struct Addition<'info>{

    #[account(mut)]
   pub calculator : Account<'info,Calculator>,
}


#[derive(Accounts)]
pub struct Subtraction<'info>{

    #[account(mut)]
    pub calculator : Account<'info,Calculator>,
}

#[derive(Accounts)]
pub struct Multiplication<'info>{

    #[account(mut)]
   pub calculator : Account<'info,Calculator>,
}


#[derive(Accounts)]
pub struct Division<'info>{

    #[account(mut)]
   pub calculator : Account<'info,Calculator>,
}

#[account]
pub struct Calculator{
    pub greeting : String,
    pub result : i64,
    pub remainder : i64
}


