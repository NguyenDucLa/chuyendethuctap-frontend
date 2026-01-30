import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { sendMessageToBot } from '../services/courtService'; // Import hàm vừa thêm

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng
    const [input, setInput] = useState('');
    
    // Tin nhắn mặc định ban đầu
    const [messages, setMessages] = useState([
        { text: "Chào bạn! Tôi là trợ lý AI. Tôi có thể tra cứu giá, địa chỉ và thông tin sân bóng thật trong hệ thống. Bạn cần tìm gì?", sender: "bot" }
    ]);
    
    const [isTyping, setIsTyping] = useState(false); // Trạng thái đang gõ
    const messagesEndRef = useRef(null);

    // Tự động cuộn xuống cuối khi có tin nhắn mới
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, isOpen]);

    // Xử lý gửi tin nhắn
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setInput(''); // Xóa ô nhập liệu

        // 1. Hiện tin nhắn của người dùng ngay lập tức
        setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
        setIsTyping(true); // Bật hiệu ứng "Đang trả lời..."

        try {
            // 2. Gọi API xuống Backend để lấy câu trả lời thật
            const reply = await sendMessageToBot(userMsg);
            
            // 3. Hiện câu trả lời của Bot
            setMessages(prev => [...prev, { text: reply, sender: "bot" }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "Xin lỗi, tôi không kết nối được với máy chủ.", sender: "bot" }]);
        } finally {
            setIsTyping(false); // Tắt hiệu ứng
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
            
            {/* 1. NÚT TRÒN ĐỂ BẬT/TẮT CHATBOT */}
            {!isOpen && (
                <Button 
                    variant="warning" 
                    className="rounded-circle shadow-lg p-0 d-flex align-items-center justify-content-center"
                    style={{ width: '60px', height: '60px', border: '2px solid white' }}
                    onClick={() => setIsOpen(true)}
                >
                    <i className="bi bi-chat-dots-fill fs-3 text-dark"></i>
                </Button>
            )}

            {/* 2. CỬA SỔ CHAT */}
            {isOpen && (
                <Card className="shadow-lg border-0" style={{ width: '350px', height: '500px', display: 'flex', flexDirection: 'column', borderRadius: '15px', overflow: 'hidden' }}>
                    
                    {/* Header */}
                    <div className="bg-warning p-3 d-flex justify-content-between align-items-center text-dark">
                        <div className="fw-bold d-flex align-items-center">
                            <i className="bi bi-robot fs-4 me-2"></i> 
                            <span>Trợ lý ảo AI </span>
                        </div>
                        <Button variant="link" size="sm" className="text-dark p-0" onClick={() => setIsOpen(false)}>
                            <i className="bi bi-x-lg fs-5"></i>
                        </Button>
                    </div>

                    {/* Body (Nội dung chat) */}
                    <div className="flex-grow-1 p-3 overflow-auto" style={{ backgroundColor: '#f1f1f1' }}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                                <div 
                                    className={`p-2 px-3 rounded-4 shadow-sm ${
                                        msg.sender === 'user' 
                                        ? 'bg-dark text-white rounded-tr-none' 
                                        : 'bg-white text-dark rounded-tl-none'
                                    }`}
                                    style={{ maxWidth: '80%', fontSize: '0.95rem', borderTopRightRadius: msg.sender === 'user' ? '0' : '1rem', borderTopLeftRadius: msg.sender === 'bot' ? '0' : '1rem' }}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        
                        {/* Hiệu ứng đang gõ (Typing indicator) */}
                        {isTyping && (
                            <div className="d-flex justify-content-start mb-3">
                                <div className="bg-white text-secondary p-2 px-3 rounded-4 shadow-sm fst-italic" style={{ fontSize: '0.8rem', borderTopLeftRadius: '0' }}>
                                    <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true"></span>
                                    Đang suy nghĩ...
                                </div>
                            </div>
                        )}
                        
                        {/* Div rỗng để cuộn xuống */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer (Ô nhập liệu) */}
                    <div className="p-2 border-top bg-white">
                        <Form onSubmit={handleSend} className="d-flex gap-2 align-items-center">
                            <Form.Control 
                                type="text" 
                                placeholder="Hỏi giá, sân nào trống..." 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="border-secondary rounded-pill px-3"
                                autoFocus
                            />
                            <Button variant="dark" type="submit" className="rounded-circle" style={{width: '40px', height: '40px', padding: 0}} disabled={isTyping}>
                                <i className="bi bi-send-fill"></i>
                            </Button>
                        </Form>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Chatbot;