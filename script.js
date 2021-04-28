async function fetchCountry() {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const data = response.json();
  return data;
}

fetchCountry().then((data) =>
  data.map((arr) => {
    let hcList = document.getElementById('country');
    hcList.add(new Option(arr.name, arr.alpha2Code));
  })
);

function updateString(str, val){
    return str.substr(0,str.indexOf(":")+2) +formatNumber(val)
}

function formatNumber(num){
    // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num;
}
async function fetchTotal(arg) {
  fetch(arg)
    .then((response) => response.json())
    .then((data) => {
      let card = document.getElementsByClassName('card');
      let cases = card.namedItem('cases').children;
      let deaths = card.namedItem('deaths').children;
      let recovered = card.namedItem('recovered').children;

      cases[0].innerHTML = updateString(cases[0].innerHTML,data.todayCases)
      cases[1].innerHTML = updateString(cases[1].innerHTML,data.cases)

      deaths[0].innerHTML = updateString(deaths[0].innerHTML,data.todayDeaths)
      deaths[1].innerHTML = updateString(deaths[0].innerHTML,data.deaths)

      recovered[0].innerHTML = updateString(recovered[0].innerHTML,data.todayRecovered)
      recovered[1].innerHTML = updateString(recovered[0].innerHTML,data.recovered)
    });
}

function test(){
  let select = document.getElementById("country")
  let global = 'https://disease.sh/v3/covid-19/all';
  let code = "MY";


  console.log(select.value)
  if(select.value === "all"){
    fetchTotal(global)
  }
  else{
    code = select.value
    let countryurl =  'https://disease.sh/v3/covid-19/countries/' + code + '?strict=true';
    console.log(countryurl)
    fetchTotal(countryurl)
  }
}

test()
