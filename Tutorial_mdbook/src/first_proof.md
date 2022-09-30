# 📚 First Proof
<!---
TODO:
how parameters of oracles are defined
difference Oracle and Process
fun vs letfun
--->

In this chapter we will have a look at a first proof using CryptoVerif. You will be guided to gather an understanding of how to work with CryptoVerif.  

We will consider the 
<a href="https://en.wikipedia.org/wiki/Authenticated_encryption#Encrypt-then-MAC_(EtM)" target="_blank">Enc-then-Mac</a>
construction. Our goal is to show that Enc-then-Mac is
<a href="https://en.wikipedia.org/wiki/Ciphertext_indistinguishability#Indistinguishability_under_chosen-plaintext_attack_(IND-CPA)" target="_blank">IND-CPA</a>
secure, assuming the symmetric encryption is
<a href="https://en.wikipedia.org/wiki/Ciphertext_indistinguishability#Indistinguishability_under_chosen-plaintext_attack_(IND-CPA)" target="_blank">IND-CPA</a>
secure and the MAC is
<a href="https://en.wikipedia.org/wiki/Digital_signature_forgery#Weak_existential_forgery_(strong_existential_unforgeability,_strong_unforgeability;_sEUF,_or_SUF)" target="_blank">SUF-CMA</a>
secure.

## Enc-then-Mac

<img style="float:right" src="img/EncThenMac.png" alt="Could not load image.">

The Enc-then-Mac construction works as follows.

1. Encrypt the plaintext resulting in a ciphertext.
2. Compute the Mac over this ciphertext.
3. Concatenate the ciphertext and this Mac.

You can see a visualization of this construction on the right-hand side.




## Input file
In this section we will build the input file for the proof together. CryptoVerif takes this file and tries to prove the queries we defined using the sequence of games technique.

> ℹ️ Note that we will not strictly walk through every line of code from the top to the bottom. We will skip some lines for didactic reasons and explain them at the appropriate places.


### Cryptographic assumptions
We start with the cryptographic assumptions we make for the cryptographic primitives used. In our case this is that the symmetric encryption is IND-CPA secure and the MAC is SUF-CMA secure.

CryptoVerif provides a library containing many standard cryptographic assumptions you can use (see
<a href="https://github.com/cn-lk666/CryptoVerif/blob/main/manual.pdf" target="_blank">manual</a>
, Chapter 6). But you can also create your own assumptions.

You can see the code snippets for telling CryptoVerif that _enc_ is IND-CPA secure and _mac_ is SUF-CMA secure in the following.
![Could not load image.](img/FirstProof_Assumptions.png)

Here the already in the library defined macros _IND\_CPA\_sym\_enc_ and _SUF\_CMA\_det\_mac_ are expanded. For a better understanding we will discuss the technical side with the example of the _IND\_CPA\_sym\_enc_ marco.

First, let us inspect the meaning of the parameters of this macro.

1. type of keys
2. type of plaintexts
3. type of ciphertexts
4. encryption function
5. decryption function
6. function to inject bottom symbol (decryption function needs to return bottom when decryption fails; bottom is not the same type as ciphertexts)
7. function that returns for each bitstring a bitstring of the same length consisting only of zeroes
8. probability of breaking the IND-CPA property

The functions _enc_, _dec_, _injbot_ and _Z_ are declared by the macro. It is important that they are not declared anywhere else. They can only be used after the macro has been expanded.

The types of keys, plaintexts, ciphertexts and the probability _Penc_ must be declared before expanding the macro.  
As you can see in the code snippet, the probability _Penc_ is declared right before expanding the macro.  
The types of plaintexts and ciphertexts are _bitstring_, a predefined type.  
The type of keys is declared at the top of the input file, depicted in the following code snippet. There are also the type declarations for parameters for the macro _SUF\_CMA\_det\_mac_.

![Could not load image.](img/FirstProof_Types.png)

The types are annotated with the lable **[fixed]** meaning that, for example, an encryption key is a bitstring of fixed length. Note that CryptoVerif does not need to know the specific length. Similar as it does not need to know the specific implementation of the symmetric encryption scheme or the MAC.

> explain technical side: e.g. IND-CPA replaces message with Z(m1),Z(m2) (same bitstring)  
> explain how CryptoVerif tries to transformations (how it reacts to fails to proceed)

### Definition Enc-then-Mac
> letfun full_enc()  
> letfun requires implementation vs fun does not


![Could not load image.](img/FirstProof_EncThenMac.png)

### Initial game to prove (including oracles)
> QencLR (oracle)  
> talk about replication (foreach i <= qEnc do)  
> param qEnc. definded at top of file  
> if branches cannot be merged  



![Could not load image.](img/FirstProof_EncOracle.png)


![Could not load image.](img/FirstProof_Params.png)

> OStart (first game)  
> talk about queries (query secret b.)  
> talk about run  


![Could not load image.](img/FirstProof_Queries.png)

![Could not load image.](img/FirstProof_InitalGame.png)

### Concat Function
> fun concat

![Could not load image.](img/FirstProof_Concat.png)


## Execute
The input file is now ready and we can execute CryptoVerif to let it try proof our query.  
You can find the input file _enc-then-MAC-IND-CPA.ocv_
<a href="https://bblanche.gitlabpages.inria.fr/CryptoVerif/tutorial/enc-then-MAC-IND-CPA.ocv" target="_blank">here</a>.

<!--- TODO: Where to put input file --->
When in the same directory as the executable _cryptoverif_ you can run CryptoVerif on our created input file using the following command.

<!--- fix path -->
```
./cryptoverif ./path/enc-then-MAC-IND-CPA.ocv
```

> explain output of CryptoVerif  
> emphasize IND-CPA game hop as preparation for the first challenge