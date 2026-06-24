
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, GraduationCap } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const SUGGESTION_CHIPS = [
  "🔎 Подобрать ВУЗ",
  "📊 Шансы на грант",
  "💰 Зарплаты выпускников",
  "💻 Лучшие IT вузы"
];

export interface AIChatRef {
  sendMessage: (text: string) => void;
  openChat: () => void;
}

export const AIChat = forwardRef<AIChatRef>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Салем! 👋 Я твой консультант DataHub. Помогу выбрать университет, оценить шансы на грант и отвечу на вопросы о поступлении. Спрашивай! 🚀' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    sendMessage: (text: string) => {
      setIsOpen(true);
      handleSend(text);
    },
    openChat: () => setIsOpen(true)
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // FIX: Only scroll if chat is actually open to prevent page jump on load
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    // Get history before adding the new message
    const chatHistory = messages.map(msg => ({ role: msg.role, text: msg.text }));

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await sendMessageToGemini(textToSend, chatHistory);
    
    const aiMsg: ChatMessage = { role: 'model', text: aiResponseText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 md:w-96 mb-4 transition-all duration-300 origin-bottom-right pointer-events-auto flex flex-col ${isOpen ? 'scale-100 opacity-100 h-[500px]' : 'scale-75 opacity-0 h-0 overflow-hidden'}`}
      >
        <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-4 rounded-t-2xl flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
               <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
                <span className="font-bold block text-sm leading-tight">DataHub Advisor</span>
                <span className="text-xs text-brand-100 opacity-90">Умный помощник</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-600 text-white self-end rounded-tr-none shadow-md' : 'bg-white border border-gray-200 text-gray-800 self-start rounded-tl-none shadow-sm'}`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="self-start bg-white border border-gray-200 p-3 rounded-xl rounded-tl-none shadow-sm flex items-center gap-2 text-gray-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
              Думаю...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
           {SUGGESTION_CHIPS.map((chip, idx) => (
               <button 
                key={idx}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap px-3 py-1.5 bg-white border border-brand-200 text-brand-700 text-xs rounded-full hover:bg-brand-50 hover:border-brand-300 transition-colors shadow-sm"
               >
                 {chip}
               </button>
           ))}
        </div>

        <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl shrink-0">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Спроси о грантах или вузах..." 
              className="flex-1 text-base px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50 focus:bg-white transition-all"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading}
              className="bg-brand-600 hover:bg-brand-700 text-white p-2.5 rounded-xl transition-colors disabled:opacity-50 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-brand-600 hover:bg-brand-700 text-white w-14 h-14 rounded-full shadow-xl shadow-brand-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
      >
        {isOpen ? <X className="w-6 h-6" /> : (
            <>
                <MessageCircle className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </>
        )}
      </button>
    </div>
  );
});

AIChat.displayName = 'AIChat';
