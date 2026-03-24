import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <div className="text-8xl mb-6">🚗</div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        G2 Automobile
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8">
                        Location de voitures au Sénégal
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Bienvenue sur votre plateforme de location
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Gérez toutes vos réservations et consultez votre historique en un seul endroit.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="p-6 bg-blue-50 rounded-lg">
                            <div className="text-4xl mb-3">📅</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Réservations</h3>
                            <p className="text-sm text-gray-600">Gérez vos locations actives</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-lg">
                            <div className="text-4xl mb-3">🕐</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Historique</h3>
                            <p className="text-sm text-gray-600">Consultez vos locations passées</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-lg">
                            <div className="text-4xl mb-3">📊</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Statistiques</h3>
                            <p className="text-sm text-gray-600">Suivez vos activités</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition shadow-lg"
                    >
                        Accéder au tableau de bord →
                    </button>
                </div>

                <p className="text-white mt-8 text-sm">
                    © 2026 Automobile - Plateforme de location de voitures
                </p>
            </div>
        </div>
    );
};

export default Home;