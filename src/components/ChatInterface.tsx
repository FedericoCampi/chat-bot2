'use client'

import { useState } from 'react';
import { Send, Moon, Sun, MessageCircle, X } from 'lucide-react';
import { questions } from '@/lib/data'; // Asegúrate de que la ruta sea correcta

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: "Hola, ¿en qué puedo ayudarte hoy?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      // Agregar el mensaje del usuario
      setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
      const userMessage = inputMessage.trim();

      // Respuesta del bot
      if (userMessage) {
        const questionNumber = parseInt(userMessage); // Convertir el mensaje a número

        // Verificar si el número es válido y está dentro del rango
        if (questionNumber >= 1 && questionNumber <= questions.length) {
          const response = questions[questionNumber - 1].response; // Obtener la respuesta correspondiente
          setMessages(prev => [
            ...prev,
            { text: response, isBot: true }
          ]);
        } else {
          // Si el número no es válido, mostrar las preguntas nuevamente
          const questionsList = questions.map((q, index) => `${index + 1}: ${q.question}`).join('\n');
          setMessages(prev => [
            ...prev,
            { text: `Por favor, elige una pregunta:\n${questionsList}`, isBot: true }
          ]);
        }
      }
      setInputMessage(""); // Limpiar el campo de entrada
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className={`fixed bottom-4 right-4 ${isDarkMode ? 'dark' : ''}`}>
      <button
        onClick={toggleChat}
        className={`${
          isChatOpen ? 'hidden' : 'flex'
        } items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <div
        className={`${
          isChatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        } origin-bottom-right transition-all duration-300 ease-in-out fixed bottom-4 right-4 w-80 sm:w-96 h-[32rem] flex flex-col rounded-lg shadow-xl overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h2 className="text-lg font-semibold">Chatbot</h2>
          <div className="flex items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={toggleChat} className="p-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-4`}>
              <div className={`max-w-[75%] rounded-lg p-3 ${message.isBot ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white' : 'bg-blue-500 text-white'}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700 flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe un número de pregunta..."
            className="flex-1 p-2 mr-2 rounded-md border dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}