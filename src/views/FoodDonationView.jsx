import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Heart, 
  Plus, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  Gift, 
  Users, 
  Sparkles,
  ShoppingBag,
  Award
} from 'lucide-react';
import { SAMPLE_FOOD_DONATIONS } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';

export default function FoodDonationView({ currentUser, currentLanguage }) {
  const [activeTab, setActiveTab] = useState('recipient'); // 'recipient' or 'donor'
  const [donations, setDonations] = useState(SAMPLE_FOOD_DONATIONS);

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  // Form State for Donors
  const [title, setTitle] = useState('');
  const [donorName, setDonorName] = useState(currentUser?.name || 'Community Member');
  const [donorType, setDonorType] = useState('Citizen / Restaurant');
  const [village, setVillage] = useState(currentUser?.village || 'Ramanagara Ward 4');
  const [quantity, setQuantity] = useState('30 Fresh Meals');
  const [foodType, setFoodType] = useState('Pure Vegetarian');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [successMsg, setSuccessMsg] = useState(false);

  // Modal / Claim state
  const [claimedItem, setClaimedItem] = useState(null);

  const handleCreateDonation = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newDonation = {
      id: `FOOD-2026-${Math.floor(200 + Math.random() * 800)}`,
      title: title,
      donorName: donorName,
      donorType: donorType,
      location: currentUser?.ruralDistrict || 'Ramanagara Rural District',
      village: village,
      quantity: quantity,
      foodType: foodType,
      cookedTime: 'Prepared Fresh 1 Hour Ago',
      expiryHours: '6 Hours Remaining',
      status: 'Available for Pickup',
      contactPhone: phone,
      sdgId: 2
    };

    setDonations([newDonation, ...donations]);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2000);
    setTitle('');
    setActiveTab('recipient');
  };

  const handleClaim = (item) => {
    const updated = donations.map(d => d.id === item.id ? { ...d, status: 'Claimed / En Route' } : d);
    setDonations(updated);
    setClaimedItem(item);
  };

  const availableCount = donations.filter(d => d.status === 'Available for Pickup').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <UtensilsCrossed className="h-4 w-4" />
            <span>UN SDG 2 - Zero Hunger Community Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{t.foodDonationTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t.foodDonationDesc}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('recipient')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'recipient' ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{t.availableFood} ({availableCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('donor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'donor' ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>{t.donateFood}</span>
          </button>
        </div>
      </div>

      {/* Impact Counter Banner - EXPLICIT text-white-force FOR 100% CONTRAST IN LIGHT & DARK MODES */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white-force">
        <div className="flex items-center space-x-4 text-white-force">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-2xl shrink-0 text-white-force">
            🍲
          </div>
          <div className="text-white-force">
            <h3 className="text-base font-bold text-white text-white-force">{t.zeroFoodWasteTitle}</h3>
            <p className="text-xs text-slate-200 text-white-force">{t.zeroFoodWasteSub}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-white-force">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-1.5 text-white-force">
            <Award className="h-4 w-4 text-emerald-400" />
            <span className="text-white-force">SDG 2 Impact Badge: Active</span>
          </div>
        </div>
      </div>

      {/* Recipient View - Browse Food Items */}
      {activeTab === 'recipient' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">Surplus Food Available for Pickup & Distribution</h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{availableCount} Listings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((item) => (
              <div 
                key={item.id}
                className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      {item.foodType}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.status === 'Available for Pickup' 
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Donor: <strong className="text-slate-900 dark:text-slate-200">{item.donorName}</strong> ({item.donorType})</p>

                  <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Quantity:</span>
                      <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{item.quantity}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                      <span>Cooked: {item.cookedTime}</span>
                      <span className="text-amber-700 dark:text-amber-400 font-semibold">{item.expiryHours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{item.village}</span>
                  </div>

                  {item.status === 'Available for Pickup' ? (
                    <button
                      onClick={() => handleClaim(item)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all"
                    >
                      {t.claimMeal}
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Claimed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Donor View - Form to Post Excess Food */}
      {activeTab === 'donor' && (
        <div className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold">Donate Surplus Food to Community</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Post available fresh excess meals from wedding halls, restaurants, corporate cafeterias, or personal celebrations.
            </p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span>Surplus Food Listing Posted! Nearby shelters and NGO volunteers have been notified.</span>
            </div>
          )}

          <form onSubmit={handleCreateDonation} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Meal Title / Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. 50 Meals Fresh Rice & Curry from Wedding Event"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Donor Name / Organization</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Food Category</label>
                <select
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Pure Vegetarian">Pure Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Packaged Dry Rations">Packaged Dry Rations</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Quantity (Approx Meals)</label>
                <input
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Helpline Phone</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-xl transition-all"
              >
                Post Food Surplus to Platform
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Claimed Item Confirmation Modal */}
      {claimedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-md glass-panel rounded-3xl border border-slate-700 bg-slate-900 p-6 space-y-4 text-white-force">
            <button onClick={() => setClaimedItem(null)} className="absolute top-4 right-4 text-slate-400">✕</button>

            <div className="text-center space-y-2 text-white-force">
              <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white text-white-force">Food Surplus Claimed Successfully!</h3>
              <p className="text-xs text-slate-300 text-white-force">Contact Donor: <strong className="text-white">{claimedItem.donorName}</strong> ({claimedItem.contactPhone})</p>
              <p className="text-[11px] text-emerald-300 text-white-force">Pickup Location: {claimedItem.village}, {claimedItem.location}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-center">
              <button
                onClick={() => setClaimedItem(null)}
                className="px-6 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
