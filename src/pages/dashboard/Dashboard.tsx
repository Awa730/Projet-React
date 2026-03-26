import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VehiclesSection from "../../components/landing/VehiculesSection.tsx";
import type { Vehicule, Tab } from '../../components/landing/VehiculesSection';

export interface HistoriqueEntry {
    id: number;
    vehicule: string;
    type: Tab;
    from?: string;
    to?: string;
    date?: string;
    montant: number;
    modePaiement: string;
}

const lieuxSenegal = [
    'Dakar Plateau', 'Almadies', 'Mermoz', 'Ngor', 'Yoff', 'Sacré-Cœur',
    'Thiès', 'Saint-Louis', 'Ziguinchor', 'Mbour', 'Saly', 'Touba', 'Kaolack'
];

const modesPaiement = [
    { value: 'carte',        label: '💳 Carte bancaire'  },
    { value: 'mobile-money', label: '📱 Mobile Money'     },
    { value: 'virement',     label: '🏦 Virement bancaire'},
];

const StatCard: React.FC<{ title: string; value: string | number; sub?: string; color: string; icon: string }> = ({ title, value, sub, color, icon }) => {
    const colors: Record<string, string> = {
        blue:   'from-blue-500 to-blue-700',
        green:  'from-emerald-500 to-emerald-700',
        orange: 'from-orange-400 to-orange-600',
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

const FormulaireLocation: React.FC<{
    vehicule: Vehicule;
    onClose: () => void;
    onConfirm: (entry: HistoriqueEntry) => void;
    nextId: number;
}> = ({ vehicule, onClose, onConfirm, nextId }) => {
    const [form, setForm] = useState({ client: '', telephone: '', email: '', dateDebut: '', dateFin: '', lieu: '', modePaiement: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);

    const calcJours = () => {
        if (!form.dateDebut || !form.dateFin) return 0;
        const diff = Math.ceil((new Date(form.dateFin).getTime() - new Date(form.dateDebut).getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };
    const total = vehicule.prixLocation * calcJours();

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.client.trim())         e.client       = 'Nom requis';
        if (!form.telephone.trim())      e.telephone    = 'Téléphone requis';
        if (!form.email.includes('@'))   e.email        = 'Email invalide';
        if (!form.dateDebut)             e.dateDebut    = 'Date de début requise';
        if (!form.dateFin)               e.dateFin      = 'Date de fin requise';
        else if (calcJours() <= 0)       e.dateFin      = 'La date de fin doit être après la date de début';
        if (!form.lieu)                  e.lieu         = 'Lieu requis';
        if (!form.modePaiement)          e.modePaiement = 'Mode de paiement requis';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleConfirm = () => {
        if (!validate()) return;
        const fmt = (iso: string) => { const [y, m, d] = iso.split('-'); return `${d}/${m}/${y}`; };
        onConfirm({ id: nextId, vehicule: vehicule.nom, type: 'location', from: fmt(form.dateDebut), to: fmt(form.dateFin), montant: total, modePaiement: form.modePaiement });
        setSuccess(true);
        setTimeout(onClose, 1800);
    };

    const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-3xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">🔑 Réservation Location</h2>
                            <p className="text-orange-100 text-sm mt-1">{vehicule.nom} — {vehicule.prixLocation.toLocaleString('fr-FR')} FCFA/jour</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition">×</button>
                    </div>
                </div>

                {success ? (
                    <div className="p-12 text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold text-gray-800">Réservation confirmée !</h3>
                        <p className="text-gray-500 mt-2">Votre location du <strong>{vehicule.nom}</strong> a été enregistrée.</p>
                    </div>
                ) : (
                    <div className="p-6 space-y-6">
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

                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">📍 Lieu de prise en charge</h3>
                            <select className={inp} value={form.lieu} onChange={e => setForm({ ...form, lieu: e.target.value })}>
                                <option value="">Sélectionner un lieu *</option>
                                {lieuxSenegal.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                            {errors.lieu && <p className="text-red-500 text-xs mt-1">{errors.lieu}</p>}
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">💳 Mode de paiement</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {modesPaiement.map(m => (
                                    <button key={m.value} onClick={() => setForm({ ...form, modePaiement: m.value })}
                                            className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${form.modePaiement === m.value ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                            {errors.modePaiement && <p className="text-red-500 text-xs mt-1">{errors.modePaiement}</p>}
                        </div>

                        {total > 0 && (
                            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>{vehicule.prixLocation.toLocaleString('fr-FR')} FCFA/jour × {calcJours()} jour{calcJours() > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800">Total estimé</span>
                                    <span className="text-2xl font-bold text-orange-600">{total.toLocaleString('fr-FR')} FCFA</span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition">Annuler</button>
                            <button onClick={handleConfirm} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:opacity-90 transition shadow-lg shadow-orange-200">✅ Confirmer la réservation</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const FormulaireAchat: React.FC<{
    vehicule: Vehicule;
    onClose: () => void;
    onConfirm: (entry: HistoriqueEntry) => void;
    nextId: number;
}> = ({ vehicule, onClose, onConfirm, nextId }) => {
    const [form, setForm] = useState({ client: '', telephone: '', email: '', modePaiement: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.client.trim())       e.client       = 'Nom requis';
        if (!form.telephone.trim())    e.telephone    = 'Téléphone requis';
        if (!form.email.includes('@')) e.email        = 'Email invalide';
        if (!form.modePaiement)        e.modePaiement = 'Mode de paiement requis';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleConfirm = () => {
        if (!validate()) return;
        const today = new Date();
        const dateAchat = `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;
        onConfirm({ id: nextId, vehicule: vehicule.nom, type: 'achat', date: dateAchat, montant: vehicule.prixAchat, modePaiement: form.modePaiement });
        setSuccess(true);
        setTimeout(onClose, 1800);
    };

    const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-3xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">💰 Achat de véhicule</h2>
                            <p className="text-blue-200 text-sm mt-1">{vehicule.nom} — {vehicule.prixAchat.toLocaleString('fr-FR')} FCFA</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition">×</button>
                    </div>
                </div>

                {success ? (
                    <div className="p-12 text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold text-gray-800">Achat confirmé !</h3>
                        <p className="text-gray-500 mt-2">L'achat du <strong>{vehicule.nom}</strong> a été enregistré avec succès.</p>
                    </div>
                ) : (
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">👤 Informations acheteur</h3>
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

                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">🚗 Véhicule sélectionné</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                                <div><p className="font-bold text-gray-800">{vehicule.nom}</p><p className="text-xs text-gray-400">Modèle</p></div>
                                <div><p className="font-bold text-gray-800">{vehicule.categorie}</p><p className="text-xs text-gray-400">Catégorie</p></div>
                                <div><p className="font-bold text-gray-800">{vehicule.carburant}</p><p className="text-xs text-gray-400">Carburant</p></div>
                                <div><p className="font-bold text-gray-800">{vehicule.boite}</p><p className="text-xs text-gray-400">Boîte</p></div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">💳 Mode de paiement</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {modesPaiement.map(m => (
                                    <button key={m.value} onClick={() => setForm({ ...form, modePaiement: m.value })}
                                            className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${form.modePaiement === m.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                            {errors.modePaiement && <p className="text-red-500 text-xs mt-1">{errors.modePaiement}</p>}
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">Prix d'achat</span>
                                <span className="text-2xl font-bold text-blue-700">{vehicule.prixAchat.toLocaleString('fr-FR')} FCFA</span>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition">Annuler</button>
                            <button onClick={handleConfirm} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold hover:opacity-90 transition shadow-lg shadow-blue-200">✅ Confirmer l'achat</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const HistoriqueFlotteView: React.FC<{ historique: HistoriqueEntry[] }> = ({ historique }) => {
    const [filtre, setFiltre] = useState<'tous' | 'location' | 'achat'>('tous');

    const filtered = filtre === 'tous' ? historique : historique.filter(e => e.type === filtre);
    const totalMontant = filtered.reduce((s, e) => s + e.montant, 0);
    const labelPaiement = (p: string) =>
        p === 'carte' ? '💳 Carte' : p === 'mobile-money' ? '📱 Mobile Money' : '🏦 Virement';

    const nbLocations = historique.filter(e => e.type === 'location').length;
    const nbAchats = historique.filter(e => e.type === 'achat').length;
    const montantLocations = historique.filter(e => e.type === 'location').reduce((s, e) => s + e.montant, 0);
    const montantAchats = historique.filter(e => e.type === 'achat').reduce((s, e) => s + e.montant, 0);
    const montantTotal = montantLocations + montantAchats;

    const paiementCarte = historique.filter(e => e.modePaiement === 'carte').length;
    const paiementMobile = historique.filter(e => e.modePaiement === 'mobile-money').length;
    const paiementVirement = historique.filter(e => e.modePaiement === 'virement').length;

    const pourcentageLocations = montantTotal > 0 ? (montantLocations / montantTotal) * 100 : 0;
    const pourcentageAchats = montantTotal > 0 ? (montantAchats / montantTotal) * 100 : 0;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">🕐 Historique — Réservations & Achats</h2>
                <p className="text-gray-500 text-sm">G2 Automobile — Toutes les transactions issues de la flotte</p>
            </div>

            {historique.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">📊 Graphique des transactions</h3>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600">{historique.length}</div>
                            <div className="text-xs text-gray-600 mt-1">Total transactions</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-xl">
                            <div className="text-3xl font-bold text-orange-600">{nbLocations}</div>
                            <div className="text-xs text-gray-600 mt-1">Locations</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                            <div className="text-3xl font-bold text-green-600">{nbAchats}</div>
                            <div className="text-xs text-gray-600 mt-1">Achats</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="w-32 text-sm font-semibold text-gray-700">📋 Total</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                        <div
                                            className="bg-blue-500 h-full rounded-full flex items-center justify-end px-3"
                                            style={{ width: '100%' }}
                                        >
                                            <span className="text-white text-sm font-bold">{historique.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-32 text-sm font-semibold text-gray-700">🔑 Locations</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                        <div
                                            className="bg-orange-500 h-full rounded-full flex items-center justify-end px-3"
                                            style={{ width: `${(nbLocations / historique.length) * 100}%` }}
                                        >
                                            <span className="text-white text-sm font-bold">{nbLocations}</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 w-12 text-right">{((nbLocations / historique.length) * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-32 text-sm font-semibold text-gray-700">💰 Achats</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                        <div
                                            className="bg-green-500 h-full rounded-full flex items-center justify-end px-3"
                                            style={{ width: `${(nbAchats / historique.length) * 100}%` }}
                                        >
                                            <span className="text-white text-sm font-bold">{nbAchats}</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 w-12 text-right">{((nbAchats / historique.length) * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-gray-700 mb-4">💰 Montants en FCFA</h4>

                        <div className="flex items-center gap-4">
                            <div className="w-32 text-sm font-semibold text-gray-700">Total</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                        <div
                                            className="bg-blue-600 h-full rounded-full flex items-center justify-end px-3"
                                            style={{ width: '100%' }}
                                        >
                                            <span className="text-white text-xs font-bold">{montantTotal.toLocaleString('fr-FR')} FCFA</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-32 text-sm font-semibold text-gray-700">Locations</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                        <div
                                            className="bg-orange-600 h-full rounded-full flex items-center justify-end px-3"
                                            style={{ width: `${(montantLocations / montantTotal) * 100}%` }}
                                        >
                                            <span className="text-white text-xs font-bold">{montantLocations.toLocaleString('fr-FR')} FCFA</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 w-12 text-right">{((montantLocations / montantTotal) * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-32 text-sm font-semibold text-gray-700">Achats</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                        <div
                                            className="bg-green-600 h-full rounded-full flex items-center justify-end px-3"
                                            style={{ width: `${(montantAchats / montantTotal) * 100}%` }}
                                        >
                                            <span className="text-white text-xs font-bold">{montantAchats.toLocaleString('fr-FR')} FCFA</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 w-12 text-right">{((montantAchats / montantTotal) * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Transactions" value={filtered.length} icon="📋" color="blue" />
                <StatCard title="Locations" value={historique.filter(e => e.type === 'location').length} icon="🔑" color="orange" />
                <StatCard title="Achats" value={historique.filter(e => e.type === 'achat').length} icon="💰" color="green" />
            </div>

            <div className="flex gap-2 flex-wrap">
                {(['tous', 'location', 'achat'] as const).map(f => (
                    <button key={f} onClick={() => setFiltre(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${filtre === f ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}>
                        {f === 'tous' ? 'Tous' : f === 'location' ? '🔑 Locations' : '💰 Achats'}
                    </button>
                ))}
            </div>

            {filtered.length > 0 && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-4 flex justify-between items-center">
                    <span className="font-semibold">Montant total ({filtered.length} transaction{filtered.length > 1 ? 's' : ''})</span>
                    <span className="text-2xl font-bold">{totalMontant.toLocaleString('fr-FR')} FCFA</span>
                </div>
            )}

            <div className="space-y-4">
                {filtered.map(entry => (
                    <div key={entry.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${entry.type === 'location' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                                    {entry.type === 'location' ? '🔑' : '💰'}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-800">{entry.vehicule}</div>
                                    <div className="text-sm text-gray-500">
                                        {entry.type === 'location' ? `📅 ${entry.from} → ${entry.to}` : `🗓️ Acheté le ${entry.date}`}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-0.5">{labelPaiement(entry.modePaiement)}</div>
                                </div>
                            </div>
                            <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${entry.type === 'location' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                  {entry.type === 'location' ? 'Location' : 'Achat'}
                </span>
                                <div className="text-lg font-bold text-gray-800 mt-2">{entry.montant.toLocaleString('fr-FR')} FCFA</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const [historiqueFlotte, setHistoriqueFlotte] = useState<HistoriqueEntry[]>([]);
    const [formulaireActif, setFormulaireActif] = useState<{ vehicule: Vehicule; type: Tab } | null>(null);

    const nextHistoriqueId = historiqueFlotte.length + 1;

    const handleReservation = (vehicule: Vehicule, type: Tab) => setFormulaireActif({ vehicule, type });
    const handleConfirmFormulaire = (entry: HistoriqueEntry) => setHistoriqueFlotte(prev => [entry, ...prev]);

    return (
        <div className="min-h-screen bg-gray-50">

            <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-xl">🚗</div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">Movia Automobile</h1>
                                <p className="text-xs text-gray-400">Location & Vente • Sénégal</p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-orange-400 hover:text-orange-500 text-gray-600 text-sm font-semibold rounded-xl transition-all shadow-sm"
                        >
                            <span className="text-base">←</span>
                            Retour à l'accueil
                        </button>

                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {historiqueFlotte.length > 0 && (
                    <div className="mb-8">
                        <HistoriqueFlotteView historique={historiqueFlotte} />
                        <hr className="my-10 border-gray-200" />
                    </div>
                )}

                <VehiclesSection onReservation={handleReservation} />

            </main>

            {formulaireActif?.type === 'location' && (
                <FormulaireLocation
                    vehicule={formulaireActif.vehicule}
                    onClose={() => setFormulaireActif(null)}
                    onConfirm={handleConfirmFormulaire}
                    nextId={nextHistoriqueId}
                />
            )}

            {formulaireActif?.type === 'achat' && (
                <FormulaireAchat
                    vehicule={formulaireActif.vehicule}
                    onClose={() => setFormulaireActif(null)}
                    onConfirm={handleConfirmFormulaire}
                    nextId={nextHistoriqueId}
                />
            )}

        </div>
    );
};

export default Dashboard;