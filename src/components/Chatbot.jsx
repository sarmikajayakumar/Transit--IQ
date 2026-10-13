import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { Send, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { RadarWaveSvg, TransitCrosshairSvg } from './CustomIcons';

export default function Chatbot() {
  const { language, role, t } = useTransit();
  const isTamil = language === 'ta';
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let welcomeText = "";
    if (role === 'operator') {
      welcomeText = isTamil
        ? `[டிப்போ கட்டுப்பாட்டு அறை AI]: வழித்தட நெரிசல், கூடுதல் பேருந்து ஒதுக்கீடு (+2), கத்திப்பாரா வெள்ள மாற்றுப்பாதை, மற்றும் பழுதான பேருந்து TN-01-N-4429 நிவாரண பணிகள் குறித்த எந்தவொரு தகவலையும் கேட்கலாம்.`
        : `[DEPOT OPERATIONS AI]: Transit dispatch copilot ready. Ask me regarding corridor crowding balancing, Kathipara flood diversions, headway adjustments, or breakdown relief unit status.`;
    } else {
      welcomeText = isTamil
        ? `[பயணிகள் வழிகாட்டி AI]: வணக்கம்! சென்னை சென்ட்ரல் - தாம்பரம் வழித்தடத்தில் கூட்டம் குறைந்த பேருந்துகள், மழை மாற்றுப்பாதைகள், மற்றும் பழுதான பேருந்துக்கான மாற்று வழிகள் பற்றி என்னிடம் கேட்கலாம்.`
        : `[PASSENGER COPILOT AI]: Welcome commuter. Inquire regarding optimal less-crowded buses, flood detour durations, live timetable headways, or breakdown prior notices.`;
    }

    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: welcomeText,
        source: 'TransitIQ AI',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [role, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const speakText = (text) => {
    if (!speechEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isTamil ? 'ta-IN' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend) => {
    const msgText = (textToSend || input).trim();
    if (!msgText || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: msgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msgText,
          role,
          language
        })
      });

      if (!response.ok) throw new Error("Chat request error");

      const data = await response.json();
      const botReply = data.reply || "No reply generated.";

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botReply,
          source: data.source || 'TransitIQ AI',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (speechEnabled) speakText(botReply);
    } catch (err) {
      const fallbackReply = isTamil
        ? `நேரலை தகவல்: வழித்தடம் 15B-ல் குறைந்த கூட்டம் (42%), வழித்தடம் 29C-ல் அதிக கூட்டம் (128%). பழுதான பேருந்து 29C-க்கு நிவாரணப் பேருந்து 5 நிமிடங்களில் வரும்.`
        : `Corridor Telemetry: Route 15B has comfortable seating (42% capacity). Route 29C is critically congested (128%). Relief bus TN-01-N-8802 is 5 minutes away for broken-down bus 29C.`;

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: fallbackReply,
          source: 'TransitIQ Engine',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = t.chatbot.quickPrompts[role] || [];

  return (
    <div className="flex flex-col h-[580px] bg-[#FFFFFF] border border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] overflow-hidden">
      
      {/* Header */}
      <div className="px-4 py-3 bg-[#FAF8F5] border-b border-[#0A0A0A] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <TransitCrosshairSvg className="w-5 h-5 text-[#0A0A0A]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                AI ASSISTANT
              </span>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC]">
                {role === 'operator' ? 'DEPOT' : 'PASSENGER'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-[#6E6B65] uppercase">
              {isTamil ? "இருமொழி நுண்ணறிவு (தமிழ் & EN)" : "Bilingual Tamil / English"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSpeechEnabled(prev => !prev)}
            className={`p-1.5 border border-[#0A0A0A] transition-all ${
              speechEnabled ? 'bg-[#0A0A0A] text-[#F6F3EC]' : 'bg-[#FAF8F5] text-[#0A0A0A] hover:bg-[#E2DBD0]'
            }`}
            title="Toggle Voice Readout"
          >
            {speechEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setMessages([])}
            className="p-1.5 border border-[#0A0A0A] bg-[#FAF8F5] text-[#0A0A0A] hover:bg-[#E2DBD0] transition-colors"
            title="Clear Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F6F3EC]/50 font-sans text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] p-3.5 ${
                msg.sender === 'user'
                  ? 'bg-[#0A0A0A] text-[#F6F3EC] border border-[#0A0A0A] shadow-[3px_3px_0px_#6E6B65]'
                  : 'bg-[#FFFFFF] text-[#0A0A0A] border border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed font-normal">
                {msg.text}
              </div>
              <div
                className={`mt-2 flex items-center justify-between text-[10px] font-mono border-t pt-1.5 ${
                  msg.sender === 'user' ? 'border-[#333333] text-[#A99D8D]' : 'border-[#E2DBD0] text-[#6E6B65]'
                }`}
              >
                <span>{msg.source || 'COMMUTER'}</span>
                <span>{msg.time}</span>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="p-3 bg-[#FFFFFF] border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] font-mono text-[11px] text-[#6E6B65] flex items-center gap-2">
              <RadarWaveSvg className="w-4 h-4 text-[#0A0A0A]" />
              <span>{isTamil ? "சிந்திக்கிறது..." : "Evaluating corridor parameters..."}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-2 bg-[#FAF8F5] border-t border-[#0A0A0A] overflow-x-auto">
        <div className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px]">
          {quickPrompts.slice(0, 4).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 border border-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#0A0A0A] hover:text-[#F6F3EC] transition-all truncate max-w-[210px]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-[#FFFFFF] border-t border-[#0A0A0A]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isTamil ? "தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள்..." : "Type query in English or தமிழில்..."}
            className="flex-1 bg-[#FAF8F5] text-[#0A0A0A] placeholder-[#6E6B65] text-xs px-3.5 py-2.5 border border-[#0A0A0A] focus:outline-none focus:bg-[#FFFFFF] font-mono transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 bg-[#0A0A0A] text-[#F6F3EC] hover:bg-[#333333] disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>SEND</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>

    </div>
  );
}
