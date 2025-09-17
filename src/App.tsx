import React, { useState } from 'react';
import { Truck, Settings, Clock, AlertTriangle, TrendingUp, Filter, ChevronDown, Activity, Wrench, Car, Users } from 'lucide-react';
import { PieChart } from './components/PieChart';

interface FilterState {
  diretoria: string;
  contrato: string;
  operacao: string;
  frota: string;
  status: string;
  sla: string;
}

interface IndicadorCard {
  titulo: string;
  valor: number;
  icon: React.ReactNode;
  cor: string;
  descricao: string;
}

interface StatusFrota {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface CausaParada {
  implemento: string;
  porcentagem: number;
  ocorrencias: number;
  cor: string;
}

interface ContratoRanking {
  nome: string;
  disponibilidade: number;
  totalVeiculos: number;
  operacionais: number;
  posicao: number;
}

function App() {
  const [filters, setFilters] = useState<FilterState>({
    diretoria: '',
    contrato: '',
    operacao: '',
    frota: '',
    status: '',
    sla: ''
  });

  // Dados mockados - em produção viriam de API
  const indicadores: IndicadorCard[] = [
    {
      titulo: "Em Operação",
      valor: 142,
      icon: <Truck className="w-6 h-6" />,
      cor: "bg-green-500",
      descricao: "Veículos executando viagens"
    },
    {
      titulo: "Manutenção",
      valor: 28,
      icon: <Wrench className="w-6 h-6" />,
      cor: "bg-orange-500",
      descricao: "Veículos em manutenção"
    },
    {
      titulo: "Reserva",
      valor: 35,
      icon: <Car className="w-6 h-6" />,
      cor: "bg-blue-500",
      descricao: "Veículos disponíveis"
    },
    {
      titulo: "SLA",
      valor: 12,
      icon: <AlertTriangle className="w-6 h-6" />,
      cor: "bg-red-500",
      descricao: "Frotas em SLA crítico"
    }
  ];

  const statusFrota: StatusFrota[] = [
    { label: "Ativo", value: 142, color: "#10B981", percentage: 69.3 },
    { label: "Com Pendência", value: 35, color: "#F59E0B", percentage: 17.1 },
    { label: "Em Manutenção", value: 28, color: "#EF4444", percentage: 13.6 },
    { label: "Inativo", value: 0, color: "#6B7280", percentage: 0 }
  ];

  const causasParada: CausaParada[] = [
    { implemento: "Ar Condicionado", porcentagem: 34.2, ocorrencias: 87, cor: "red" },
    { implemento: "Telemetria", porcentagem: 28.5, ocorrencias: 72, cor: "orange" },
    { implemento: "Rádio", porcentagem: 19.3, ocorrencias: 49, cor: "yellow" }
  ];

  const rankingContratos: ContratoRanking[] = [
    { nome: "Contrato Alpha", disponibilidade: 94.5, totalVeiculos: 85, operacionais: 80, posicao: 1 },
    { nome: "Contrato Beta", disponibilidade: 89.2, totalVeiculos: 65, operacionais: 58, posicao: 2 },
    { nome: "Contrato Gamma", disponibilidade: 86.7, totalVeiculos: 55, operacionais: 48, posicao: 3 }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPosicaoIcon = (posicao: number) => {
    const icons = ['🥇', '🥈', '🥉'];
    return icons[posicao - 1] || `#${posicao}`;
  };

  const getCoresImplemento = (cor: string) => {
    const cores = {
      red: {
        border: 'border-red-500',
        bg: 'bg-red-500',
        text: 'text-red-600'
      },
      orange: {
        border: 'border-orange-500',
        bg: 'bg-orange-500',
        text: 'text-orange-600'
      },
      yellow: {
        border: 'border-yellow-500',
        bg: 'bg-yellow-500',
        text: 'text-yellow-600'
      }
    };
    return cores[cor as keyof typeof cores] || cores.red;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel de Frota</h1>
                <p className="text-sm text-gray-600">Gerenciamento Executivo de Veículos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Filtros Ativos: {Object.values(filters).filter(v => v).length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros de Visualização</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { key: 'diretoria', label: 'Diretoria', options: ['Todas', 'Operacional', 'Técnica', 'Administrativa'] },
              { key: 'contrato', label: 'Contrato', options: ['Todos', 'Alpha', 'Beta', 'Gamma', 'Delta'] },
              { key: 'operacao', label: 'Operação', options: ['Todas', 'Urbana', 'Interurbana', 'Especial'] },
              { key: 'frota', label: 'Frota', options: ['Todas', 'Frota A', 'Frota B', 'Frota C'] },
              { key: 'status', label: 'Status', options: ['Todos', 'Ativo', 'Manutenção', 'Inativo'] },
              { key: 'sla', label: 'SLA', options: ['Todos', 'Crítico', 'Alerta', 'Normal'] }
            ].map((filter) => (
              <div key={filter.key} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {filter.label}
                </label>
                <select
                  value={filters[filter.key as keyof FilterState]}
                  onChange={(e) => handleFilterChange(filter.key as keyof FilterState, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {filter.options.map((option) => (
                    <option key={option} value={option === 'Todas' || option === 'Todos' ? '' : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Seção 1: Saúde da Frota - Indicadores Executivos */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Saúde da Frota - Indicadores Executivos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {indicadores.map((indicador, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{indicador.titulo}</p>
                    <p className="text-3xl font-bold text-gray-900">{indicador.valor}</p>
                    <p className="text-xs text-gray-500 mt-1">{indicador.descricao}</p>
                  </div>
                  <div className={`${indicador.cor} p-3 rounded-lg text-white`}>
                    {indicador.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção 2: Gráfico de Pizza - Status da Frota */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Status da Frota</h3>
            <PieChart data={statusFrota} size={240} />
            <div className="mt-6 space-y-3">
              {statusFrota.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{status.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">{status.value}</span>
                    <span className="text-xs text-gray-500 ml-2">({status.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção 3: Top 3 Causas de Parada */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top 3 Causas de Parada (Implementos)</h3>
            <div className="space-y-4">
              {causasParada.map((causa, index) => (
                <div key={index} className={`border-l-4 ${getCoresImplemento(causa.cor).border} pl-4 py-2`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">#{index + 1} {causa.implemento}</h4>
                    <span className={`text-lg font-bold ${getCoresImplemento(causa.cor).text}`}>{causa.porcentagem}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`${getCoresImplemento(causa.cor).bg} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${causa.porcentagem}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{causa.ocorrencias} ocorrências este mês</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seção 4: Ranking de Disponibilidade por Contrato */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Ranking de Disponibilidade por Contrato</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            {rankingContratos.map((contrato, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {getPosicaoIcon(contrato.posicao)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{contrato.nome}</h4>
                    <p className="text-sm text-gray-600">
                      {contrato.operacionais}/{contrato.totalVeiculos} veículos operacionais
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${getStatusColor(contrato.disponibilidade)}`}>
                    {contrato.disponibilidade}%
                  </p>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${contrato.disponibilidade >= 90 ? 'bg-green-500' : contrato.disponibilidade >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${contrato.disponibilidade}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;