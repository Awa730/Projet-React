import React, { useState } from 'react';
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
    client: string;
    telephone: string;
    email: string;
}

type ActiveView = 'reservations' | 'statistiques' | 'historique';
const initialReservations: Reservation[] = [
    {
        id: 'RES-001', vehicule: 'Mercedes Classe C', marque: 'Mercedes-Benz',
        dateDebut: '20/03/2026', dateFin: '25/03/2026', statut: 'En cours',
        prix: 45000, lieu: 'Dakar Plateau', image: '🚗', client: 'Moussa Diallo',
        telephone: '+221 77 123 45 67', email: 'moussa@email.com'
    },
    {
        id: 'RES-002', vehicule: 'BMW X5', marque: 'BMW',
        dateDebut: '22/03/2026', dateFin: '27/03/2026', statut: 'À venir',
        prix: 68000, lieu: 'Almadies', image: '🚙', client: 'Fatou Ndiaye',
        telephone: '+221 78 234 56 78', email: 'fatou@email.com'
    },
    {
        id: 'RES-003', vehicule: 'Toyota Corolla', marque: 'Toyota',
        dateDebut: '10/03/2026', dateFin: '15/03/2026', statut: 'Terminée',
        prix: 28000, lieu: 'Mermoz', image: '🚗', client: 'Ibrahima Sow',
        telephone: '+221 76 345 67 89', email: 'ibrahima@email.com'
    },
    {
        id: 'RES-004', vehicule: 'Range Rover', marque: 'Land Rover',
        dateDebut: '05/03/2026', dateFin: '12/03/2026', statut: 'Terminée',
        prix: 95000, lieu: 'Ngor', image: '🚙', client: 'Aminata Ba',
        telephone: '+221 70 456 78 90', email: 'aminata@email.com'
    },
    {
        id: 'RES-005', vehicule: 'Peugeot 508', marque: 'Peugeot',
        dateDebut: '01/02/2026', dateFin: '07/02/2026', statut: 'Terminée',
        prix: 32000, lieu: 'Thiès', image: '🚗', client: 'Cheikh Fall',
        telephone: '+221 77 567 89 01', email: 'cheikh@email.com'
    },
    {
        id: 'RES-006', vehicule: 'Hyundai Tucson', marque: 'Hyundai',
        dateDebut: '15/01/2026', dateFin: '20/01/2026', statut: 'Terminée',
        prix: 38000, lieu: 'Saint-Louis', image: '🚙', client: 'Mariama Diop',
        telephone: '+221 78 678 90 12', email: 'mariama@email.com'
    },
];

const vehiculesDisponibles = [
    { nom: 'Mercedes Classe C', marque: 'Mercedes-Benz', prix: 45000 },
    { nom: 'BMW X5', marque: 'BMW', prix: 68000 },
    { nom: 'Toyota Corolla', marque: 'Toyota', prix: 28000 },
    { nom: 'Range Rover', marque: 'Land Rover', prix: 95000 },
    { nom: 'Peugeot 508', marque: 'Peugeot', prix: 32000 },
    { nom: 'Hyundai Tucson', marque: 'Hyundai', prix: 38000 },
    { nom: 'Renault Duster', marque: 'Renault', prix: 25000 },
    { nom: 'Volkswagen Passat', marque: 'Volkswagen', prix: 42000 },
];

const lieuxSenegal = [
    'Dakar Plateau', 'Almadies', 'Mermoz', 'Ngor', 'Yoff', 'Sacré-Cœur',
    'Thiès', 'Saint-Louis', 'Ziguinchor', 'Mbour', 'Saly', 'Touba', 'Kaolack'
];
const StatCard: React.FC<{ title: string; value: string | number; sub?: string; color: string; icon: string }> = ({ title, value, sub, color, icon }) => {
    const colors: Record<string, string> = {
        blue: 'from-blue-500 to-blue-700',
        green: 'from-emerald-500 to-emerald-700',
        yellow: 'from-amber-400 to-amber-600',
        purple: 'from-violet-500 to-violet-700',
        red: 'from-rose-500 to-rose-700',
        teal: 'from-teal-500 to-teal-700',
    };
    return (
        <div className={`bg-gradient-to-br ${colors[color]} rounded-2xl p-5 text-white shadow-lg`}>
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-sm font-semibold opacity-90 mt-1">{title}</div>
            {sub && <div className="text-xs opacity-70 mt-1">{sub}</div>}
        </div>
    );
};

const Badge: React.FC<{ statut: string }> = ({ statut }) => {
    const map: Record<string, string> = {
        'En cours': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
        'Terminée': 'bg-gray-100 text-gray-600 border border-gray-200',
        'À venir': 'bg-blue-100 text-blue-700 border border-blue-200',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[statut] || 'bg-gray-100 text-gray-600'}`}>
      {statut}
    </span>
    );
};

const ReservationForm: React.FC<{
    onClose: () => void;
    onSubmit: (r: Reservation) => void;
    nextId: string;
}> = ({ onClose, onSubmit, nextId }) => {
    const [form, setForm] = useState({
        client: '', telephone: '', email: '',
        vehicule: '', dateDebut: '', dateFin: '', lieu: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);

    const selectedVehicule = vehiculesDisponibles.find(v => v.nom === form.vehicule);

    const calcJours = () => {
        if (!form.dateDebut || !form.dateFin) return 0;
        const start = new Date(form.dateDebut);
        const end = new Date(form.dateFin);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    const total = selectedVehicule ? selectedVehicule.prix * calcJours() : 0;

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.client.trim()) e.client = 'Nom requis';
        if (!form.telephone.trim()) e.telephone = 'Téléphone requis';
        if (!form.email.trim() || !form.email.includes('@')) e.email = 'Email invalide';
        if (!form.vehicule) e.vehicule = 'Choisissez un véhicule';
        if (!form.dateDebut) e.dateDebut = 'Date de début requise';
        if (!form.dateFin) {
            e.dateFin = 'Date de fin requise';
        } else if (form.dateDebut && calcJours() <= 0) {
            e.dateFin = 'La date de fin doit être après la date de début';
        }
        if (!form.lieu) e.lieu = 'Lieu requis';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        const formatDate = (iso: string) => {
            const [y, m, d] = iso.split('-');
            return `${d}/${m}/${y}`;
        };
        const now = new Date(); now.setHours(0, 0, 0, 0);
        const start = new Date(form.dateDebut);
        const end = new Date(form.dateFin);
        let statut: Reservation['statut'] = 'À venir';
        if (start <= now && end >= now) statut = 'En cours';
        else if (end < now) statut = 'Terminée';

        const newRes: Reservation = {
            id: nextId,
            vehicule: form.vehicule,
            marque: selectedVehicule?.marque || '',
            dateDebut: formatDate(form.dateDebut),
            dateFin: formatDate(form.dateFin),
            statut,
            prix: total,
            lieu: form.lieu,
            image: '🚗',
            client: form.client,
            telephone: form.telephone,
            email: form.email,
        };
        setSuccess(true);
        setTimeout(() => { onSubmit(newRes); onClose(); }, 1500);
    };

    const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-3xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Nouvelle Réservation</h2>
                            <p className="text-blue-200 text-sm mt-1">G2 Automobile • {nextId}</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition">×</button>
                    </div>
                </div>

                {success ? (
                    <div className="p-12 text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold text-gray-800">Réservation confirmée !</h3>
                        <p className="text-gray-500 mt-2">Votre réservation {nextId} a été enregistrée avec succès.</p>
                    </div>
                ) : (
                    <div className="p-6 space-y-6">
                        {/* Infos client */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">👤 Informations client</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <input className={inp} placeholder="Nom complet *" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
                                    {errors.client && <p className="text-red-500 text-xs mt-1">{errors.client}</p>}
                                </div>
                                <div>
                                    <input className={inp} placeholder="Téléphone *" value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} />
                                    {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                                </div>
                                <div className="sm:col-span-2">
                                    <input className={inp} placeholder="Email *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {}
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">🚗 Véhicule</h3>
                            <select className={inp} value={form.vehicule} onChange={e => setForm({ ...form, vehicule: e.target.value })}>
                                <option value="">Sélectionner un véhicule *</option>
                                {vehiculesDisponibles.map(v => (
                                    <option key={v.nom} value={v.nom}>{v.nom} — {v.prix.toLocaleString('fr-FR')} FCFA/jour</option>
                                ))}
                            </select>
                            {errors.vehicule && <p className="text-red-500 text-xs mt-1">{errors.vehicule}</p>}
                        </div>

                        {}
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">📅 Période de location</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Date de début *</label>
                                    <input className={inp} type="date" value={form.dateDebut} onChange={e => setForm({ ...form, dateDebut: e.target.value })} />
                                    {errors.dateDebut && <p className="text-red-500 text-xs mt-1">{errors.dateDebut}</p>}
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Date de fin *</label>
                                    <input className={inp} type="date" value={form.dateFin} onChange={e => setForm({ ...form, dateFin: e.target.value })} />
                                    {errors.dateFin && <p className="text-red-500 text-xs mt-1">{errors.dateFin}</p>}
                                </div>
                            </div>
                        </div>

                        {}
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">📍 Lieu de prise en charge</h3>
                            <select className={inp} value={form.lieu} onChange={e => setForm({ ...form, lieu: e.target.value })}>
                                <option value="">Sélectionner un lieu *</option>
                                {lieuxSenegal.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                            {errors.lieu && <p className="text-red-500 text-xs mt-1">{errors.lieu}</p>}
                        </div>

                        {}
                        {total > 0 && (
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>{selectedVehicule?.prix.toLocaleString('fr-FR')} FCFA/jour × {calcJours()} jour{calcJours() > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800">Total estimé</span>
                                    <span className="text-2xl font-bold text-blue-700">{total.toLocaleString('fr-FR')} FCFA</span>
                                </div>
                            </div>
                        )}

                        {}
                        <div className="flex gap-3 pt-2">
                            <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition">
                                Annuler
                            </button>
                            <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold hover:opacity-90 transition shadow-lg shadow-blue-200">
                                ✅ Confirmer la réservation
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ReservationCard: React.FC<{ reservation: Reservation }> = ({ reservation: r }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl">
                    {r.image}
                </div>
                <div>
                    <div className="font-bold text-gray-800">{r.vehicule}</div>
                    <div className="text-sm text-gray-500">{r.marque} • {r.lieu}</div>
                    <div className="text-sm text-gray-500 mt-0.5">👤 {r.client} • {r.telephone}</div>
                </div>
            </div>
            <div className="text-right">
                <Badge statut={r.statut} />
                <div className="text-lg font-bold text-gray-800 mt-2">{r.prix.toLocaleString('fr-FR')} FCFA</div>
                <div className="text-xs text-gray-400 mt-1">{r.dateDebut} → {r.dateFin}</div>
            </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{r.id}</span>
            <span>📧 {r.email}</span>
        </div>
    </div>
);

const StatistiquesView: React.FC<{ reservations: Reservation[] }> = ({ reservations }) => {
    const total = reservations.length;
    const terminees = reservations.filter(r => r.statut === 'Terminée').length;
    const enCours = reservations.filter(r => r.statut === 'En cours').length;
    const aVenir = reservations.filter(r => r.statut === 'À venir').length;
    const revenus = reservations.filter(r => r.statut === 'Terminée').reduce((s, r) => s + r.prix, 0);
    const revenuTotal = reservations.reduce((s, r) => s + r.prix, 0);
    const tauxOccupation = total > 0 ? Math.round((enCours / total) * 100) : 0;

    const topVehicules = Object.entries(
        reservations.reduce((acc, r) => { acc[r.vehicule] = (acc[r.vehicule] || 0) + 1; return acc; }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const topLieux = Object.entries(
        reservations.reduce((acc, r) => { acc[r.lieu] = (acc[r.lieu] || 0) + 1; return acc; }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const maxVeh = topVehicules[0]?.[1] || 1;
    const maxLieu = topLieux[0]?.[1] || 1;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">📊 Statistiques de l'agence</h2>
                <p className="text-gray-500 text-sm">G2 Automobile — Données en temps réel • Sénégal</p>
            </div>

            {}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard title="Réservations totales" value={total} icon="📋" color="blue" />
                <StatCard title="En cours" value={enCours} icon="🚗" color="green" sub={`${tauxOccupation}% du parc`} />
                <StatCard title="À venir" value={aVenir} icon="📅" color="yellow" />
                <StatCard title="Terminées" value={terminees} icon="✅" color="purple" />
                <StatCard title="Revenus encaissés" value={`${revenus.toLocaleString('fr-FR')} FCFA`} icon="💰" color="teal" />
                <StatCard title="CA total estimé" value={`${revenuTotal.toLocaleString('fr-FR')} FCFA`} icon="📈" color="red" />
            </div>

            {}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Véhicules les plus réservés</h3>
                <div className="space-y-3">
                    {topVehicules.map(([nom, count], i) => (
                        <div key={nom} className="flex items-center gap-3">
                            <span className="text-lg w-7">{['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</span>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{nom}</span>
                                    <span className="text-gray-500 font-semibold">{count} rés.</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all" style={{ width: `${(count / maxVeh) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📍 Lieux de prise en charge populaires</h3>
                <div className="space-y-3">
                    {topLieux.map(([lieu, count], i) => (
                        <div key={lieu} className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-400 w-7">#{i + 1}</span>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{lieu}</span>
                                    <span className="text-gray-500 font-semibold">{count} rés.</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full" style={{ width: `${(count / maxLieu) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Répartition des statuts</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                        { label: 'En cours', count: enCours, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'À venir', count: aVenir, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Terminées', count: terminees, color: 'text-gray-600', bg: 'bg-gray-50' },
                    ].map(({ label, count, color, bg }) => (
                        <div key={label} className={`${bg} rounded-2xl p-4`}>
                            <div className={`text-3xl font-bold ${color}`}>{total > 0 ? Math.round((count / total) * 100) : 0}%</div>
                            <div className="text-xs text-gray-500 mt-1">{label}</div>
                            <div className={`text-lg font-bold ${color}`}>{count}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HistoriqueView: React.FC<{ reservations: Reservation[] }> = ({ reservations }) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'date' | 'prix'>('date');

    const terminees = reservations
        .filter(r => r.statut === 'Terminée')
        .filter(r => {
            const q = search.toLowerCase();
            return r.client.toLowerCase().includes(q) || r.vehicule.toLowerCase().includes(q) || r.lieu.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
        })
        .sort((a, b) => {
            if (sortBy === 'prix') return b.prix - a.prix;
            const parseDate = (d: string) => { const [dd, mm, yy] = d.split('/').map(Number); return new Date(yy, mm - 1, dd).getTime(); };
            return parseDate(b.dateFin) - parseDate(a.dateFin);
        });

    const totalRev = terminees.reduce((s, r) => s + r.prix, 0);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">🕐 Historique des locations</h2>
                <p className="text-gray-500 text-sm">G2 Automobile — Toutes les réservations terminées</p>
            </div>

            {}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-violet-500 to-violet-700 text-white rounded-2xl p-4 shadow-lg">
                    <div className="text-3xl font-bold">{terminees.length}</div>
                    <div className="text-sm opacity-90 mt-1">Locations terminées</div>
                </div>
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-2xl p-4 shadow-lg">
                    <div className="text-2xl font-bold">{totalRev.toLocaleString('fr-FR')}</div>
                    <div className="text-sm opacity-90 mt-1">FCFA encaissés</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-2xl p-4 shadow-lg">
                    <div className="text-3xl font-bold">{terminees.length > 0 ? Math.round(totalRev / terminees.length).toLocaleString('fr-FR') : 0}</div>
                    <div className="text-sm opacity-90 mt-1">FCFA moy. / location</div>
                </div>
            </div>

            {}
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="🔍 Rechercher par client, véhicule, lieu, ID..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as 'date' | 'prix')}
                >
                    <option value="date">Trier par date</option>
                    <option value="prix">Trier par prix</option>
                </select>
            </div>

            {}
            {terminees.length > 0 ? (
                <div className="space-y-3">
                    {terminees.map((r, i) => (
                        <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-start justify-between flex-wrap gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">{r.image}</div>
                                    <div>
                                        <div className="font-bold text-gray-800">{r.vehicule}</div>
                                        <div className="text-sm text-gray-500">📍 {r.lieu} • 👤 {r.client}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">📅 {r.dateDebut} → {r.dateFin}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-gray-800">{r.prix.toLocaleString('fr-FR')} FCFA</div>
                                    <div className="mt-1"><Badge statut={r.statut} /></div>
                                    <div className="text-xs font-mono text-gray-400 mt-1">{r.id}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-gray-500">{search ? 'Aucun résultat pour cette recherche.' : 'Aucune location terminée.'}</p>
                </div>
            )}
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [activeView, setActiveView] = useState<ActiveView>('reservations');
    const [showForm, setShowForm] = useState(false);
    const [filtreStatut, setFiltreStatut] = useState<string>('Tous');
    const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

    const nextId = `RES-${String(reservations.length + 1).padStart(3, '0')}`;

    const handleAddReservation = (r: Reservation) => {
        setReservations(prev => [r, ...prev]);
        setFiltreStatut('Tous');
        setActiveView('reservations');
    };

    const actives = reservations.filter(r => r.statut === 'En cours' || r.statut === 'À venir');
    const filtered = actives.filter(r => filtreStatut === 'Tous' || r.statut === filtreStatut);

    const navItems: { key: ActiveView; label: string; icon: string }[] = [
        { key: 'reservations', label: 'Réservations', icon: '📅' },
        { key: 'statistiques', label: 'Statistiques', icon: '📊' },
        { key: 'historique', label: 'Historique', icon: '🕐' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-xl">🚗</div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">G2 Automobile</h1>
                                <p className="text-xs text-gray-400">Location de véhicules • Sénégal</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200 hover:opacity-90 transition"
                        >
                            Faire une réservation
                        </button>
                    </div>
                </div>
                {}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex gap-1 border-t border-gray-100">
                        {navItems.map(({ key, label, icon }) => (
                            <button
                                key={key}
                                onClick={() => { setActiveView(key); setFiltreStatut('Tous'); }}
                                className={`py-3 px-5 text-sm font-semibold border-b-2 transition ${
                                    activeView === key
                                        ? 'border-blue-600 text-blue-700'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {icon} {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {}
                {activeView === 'reservations' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">📅 Réservations actives</h2>
                            <p className="text-gray-500 text-sm">G2 Automobile — Locations en cours et à venir</p>
                        </div>

                        {}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatCard title="Total" value={reservations.length} icon="📋" color="blue" />
                            <StatCard title="En cours" value={reservations.filter(r => r.statut === 'En cours').length} icon="🚗" color="green" />
                            <StatCard title="À venir" value={reservations.filter(r => r.statut === 'À venir').length} icon="📅" color="yellow" />
                            <StatCard title="Terminées" value={reservations.filter(r => r.statut === 'Terminée').length} icon="✅" color="purple" />
                        </div>

                        {}
                        <div className="flex gap-2 flex-wrap">
                            {['Tous', 'En cours', 'À venir'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFiltreStatut(f)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                                        filtreStatut === f
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {}
                        {filtered.length > 0 ? (
                            <div className="space-y-4">
                                {filtered.map(r => <ReservationCard key={r.id} reservation={r} />)}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                                <div className="text-6xl mb-4">🚗</div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune réservation active</h3>
                                <p className="text-gray-500 mb-4">Cliquez sur "Nouvelle réservation" pour commencer.</p>
                                <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
                                    Ajouter une réservation
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {}
                {activeView === 'statistiques' && (
                    <StatistiquesView reservations={reservations} />
                )}

                {}
                {activeView === 'historique' && (
                    <HistoriqueView reservations={reservations} />
                )}
            </main>

            {}
            {showForm && (
                <ReservationForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleAddReservation}
                    nextId={nextId}
                />
            )}
        </div>
    );
};

export default Dashboard;