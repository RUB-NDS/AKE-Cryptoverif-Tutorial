FROM ubuntu as cryptoverif-build

RUN apt-get update && DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get install -y \
  git \
  js-of-ocaml

# For now, we disable the manual, as TeX is rather large.
# texlive-latex-base latex2html

WORKDIR /
RUN git clone https://gitlab.inria.fr/bblanche/CryptoVerif.git
WORKDIR CryptoVerif

# RUN (cd docs; pdflatex manual.tex)
# Images are really bad quality, needs some tuning.
# RUN (cd docs; latex2html manual.tex)

# Now build the bytecode with js_of_ocaml extensions.
# WORKDIR src
# We don't need this step, because we are not using the JS integration at this point.
# RUN ocamlfind ocamlc -package js_of_ocaml -package js_of_ocaml-ppx -linkpkg -o cryptoverif.byte unix.cma str.cma parsing_helper.mli ...

# First build normally so all generated files are there.
RUN ./build byte

# Now build the JS.
# Files given here are put into /static/ in the pseudo filesystem.
RUN js_of_ocaml compile --wrap-with-fun=cryptoverif -I . --file default.cvl --file=examples/basic/signedDH-DDH.cv cryptoverif 

# This example shows how to compile and run a stand alone tool that can be executed with node.
# RUN js_of_ocaml compile -o cryptoverif-tool.js -I . --file default.cvl --file=examples/basic/signedDH-DDH.cv cryptoverif
# RUN apt-get install -y nodejs
# CMD ["node", "cryptoverif-tool.js", "-lib", "/static/default.cvl", "/static/signedDH-DDH.cv"]

FROM nginx as cryptoverif-web
COPY --from=cryptoverif-build /CryptoVerif/cryptoverif.js /usr/share/nginx/html
# PDF manual disabled.
# COPY --from=cryptoverif-build /CryptoVerif/docs/manual.pdf /usr/share/nginx/html
# HTML manual disabled, see above.
# COPY --from=cryptoverif-build /CryptoVerif/docs/manual/ /usr/share/nginx/html/manual/

ADD index.html /usr/share/nginx/html
ADD example.js /usr/share/nginx/html

