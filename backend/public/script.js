const stock_list = ["A", "GEHC", "ABC", "ADSK", "ALLE", "APA", "APA", "BA", "BK", "BKR", "CAT", "CHD", "CNC", "CSX", "DFS", "DTE", "ELV", "ETSY", "FE", "FTV", "GD", "GOOGL", "GPC", "HLT", "IDXX", "ISRG", "KEY", "LH", "LW", "MET", "META", "MKTX", "MPC", "NCLH", "NKE", "NTRS", "OGN", "ON", "OTIS", "PFE", "PNW", "POOL", "RE", "RTX", "SO", "SWK", "SYY", "TEL", "TJX", "TMUS", "TRV", "TYL", "VLO", "VTR", "WEC", "XEL"];

const baseUrl="https://e147-34-173-4-159.ngrok.io";

async function check_image(s_name){
    let res=false;
    console.log("BEGINS");
    await fetch(`/check_image/${s_name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((result)=>result.json()).then((ans)=>res=(ans.isFound))
        console.log("ENDS");
        return res;
}

const get_api = async (val) => {
    const fd=new FormData()
    fd.append("stock_name",val)
    const res = await fetch(`${baseUrl}files/`, {
      method: "POST",
      body: fd
    })
    console.log("FETCHING DONE")
    const result = await res.blob();
    console.log(result)
    console.log(window.URL.createObjectURL(result));
    return window.URL.createObjectURL(result);
  };

const out_stock_name = document.getElementById("out_stock_name");
function closeList() {
    let suggestions = document.getElementById('suggestions');
    if (suggestions) {
        // suggestions.parentNode.removeChild(suggestions);
        suggestions.innerHTML = ""
    }

}
const out_div = document.getElementById("out_div");
out_div.style.display = "none";

const stock = document.getElementById('st');

out_img = document.getElementById("out_img");

async function fun1(val = stock.value) {
    out_stock_name.innerHTML = "Stock value : " + val.toUpperCase();
    stock.value = "";
    out_div.style.display = "block";
    const op = document.createElement("a");
    op.setAttribute("href", "#out_div");
    op.click();
    console.log(op);
    out_img.setAttribute("src", "loading.gif")
    await check_image(val).then(async(res)=>{
        if(res)
        {console.log("value");
        setTimeout(() => out_img.setAttribute("src", `./output/${val.toUpperCase()}.png`), 2000)
        // out_img.setAttribute("src", `./output/${val.toLowerCase()}.png`)
        console.log(out_img)}
        else {
            // alert("NO IMAGE FOUND NEEDS TO BE GENERATED USING THE MODEL")
            out_stock_name.innerHTML = "Stock value : " + val.toUpperCase()+" is processing, have patience...";
            await get_api(val).then(url_val=>{
                
                out_img.setAttribute("src", url_val)})
                out_stock_name.innerHTML = "Stock value : " + val.toUpperCase();
        }
    })
   
    closeList();
}

stock.addEventListener('keyup', function (e) {

    if (e.key == "Enter") {
        out_div.style.display = "block";
        let arr = document.querySelectorAll(".suggestion");
        let isFound = false;
        for (let item of arr) {

            if (item.innerHTML === e.target.value.toUpperCase()) {
                console.log("found")
                isFound = true;
                break;
            }
        }
        console.log(arr)
        if (isFound) fun1();
        else {
            out_stock_name.innerHTML = "Stock : " + e.target.value.toUpperCase() + " not found, please try some another";
            out_img.removeAttribute("src");
        }
    }
});


function autocomplete(input, list) {
    //Add an event listener to compare the input value with all countries
    input.addEventListener('input', function (e) {
        //Close the existing list if it is open
        closeList();

        //If the input is empty, exit the function
        if (!this.value)
            return;

        //Create a suggestions <div> and add it to the element containing the input field
        // suggestions = document.createElement('div');
        // suggestions.setAttribute('id', 'suggestions');
        let suggestions = document.getElementById("suggestions");

        // this.parentNode.appendChild(suggestions)
        //Iterate through all entries in the list and find matches

        for (let i = 0; i < list.length; i++) {
            if (list[i].toUpperCase().includes(this.value.toUpperCase())) {
                //If a match is foundm create a suggestion <div> and add it to the suggestions <div>
                suggestion = document.createElement('div');
                suggestion.setAttribute("class", "suggestion")
                suggestion.style.textAlign = "center"
                suggestion.innerHTML = list[i];
                suggestions.appendChild(suggestion);
                suggestion.addEventListener("click", () => {
                    fun1(list[i]);
                })
            }
        }

    });


}
autocomplete(stock, stock_list);


// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news',
//   headers: {
//     'X-RapidAPI-Key': '18bc488897mshd326374bdb65487p15bd9bjsn4f7bcb938a28',
//     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// const axios = require("axios");
// const plotly = require("plotly")("your-username", "your-api-key");

// const options = {
//   method: 'GET',
//   url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news',
//   headers: {
//     'X-RapidAPI-Key': '18bc488897mshd326374bdb65487p15bd9bjsn4f7bcb938a28',
//     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	// Extract relevant data from response
// 	const data = response.data;
// 	const titles = data.map((article) => article.title);
// 	const sentimentScores = data.map((article) => article.sentiment);

// 	// Define plotly data
// 	const plotData = [
// 	  {
// 	    x: titles,
// 	    y: sentimentScores,
// 	    type: 'bar'
// 	  }
// 	];

// 	// Define plotly layout
// 	const layout = {
// 	  title: 'Sentiment Scores of Yahoo Finance News Articles',
// 	  xaxis: {
// 	    title: 'Article Titles'
// 	  },
// 	  yaxis: {
// 	    title: 'Sentiment Score'
// 	  }
// 	};

// 	// Generate plotly graph and save to file
// 	plotly.plot(plotData, layout, function (err, msg) {
// 	  if (err) {
// 	    console.error(err);
// 	  } else {
// 	    console.log(msg);
// 	  }
// 	});
// }).catch(function (error) {
// 	console.error(error);
// });
