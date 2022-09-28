# 💡 Challenges

## Enc-and-Mac
> Try to prove Enc-and-Mac is IND-CPA (which it is NOT).  
> Try to understand why proof fails in CryptoVerif.

<a href="https://en.wikipedia.org/wiki/Authenticated_encryption#Encrypt-and-MAC_(E&M)" target="_blank">Enc-and-Mac</a>


<img style="float:right" src="img/EncAndMac.png">

The Enc-and-Mac construction works as follows.

1. Encrypt the plaintext resulting in a ciphertext.
2. Compute the Mac over the plaintext.
3. Concatenate the ciphertext and this Mac.

You can see a visualization of this construction on the right-hand side.

<details>
  <summary>❓ Don´t know how to proceed? Click here.</summary>
  
The input file is almost the same as _enc-then-MAC-IND-CPA.ocv_ discussed in the first proof.  
For this task you need to rewrite the defintion of _full\_enc_ to match Enc-and-Mac instead of Enc-then-Mac.
</details>

> **Solution**:  
> 1. rewritten definition of Enc-and-Mac (should be super easy that students understand themselves)  
> 2. explanation what the problem is (cannot merge branches in Game 7)

<details>
  <summary>Click here to show solution.</summary>
  
Insert solution here
</details>

> Emphasize that CryptoVerif **cannot** prove insecurity of protocols.


## Enc-then-Mac IND-CCA2
<!--- Links to IND-CPA, IND-CCA2,... --->
> Prove Enc-then-Mac is IND-CCA2

<a href="https://en.wikipedia.org/wiki/Ciphertext_indistinguishability#Indistinguishability_under_chosen_ciphertext_attack/adaptive_chosen_ciphertext_attack_(IND-CCA1,_IND-CCA2)" target="_blank">IND-CCA2</a>

> **Hints**:  
> 1.1 consider the differences between IND-CPA and IND-CCA2  
> 1.2 told CryptoVerif how Enc-then-Mac is decrypted?  
> 1.3 added oracle for decryption?  
> 1.4 remember that if branches cannot be merged  
> 2.1 Remember to exclude trivial win  
> 2.2 tables syntax:

```
table tbl_name(type_to_store).
insert tbl_name(obj_to_insert);
get tbl_name(=obj_to_search) in do_true else do_false
```
	
> 3 run oracles simultaneous:

```
(run Oracle1(a,b) | run Oracle2(c,d,e))
```
	

> **Solution**:  
> 1. Add _full\_dec()_  
> 2. Add Dec oracle  
> 3. modify Enc and Dec oracle to exclude trivial win (using table of ciphertexts)  
> 4. run oracles simultaneous


