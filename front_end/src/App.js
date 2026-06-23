import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import ProfilePage from './pages/ProfilePage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import ApresentacaoTrabalhoPage from './pages/ApresentacaoPage';
import ProdutoPage from './pages/ProdutoPage';
import ProjetoEnsinoPage from './pages/ProjetoEnsinoPage';
import TrabalhosTecnicosPage from './pages/TrabalhosTecnicosPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />

            {/* Rotas públicas — busca e visualização de currículos (não exigem login) */}
            <Route path="/busca" element={<SearchPage />} />
            <Route path="/perfil/:id" element={<ProfilePage />} />

            {/* Rotas protegidas — existentes */}
            <Route path="/perfil" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/feed" element={<PrivateRoute><FeedPage /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><h1>Dashboard (protegido)</h1></PrivateRoute>} />

            {/* Rotas protegidas — produção acadêmica */}
            <Route path="/apresentacao" element={<PrivateRoute><ApresentacaoTrabalhoPage /></PrivateRoute>} />
            <Route path="/produto" element={<PrivateRoute><ProdutoPage /></PrivateRoute>} />
            <Route path="/projeto-ensino" element={<PrivateRoute><ProjetoEnsinoPage /></PrivateRoute>} />
            <Route path="/trabalhos-tecnicos" element={<PrivateRoute><TrabalhosTecnicosPage /></PrivateRoute>} />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;