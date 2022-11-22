# ❓ Motivation
<!--- TODOS: 
Schreiben:
* Derive Attack


* Screenshot Equivalence austauschen (richtige Lines)
* Name LoR-CPA mit Links
* Highlighting ändern: Vlt nur farbiger Rahme um relevante Stellen
* (Benjamin: Derive attack)
* Benjamin: Bedeutung return in Initial Game
* Benjamin: Wie proved CryptoVerif die secrecy von b in game 8?
* LanguageTool Überprüfung

--->


## What is CryptoVerif?

<a href="https://bblanche.gitlabpages.inria.fr/CryptoVerif/" target="_blank">CryptoVerif</a>
is a tool for proving cryptographic protocols automatically in the computational model. It formalizes the
<a href="https://shoup.net/papers/games.pdf" target="_blank">sequence of games</a>
proving technique (often also called game hopping). CryptoVerif computes a bound on the advantage of an adversary. It is written in a specialized probabilistic process calculus language inspired by
<a href="https://en.wikipedia.org/wiki/%CE%A0-calculus" target="_blank">pi-calculus</a>.  
CryptoVerif has an automatic mode, as well as an interactive mode.

## Why you should learn about it

CryptoVerif can be used to prove secrecy, authentication, and indistinguishability properties of cryptographic protocols. You can use it, for example, to verify your handwritten proof and check for any human made mistakes.  
Note that CryptoVerif cannot find attacks **but** the output of the failed proof may help you to derive an concrete attack on a protocol you considerd to be secure.
