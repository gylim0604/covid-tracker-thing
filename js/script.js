// function to fetch all countries and their respective country code
async function fetchCountry() {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const data = response.json();
  return data;
}

function formatNumber(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// function to call covid data api 
async function fetchByCountry(url) {
  fetch(url)
  // Need to catch undefined and handle here
    .then((response) => {
      if(!response.ok){
        throw new Error("Country not found or doesn't have any cases")
      }
      else{ 
        return response.json()
      }
    })
    .then((data) => {
      let card = document.getElementsByClassName('card');
      let cases = card.namedItem('cases').children;
      let deaths = card.namedItem('deaths').children;
      let recovered = card.namedItem('recovered').children;
      //Update each card to have the respective 
      cases[0].children[1].innerHTML = formatNumber(data.todayCases)
      cases[1].children[1].innerHTML = formatNumber(data.cases)

      deaths[0].children[1].innerHTML = formatNumber(data.todayDeaths)
      deaths[1].children[1].innerHTML = formatNumber(data.deaths)

      recovered[0].children[1].innerHTML = formatNumber(data.todayRecovered)
      recovered[1].children[1].innerHTML = formatNumber(data.recovered)
    })
    .catch(e => alert('EXCEPTION: '+ e));
}

// function to update the html data
function dropdownUpdate(){
  let select = document.getElementById("country")
  let global = 'https://disease.sh/v3/covid-19/all';
  let code = select.value;


  if(select.value === "all"){
    fetchByCountry(global)
  }
  else{
    let countryurl =  'https://disease.sh/v3/covid-19/countries/' + code + '?strict=true';
    console.log(countryurl)
    fetchByCountry(countryurl)
  }

}
fetchCountry().then((data) =>
  data.map((arr) => {
    let hcList = document.getElementById('country');
    hcList.add(new Option(arr.name, arr.alpha2Code));
  })
);
dropdownUpdate()
