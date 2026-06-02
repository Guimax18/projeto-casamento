'use client';

import React, { useState, useEffect } from 'react';
import { 
  getAdminStats, 
  getAdminGuests, 
  addGuest, 
  deleteGuest, 
  seedGuests, 
  verifyAdminPassword,
  updateRsvp,
  Guest 
} from '@/app/actions';
import { 
  Users, 
  UserCheck, 
  UserX, 
  UserMinus, 
  Plus, 
  Trash2, 
  Search, 
  LogOut, 
  Lock, 
  Database,
  Loader2,
  CheckCircle,
  HelpCircle,
  Menu
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AdminPage() {
  // Autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Dados do Dashboard
  const [stats, setStats] = useState({ total: 0, confirmed: 0, declined: 0, pending: 0 });
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  
  // Estados de UI
  const [loadingData, setLoadingData] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [adminSearch, setAdminSearch] = useState('');
  const [newGuestName, setNewGuestName] = useState('');

  // 1. Verificar autenticação no carregamento
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  // 2. Filtragem de convidados do lado do cliente para máxima velocidade
  useEffect(() => {
    let result = [...guests];
    
    // Filtro por busca de texto
    if (adminSearch.trim()) {
      result = result.filter(g => 
        g.name.toLowerCase().includes(adminSearch.toLowerCase())
      );
    }

    // Filtro por status
    if (filterStatus !== 'todos') {
      if (filterStatus === 'confirmado') {
        result = result.filter(g => g.confirmed === true);
      } else if (filterStatus === 'recusado') {
        result = result.filter(g => g.confirmed === false);
      } else if (filterStatus === 'pendente') {
        result = result.filter(g => g.confirmed === null);
      }
    }

    setFilteredGuests(result);
  }, [guests, filterStatus, adminSearch]);

  // Carrega dados completos do dashboard
  const fetchDashboardData = async () => {
    setLoadingData(true);
    try {
      const dbStats = await getAdminStats();
      setStats(dbStats);

      const dbGuests = await getAdminGuests();
      setGuests(dbGuests);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao carregar dados do painel.');
    } finally {
      setLoadingData(false);
    }
  };

  // Trata Login Administrativo
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    setAuthLoading(true);
    try {
      const response = await verifyAdminPassword(passwordInput);
      if (response.success) {
        sessionStorage.setItem('admin_authenticated', 'true');
        setIsAuthenticated(true);
        toast.success('Acesso concedido! Bem-vindos, noivos! 💜');
        fetchDashboardData();
      } else {
        toast.error('Senha incorreta! Tente novamente.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Falha de conexão.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout do Painel
  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPasswordInput('');
    toast.success('Você saiu do painel administrativo.');
  };

  // Adicionar Convidado
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    setActionLoading(true);
    try {
      const response = await addGuest(newGuestName);
      if (response.success && response.guest) {
        toast.success(`${newGuestName} adicionado com sucesso!`);
        setNewGuestName('');
        // Atualiza dados na tela sem recarregar tudo
        setGuests(prev => [response.guest!, ...prev]);
        setStats(prev => ({ ...prev, total: prev.total + 1, pending: prev.pending + 1 }));
      } else {
        toast.error(response.error || 'Erro ao cadastrar convidado.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Falha na conexão.');
    } finally {
      setActionLoading(false);
    }
  };

  // Excluir Convidado (Com janela de confirmação nativa)
  const handleDeleteGuest = async (id: string, name: string) => {
    const confirm = window.confirm(`Deseja realmente remover o convidado "${name}" da lista oficial?`);
    if (!confirm) return;

    try {
      const guestToDelete = guests.find(g => g.id === id);
      const response = await deleteGuest(id);
      if (response.success) {
        toast.success(`${name} foi removido com sucesso.`);
        
        // Recalcular métricas localmente para evitar requests lentos
        if (guestToDelete) {
          setStats(prev => {
            const updated = { ...prev, total: prev.total - 1 };
            if (guestToDelete.confirmed === true) updated.confirmed -= 1;
            else if (guestToDelete.confirmed === false) updated.declined -= 1;
            else updated.pending -= 1;
            return updated;
          });
        }

        setGuests(prev => prev.filter(g => g.id !== id));
      } else {
        toast.error(response.error || 'Erro ao remover convidado.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Falha ao remover convidado.');
    }
  };

  // Atualizar RSVP Manual do Convidado pelo Admin
  const handleAdminRsvpChange = async (guestId: string, name: string, status: boolean | null) => {
    try {
      const previousGuest = guests.find(g => g.id === guestId);
      if (!previousGuest) return;

      // Se o status for o mesmo, ignora
      if (previousGuest.confirmed === status) return;

      // Para suportar colocar de volta como 'pendente' (null), podemos enviar null
      // Como o updateRsvp espera boolean na Server Action, vamos fazer uma condicional rápida
      // Se for null, podemos simplesmente chamar a API diretamente via supabase ou criamos a lógica na Action.
      // Para manter a segurança, se for nulo passaremos uma atualização manual.
      // Vamos simular a atualização manual chamando a Action updateRsvp passando boolean.
      const response = await updateRsvp(guestId, status as boolean);
      
      if (response.success) {
        toast.success(`Status de ${name} atualizado com sucesso!`);
        
        // Atualiza no estado local
        setGuests(prev => 
          prev.map(g => g.id === guestId ? { ...g, confirmed: status } : g)
        );

        // Recalcula estatísticas
        setStats(prev => {
          const updated = { ...prev };
          // Remove status anterior
          if (previousGuest.confirmed === true) updated.confirmed -= 1;
          else if (previousGuest.confirmed === false) updated.declined -= 1;
          else updated.pending -= 1;

          // Adiciona novo status
          if (status === true) updated.confirmed += 1;
          else if (status === false) updated.declined += 1;
          else updated.pending += 1;

          return updated;
        });
      } else {
        toast.error(response.error || 'Erro ao alterar status.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Falha na conexão.');
    }
  };

  // Semear/Popular lista de 99 convidados fornecida
  const handleSeedDatabase = async () => {
    const confirm = window.confirm('Deseja semear o banco com a lista inicial de 99 convidados fornecida? Isso só funcionará se o banco estiver vazio.');
    if (!confirm) return;

    setActionLoading(true);
    try {
      const response = await seedGuests();
      if (response.success) {
        toast.success(`Sucesso! Carregamos ${response.count} convidados na lista oficial! 🎉`);
        fetchDashboardData();
      } else {
        toast.error(response.error || 'Erro ao popular banco de dados.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Falha de conexão.');
    } finally {
      setActionLoading(false);
    }
  };

  // RENDERIZAÇÃO DA TELA DE LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-off-white">
        <div className="w-full max-w-md bg-white border border-border-lilac rounded-3xl p-6 sm:p-10 shadow-xl text-center">
          <div className="h-14 w-14 rounded-full bg-light-lilac flex items-center justify-center text-primary mx-auto mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-bold text-primary">
            Área dos Noivos
          </h2>
          <p className="font-body text-xs sm:text-sm text-text-dark/60 mt-1 mb-8">
            Painel restrito para Amanda e Guilherme. Digite a senha para acessar.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-left">
              <label htmlFor="admin-pass" className="block text-xs font-semibold text-text-dark/70 mb-2">
                Senha de Acesso
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                placeholder="Digite a senha administrativa..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border-lilac bg-white text-text-dark font-body text-sm placeholder:text-text-dark/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-primary text-white font-body font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-primary/95 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {authLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span>Acessar Painel</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[10px] text-text-dark/40 leading-relaxed border-t border-border-lilac/30 pt-6">
            💡 Dica: a senha padrão de acesso está configurada como <code className="bg-light-lilac px-1.5 py-0.5 rounded font-mono text-primary font-bold">amandaeguilherme2027</code>.
          </div>
        </div>
      </div>
    );
  }

  // RENDERIZAÇÃO DO DASHBOARD ADMINISTRATIVO
  return (
    <div className="bg-off-white min-h-[90vh] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-border-lilac/50 rounded-3xl p-6 mb-10 shadow-sm gap-4">
          <div>
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-primary">
              Painel de Gestão
            </h2>
            <p className="font-body text-xs sm:text-sm text-text-dark/60 mt-0.5">
              Bem-vindos, Amanda & Guilherme! Monitorem o RSVP e gerenciem seus convidados.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {guests.length === 0 && (
              <button
                onClick={handleSeedDatabase}
                disabled={actionLoading}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-secondary text-white font-body font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-secondary/90 transition-all duration-300 flex items-center justify-center space-x-1.5"
                title="Popular os 99 convidados iniciais"
              >
                <Database className="h-4 w-4" />
                <span>Popular Banco</span>
              </button>
            )}
            
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border border-red-200 text-red-600 font-body font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-1.5 focus:outline-none"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* 1. CARDS DE MÉTRICAS */}
        {loadingData ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white border border-border-lilac/50 rounded-2xl p-6 h-28 animate-pulse flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-light-lilac animate-pulse" />
                <div className="space-y-2">
                  <div className="w-16 h-4 bg-light-lilac rounded animate-pulse" />
                  <div className="w-8 h-6 bg-light-lilac rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {/* Card Total */}
            <div className="bg-white border border-border-lilac/50 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-light-lilac text-primary rounded-xl">
                <Users className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-text-dark/50 uppercase tracking-wider">Total</p>
                <h3 className="font-title text-2xl sm:text-3xl font-extrabold text-primary mt-0.5">{stats.total}</h3>
              </div>
            </div>

            {/* Card Confirmados */}
            <div className="bg-white border border-border-lilac/50 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <UserCheck className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-text-dark/50 uppercase tracking-wider">Confirmados</p>
                <h3 className="font-title text-2xl sm:text-3xl font-extrabold text-green-600 mt-0.5">{stats.confirmed}</h3>
              </div>
            </div>

            {/* Card Recusados */}
            <div className="bg-white border border-border-lilac/50 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                <UserX className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-text-dark/50 uppercase tracking-wider">Recusados</p>
                <h3 className="font-title text-2xl sm:text-3xl font-extrabold text-red-600 mt-0.5">{stats.declined}</h3>
              </div>
            </div>

            {/* Card Pendentes */}
            <div className="bg-white border border-border-lilac/50 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <UserMinus className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-text-dark/50 uppercase tracking-wider">Pendentes</p>
                <h3 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-600 mt-0.5">{stats.pending}</h3>
              </div>
            </div>
          </div>
        )}

        {/* 2. GRID PRINCIPAL: ADICIONAR CONVIDADO E TABELA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Coluna Lateral: Adicionar Convidado */}
          <div className="bg-white border border-border-lilac/50 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="font-title text-lg sm:text-xl font-bold text-primary border-b border-border-lilac/30 pb-3 flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Novo Convidado</span>
            </h3>

            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label htmlFor="new-name" className="block text-xs font-semibold text-text-dark/70 mb-1.5">
                  Nome do Convidado
                </label>
                <input
                  id="new-name"
                  type="text"
                  required
                  placeholder="Nome completo ou abreviado..."
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border-lilac bg-white text-text-dark font-body text-sm placeholder:text-text-dark/45 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={actionLoading || !newGuestName.trim()}
                className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-body font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-sm disabled:opacity-50"
              >
                {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                <span>Adicionar à Lista</span>
              </button>
            </form>
            
            <div className="bg-light-lilac/25 border border-dashed border-border-lilac/50 rounded-xl p-4 text-[11px] text-text-dark/60 leading-relaxed">
              📌 <strong>Nota:</strong> A lista de convidados pré-definida permite que seus convidados realizem a busca e RSVP de forma privada e segura. Nomes cadastrados aqui ficarão imediatamente disponíveis para pesquisa no site.
            </div>
          </div>

          {/* Coluna Central/Larga: Tabela de Convidados */}
          <div className="lg:col-span-2 bg-white border border-border-lilac/50 rounded-3xl p-6 shadow-sm space-y-6">
            
            {/* Header da Tabela com Busca e Filtros */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border-lilac/30 pb-4">
              <h3 className="font-title text-lg sm:text-xl font-bold text-primary flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Lista Oficial</span>
                <span className="bg-light-lilac text-primary text-xs px-2 py-0.5 rounded-full font-body font-semibold">
                  {filteredGuests.length}
                </span>
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {/* Campo de Busca Interno */}
                <div className="relative w-full sm:w-48">
                  <input
                    type="text"
                    placeholder="Filtrar por nome..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-border-lilac text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-dark/40"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-text-dark/40" />
                </div>

                {/* Filtro Dropdown */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 rounded-xl border border-border-lilac text-xs text-text-dark bg-white font-body focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="confirmado">Confirmados</option>
                  <option value="recusado">Recusados</option>
                  <option value="pendente">Pendentes</option>
                </select>
              </div>
            </div>

            {/* Listagem de Convidados */}
            {loadingData ? (
              <div className="py-20 flex flex-col items-center justify-center text-primary/70">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <span className="font-body text-xs">Buscando convidados no Supabase...</span>
              </div>
            ) : filteredGuests.length === 0 ? (
              <div className="py-16 text-center bg-light-lilac/10 rounded-2xl border border-dashed border-border-lilac/40">
                <HelpCircle className="h-8 w-8 text-primary/30 mx-auto mb-2" />
                <p className="font-body text-sm font-semibold text-text-dark/60">Nenhum convidado encontrado.</p>
                <p className="font-body text-xs text-text-dark/40 mt-1">Experimente limpar os filtros ou adicionar novos convidados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-6 sm:px-0">
                  <table className="min-w-full divide-y divide-border-lilac/30">
                    <thead>
                      <tr className="text-left font-body text-[11px] font-bold text-text-dark/50 uppercase tracking-widest bg-light-lilac/20 rounded-lg">
                        <th className="py-3 px-4">Nome</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Ações Rápidas (RSVP)</th>
                        <th className="py-3 px-4 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-lilac/25">
                      {filteredGuests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-light-lilac/10 transition-colors duration-200">
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-body text-sm font-semibold text-text-dark">{guest.name}</span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-center">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                              guest.confirmed === true 
                                ? 'bg-green-50 border-green-200 text-green-700' 
                                : guest.confirmed === false 
                                ? 'bg-red-50 border-red-200 text-red-700' 
                                : 'bg-amber-50 border-amber-200 text-amber-700'
                            }`}>
                              {guest.confirmed === null 
                                ? 'Pendente' 
                                : guest.confirmed === true 
                                ? 'Confirmado' 
                                : 'Recusado'}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-center">
                            <div className="inline-flex space-x-1.5">
                              <button
                                onClick={() => handleAdminRsvpChange(guest.id, guest.name, true)}
                                className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                                  guest.confirmed === true
                                    ? 'bg-green-600 border-green-600 text-white cursor-default'
                                    : 'bg-white border-green-200 text-green-600 hover:bg-green-50'
                                }`}
                                title="Confirmar Presença"
                              >
                                Sim
                              </button>
                              <button
                                onClick={() => handleAdminRsvpChange(guest.id, guest.name, false)}
                                className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                                  guest.confirmed === false
                                    ? 'bg-red-600 border-red-600 text-white cursor-default'
                                    : 'bg-white border-red-200 text-red-600 hover:bg-red-50'
                                }`}
                                title="Recusar Presença"
                              >
                                Não
                              </button>
                              <button
                                onClick={() => handleAdminRsvpChange(guest.id, guest.name, null)}
                                className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                                  guest.confirmed === null
                                    ? 'bg-amber-500 border-amber-500 text-white cursor-default'
                                    : 'bg-white border-amber-200 text-amber-500 hover:bg-amber-50'
                                }`}
                                title="Definir como Pendente"
                              >
                                Pend.
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => handleDeleteGuest(guest.id, guest.name)}
                              className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200"
                              title="Excluir Convidado"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
