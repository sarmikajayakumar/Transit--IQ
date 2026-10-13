import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTransit } from '../context/TransitContext';
import { Send, Volume2, VolumeX, RotateCcw, Square } from 'lucide-react';
import { RadarWaveSvg, TransitCrosshairSvg } from './CustomIcons';

export default function Chatbot() {
  const { language, role, t } = useTransit();
  const isTamil = language === 'ta';
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState(null);

  const messagesContainerRef = useRef(null);
  const audioRef = useRef(null);

  // Helper to generate the structured welcome message according to role and language
  const getInitialWelcomeMessage = (currentRole, currentIsTamil) => {
    let welcomeText = "";
    if (currentRole === 'operator') {
      welcomeText = currentIsTamil
        ? `[டிப்போ கட்டுப்பாட்டு அறை AI]: கோவை வழித்தட நெரிசல் பகுப்பாய்வு, காந்திபுரம் - சரவணம்பட்டி வழித்தடத்திற்கு கூடுதல் பேருந்து ஒதுக்கீடு (+2), உக்கடம் - சிங்காநல்லூர் குறைந்த கூட்டமுள்ள வழித்தடங்களில் பேருந்துகளைச் சீரமைத்தல், மற்றும் பழுதான பேருந்து TN-38-N-2914 நிவாரண பணிகள் குறித்த தகவல்களைக் கேட்கலாம்.`
        : `[DEPOT OPERATIONS AI]: Coimbatore transit dispatch copilot ready. Ask me regarding route optimization, extra bus allocation for crowded Gandhipuram ↔ Saravanampatti corridor, scaling down idle buses on low-demand routes, or breakdown relief status.`;
    } else {
      welcomeText = currentIsTamil
        ? `[பயணிகள் வழிகாட்டி AI]: வணக்கம்! கோவையில் காந்திபுரம், சரவணம்பட்டி, உக்கடம், சிங்காநல்லூர், பீளமேடு வழித்தடங்களில் கூட்டம் குறைந்த பேருந்துகள், பயண நேரம், கட்டணம், மற்றும் பழுதான பேருந்துக்கான நிவாரண மாற்று வழிகள் பற்றி என்னிடம் கேட்கலாம்.`
        : `[PASSENGER COPILOT AI]: Welcome commuter. Inquire regarding optimal less-crowded buses across Coimbatore (Gandhipuram, Saravanampatti, Ukkadam, Peelamedu, CODISSIA), live timetable headways, fares, or breakdown prior notices.`;
    }

    return [
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        text: welcomeText,
        source: 'TransitIQ AI',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  };

  // Immediate halt for all audio playback (both HTML5 Audio and Web Speech Synthesis)
  const stopSpeech = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      } catch (e) {
        console.warn("Audio pause error:", e);
      }
    }
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn("SpeechSynthesis cancel error:", e);
      }
    }
    setIsSpeaking(false);
    setCurrentSpeakingId(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Update initial welcome message on role or language switch
  useEffect(() => {
    stopSpeech();
    setMessages(getInitialWelcomeMessage(role, isTamil));
  }, [role, language]);

  // Internal auto-scroll ONLY within message list (prevents page/chatbox jumping)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  // Reset conversation handler: stops speech, resets input, and restores initial welcome message
  const handleResetChat = () => {
    stopSpeech();
    setInput('');
    setMessages(getInitialWelcomeMessage(role, isTamil));
  };

  // High-fidelity speech synthesizer using backend Google TTS proxy (supports authentic Tamil!) with fallback
  const speakText = async (text, messageId = null) => {
    if (!text) return;
    stopSpeech();

    const containsTamil = /[\u0B80-\u0BFF]/.test(text);
    const targetLang = containsTamil || isTamil ? 'ta' : 'en';

    setIsSpeaking(true);
    if (messageId) {
      setCurrentSpeakingId(messageId);
    }

    try {
      const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}&lang=${targetLang}`;
      const audio = new Audio(ttsUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        setCurrentSpeakingId(null);
        audioRef.current = null;
      };

      audio.onerror = (e) => {
        console.warn("Backend TTS stream error, falling back to Web Speech API:", e);
        audioRef.current = null;
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(text.slice(0, 250));
          utterance.lang = targetLang === 'ta' ? 'ta-IN' : 'en-US';
          utterance.onend = () => {
            setIsSpeaking(false);
            setCurrentSpeakingId(null);
          };
          utterance.onerror = () => {
            setIsSpeaking(false);
            setCurrentSpeakingId(null);
          };
          window.speechSynthesis.speak(utterance);
        } else {
          setIsSpeaking(false);
          setCurrentSpeakingId(null);
        }
      };

      await audio.play();
    } catch (err) {
      console.warn("Audio playback interrupted or failed:", err);
      if (window.speechSynthesis) {
        try {
          const utterance = new SpeechSynthesisUtterance(text.slice(0, 250));
          utterance.lang = targetLang === 'ta' ? 'ta-IN' : 'en-US';
          utterance.onend = () => {
            setIsSpeaking(false);
            setCurrentSpeakingId(null);
          };
          utterance.onerror = () => {
            setIsSpeaking(false);
            setCurrentSpeakingId(null);
          };
          window.speechSynthesis.speak(utterance);
        } catch (synthErr) {
          setIsSpeaking(false);
          setCurrentSpeakingId(null);
        }
      } else {
        setIsSpeaking(false);
        setCurrentSpeakingId(null);
      }
    }
  };

  const handleSend = async (textToSend) => {
    const msgText = (textToSend || input).trim();
    if (!msgText || loading) return;

    // Stop active audio when sending a query
    stopSpeech();

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
      const botMsgId = (Date.now() + 1).toString();

      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: botReply,
          source: data.source || 'TransitIQ AI',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (speechEnabled) {
        speakText(botReply, botMsgId);
      }
    } catch (err) {
      const fallbackReply = isTamil
        ? `நேரலை தகவல்: அதிக நெரிசல் உள்ள வழித்தடம் 12-க்கு (காந்திபுரம் - சரவணம்பட்டி) கூடுதல் பேருந்துகள் ஒதுக்கப்படுகின்றன. குறைந்த கூட்டம் உள்ள வழித்தடம் 3A-ல் (40%) இருக்கைகள் காலியாக உள்ளன. பழுதான பேருந்து 12-க்கு நிவாரணப் பேருந்து TN-38-N-6602 இன்னும் 4 நிமிடங்களில் வரும்.`
        : `Corridor Telemetry: Crowded Route 12 (134%) is allocated extra buses. Lean route 3A has comfortable seating (40% capacity). Relief bus TN-38-N-6602 is 4 minutes away for broken-down bus 12.`;

      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: fallbackReply,
          source: 'TransitIQ Engine',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (speechEnabled) {
        speakText(fallbackReply, botMsgId);
      }
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = t.chatbot.quickPrompts[role] || [];

  return (
    <div className="flex flex-col h-[520px] sm:h-[580px] bg-[#FFFFFF] border border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] overflow-hidden">
      
      {/* Header */}
      <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#FAF8F5] border-b border-[#0A0A0A] flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <TransitCrosshairSvg className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A0A0A]" />
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                AI ASSISTANT
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase px-1.5 py-0.2 border border-[#0A0A0A] bg-[#0A0A0A] text-[#F6F3EC]">
                {role === 'operator' ? 'DEPOT' : 'PASSENGER'}
              </span>
            </div>
            <p className="font-mono text-[9px] sm:text-[10px] text-[#6E6B65] uppercase">
              {isTamil ? "இருமொழி நுண்ணறிவு (தமிழ் & EN)" : "Bilingual Tamil / English"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Voice Reader Button: If actively speaking, clicking immediately STOPS. Otherwise toggles voice. */}
          <button
            onClick={() => {
              if (isSpeaking) {
                stopSpeech();
              } else {
                const nextState = !speechEnabled;
                setSpeechEnabled(nextState);
                if (nextState && messages.length > 0) {
                  const lastBotMsg = [...messages].reverse().find(m => m.sender === 'bot');
                  if (lastBotMsg) speakText(lastBotMsg.text, lastBotMsg.id);
                }
              }
            }}
            className={`px-2 py-1 sm:py-1.5 border border-[#0A0A0A] flex items-center gap-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase transition-all ${
              isSpeaking
                ? 'bg-[#EF4444] text-[#FFFFFF] animate-pulse border-[#EF4444]'
                : speechEnabled
                ? 'bg-[#0A0A0A] text-[#F6F3EC]'
                : 'bg-[#FAF8F5] text-[#0A0A0A] hover:bg-[#E2DBD0]'
            }`}
            title={
              isSpeaking
                ? (isTamil ? "உடனடியாக பேச்சை நிறுத்து" : "Stop Speaking Immediately")
                : speechEnabled
                ? (isTamil ? "குரல் வாசிப்பு இயக்கத்தில் உள்ளது (நிறுத்த கிளிக் செய்யவும்)" : "Voice Readout Active (Click to disable)")
                : (isTamil ? "குரல் வாசிப்பை இயக்கு" : "Enable Voice Readout")
            }
          >
            {isSpeaking ? (
              <>
                <Square className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                <span>{isTamil ? "நிறுத்து" : "STOP"}</span>
              </>
            ) : speechEnabled ? (
              <>
                <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">VOICE ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">VOICE OFF</span>
              </>
            )}
          </button>

          {/* Reset / Refresh Chat Button: Restores initial welcome message & stops speech */}
          <button
            onClick={handleResetChat}
            className="p-1 sm:p-1.5 border border-[#0A0A0A] bg-[#FAF8F5] text-[#0A0A0A] hover:bg-[#E2DBD0] transition-colors"
            title={isTamil ? "உரையாடலை மீட்டமை (வரவேற்பு செய்தி)" : "Reset Chat (Show Welcome Message)"}
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages: Internal-only scroll container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-3.5 bg-[#F6F3EC]/50 font-sans text-xs"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] p-3 sm:p-3.5 ${
                msg.sender === 'user'
                  ? 'bg-[#0A0A0A] text-[#F6F3EC] border border-[#0A0A0A] shadow-[2px_2px_0px_#6E6B65] sm:shadow-[3px_3px_0px_#6E6B65]'
                  : 'bg-[#FFFFFF] text-[#0A0A0A] border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A]'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed font-normal break-words text-[11px] sm:text-xs">
                {msg.text}
              </div>
              <div
                className={`mt-2 flex items-center justify-between text-[9px] sm:text-[10px] font-mono border-t pt-1.5 ${
                  msg.sender === 'user' ? 'border-[#333333] text-[#A99D8D]' : 'border-[#E2DBD0] text-[#6E6B65]'
                }`}
              >
                <span>{msg.source || 'COMMUTER'}</span>

                <div className="flex items-center gap-2">
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => {
                        if (isSpeaking && currentSpeakingId === msg.id) {
                          stopSpeech();
                        } else {
                          speakText(msg.text, msg.id);
                        }
                      }}
                      className={`flex items-center gap-1 px-1.5 py-0.5 border text-[8px] sm:text-[9px] uppercase font-mono font-bold transition-colors ${
                        isSpeaking && currentSpeakingId === msg.id
                          ? 'border-[#EF4444] bg-[#EF4444] text-[#FFFFFF]'
                          : 'border-[#0A0A0A] bg-[#FAF8F5] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FFFFFF]'
                      }`}
                      title={
                        isSpeaking && currentSpeakingId === msg.id
                          ? (isTamil ? "நிறுத்து" : "Stop")
                          : (isTamil ? "கேள் (குரல் வாசிப்பு)" : "Listen (Voice)")
                      }
                    >
                      {isSpeaking && currentSpeakingId === msg.id ? (
                        <>
                          <Square className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current" />
                          <span>{isTamil ? "நிறுத்து" : "STOP"}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          <span>{isTamil ? "கேள்" : "LISTEN"}</span>
                        </>
                      )}
                    </button>
                  )}
                  <span>{msg.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="p-2.5 sm:p-3 bg-[#FFFFFF] border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] font-mono text-[10px] sm:text-[11px] text-[#6E6B65] flex items-center gap-2">
              <RadarWaveSvg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A0A0A]" />
              <span>{isTamil ? "சிந்திக்கிறது..." : "Evaluating corridor parameters..."}</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts with Touch Swipe Horizontal Bar */}
      <div className="p-1.5 sm:p-2 bg-[#FAF8F5] border-t border-[#0A0A0A] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] sm:text-[11px]">
          {quickPrompts.slice(0, 4).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2 sm:px-2.5 py-1 border border-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#0A0A0A] hover:text-[#F6F3EC] transition-all shrink-0 max-w-[200px] sm:max-w-[240px] truncate"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-2.5 sm:p-3 bg-[#FFFFFF] border-t border-[#0A0A0A]">
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
            className="flex-1 bg-[#FAF8F5] text-[#0A0A0A] placeholder-[#6E6B65] text-xs px-3 py-2 sm:px-3.5 sm:py-2.5 border border-[#0A0A0A] focus:outline-none focus:bg-[#FFFFFF] font-mono transition-colors min-w-0"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#0A0A0A] text-[#F6F3EC] hover:bg-[#333333] disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>SEND</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>

    </div>
  );
}
