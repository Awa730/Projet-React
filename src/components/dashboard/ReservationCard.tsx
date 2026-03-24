interface Reservation {
    id: string;
    vehicule: string;
    marque: string;
    dateDebut: string;
    dateFin: string;
    statut: 'En cours' | 'Terminée' | 'À venir';
    prix: number;
    lieu: string;
    image: string;
}

interface ReservationCardProps {
    reservation: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
    const getStatutStyle = (statut: string) => {
        const styles = {
            'En cours': 'bg-blue-100 text-blue-700 border-blue-200',
            'À venir': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Terminée': 'bg-green-100 text-green-700 border-green-200'
        };
        return styles[statut as keyof typeof styles] || styles['En cours'];
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl">
                        {reservation.image}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-semibold text-gray-800 text-lg">{reservation.vehicule}</h3>
                            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatutStyle(reservation.statut)}`}>
                {reservation.statut}
              </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
                            <span>🚗 {reservation.marque}</span>
                            <span>📅 {reservation.dateDebut} → {reservation.dateFin}</span>
                            <span>📍 {reservation.lieu}</span>
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">{reservation.prix.toLocaleString()} FCFA</p>
                    <p className="text-xs text-gray-500">Prix total</p>
                </div>
            </div>
        </div>
    );
};

export default ReservationCard;