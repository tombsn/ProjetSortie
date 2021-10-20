
function afficherTab(tableau){
   // console.log(myUser);
//selecteur sur le template et sur le tableau
    let tbody=document.querySelector("#myTbody");
    let template=document.querySelector("#ligne");
    let urlSinscrire="../../sortie/sinscrire/";
    let urlSeDesister="../../sortie/seDesister/";
    let urlModifierSortie="../../sortie/modifierSortie/";
    let urlAfficher="../../sortie/afficherSortie/";
    //let utilisateurConnecte = ;
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

        if (sortie.estInscrit== false){
            tabTd[5].querySelector('i').setAttribute('hidden','');

        }
        tabTd[6].innerHTML= sortie.organisateur;
        tabTd[7].querySelector("#btnSinscrire").setAttribute("href",urlsinscrire2);


        if(sortie.estInscrit == true){
            tabTd[7].querySelector("#btnSinscrire").setAttribute("hidden",'');

        }
        if(myUser == sortie.idPseudo){
            tabTd[7].querySelector("#btnModifierSortie").setAttribute("href",urlModifierSortie2);
        }
        if(sortie.estOrganisateur == false){
            tabTd[7].querySelector("#btnModifierSortie").setAttribute("hidden",'');

        }

            tabTd[7].querySelector("#btnAfficher").setAttribute("href",urlAfficher2);
            tabTd[7].querySelector("#btnSedesister").setAttribute("href",urlSeDesister2);

        if(sortie.estInscrit == false){
            tabTd[7].querySelector("#btnSedesister").setAttribute("hidden",'');
        }


        //tabTd['participants']=sortie.participants;
        tbody.appendChild(clone);
        //}
    }

}
let url = '../../sortie/api/listSorties/';
    fetch(url)
        .then(response=>response.json())
        .then(tableau=>
            {
                afficherTab(tableau);
            }
        );


