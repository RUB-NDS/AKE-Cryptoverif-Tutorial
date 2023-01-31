# ❓ Motivation


## What is CryptoVerif?

<a href="https://bblanche.gitlabpages.inria.fr/CryptoVerif/" target="_blank">CryptoVerif</a>
is a tool for proving cryptographic protocols in the computational model. It formalizes the
<a href="https://shoup.net/papers/games.pdf" target="_blank">“sequence of games”</a>
proving technique (often also called “game hopping”). CryptoVerif computes a bound on the advantage of an adversary. Input files are written in a specialized probabilistic process calculus language inspired by the applied
<a href="https://en.wikipedia.org/wiki/%CE%A0-calculus" target="_blank">pi-calculus</a>.  
CryptoVerif has an automatic mode, as well as an interactive mode.

## Why you should learn about it

CryptoVerif can be used to prove secrecy, authentication, and indistinguishability properties of cryptographic protocols. You can use it, for example, to verify your handwritten proof, and check for any human-made mistakes.  
Note that CryptoVerif cannot find attacks, **but** the output of a failed proof may help you to derive a concrete attack on a protocol you may even have considered to be secure before.


### Author
This tutorial was made by Marc Hafner as a Master's project at the Chair for Network and Data Security, Ruhr-University Bochum.  
Advisors: Benjamin Lipp, Marcus Brinkmann  
Special thanks to Benjamin for his support, helping me understand CryptoVerif better after each meeting.
