# 💡 Challenges

## Enc-and-Mac
> Try to prove Enc-and-Mac is IND-CPA (which it is NOT).  
> Try to understand why proof fails in CryptoVerif.

<details>
  <summary>❓ Don´t know how to proceed? Click here.</summary>
  
The input file is almost the same as _enc-then-MAC-IND-CPA.ocv_ discussed in the first proof.  
For this task you need to rewrite the defintion of _full\_enc_ to match Enc-and-Mac instead of Enc-then-Mac.
</details>

> collapsible solution containing  
> 1. rewritten definition of Enc-and-Mac (should be super easy that students understand themselves)  
> 2. explanation what the problem is (cannot merge branches in Game 7)

<details>
  <summary>Click here to show solution.</summary>
  
Insert solution here
</details>

> Emphasize that CryptoVerif **cannot** prove insecurity of protocols.


## Enc-then-Mac IND-CCA2
> Prove Enc-then-Mac is IND-CCA2

> Solution:  
> 1. Add _full\_dec()_  
> 2. Add Dec oracle  
> 3. modify Enc and Dec oracle to exclude trivial attack (using table of ciphertexts)  
> 4. run oracles simultaneous


