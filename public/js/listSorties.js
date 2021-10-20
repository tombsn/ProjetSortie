
let tableau = [];

function afficherTab(tableau){
   // console.log(myUser);
//selecteur sur le template et sur le tableau
    let tbody=document.querySelector("#myTbody");
    let template=document.querySelector("#ligne");
    let urlSinscrire="../../sortie/sinscrire/";
    let urlSeDesister="../../sortie/seDesister/";
    let urlModifierSortie="../../sortie/modifierSortie/";
    let urlAfficher="../../sortie/afficherSortie/";
    tbody.innerHTML='';
    for (let sortie of tableau){
        //j'ajoute l'id de ma sortie à l'url de sinscrire
        let urlsinscrire2=urlSinscrire+sortie.id;
        let urlSeDesister2=urlSeDesister+sortie.id;
        let urlModifierSortie2=urlModifierSortie+sortie.id;
        let urlAfficher2=urlAfficher+sortie.id;
        //je clone le contenu du template dans une variable
        let clone=template.content.cloneNode(true);
        //je mets un selecteur à l'interieur de la partie html clonée
        let tabTd=clone.querySelectorAll("td");// j'ai un tableau
        //if (sortie.dateHeureDebut < sortie.dateHeureDebut.getMonth()-1){
        tabTd[0].innerHTML=sortie.nom ;
        tabTd[1].innerHTML=new Date(sortie.dateHeureDebut).toLocaleString('fr-FR');
        tabTd[2].innerHTML=new Date(sortie.dateLimiteInscription).toLocaleDateString('fr-FR');
        tabTd[3].innerHTML=sortie.nb+"/"+sortie.nbInscriptionMax ;
        tabTd[4].innerHTML=sortie.etat;
        tabTd[5].innerHTML= sortie.organisateur;
        tabTd[6].querySelector("#btnSinscrire").setAttribute("href",urlsinscrire2);

        if(myUser == sortie.idPseudo){
            tabTd[6].querySelector("#btnModifierSortie").setAttribute("href",urlModifierSortie2);
        } else {
            tabTd[6].querySelector("#btnModifierSortie").innerHTML='';
        }

        tabTd[6].querySelector("#btnSedesister").setAttribute("href",urlSeDesister2);
        tabTd[6].querySelector("#btnAfficher").setAttribute("href",urlAfficher2);
        //tabTd['participants']=sortie.participants;
        tbody.appendChild(clone);
        //}
    }

}
let url = '../../sortie/api/listSorties/';
    fetch(url)
        .then(response=>response.json())
        .then(tab=>
            {
                tableau = tab;
                afficherTab(tableau);
                console.log(tableau);
            }
        );

    //-----------------------------------------------------------------------
    function filtrer(){
        let tableau2 = tableau;
        tableau2 = filtrerNom(tableau2);
        tableau2 = filtrerCampus(tableau2);

        afficherTab(tableau2);
    }
    //-----------------------------------------------------------------------
    function filtrerNom(tab){
        let tableau2 = [];
        let nom = document.querySelector('#nom').value;
        if (nom.length > 0){
            for ( let s of tab){
                if ( s.nom.indexOf(nom) != -1 ){
                    tableau2.push(s);
                }
            }
        }else{
            tableau2 =tab; // je filtre pas
        }
       return tableau2;
    }
    //-----------------------------------------------------------------------
    function filtrerCampus(tab){
        let tableau2 = [];
        let campus = document.querySelector('#campus').value;
        console.log(campus);

        if (campus != 0){
            for (let s of tab){

                if(s.campus == campus){

                    tableau2.push(s);
                }
            }
        } else {
            tableau2 = tab;
        }
        return tableau2;
    }
    //-----------------------------------------------------------------------