// ===== CONFIGURATION =====
const GROQ_API_KEY = "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";
const MODEL = "llama3-70b-8192"; // or "llama3-70b-8192" for Llama 3

// ===== DEVICE CONTROL =====
const devices = {
    // Lighting
    'all-lights': { status: 'on', type: 'light', location: 'all rooms' },
    'living-room-lights': { status: 'on', type: 'light', location: 'living room' },
    'kitchen-lights': { status: 'off', type: 'light', location: 'kitchen' },
    'bedroom-lights': { status: 'off', type: 'light', location: 'bedroom' },
    'bathroom-lights': { status: 'off', type: 'light', location: 'bathroom' },
    'garage-lights': { status: 'on', type: 'light', location: 'garage' },
    
    // Climate
    'ac-unit': { status: 'off', type: 'ac', location: 'living room', temp: 22 },
    'heating-system': { status: 'off', type: 'heater', location: 'whole house', temp: 20 },
    
    // Security
    'cctv-system': { status: 'standby', type: 'security', location: 'whole house' },
    'alarm-system': { status: 'off', type: 'security', location: 'whole house' },
    
    // Appliances
    'coffee-maker': { status: 'off', type: 'appliance', location: 'kitchen' },
    'garage-door': { status: 'closed', type: 'door', location: 'garage' }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log("HomeGenius initialized");
    
    // Initialize all devices to their correct state
    Object.keys(devices).forEach(deviceId => {
        const device = devices[deviceId];
        const deviceElement = document.getElementById(deviceId);
        if (deviceElement) {
            updateDeviceUI(deviceId, device.status);
            
            // Set temperature if applicable
            if (device.temp !== undefined) {
                const tempDisplay = deviceElement.querySelector('.temp-display');
                if (tempDisplay) {
                    tempDisplay.textContent = `${device.temp}°C`;
                }
            }
        }
    });
    
    // Set up event delegation for device controls
    document.querySelector('.dashboard')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.control-btn');
        if (!btn) return;
        
        const deviceId = btn.dataset.device;
        const action = btn.dataset.action;
        
        if (deviceId && action) {
            if (action === 'temp-up' || action === 'temp-down') {
                adjustTemperature(deviceId, action);
            } else {
                controlDevice(deviceId, action);
            }
        }
    });

    // Set up chat interface
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    // Initialize voice control if available
    initVoiceControl();
});

// ===== DEVICE CONTROL FUNCTIONS =====
function updateDeviceUI(deviceId, status) {
    const deviceElement = document.getElementById(deviceId);
    if (!deviceElement) return;
    
    const statusElement = deviceElement.querySelector('.device-status');
    if (!statusElement) return;
    
    // Clear all status classes first
    deviceElement.classList.remove('on', 'off', 'standby');
    statusElement.classList.remove('status-on', 'status-off', 'status-standby');
    
    // Set current state
    if (status === 'on') {
        deviceElement.classList.add('on');
        statusElement.classList.add('status-on');
        statusElement.textContent = 'ON';
    } 
    else if (status === 'off') {
        deviceElement.classList.add('off');
        statusElement.classList.add('status-off');
        statusElement.textContent = 'OFF';
    }
    else if (status === 'standby') {
        deviceElement.classList.add('standby');
        statusElement.classList.add('status-standby');
        statusElement.textContent = 'STANDBY';
    }
}

function controlDevice(deviceId, action) {
    const deviceData = devices[deviceId];
    if (!deviceData) return;
    
    // Special case for "all-lights"
    if (deviceId === 'all-lights') {
        if (action === 'on' || action === 'off') {
            // Update all individual lights
            Object.keys(devices).forEach(id => {
                if (devices[id].type === 'light' && id !== 'all-lights') {
                    devices[id].status = action;
                    updateDeviceUI(id, action);
                }
            });
        }
    }
    
    // Update the specific device
    deviceData.status = action;
    updateDeviceUI(deviceId, action);
    
    addMessage('bot', `✅ ${deviceId.replace(/-/g, ' ')} set to ${action.toUpperCase()}`);
    console.log(`Device control: ${deviceId} -> ${action}, Current status: ${deviceData.status}`);
}

function adjustTemperature(deviceId, action) {
    const device = devices[deviceId];
    if (!device || !device.temp) return;
    
    // First ensure device is on
    if (device.status !== 'on') {
        controlDevice(deviceId, 'on');
    }
    
    const tempDisplay = document.querySelector(`#${deviceId} .temp-display`);
    if (!tempDisplay) return;
    
    if (action === 'temp-up') {
        device.temp = Math.min(30, device.temp + 1);
    } else if (action === 'temp-down') {
        device.temp = Math.max(16, device.temp - 1);
    }
    
    tempDisplay.textContent = `${device.temp}°C`;
    addMessage('bot', `✅ ${deviceId.replace(/-/g, ' ')} temperature set to ${device.temp}°C`);
}

// ===== CHAT INTERFACE FUNCTIONS =====
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const voiceButton = document.getElementById('voice-btn');

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function createTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<div class="typing-dot"></div>'.repeat(3);
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingIndicator;
}

// ===== GROQ API INTEGRATION =====
async function callGroqAPI(message) {
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: "system",
                        content: `You are HomeGenius, an AI assistant that controls smart home devices and answers general questions.
                                Available devices: ${JSON.stringify(devices)}.
                                
                                When the user asks to control devices:
                                - Respond with brief confirmation messages starting with ✅
                                - Format: "✅ [device] set to [status]"
                                - For temperature changes: "✅ [device] temperature set to [value]°C"
                                
                                For home-related questions (status, capabilities):
                                - Provide concise answers with relevant device information
                                
                                For all other questions:
                                - Provide helpful, detailed answers
                                - You can discuss any topic
                                - Current date: ${new Date().toLocaleDateString()}
                                
                                Always maintain a friendly, professional tone.`
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error("Groq API Error:", error);
        return "⚠️ I'm having trouble connecting to the AI service. Please try again later.";
    }
}

// ===== MESSAGE HANDLING =====
async function handleSendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage('user', message);
    userInput.value = '';

    // Show typing indicator
    const typingIndicator = createTypingIndicator();

    try {
        // First check for direct device commands
        const deviceResponse = handleDeviceCommand(message);
        if (deviceResponse) {
            addMessage('bot', deviceResponse);
        } else {
            // For all other queries, use Groq API
            const response = await callGroqAPI(message);
            addMessage('bot', response);
        }
    } catch (error) {
        addMessage('bot', "⚠️ Sorry, I encountered an error processing your request.");
        console.error("Error:", error);
    } finally {
        setTimeout(() => {
            typingIndicator.remove();
        }, 500);
    }
}

function handleDeviceCommand(message) {
    const deviceCommands = {
        "turn on": "on",
        "switch on": "on",
        "turn off": "off", 
        "switch off": "off",
        "activate": "on",
        "deactivate": "off",
        "set to": "temp"
    };

    const lowerMsg = message.toLowerCase();
    
    for (const [cmd, action] of Object.entries(deviceCommands)) {
        if (lowerMsg.includes(cmd)) {
            const device = findDeviceInMessage(lowerMsg);
            if (device) {
                if (action === "temp") {
                    const tempMatch = lowerMsg.match(/\d+/);
                    if (tempMatch) {
                        const temp = parseInt(tempMatch[0]);
                        if (temp >= 16 && temp <= 30) {
                            devices[device.id].temp = temp;
                            document.querySelector(`#${device.id} .temp-display`).textContent = `${temp}°C`;
                            return `✅ ${device.name} temperature set to ${temp}°C`;
                        }
                    }
                } else {
                    controlDevice(device.id, action);
                    return `✅ ${device.name} set to ${action.toUpperCase()}`;
                }
            }
        }
    }
    return null;
}

function findDeviceInMessage(message) {
    const deviceMap = [
        { id: 'all-lights', names: ['all lights', 'every light', 'all the lights'] },
        { id: 'living-room-lights', names: ['living room', 'living room lights', 'lounge lights'] },
        { id: 'kitchen-lights', names: ['kitchen', 'kitchen lights'] },
        { id: 'bedroom-lights', names: ['bedroom', 'master bedroom', 'bedroom lights'] },
        { id: 'bathroom-lights', names: ['bathroom', 'bathroom lights'] },
        { id: 'garage-lights', names: ['garage', 'garage lights'] },
        { id: 'ac-unit', names: ['ac', 'air conditioning', 'air conditioner'] },
        { id: 'heating-system', names: ['heating', 'heater', 'central heating'] },
        { id: 'cctv-system', names: ['cctv', 'security cameras', 'cameras'] },
        { id: 'alarm-system', names: ['alarm', 'security alarm'] },
        { id: 'coffee-maker', names: ['coffee maker', 'coffee machine'] },
        { id: 'garage-door', names: ['garage door'] }
    ];
    
    for (const device of deviceMap) {
        for (const name of device.names) {
            if (message.toLowerCase().includes(name)) {
                return {
                    id: device.id,
                    name: device.names[0]
                };
            }
        }
    }
    return null;
}

// ===== VOICE CONTROL =====
function initVoiceControl() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        voiceButton.addEventListener('click', () => {
            if (voiceButton.classList.contains('listening')) {
                recognition.stop();
                voiceButton.classList.remove('listening');
            } else {
                recognition.start();
                voiceButton.classList.add('listening');
                addMessage('bot', "🎤 Listening... Speak now");
            }
        });
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            handleSendMessage();
            voiceButton.classList.remove('listening');
        };
        
        recognition.onerror = (event) => {
            console.error('Voice recognition error', event.error);
            voiceButton.classList.remove('listening');
            addMessage('bot', "⚠️ Sorry, I didn't catch that. Please try again.");
        };
    } else {
        voiceButton.style.display = 'none';
    }
}