# 💡 Challenges

## Enc-and-MAC

In the first challenge, we will consider the
<a href="https://en.wikipedia.org/wiki/Authenticated_encryption#Encrypt-and-MAC_(E&M)" target="_blank">Enc-and-MAC</a>
construction. The assumptions on the cryptographic primitives are the same as in the chapter **First Proof**. The symmetric encryption is IND-CPA secure and the MAC is SUF-CMA secure.

**Try** to prove that Enc-and-MAC is IND-CPA secure using CryptoVerif. As you may already know, that **cannot be proven** as attacks exist.  
In this challenge, you should inspect CryptoVerif’s output and understand why the sequence of games failed.  
Note that CryptoVerif **cannot find attacks**. However, you should use CryptoVerif’s output to derive a concrete attack on the Enc-and-MAC construction.

<img style="float:right" src="img/EncAndMac.png">

The Enc-and-MAC construction works as follows.

1. Encrypt the plaintext, resulting in a ciphertext.
2. Compute the MAC over the plaintext.
3. Concatenate the ciphertext and this MAC.

You can see a visualization of this construction on the right-hand side.

<details>
  <summary><b>❓ Don’t know how to proceed? Click here.</b></summary>

> The input file is almost the same as _enc-then-MAC-IND-CPA.ocv_ discussed in the chapter **First Proof**.  
> For this task, you need to **rewrite the definition ** of _full\_enc_ to match Enc-and-MAC instead of Enc-then-MAC.
</details>

<br/>

<details>
  <summary><b>Show solution</b></summary>
  
>  <details>
>    <summary><b>Solution: Definition Enc-and-MAC</b></summary>
>    
> To rewrite the definition of the Enc-then-MAC encryption to the Enc-and-MAC encryption, you need to change what the MAC will be computed over. For Enc-and-MAC, we compute the MAC over the plaintext _m_. 
>
>  ![Could not load image.](img/Challenge_Fail_EncAndMac.png)
>  </details>
>  <details>
>    <summary><b>Explanation: How the proof fails</b></summary>
>    
> In the IND-CPA proof for Enc-then-MAC presented in the chapter **First Proof**, we saw that CryptoVerif was able to merge the branches depending on the value of _b_. This was possible as the expressions were semantically the same in both branches.  
> For the Enc-and-MAC construction, this is not possible. When you have a look at the highlighted parts in the CryptoVerif output below, you will see that in the upper branch, the MAC is computed over the plaintext _m1_ and in the lower branch over the plaintext _m2_. This prevents merging those branches. At this point, CryptoVerif does not find another way to prove the secrecy of _b_.
> ![Could not load image.](img/Challenge_Fail_G7Results.png)
>  </details>
>  <details>
>    <summary><b>Solution: Derive attack on Enc-and-MAC</b></summary>
> Now we want to use the output of the failed CryptoVerif proof to derive an attack against the Enc-and-MAC construction.  
> As shown before, the proof failed because the branches of the if statement could not be merged. This was because the MACs were computed over the different plaintexts m1 and m2. When we try to derive an attack against the Enc-and-MAC construction, we will start at this part.  
>
> Our goal is to show that the Enc-and-MAC construction is not necessarily IND-CPA secure when the encryption scheme is assumed to be IND-CPA secure and the MAC is considered SUF-CMA secure. We know that the fact that the MAC is computed over the plaintext instead of the ciphertext is probably connected to the reason why the proof fails.  
> As we want to derive an attack against the IND-CPA security, we aim for revealing any information about the plaintext. The most simple way of doing so is by revealing the whole plaintext. Combine this with the fact that SUF-CMA security of a MAC does not make any statements about confidentiality. You can define a MAC named _MAC_ using a SUF-CMA secure MAC named _MAC'_ as follows.
>
> ![Could not load image.](img/Challenge_Fail_MAC_prime.png)
>
> It is easy to prove that the newly constructed MAC is still SUF-CMA secure. For further information, you can have a look at 
<a href="https://link.springer.com/content/pdf/10.1007/3-540-44647-8_19.pdf" target="_blank">Krawczyk's work (Chapter 4)</a>.
> Instantiating the Enc-and-MAC construction with the newly constructed MAC, it is quite obvious that it cannot be IND-CPA secure. The message encrypted is always appended to the MAC and is directly revealed in the Enc-and-MAC ciphertext. This way, the adversary can say which plaintext has been encrypted with probability one.
> 
> 💡 Feel free to experiment with CryptoVerif if you want to. For example, you can use CryptoVerif to prove that the newly constructed MAC revealing the message is still SUF-CMA secure.
>  </details>
</details>


## Enc-then-MAC IND-CCA2

In the second challenge, we will consider the
<a href="https://en.wikipedia.org/wiki/Authenticated_encryption#Encrypt-and-MAC_(E&M)" target="_blank">Enc-then-MAC</a>
construction again. The assumptions on the cryptographic primitives are the same as in the chapter **First Proof**. The symmetric encryption is IND-CPA secure and the MAC is SUF-CMA secure.  
Your goal is to prove that Enc-then-MAC is then
<a href="https://en.wikipedia.org/wiki/Ciphertext_indistinguishability#Indistinguishability_under_chosen_ciphertext_attack/adaptive_chosen_ciphertext_attack_(IND-CCA1,_IND-CCA2)" target="_blank">IND-CCA2</a>
secure using CryptoVerif.


You can orientate yourself on the input file
<a href="https://bblanche.gitlabpages.inria.fr/CryptoVerif/tutorial/enc-then-MAC-IND-CPA.ocv" target="_blank">_enc-then-MAC-IND-CPA.ocv_</a>
presented in the chapter **First Proof**. You may require to have a look at hints 4 and 5 as they contain CryptoVerif syntax not captured in this tutorial beforehand.

<!--- Hints IND-CCA2 --->
<details>
  <summary><b>❓ Need any hints? Click here.</b></summary>
  
>  <details>
>    <summary><b>💡 Hint 1</b></summary>
>    
> Consider the **differences** between the **IND-CPA** game and the **IND-CCA2** game. What is new?
>  </details>
>  
>  <details>
>    <summary><b>💡 Hint 2</b></summary>
>    
> The IND-CCA2 game requires a decryption oracle.  
> Did you tell CryptoVerif how the **Enc-then-MAC decryption** looks like?
>>  <details>
>>    <summary><b>Solution: Decryption Enc-then-MAC</b></summary>
>>    
>>  ![Could not load image.](img/Challenge_CCA2_EncThenMac_Decryption.png)
>>  </details>
>  </details>
>  
>  <details>
>    <summary><b>💡 Hint 3</b></summary>
>    
> The IND-CCA2 game requires a decryption oracle.  
> Did you add the **decryption oracle**? You can orientate yourself on the encryption oracle presented in the chapter **First Proof**.  
> Note that you should not implement the decryption oracle as a left-or-right oracle.
>  </details>
>  
>  <details>
>    <summary><b>💡 Hint 4</b></summary>
>    
> Did you remember to **exclude** how any adversary can **trivially win** the IND-CCA2 game?  
> You may use tables in CryptoVerif to do so. Check the syntax of tables in CryptoVerif below.
>>  <details>
>>    <summary><b>CryptoVerif Syntax: Tables</b></summary>
>>    
>>  ![Could not load image.](img/Challenge_CCA2_TablesSyntax.png)
>>  </details>
>  </details>
>  
>  <details>
>    <summary><b>💡 Hint 5</b></summary>
>    
> In the IND-CCA2 game, the adversary can access the encryption oracle and the decryption oracle. The adversary can choose the order he makes requests to the oracles, but in CryptoVerif only one oracle can be called at a time.  
> Check the syntax of parallel composition of oracles in CryptoVerif below.
>>  <details>
>>    <summary><b>CryptoVerif Syntax: Parallel composition of oracles</b></summary>
>>    
>>  ![Could not load image.](img/Challenge_CCA2_ParallelCompSyntax.png)
>>  </details>
>  </details>

</details>

<br/>

<!--- Solution IND-CCA2 --->
<details>
  <summary><b>Show solution</b></summary>
  
>  <details>
>    <summary><b>Solution: Decryption Enc-then-MAC</b></summary>
>
>  ![Could not load image.](img/Challenge_CCA2_EncThenMac_Decryption.png)
>
> The Enc-then-MAC decryption function _full\_dec_ has three parameters. It requires the ciphertext _c_ of type _bitstring_, the encryption key _k_ of type _key_, and the MAC key _mk_ of type _mkey_.  
> First, it separates the ciphertext _c_ of the Enc-then-MAC encryption back to the “regular” ciphertext _c1_ and the MAC _mac1_. If the ciphertext _c_ was of incorrect format and therefore could not be split into _c1_ and _mac1_, the function returns bottom.  
> Then, it is checked whether the MAC _mac1_ is valid. This is done by calling the verification function _verify_, providing the ciphertext _c1_, the MAC key _mk_, and the MAC _mac1_ as parameters. If the verification succeeds, the decryption of the ciphertext _c1_ under the decryption key (same as the encryption key) _k_ is returned. If the verification fails, the function returns bottom.
>  </details>
>
>  <details>
>    <summary><b>Solution: Enc and Dec oracle (exclude trivial win)</b></summary>
>    
>  ![Could not load image.](img/Challenge_CCA2_Oracles.png)
>
> The encryption oracle _QencLR_ is almost the same as in the IND-CPA proof presented in the chapter **First Proof**. As we need to give an adversary access to a decryption oracle, we require preventing that an adversary can win the IND-CCA2 game trivially. That is, excluding that an adversary can send a ciphertext produced by the encryption oracle directly to the decryption oracle.  
> We do this by keeping track of the outputted  ciphertexts in a table. First, we create a table called _ciphertexts_, which can contain elements of the type _bitstring_. Inside the oracle _Oenc_ we will insert the generated ciphertext _c0_ into the table.
>
> The decryption oracle _Qdec_ has two parameters. It requires the encryption key _k_ of type _key_ and the MAC key _mk_ of type _mkey_. Similar to the encryption oracle, we use oracle replication for the decryption oracle as well. The oracle _Odec_ takes a ciphertext _c_ as input. Note that the decryption oracle is not a left-or-right oracle, so we do not have inputs like _c1_ and _c2_. We check if the ciphertext _c_, queried by the adversary, is inside the table _ciphertexts_ and has thereby been outputted  by the encryption oracle earlier. If this is the case, the function returns bottom. Otherwise, the Enc-then-MAC decryption is returned.
>
> The parameters _qEnc_ and _qDec_ used for the oracle replication are declared at the top of the input file.  
>  ![Could not load image.](img/Challenge_CCA2_Params.png)
>  </details>
>
>  <details>
>    <summary><b>Solution: Initial Game</b></summary>
>    
>  ![Could not load image.](img/Challenge_CCA2_InitialGame.png)
>
> The initial game is almost the same as the initial game for the IND-CPA game presented in the chapter **First Proof**. The only difference is that the adversary has access to a decryption oracle additionally. We achieve this by running both oracles in parallel composition (check Hint 5).
>  </details>
</details>

<br/>

Take a look at the last game and convince yourself that the secrecy of _b_ can be proven in Game 14.

<details>
  <summary><b>Show last game</b></summary>

![Could not load image.](img/Challenge_CCA2_G14.png)
</details>