let list = []
fetch("https://restcountries.eu/rest/v2/all")
.then(response => response.json())
.then(data => data.map(country =>{
    const temp ={};

    temp.name = country.name;
    temp.a2Code = country.alpha2Code;
    list.push(temp)
}))

console.log(list)

let dropdown = document.getElementById(country)
Object.kets(list).map((key => dropdown.addEventListener(new Option(list[key].name, JSON.stringify))))

hcList.addEventListener("input", () => document.getElementById("optionData").innerHTML = hcList.value);