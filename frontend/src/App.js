import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/chat/:roomId" element={<ChatRoom />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
