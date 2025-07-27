import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simular respuesta del bot
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
      return 'El Acachul necesita riego moderado. Verifica que el suelo esté húmedo pero no encharcado. En épocas de calor, riega 2-3 veces por semana, en invierno reduce a 1 vez por semana.';
    }
    
    if (input.includes('amarill') || input.includes('hoja')) {
      return 'Las hojas amarillas pueden indicar varios problemas: exceso de agua, falta de nutrientes o luz inadecuada. ¿Podrías describir más detalles sobre el estado de las hojas?';
    }
    
    if (input.includes('plaga') || input.includes('insecto')) {
      return 'Para detectar plagas en el Acachul, revisa el envés de las hojas. Los áfidos y araña roja son comunes. Te recomiendo usar jabón potásico o aceite de neem como tratamiento orgánico.';
    }
    
    if (input.includes('luz') || input.includes('sol')) {
      return 'El Acachul prefiere luz indirecta brillante. Evita la luz solar directa que puede quemar las hojas. Un lugar cerca de una ventana con cortina es ideal.';
    }
    
    if (input.includes('fertiliz') || input.includes('abono')) {
      return 'Fertiliza tu Acachul cada 2-3 semanas durante la primavera y verano con un fertilizante líquido equilibrado diluido al 50%. En otoño e invierno reduce a una vez al mes.';
    }

    return 'Gracias por tu pregunta. Para darte una respuesta más precisa, ¿podrías proporcionar más detalles sobre el problema específico que observas en tu planta?';
  };

  const quickQuestions = [
    "¿Cada cuánto debo regar mi Acachul?",
    "Mi planta tiene hojas amarillas, ¿qué hago?",
    "¿Qué fertilizante recomiendan?",
    "¿Cómo detectar plagas en las hojas?"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <MessageSquare className="h-8 w-8 mr-3 text-primary" />
           Yol Ná
          </h1>
          <p className="text-muted-foreground mt-2">
            Haz cualquier pregunta sobre tu planta que tenga en mente.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat principal */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Chat con el Asistente YolNá
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.sender === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-accent text-accent-foreground'
                          }`}
                        >
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
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
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe tu pregunta sobre plantas..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button onClick={handleSendMessage} disabled={isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Preguntas frecuentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Preguntas Frecuentes
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

            {/* Consejos rápidos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Consejos del día</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-3 text-xs">
                  <div className="p-2 bg-primary-light rounded">
                    <p className="font-medium text-primary">💧 Riego</p>
                    <p className="text-muted-foreground">Verifica la humedad del suelo antes de regar</p>
                  </div>
                  <div className="p-2 bg-accent/10 rounded">
                    <p className="font-medium text-accent">☀️ Luz</p>
                    <p className="text-muted-foreground">Rota la maceta para crecimiento uniforme</p>
                  </div>
                  <div className="p-2 bg-success/10 rounded">
                    <p className="font-medium text-success">🌱 Nutrición</p>
                    <p className="text-muted-foreground">Fertiliza durante la época de crecimiento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};