import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { api } from '../lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface CloudHelmAssistantProps {
  repositoryId?: string;
  repositoryName?: string;
}

export default function CloudHelmAssistant({ repositoryId, repositoryName }: CloudHelmAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Helper to render message content with basic markdown support
  const renderMessageContent = (content: string) => {
    // Split by code blocks
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Code block
        const code = part.slice(3, -3).trim();
        return (
          <pre key={index} className="bg-black/30 rounded p-2 my-2 overflow-x-auto text-xs">
            <code className="text-green-400">{code}</code>
          </pre>
        );
      } else {
        // Regular text with inline code
        const textParts = part.split(/(`[^`]+`)/g);
        return (
          <span key={index}>
            {textParts.map((textPart, i) => {
              if (textPart.startsWith('`') && textPart.endsWith('`')) {
                return (
                  <code key={i} className="bg-black/30 px-1.5 py-0.5 rounded text-xs text-cyan-400">
                    {textPart.slice(1, -1)}
                  </code>
                );
              }
              return <span key={i}>{textPart}</span>;
            })}
          </span>
        );
      }
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Call Mistral AI through backend API
      const response = await api.queryAssistant({
        repository_id: repositoryId,
        repository_name: repositoryName,
        query: currentInput,
        context_type: 'general',
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message || 'Failed to get response'}. Please make sure MISTRAL_API_KEY is configured in the backend.`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl animate-pulse"></div>
            
            {/* Button */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.7)] transition-all duration-300 hover:scale-110">
              <Sparkles className="w-6 h-6 text-white" />
              
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-75"></div>
            </div>
          </div>
        </button>
      )}

      {/* Assistant Popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] h-[600px] flex flex-col bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-900"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                  <span className="text-sm font-semibold text-indigo-300">CloudHelm Assistant</span>
                </div>
                <span className="text-[10px] text-zinc-500">v2.1 Model • Powered by Mistral AI</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          {/* Repository Context */}
          {repositoryName && (
            <div className="px-4 py-2 bg-indigo-500/10 border-b border-indigo-500/20">
              <p className="text-xs text-indigo-300">
                <span className="font-medium">Analyzing:</span> {repositoryName}
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 border border-indigo-500/20">
                  <Sparkles className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">CloudHelm Assistant</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  I can help you analyze code, run tests, find errors, and provide solutions for incidents.
                </p>
                <div className="w-full space-y-2 text-left">
                  <button
                    onClick={() => setInput('/help')}
                    className="w-full p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg text-xs text-zinc-300 text-left transition-colors border border-zinc-700/50"
                  >
                    🤖 Show CLI commands
                  </button>
                  <button
                    onClick={() => setInput('/test')}
                    className="w-full p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg text-xs text-zinc-300 text-left transition-colors border border-zinc-700/50"
                  >
                    🧪 Run tests
                  </button>
                  <button
                    onClick={() => setInput('/lint')}
                    className="w-full p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg text-xs text-zinc-300 text-left transition-colors border border-zinc-700/50"
                  >
                    🔍 Run linter
                  </button>
                  <button
                    onClick={() => setInput('/errors')}
                    className="w-full p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg text-xs text-zinc-300 text-left transition-colors border border-zinc-700/50"
                  >
                    🐛 Find errors
                  </button>
                  <button
                    onClick={() => setInput('Analyze the latest release for potential issues')}
                    className="w-full p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg text-xs text-zinc-300 text-left transition-colors border border-zinc-700/50"
                  >
                    💡 Analyze latest release
                  </button>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-indigo-500/20 border border-indigo-500/30 text-white'
                      : 'bg-zinc-800/50 border border-zinc-700/50 text-zinc-300'
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {renderMessageContent(message.content)}
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>

                {message.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-zinc-400">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-3/4 bg-zinc-800 rounded animate-pulse"></div>
                  <div className="h-2 w-1/2 bg-zinc-800 rounded animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 bg-zinc-900/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask questions or use /help for CLI commands..."
                className="flex-1 px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-zinc-600 mt-2 text-center">
              Powered by Mistral AI • Type /help for CLI commands
            </p>
          </div>
        </div>
      )}
    </>
  );
}
