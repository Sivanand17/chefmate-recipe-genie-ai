
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChefHat, Send, Loader2 } from 'lucide-react';
import { getRecipeRecommendations } from '@/lib/ai';
import { useToast } from '@/components/ui/use-toast';

interface RecipeChatProps {
  onResults: (recipes: any[]) => void;
}

const RecipeChat = ({ onResults }: RecipeChatProps) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', content: string}[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m ChefMate AI. Tell me what ingredients you have or what kind of recipe you\'re looking for!'
    }
  ]);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!query.trim()) return;
    
    // Add user message to conversation
    const userMessage = query;
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);
    setQuery('');
    setLoading(true);
    
    try {
      // Get recipe recommendations
      const { message, recipes } = await getRecipeRecommendations(userMessage);
      
      // Add AI response to conversation
      setConversation(prev => [...prev, { role: 'assistant', content: message }]);
      
      // Pass recipes to parent component
      onResults(recipes);
    } catch (error) {
      console.error('Error getting recipes:', error);
      toast({
        title: "Couldn't get recipes",
        description: "Sorry, something went wrong. Please try again.",
        variant: "destructive"
      });
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I couldn't process that request. Could you try again?" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border shadow-sm bg-card">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <ChefHat className="h-5 w-5 text-chef-700" />
          <h3 className="font-semibold">Chat with ChefMate AI</h3>
        </div>
      </div>
      <div className="p-4 h-80 overflow-y-auto flex flex-col space-y-4">
        {conversation.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === 'user' 
                  ? 'bg-chef-100 text-chef-800' 
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted text-foreground flex items-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask about recipes or list your ingredients..."
          className="flex-1 bg-background rounded-md border border-input px-4 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          disabled={loading}
        />
        <Button 
          onClick={handleSendMessage} 
          className="ml-2 bg-chef-600 hover:bg-chef-700" 
          size="icon"
          disabled={loading || !query.trim()}
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default RecipeChat;
