var simplemde;
var converter;
console.log("hello");
$("document").ready(initialize);
function initialize(){
    $('.dummy').matchHeight();
    // further changes to editor / get its value using built in methods
    console.log("Loading simplemde");
    try{
        simplemde = new SimpleMDE({ element: $("#simplemde")});
        throw e;
    }
    catch (e) {
        console.error(e);
    }
    console.log("yo");
    converter = new showdown.Converter();

}
