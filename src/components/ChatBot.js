import { useState, useRef, useEffect } from 'react';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟ 💜', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // الردود التلقائية
  const botResponses = {
    'حزينة': 'أنا آسفة أنك تشعرين بالحزن. تذكري أن هذه المشاعر مؤقتة وستزول. هل ترغبين في تجربة تمرين تنفس؟ 🌬️',
    'قلقة': 'القلق شعور صعب، لكن تذكري أنك قوية وقادرة على تخطيه. جربي أخذ نفس عميق ٥ مرات مع التركيز على الزفير 🧘‍♀️',
    'تعبانة': 'أرى أنك متعبة. لا تنسي أخذ قسط من الراحة، وشرب كوب ماء. صحتك النفسية مهمة 💜',
    'غضبانة': 'الغضب شعور طبيعي، لكن لا تدعيه يتحكم بك. جربي العد للعشرة أو المشي قليلاً 🚶‍♀️',
    'سعيدة': 'أنا سعيدة لأنك تشعرين بالسعادة! شاركي هذه المشاعر مع من تحبين ✨',
    'تمرين': 'تمرين التنفس: خذي شهيق عميق لمدة ٤ ثوان، احبسي النفس ٤ ثوان، ثم زفير لمدة ٦ ثوان. كرري ٥ مرات 🌬️',
    'شكراً': 'العفو! أنا هنا دائماً لدعمك 💜',
    'مساعدة': 'يمكنك التحدث معي عن مشاعرك، أو طلب تمرين تنفس، أو التحدث عن أي شيء يقلقك 💬',
    'اهدا': 'أغمضي عينيك وتخيلي مكاناً هادئاً تحبينه. خذي ٣ أنفاس عميقة وبطيئة 🌊',
    'نفس': 'تمرين التنفس العميق: استلقي أو اجلسي بوضع مريح، ضعي يدك على بطنك، خذي شهيق عميق حتى تشعرين ببطنك يرتفع، ثم زفير ببطء. كرري ١٠ مرات 🌬️',
    'دورة': 'تذكري أن التغيرات الهرمونية أثناء الدورة الشهرية قد تؤثر على مزاجك. هذا طبيعي تماماً 💜',
    'نوم': 'النوم الجيد مهم جداً لصحتك النفسية. حاولي النوم والاستيقاظ في نفس الوقت يومياً، وتجنبي الشاشات قبل النوم بساعة 😴'
  };

  // التمرير لآخر رسالة
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // معالجة إرسال الرسالة
  const handleSend = () => {
    if (!inputText.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // توليد رد البوت
    setTimeout(() => {
      const botMessage = generateResponse(inputText);
      setMessages(prev => [...prev, { text: botMessage, sender: 'bot' }]);
    }, 500);

    setInputText('');
  };

  // توليد الرد
  const generateResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    
    // البحث عن كلمة مفتاحية في الرسالة
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowercaseInput.includes(keyword)) {
        return response;
      }
    }
    
    // رد افتراضي إذا لم يجد
    const defaultResponses = [
      'أشعر بك، هل تريدين التحدث أكثر عن مشاعرك؟ 💜',
      'أنا هنا من أجلك، أخبريني كيف يمكنني مساعدتك؟',
      'كل المشاعر مسموحة، أخبريني ما يدور في ذهنك؟',
      'تذكري أن الاهتمام بصحتك النفسية مهم جداً. كيف تشعرين الآن؟',
      'أتفهم ذلك، هل هناك شيء محدد تريدين التحدث عنه؟'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // الضغط على Enter للإرسال
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* زر فتح الشات */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 bg-purple-600 hover:bg-purple-700 text-white w-16 h-16 rounded-full text-3xl shadow-lg hover:shadow-xl transition duration-300 animate-bounce"
      >
        💬
      </button>

      {/* نافذة الشات */}
      {isOpen && (
        <div className="fixed bottom-24 left-8 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
          {/* Header */}
          <div className="bg-purple-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <h3 className="text-white font-bold">مساعد MoodMate</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتبي رسالتك..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSend}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;