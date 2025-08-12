import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User, Lightbulb, ImagePlus, Camera, HelpCircle, Info } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string;
}

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola, Soy Yol ná ! ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setSelectedImage(null);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('agua') || input.includes('riego')) {
      return 'El Acachul necesita riego moderado. Verifica que el suelo esté húmedo pero no encharcado.';
    }
    if (input.includes('amarill') || input.includes('hoja')) {
      return 'Las hojas amarillas pueden indicar exceso de agua, falta de nutrientes o poca luz.';
    }
    if (input.includes('plaga') || input.includes('insecto')) {
      return 'Revisa el envés de las hojas, podrías encontrar áfidos o araña roja.';
    }
    if (input.includes('luz') || input.includes('sol')) {
      return 'Prefiere luz indirecta brillante, evita el sol directo.';
    }
    if (input.includes('fertiliz') || input.includes('abono')) {
      return 'Fertiliza cada 2-3 semanas en primavera y verano.';
    }
    return 'Podrías darme más detalles para ayudarte mejor.';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const quickQuestions = [
    "¿Cada cuánto debo regar mi Acachul?",
    "Mi planta tiene hojas amarillas, ¿qué hago?",
    "¿Qué fertilizante recomiendan?",
    "¿Cómo detectar plagas en las hojas?"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground flex items-center">
            <MessageSquare className="h-7 w-7 mr-2 text-primary" />
            Chat con el asistente
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Haz cualquier pregunta sobre tu planta o adjunta una imagen.
          </p>
        </div>

        {/* Instrucciones en Cards horizontales */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Card className="flex-1">
            <CardContent className="p-3 flex items-center gap-3">
              <HelpCircle className="text-primary h-6 w-6" />
              <p className="text-sm">Escribe tu pregunta en la barra inferior.</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-3 flex items-center gap-3">
              <Camera className="text-primary h-6 w-6" />
              <p className="text-sm">Adjunta una imagen para mejor diagnóstico.</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-3 flex items-center gap-3">
              <Info className="text-primary h-6 w-6" />
              <p className="text-sm">Usa preguntas rápidas si no sabes por dónde empezar.</p>
            </CardContent>
          </Card>
        </div>

        {/* Chat */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat principal */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Yol Ná
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[26rem] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-accent text-accent-foreground'
                          }`}
                        >
                          {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.image && (
                            <img
                              src={message.image}
                              alt="Adjunto"
                              className="max-w-[120px] rounded mb-2"
                            />
                          )}
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Barra de entrada */}
              <div className="p-4 border-t flex space-x-2 items-center">
                <label className="cursor-pointer">
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <Button onClick={handleSendMessage} disabled={isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Preguntas rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Preguntas Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full text-left text-xs h-auto p-2 justify-start whitespace-normal"
                      onClick={() => setInputMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
