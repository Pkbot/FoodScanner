// Applies apiKey
const app = new Clarifai.App({
  apiKey: '6e71d8ec52df43c2925ca1d3e551e140'
 });

// Implements the Javascript model of Clarifai
    src = "https://sdk.clarifai.com/js/clarifai-latest.js";
function predict_click(value, source) {
  var preview = $(".food-photo");
  var file    = document.querySelector("input[type=file]").files[0];
  var reader  = new FileReader();

  // loads a local file image
  reader.addEventListener("load", function () {
    preview.attr('style', 'background-image: url("' + reader.result + '");');
    doPredict({ base64: reader.result.split("base64,")[1]} );
  }, false);

  if (file) {
    reader.readAsDataURL(file);
     
  } else { alert("No file was selected, please try uploading a jpeg file of your food again."); }
}

  // predicts the ingredients used to create the food using Clarifai's food model
  function doPredict(value) {
  app.models.predict("bd367be194cf45149e75f01d59f77ba7", value).then(
  function(response)
    {
      var demoP = document.getElementById("d");
      var html = "";
      if(response.rawData.outputs[0].data.hasOwnProperty("concepts")) {
        var tag = response.rawData.outputs[0].data.concepts[0].name;
        for(var i= 0; i < response.rawData.outputs[0].data.concepts.length; i++)
        {
          var a = response.rawData.outputs[0].data.concepts[i].name;
          html += a + "<br/>";
        }
        demoP.innerHTML = html;
      }

    },
    function(err) {
      console.log(err);
    }
  );
}
