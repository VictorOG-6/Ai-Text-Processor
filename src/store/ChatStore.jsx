import { create } from "zustand";

const useChatStore = create((set, get) => ({
  inputText: "",
  translatedText: "",
  summarizedText: "",
  targetLanguage: "es",
  chatHistory: [],
  isLoading: false,

  setInputText: (text) => set({ inputText: text }),

  setTargetLanguage: (lang) => set({ targetLanguage: lang }),

  addMessage: (message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),

  setIsLoading: (value) => set({ isLoading: value }),

  clearChat: () => set({ chatHistory: [] }),

  detectLanguage: async () => {
    const { inputText, setIsLoading, addMessage } = get();
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const detector = await self.ai.languageDetector.create();
      const [{ detectedLanguage, confidence }] = await detector.detect(
        inputText.trim()
      );

      return {
        detectedLanguage: new Intl.DisplayNames(["en"], {
          type: "language",
        }).of(detectedLanguage),
        detectedLanguageCode: detectedLanguage,
        confidence: (confidence * 100).toFixed(1),
      };
    } catch (error) {
      console.error("❌ Language detection failed:", error);
      addMessage({ role: "model", text: "Language detection failed." });
      return {
        detectedLanguage: "Unknown",
        detectedLanguageCode: "",
        confidence: 0,
      };
    } finally {
      setIsLoading(false);
    }
  },

  handleUserMessage: async () => {
    const { inputText, detectLanguage, addMessage, setInputText } = get();
    const userMessage = inputText.trim();
    if (!userMessage) return;

    // Detect language before adding the message
    const { detectedLanguage, detectedLanguageCode, confidence } =
      await detectLanguage();

    addMessage({
      role: "user",
      text: userMessage,
      detectedLanguage,
      detectedLanguageCode,
      confidence,
    });

    setInputText("");
  },

  translateText: async (message) => {
    const { targetLanguage, addMessage, setIsLoading } = get();
    if (!message.text.trim() || !message.detectedLanguageCode) return;

    setIsLoading(true);
    try {
      const translator = await self.ai.translator.create({
        sourceLanguage: message.detectedLanguageCode,
        targetLanguage,
      });
      const translation = await translator.translate(message.text.trim());
      addMessage({ role: "model", text: translation });
    } catch (error) {
      console.error("❌ Translation failed:", error);
      addMessage({ role: "model", text: "Translation failed." });
    } finally {
      setIsLoading(false);
    }
  },

  summarizeText: async (message) => {
    const { setIsLoading } = get();
    if (!message.text.trim()) return;

    setIsLoading(true);
    try {
      const summarizer = await self.ai.summarizer.create();
      const summary = await summarizer.summarize(message.text.trim());
      get().addMessage({ role: "model", text: `📝 Summary: ${summary}` });
    } catch (error) {
      console.error("❌ Summarization failed:", error);
      get().addMessage({ role: "model", text: "Summarization failed." });
    } finally {
      setIsLoading(false);
    }
  },
}));

export default useChatStore;
