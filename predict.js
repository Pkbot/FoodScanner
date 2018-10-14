
const app = new Clarifai.App({
  apiKey: '6e71d8ec52df43c2925ca1d3e551e140'
 });

/*
  Purpose: Pass information to other helper functions after a user clicks 'Predict'
  Args:
    value - Actual filename or URL
    source - 'url' or 'file'

    */

    src="https://sdk.clarifai.com/js/clarifai-latest.js";
function predict_click(value, source) {
  var preview = $(".food-photo");
  var file    = document.querySelector("input[type=file]").files[0];
  var loader  = "https://s3.amazonaws.com/static.mlh.io/icons/loading.svg";
  var reader  = new FileReader();

  // load local file picture
  reader.addEventListener("load", function () {
    preview.attr('style', 'background-image: url("' + reader.result + '");');
    doPredict({ base64: reader.result.split("base64,")[1] });
  }, false);

  if (file) {
    reader.readAsDataURL(file);
    //$('#concepts').html('<img src="' + loader + '" class="loading" />');
     
  } else { alert("No file selcted!"); }
}

/*
  Purpose: Does a v2 prediction based on user input
  Args:
    value - Either {url : urlValue} or { base64 : base64Value }
*/


  
    
  function doPredict(value) {
  app.models.predict("bd367be194cf45149e75f01d59f77ba7", value).then(
  function(response)
    {
      var demoP = document.getElementById("d");
      var html = "";
      if(response.rawData.outputs[0].data.hasOwnProperty("concepts")) {
        var tag = response.rawData.outputs[0].data.concepts[0].name;
        for(var i=0;i<response.rawData.outputs[0].data.concepts.length;i++)
        {
          var a =response.rawData.outputs[0].data.concepts[i].name;
          html += a + "<br/>";
                    
                   
          //document.getElementById("d").innerHTML = a;
          //document.write('<p id="syndicated-content">'+ a +'</p>');
          //document.write(a);
        }
        demoP.innerHTML = html;
      
      }

      
    },
    function(err) {
      // 
      console.log(err);
    }
  );
}

/*function doPredict(value) {
  app.models.predict(Clarifai.FOOD_MODEL, value).then(function(response) {
      if(response.rawData.outputs[0].data.hasOwnProperty("concepts")) {
        var tag = response.rawData.outputs[0].data.concepts[0].name;
        for (var i = response.rawData.outputs[0].data.concepts.length - 1; i >= 0; i--) {
          console.write(response.rawData.outputs[0].data.concepts[i].name);
        }
        console.write(tag);
        }
    }, function(err) { console.log(err); }
  );
}
*/
