import React, { useState, useEffect } from 'react';
import { Heart, Upload, CheckCircle2, MessageSquareHeart, Sparkles, Image as ImageIcon, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_REVIEWS, ReviewItem } from '../../data/config';
import { ScallopedBadge } from '../ScallopedBadge';

const LOCAL_STORAGE_KEY = 'ka_cookies_reviews_v1';

export const OpinionesTab: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Load reviews from localStorage + initial
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setReviews([...parsed, ...INITIAL_REVIEWS]);
      } else {
        setReviews(INITIAL_REVIEWS);
      }
    } catch {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  // Handle Photo upload preview
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('Por favor elegí una imagen menor a 4MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: ReviewItem = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      location: location.trim() || 'Costa Rica',
      rating,
      date: 'Recién publicado',
      comment: comment.trim().slice(0, 140),
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
      const userList = existing ? JSON.parse(existing) : [];
      const updated = [newReview, ...userList];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving review to localStorage', err);
    }

    setReviews([newReview, ...reviews]);
    setName('');
    setLocation('');
    setComment('');
    setUploadedPhoto(null);
    setRating(5);
    setSubmittedSuccess(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E2A99D', '#FBE6A8', '#8B4A28', '#F28C28'],
    });

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 4500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 md:py-6">
      {/* Title Section with 3 Hearts Badge */}
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="mb-2">
          <ScallopedBadge type="hearts" size={54} badgeColor="#E2A99D" borderColor="#FBE6A8" />
        </div>

        <h2 className="text-3xl md:text-5xl font-display text-[#8B4A28] tracking-tight">
          Lo que dicen de nosotros
        </h2>
        <p className="text-sm md:text-base text-[#4A2C23]/80 mt-1 max-w-md">
          Amor en forma de galletas. Historias reales de clientes felices en Costa Rica.
        </p>

        {/* Average Rating Pill */}
        <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 bg-white border border-[#FBE6A8] rounded-full shadow-xs">
          <div className="flex text-[#D14D72]">
            {[1, 2, 3, 4, 5].map((i) => (
              <Heart key={i} size={15} className="fill-[#D14D72] text-[#D14D72]" />
            ))}
          </div>
          <span className="text-xs font-bold text-[#8B4A28]">
            5.0 de 5 estrellas de dulzura
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* REVIEWS LIST */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-[#8B4A28] flex items-center gap-2">
            <MessageSquareHeart size={20} className="text-[#D14D72]" />
            <span>Opiniones recientes ({reviews.length})</span>
          </h3>

          <div className="space-y-3.5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="relative bg-[#FCEFEB]/80 hover:bg-[#FCEFEB] rounded-2xl p-4 md:p-5 border-2 border-[#FBE6A8] shadow-sm transition-all duration-200"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-black text-[#8B4A28]">{rev.name}</h4>
                    <p className="text-[11px] text-[#4A2C23]/70">{rev.location} · {rev.date}</p>
                  </div>

                  {/* 5 Hearts */}
                  <div className="flex gap-0.5 text-[#D14D72]">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Heart
                        key={num}
                        size={15}
                        className={
                          num <= rev.rating
                            ? 'fill-[#D14D72] text-[#D14D72]'
                            : 'text-[#E2A99D]'
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs md:text-sm text-[#4A2C23] leading-relaxed">
                  "{rev.comment}"
                </p>

                {rev.cookieMentioned && (
                  <div className="mt-2.5 inline-block">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-white/80 text-[#8B4A28] rounded-md border border-[#FBE6A8]">
                      🍪 Saboreó: {rev.cookieMentioned}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* REVIEW SUBMISSION FORM */}
        <div className="md:col-span-5 bg-white rounded-3xl p-5 md:p-6 border-2 border-[#FBE6A8] shadow-[0_4px_20px_rgba(139,74,40,0.08)] sticky top-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#EBC1B6]/40 flex items-center justify-center text-[#8B4A28]">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#8B4A28]">Dejá tu opinión</h3>
              <p className="text-xs text-[#4A2C23]/70">Nos encanta saber cómo estuvo tu galleta</p>
            </div>
          </div>

          {submittedSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs animate-in fade-in">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>¡Muchas gracias por tu reseña! Ya está visible en la lista. 🍪❤</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#8B4A28] mb-1">
                Tu Nombre *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Valeria Solís"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2A99D]/60 focus:border-[#8B4A28] focus:ring-1 focus:ring-[#8B4A28] text-xs bg-[#F6F1E6]/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8B4A28] mb-1">
                Lugar / Cantón (opcional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej. San José, Curridabat..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2A99D]/60 focus:border-[#8B4A28] focus:ring-1 focus:ring-[#8B4A28] text-xs bg-[#F6F1E6]/40"
              />
            </div>

            {/* Heart Rating Selector */}
            <div>
              <label className="block text-xs font-bold text-[#8B4A28] mb-1">
                ¿Qué tanto te gustaron? *
              </label>
              <div className="flex items-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-120 active:scale-95"
                    aria-label={`${star} corazones`}
                  >
                    <Heart
                      size={24}
                      className={
                        star <= (hoverRating || rating)
                          ? 'fill-[#D14D72] text-[#D14D72]'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#8B4A28] ml-1">
                  {rating} de 5
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#8B4A28]">
                  Tu Comentario *
                </label>
                <span className="text-[10px] text-gray-400">
                  {140 - comment.length} caracteres
                </span>
              </div>
              <textarea
                required
                maxLength={140}
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="¿Qué sabor probaste? Contanos tu experiencia..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2A99D]/60 focus:border-[#8B4A28] focus:ring-1 focus:ring-[#8B4A28] text-xs bg-[#F6F1E6]/40 resize-none"
              />
            </div>

            {/* Optional Screenshot / Photo Upload Box (dashed border) */}
            <div>
              <label className="block text-[11px] font-bold text-[#8B4A28] mb-1">
                Foto o captura de tu galleta (opcional)
              </label>

              {uploadedPhoto ? (
                <div className="relative rounded-xl overflow-hidden border border-[#E2A99D] h-28 bg-[#F6F1E6] flex items-center justify-center">
                  <img
                    src={uploadedPhoto}
                    alt="Foto de reseña"
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setUploadedPhoto(null)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                    aria-label="Quitar foto"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#E2A99D] hover:border-[#8B4A28] rounded-xl p-3 bg-[#F6F1E6]/30 cursor-pointer transition-colors text-center group">
                  <Upload size={18} className="text-[#8B4A28] group-hover:scale-110 transition-transform mb-1" />
                  <span className="text-xs text-[#8B4A28] font-bold">
                    Subir foto o captura
                  </span>
                  <span className="text-[10px] text-gray-500">
                    PNG, JPG hasta 4MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8B4A28] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#723a1d] active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <Heart size={14} className="fill-white" />
              <span>Publicar mi opinión</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
