<?php

namespace App\services;

use App\Entity\Sortie;
use App\Repository\EtatRepository;
use App\Repository\SortieRepository;
use Doctrine\ORM\EntityManagerInterface;

class Services
{
    protected $sortieRepository;
    protected $em;
    protected $etatRepo;
    public function __construct(SortieRepository $sortieRepository,
                                EntityManagerInterface $em,
                                EtatRepository $etatRepo)
    {
        $this->sortieRepository=$sortieRepository;
        $this->em=$em;
        $this->etatRepo=$etatRepo;

    }

    public function verifEstOrganisateur(Sortie $sortie, $user){
    if($sortie->getOrganisateur()->getId() == $user->getId()){
        return true;
    }else{
        return false;
    }

}
public function verifEstInscrit( $sortie, $user){
    $test = false;
    $participants =$sortie->getParticipants();
    foreach ($participants as $participant){
        if($participant->getId()==$user->getId()){
            $test = true;
        }
    }
    return $test;
}
    public function clotureInscription (){
        $etat = $this->etatRepo->find(3);
        $sorties=$this->sortieRepository->findAll();
        foreach ($sorties as $sortie ){
            if ((new \DateTime('now')) >= $sortie->getDateLimiteInscription()){
                $sortie->setEtat($etat);


            }
        }
        $this->em->flush();


    }

    public function verifEstCloture($sortie){
        $test = false;
        $etat = $sortie->getEtat();
        if ($etat == $this->etatRepo->find(3)){
            $test = true;
        }
        return $test;
    }

    public function archiver(){
        $etat = $this->etatRepo->find(7);
        $sorties=$this->sortieRepository->findAll();

        foreach ($sorties as $sortie ){
            if ((new \DateTime('now')) >= $sortie->getDateHeureDebut()->add(new \DateInterval('P30D'))){
                $sortie->setEtat($etat);


            }
        }

        $this->em->flush();
    }
    public function verifEstArchivee($sortie){
        $test = false;
        $etat = $sortie->getEtat();
        if ($etat == $this->etatRepo->find(7)){
            $test = true;
        }
        return $test;
    }

}