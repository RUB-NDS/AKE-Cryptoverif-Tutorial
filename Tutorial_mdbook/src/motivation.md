# ❓ Motivation

<!--- Links to official website, Introduction paper(2017), Tutorial, (Git),... --->

## What is CryptoVerif?
> formalizes sequence of games (game hopping)  
> computes bound on advantage (exact security)  
> computational model  
> specialized probabilistic process calculus language (inspired by pi calculus https://en.wikipedia.org/wiki/%CE%A0-calculus)  
> interactive mode  

<a href="https://bblanche.gitlabpages.inria.fr/CryptoVerif/" target="_blank">CryptoVerif</a>
is a tool for proving cryptographic protocols automatically in the computational model. It formalizes the
<a href="https://shoup.net/papers/games.pdf" target="_blank">sequence of games</a>
proving technique (often also called game hopping). CryptoVerif computes a bound on the advantage of an adversary. It is written in a specialized probabilistic process calculus language inspired by
<a href="https://en.wikipedia.org/wiki/%CE%A0-calculus" target="_blank">pi-calculus</a>.  
CryptoVerif has an automatic mode, as well as an interactive mode.

## Why you should learn about it
> CryptoVerif can prove secrecy, authentication, and indistinguishability properties.
> CryptoVerif cannot find attacks BUT failed proof may help you to find such an attack (on a protocol you considered and "proofed" to be secure)

