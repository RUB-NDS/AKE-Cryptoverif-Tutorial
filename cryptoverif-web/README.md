This is a proof-of-concept for running cryptoverif on the web.

Limitation: m4 preprocessor is not available, so only .cv files can be processed, not .pvc. For now, preprocess files with m4 manually instead.
Of course, an actual m4 js implementation could also be integrated at some point.

To actually make this useful, the whole JS operation should be moved to a webworker, so that
the output can be processed asynchronous. Currently, the rendering of the page blocks while
cryptoverif does its magic, so that we can not see incremental output.

To run this, first build the docker container:

    $ docker build -t cryptoverif-web .
    $ docker run -ti --rm -p 8080:80 cryptoverif-web

Now hop over to a web browser and visit: http://localhost:8080/index.html

The output should appear within a couple of seconds. If nothing shows up, check the console.

You can also build a standalone binary and run it with node directly on the command line, see
the example in the Dockerfile.

## File injection

Snippet: To inject a file at runtime, this can be done:

    window.caml_fs_tmp = [ { name: "somefile.cv", content: "xxx" } ]
    cryptoverif(window)  // window.process.argv points at "somefile.cv"

After execution, `window.caml_fs_tmp` is empty again.

---

Here are some instructions how to build a webworker, taken from:

https://stackoverflow.com/questions/37495891/how-to-compile-a-simple-command-line-ocaml-script-into-javascript

```
You will probably want to use webworkers, as running software not designed around Javascript's co-operative multi-tasking in the UI thread can cause the browser to lock up. You can add the following header to the top of your OCaml file to overload the normal OCaml Sys and print implementations

(* JsHeader.ml *)
let output_buffer_ = Buffer.create 1000
let flush x=let module J = Js.Unsafe in let () = J.call 
        (J.variable "postMessage") (J.variable "self")
        [|J.inject (Js.string (Buffer.contents output_buffer_))|]
     in Buffer.clear output_buffer_

let print_string = Buffer.add_string output_buffer_
let print_char = Buffer.add_char output_buffer_
let print_newline () = print_char '\n'
let print_endline s = print_string (s^"\n"); flush ()
let caml_ml_output_char = print_char
let printf fmt = Printf.bprintf output_buffer_ fmt
module Printf = struct
    include Printf
    let printf fmt = Printf.bprintf output_buffer_ fmt
end
The most natural way to pass in commandline arguments is through the URL sent to the web worker. We can override the Ocaml Sys module to instead read ?argv as a sequence of null terminated strings.

module Sys = struct
    let char_split delim s = (*Str.split is overkill*)
        let hd = ref "" in let l = ref [] in 
        String.iter (fun c -> 
            if c = delim
            then  (l := (!hd)::(!l); hd := "")
            else hd := (!hd) ^ (String.make 1 c)
        ) s;
        List.rev ((!hd)::(!l)) 
    let getenv x = List.assoc x Url.Current.arguments
    let argv = Array.of_list (char_split '\x00' (getenv "?argv"))
    let executable_name = argv.(0)
end
Now that we have entered the header we can enter a simple OCaml Command Line program:

(* cli.ml *)
let _ = print_string (Array.fold_left (^) "" (Array.make 40 (String.lowercase (Sys.argv.(1)^"\n"))) )
This command line program relies on the OS to flush the output, but we will have to manually flush the output. You may also want to send a null character so the Javascript knows that the command has finished. This can be achieved by appending the following footer.

(* JsFooter.ml *)
let _ = flush stdout; print_endline "\x00" 
We can join the files and compile them as follows:

 cat JsHeader.ml cli.ml JsFooter.ml > merged.ml
 ocamlbuild -use-menhir -menhir "menhir" \
   -pp "camlp4o -I /opt/local/lib/ocaml/site-lib js_of_ocaml/pa_js.cmo" \
   -cflags -I,+js_of_ocaml,-I,+site-lib/js_of_ocaml -libs js_of_ocaml \
   -lflags -I,+js_of_ocaml,-I,+site-lib/js_of_ocaml merged.byte
 js_of_ocaml merged.byte
Now that we have created the file merged.js we can wrap the javascript in a simple web page such as the following:

<html>
<head>
<meta http-equiv="Content-Type" content="text/xhtml+xml; charset=UTF-8" />
<title>ml2js sample_cli</title>
<script type="text/javascript">
<!--
var worker;
function go () {
  var output=document.getElementById ("output");
  var argv = encodeURIComponent("/bin/sample_cli\0"+document.getElementById ("input").value);
  if (worker) {
    worker.terminate();
  }
  worker = new Worker ("sample_cli.js?argv="+argv);
  document.getElementById ("output").value="";
  worker.onmessage = function (m) {
    if (typeof m.data == 'string') {
    if (m.data == "\0\n") {
        output.scrollTop = output.scrollHeight
    } else {
        output.value+=m.data;
    }
    }
  }
}
//-->
</script>
</head>

<body onload=go()>
<textarea id="input" rows="2" cols="60" onkeyup="go()" onchange="go()" style="width:90%">SAMPLE_INPUT</textarea> 
<button onclick="go()">go</button><br>
<textarea id="output" rows="0" cols="60" style="width:100%;height:90%" readonly onload=go()>
Your browser does not seem to support Webworkers.
Try Firefox, Chrome or IE10+. 
</textarea>
</body>

</html>
See http://www.dansted.org/app/bctl-plain.html for an example of this approach in action, and https://github.com/gmatht/TimeLogicUnify/blob/master/ATL/js/webworker/ml2js.sh for a script that appends the appropriate headers, footers etc.
```


