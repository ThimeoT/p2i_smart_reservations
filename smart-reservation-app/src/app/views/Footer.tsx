import { Link } from "react-router";
import logoSmartReservations from '../../assets/logo_smart_reservations.svg';


export default function Footer(){
  return(
    <footer className="bg-beige-1 text-bleu-fonce-1 border-t border-bleu-fonce-1/20 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        {/* Logo */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src={logoSmartReservations} alt="Smart Réservations" className="h-20" />
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center gap-1 text-sm">
          <span className="font-semibold mb-1 uppercase tracking-wide text-xs opacity-60">Navigation</span>
          <Link to="/home" className="hover:underline">Accueil</Link>
          <Link to="/equipements" className="hover:underline">Catalogue</Link>
          <Link to="/disponibilites" className="hover:underline">Disponibilités</Link>
          <Link to="/reservations/mes-reservations" className="hover:underline">Mes réservations</Link>
          <Link to="/aide" className="hover:underline">Aide</Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-end text-sm text-center md:text-right gap-1">
          <span className="font-semibold mb-1 uppercase tracking-wide text-xs opacity-60">Contact</span>
          <p>Pour toute réclamation :</p>
          <a href="mailto:ttonon@ensc.fr" className="hover:underline font-medium">ttonon@ensc.fr</a>
          <p className="mt-2 text-xs opacity-50">Créé par Thiméo Tonon — ENSC 2025</p>
        </div>

      </div>
    </footer>
  )
}