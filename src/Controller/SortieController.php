<?php

namespace App\Controller;

use App\Entity\Campus;
use App\Entity\Etat;
use App\Entity\Sortie;
use App\Form\SortieFormType;
use App\Repository\CampusRepository;
use App\Repository\SortieRepository;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/sortie",name="sortie_")
 */
class SortieController extends AbstractController
{
    /**
     * @Route("/creerSortie/{id}", name="creerSortie")
     */
    public function creerSortie(Request $request,
                                 EntityManagerInterface $entityManager,
                                $id,UtilisateurRepository $utilisateurRepository){
        $utilisateur=$utilisateurRepository->findOneBy(['id'=>$id]);
        $sortie = new Sortie();
        $formulaireSortie= $this->createForm(SortieFormType::class,$sortie);
        $formulaireSortie->handleRequest($request);
        $etat= new Etat();
        $etat->setLibelle("créee");

        if ($formulaireSortie->isSubmitted() && $formulaireSortie->isValid()){

            $sortie->setOrganisateur($utilisateur);
            $sortie->setCampus($utilisateur->getCampus());
            $sortie->setEtat($etat);
            $entityManager->persist($sortie);
            $entityManager->flush();
            return $this -> redirectToRoute("main_home");
        }
            return $this->renderForm("sortie/creerSortie.html.twig", compact('formulaireSortie'));
    }
    /**
     * @Route("/listSorties",name="listSorties")
     */
    public function listSorties(SortieRepository $sortieRepository,
                                CampusRepository $campusRepository,
                                Request $request)
    {
        $listSorties=$sortieRepository->findAll();
        $campus=$campusRepository->findAll();
        $rechercheForm=$this->createForm();
        return $this->render("sortie/listSorties.html.twig",
        compact('listSorties','campus')
        );
    }





}