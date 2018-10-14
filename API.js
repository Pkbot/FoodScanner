// instantiate a new Clarifai app passing in your api key.
//The JavaScript client works in both Node.js and the browser.


// Install the client from NPM

// Require the client

const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
 apiKey: '83c1074c3e9644bf802e3fe9a7597051'
});

src="https://sdk.clarifai.com/js/clarifai-latest.js";

   
app.models.predict("bd367be194cf45149e75f01d59f77ba7", "https://samples.clarifai.com/metro-north.jpg").then(
  function(response)
    {
      if(response.rawData.outputs[0].data.hasOwnProperty("concepts")) {
        var tag = response.rawData.outputs[0].data.concepts[0].name;
        for(var i=0;i<response.rawData.outputs.length;i++)
        {
          var a =response.rawData.outputs[i].data;
          console.log(a);
        }
      }
      
    },
    function(err) {
      // 
      console.log(err);
    }
  );

  