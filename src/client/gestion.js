/*document.getElementById("btn-test").addEventListener("click", function(){
  document.getElementById("data-list").innerHTML = "";
  $.ajax({
    url: 'https://data.enseignementsup-recherche.gouv.fr//api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&facet=etablissement_lib&facet=diplome_rgp&facet=diplome_lib&facet=typ_diplome_lib&facet=diplom&refine.diplome=DUT',
    dataType: 'application/json',
    complete: function(data){
        let dataResponse = data["responseText"];
        let dataRecord = dataResponse["records"];
        document.getElementById("data-list").innerHTML = dataResponse;
        console.log(data);
    }
  })
});*/ 

document.getElementById("btn-test").addEventListener("click", function(){
  document.getElementById("data-list").innerHTML = "";
  let academy_field = document.getElementById("academy").value;
  var URL = 'https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&rows=1000&sort=-rentree_lib&facet=gd_disciscipline_lib&facet=discipline_lib&facet=aca_etab_lib&facet=reg_ins_lib&facet=dep_ins_lib&facet=diplome_rgp&facet=uucr_ins_lib&facet=uucr_ins&facet=libelle_intitule_1&facet=etablissement_lib';
  URL += '&refine.aca_ins_lib=' + academy_field;
  console.log(URL);
  $.getJSON(URL, function(result){
    let dataRecords = result["records"];
    console.log(dataRecords);
    $.each(dataRecords, function(i, item) {
      document.getElementById("data-list").innerHTML += item.fields.gd_disciscipline_lib + " " + item.fields.discipline_lib + " "
      + item.fields.aca_ins_lib + " " + item.fields.reg_ins_lib + " " + item.fields.dep_ins_lib + " " + item.fields.diplome_rgp
       + " " + item.fields.uucr_ins_lib + " " + item.fields.uucr_ins + " " + item.fields.libelle_intitule_1 + " " + 
       item.fields.etablissement_lib + "<br>"+"<br>";
    });
  });
}); 


function getUtilisateurs() {
  document.getElementById("data-list").innerHTML = "";
  $.ajax({
    url: 'http://localhost:8080/HelloWorld/users',
    dataType: 'application/json',
    complete: function(data){
        let dataResponse = data["responseText"];
        document.getElementById("data-list").innerHTML = dataResponse;
        console.log(data);
    }
  })
}

function postUtilisateur() {
  document.getElementById("data-list").innerHTML = "";
  let firstname = document.querySelector("#firstname").value;
  let lastname = document.querySelector("#lastname").value;
  $.ajax({
    url: 'http://localhost:8080/HelloWorld/user',
    dataType: 'application/json',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify( { "Firstname": firstname, "Lastname": lastname } ),
    processData: false,
    complete: function(data){
       let dataResponse = data["responseText"];
       document.getElementById("data-list").innerHTML = dataResponse;
       console.log(data);
    }
  })
}

function deleteUtilisateur() {
  document.getElementById("data-list").innerHTML = "";
  let firstname = document.querySelector("#firstname").value;
  let lastname = document.querySelector("#lastname").value;
  $.ajax({
    url: 'http://localhost:8080/HelloWorld/user',
    dataType: 'application/json',
    type: 'DELETE',
    contentType: 'application/json',
    data: JSON.stringify( { "Firstname": firstname, "Lastname": lastname } ),
    processData: false,
    complete: function(data){
       let dataResponse = data["responseText"];
       document.getElementById("data-list").innerHTML = dataResponse;
       console.log(data);
    }
  })
}

function modifyUtilisateur() {
  document.getElementById("data-list").innerHTML = "";
  let firstname = document.querySelector("#firstname").value;
  let lastname = document.querySelector("#lastname").value;
  let newfirstname = document.querySelector("#newfirstname").value;
  let newlastname = document.querySelector("#newlastname").value;
  $.ajax({
    url: 'http://localhost:8080/HelloWorld/user',
    dataType: 'application/json',
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify( { "Firstname": firstname, "Lastname": lastname, "newFirstname": newfirstname, "newLastname": newlastname } ),
    processData: false,
    complete: function(data){
       let dataResponse = data["responseText"];
       document.getElementById("data-list").innerHTML = dataResponse;
       console.log(data);
    }
  })
}