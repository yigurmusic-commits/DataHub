
import React, { useState, useEffect } from 'react';
import { Review, University } from '../types';
import { Star, MessageSquare, Send, Plus, X, Loader2 } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { supabase } from '../services/supabaseClient';

interface ReviewsSectionProps {
  university: University;
  lang: 'ru' | 'kz' | 'en';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ university, lang }) => {
  const [reviews, setReviews] = useState<Review[]>(university.reviews || []);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Student',
    text: '',
    rating: 5
  });

  const t = TRANSLATIONS[lang];

  // Load reviews from Supabase on mount / university change
  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('university_id', university.id)
          .order('created_at', { ascending: false });

        if (!isMounted) return;
        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: Review[] = data.map((r: any) => ({
            id: r.id,
            author: r.author,
            role: r.role as 'Student' | 'Alumni' | 'Parent',
            rating: r.rating,
            date: r.date || new Date(r.created_at).toLocaleDateString('ru-RU'),
            text: r.text,
          }));
          setReviews(mapped);
        } else {
          // Use initial reviews from university prop (static data) if DB is empty
          setReviews(university.reviews || []);
        }
      } catch (err) {
        console.warn('Failed to load reviews from Supabase:', err);
        setReviews(university.reviews || []);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchReviews();
    return () => { isMounted = false; };
  }, [university.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    setIsSubmitting(true);

    const dateStr = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'ru-RU');

    const optimisticReview: Review = {
      id: Date.now().toString(),
      author: newReview.name,
      role: newReview.role as 'Student' | 'Alumni',
      text: newReview.text,
      rating: newReview.rating,
      date: dateStr,
    };

    // Optimistic update
    setReviews(prev => [optimisticReview, ...prev]);
    setShowForm(false);
    setNewReview({ name: '', role: 'Student', text: '', rating: 5 });

    // Save to Supabase
    try {
      const { error } = await supabase.from('reviews').insert({
        university_id: university.id,
        author: newReview.name,
        role: newReview.role,
        rating: newReview.rating,
        date: dateStr,
        text: newReview.text,
      });
      if (error) console.warn('Review save failed:', error.message);
    } catch (err) {
      console.warn('Review save error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setNewReview({ ...newReview, rating: star })}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          >
            <Star
              className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        ))}
      </div>
    );
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="bg-white p-6 md:p-8 animate-fade-in min-h-[400px]">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-600" /> {t.reviews_title}
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {isLoading ? '...' : reviews.length}
            </span>
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? (
              <span className="flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Загрузка отзывов...</span>
            ) : avgRating ? (
              <>⭐ {avgRating} / 5.0</>
            ) : t.reviews_empty}
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-brand-700 transition-all shadow-lg shadow-brand-200"
          >
            <Plus className="w-4 h-4" /> {t.write_review_btn}
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mb-8 bg-gray-50 rounded-2xl p-6 border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-800">{t.write_review_btn}</h4>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.your_name}</label>
                <input
                  type="text"
                  required
                  className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                  value={newReview.name}
                  onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Alihan"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.your_role}</label>
                <select
                  className="w-full p-2.5 rounded-lg border border-gray-300 outline-none bg-white"
                  value={newReview.role}
                  onChange={e => setNewReview({ ...newReview, role: e.target.value })}
                >
                  <option value="Student">{t.role_student}</option>
                  <option value="Alumni">{t.role_alumni}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.rating_label}</label>
              <div className="p-2">{renderStars(newReview.rating, true)}</div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.your_review}</label>
              <textarea
                required
                rows={3}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                value={newReview.text}
                onChange={e => setNewReview({ ...newReview, text: e.target.value })}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
              >
                {t.cancel_btn}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {t.submit_btn}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          // Skeleton loading
          [1, 2, 3].map(i => (
            <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24" />
                  <div className="h-2 bg-gray-200 rounded w-16" />
                </div>
              </div>
              <div className="space-y-2 ml-12">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>{t.reviews_empty}</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 font-bold">
                    {review.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{review.author}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      {review.role === 'Student' ? t.role_student : t.role_alumni} • {review.date}
                    </div>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed ml-12 pl-1 md:pl-0 mt-2">
                {review.text}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
