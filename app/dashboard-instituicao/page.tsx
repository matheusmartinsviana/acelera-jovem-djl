// ==========================
// Codepack: Dashboard Instituição (Next.js + TypeScript + shadcn/ui + framer-motion)
// Pastas e arquivos sugeridos — copie/cole cada bloco no respectivo caminho.
// ==========================

// --------------------------------------
// app/(institution)/dashboard/page.tsx
// --------------------------------------
'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

// ui (shadcn)
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// icons
import {
    Building2,
    Users,
    BookOpen,
    TrendingUp,
    Award,
    Calendar,
    BarChart3,
    UserCheck,
    Target,
    Flag,
    Plus,
    Search as SearchIcon,
    Sparkles,
    GraduationCap,
    CheckCircle2,
    XCircle,
    Filter,
    Download,
} from 'lucide-react';

export default function DashboardInstituicao() {
    const { user } = useAuth();
    const router = useRouter();
    const displayUser = user || {
        name: 'Instituição Demo',
        email: 'demo@instituicao.edu',
    };
    const userId = String(user?.id ?? 'guest');

    // GLOBAL STATE (persistido)
    const [stats, setStats] = useState({
        totalStudents: 0,
        activeCourses: 0,
        completionRate: 0,
        partnerships: 0,
    });
    const [leads, setLeads] = useState<Lead[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [trails, setTrails] = useState<Trail[]>([]);
    const [contents, setContents] = useState<ContentItem[]>([]);

    // UI STATE
    const [tab, setTab] = useState('overview');

    // Lead form
    const [leadForm, setLeadForm] = useState<Partial<Lead>>({ status: 'novo' });
    const [leadQuery, setLeadQuery] = useState('');
    const [leadFilterStatus, setLeadFilterStatus] = useState<
        'todos' | LeadStatus
    >('todos');
    const [isGenerating, setIsGenerating] = useState(false);

    // Trail form
    const [trailForm, setTrailForm] = useState<Partial<Trail>>({
        level: 'Iniciante',
        courses: 1,
        enrolled: 0,
        progressAvg: 0,
    });

    // Teacher form
    const [teacherForm, setTeacherForm] = useState<Partial<Teacher>>({});

    // Init / Persist
    useEffect(() => {
        const k = (name: string) => keyFor(name, userId);
        const sStats = loadJSON(k('institution_stats'));
        const sLeads = loadJSON(k('institution_leads'));
        const sTeachers = loadJSON(k('institution_teachers'));
        const sTrails = loadJSON(k('institution_trails'));
        const sContents = loadJSON(k('institution_contents'));

        if (sStats && sLeads && sTeachers && sTrails && sContents) {
            setStats(sStats);
            setLeads(sLeads);
            setTeachers(sTeachers);
            setTrails(sTrails);
            setContents(sContents);
        } else {
            // Seeds
            const demoStats = {
                totalStudents: 1247,
                activeCourses: 23,
                completionRate: 78,
                partnerships: 0,
            };
            const demoLeads = generateInitialLeadHistory(60); // histórico já gerado
            const demoTeachers: Teacher[] = [
                {
                    id: crypto.randomUUID?.() || Math.random().toString(),
                    name: 'Ana Ferreira',
                    email: 'ana@instituicao.edu',
                    area: 'Front-end',
                    since: '2022',
                },
                {
                    id: crypto.randomUUID?.() || Math.random().toString(),
                    name: 'Carlos Souza',
                    email: 'carlos@instituicao.edu',
                    area: 'Dados',
                    since: '2021',
                },
            ];
            const demoTrails: Trail[] = [
                {
                    id: crypto.randomUUID?.() || Math.random().toString(),
                    title: 'Trilha Front-end',
                    level: 'Iniciante',
                    courses: 6,
                    enrolled: 312,
                    progressAvg: 64,
                },
                {
                    id: crypto.randomUUID?.() || Math.random().toString(),
                    title: 'Trilha Dados',
                    level: 'Intermediário',
                    courses: 8,
                    enrolled: 188,
                    progressAvg: 52,
                },
            ];
            const demoContents: ContentItem[] = [
                {
                    id: crypto.randomUUID?.() || Math.random().toString(),
                    title: 'React Avançado',
                    category: 'Programação',
                    duration: '12h',
                    updatedAt: '2025-08-15',
                },
                {
                    id: crypto.randomUUID?.() || Math.random().toString(),
                    title: 'Fundamentos de Dados',
                    category: 'Dados',
                    duration: '9h',
                    updatedAt: '2025-07-03',
                },
                {
                    id: crypto.randomUUID?.() || Math.random().toString(),
                    title: 'Inglês para Tech',
                    category: 'Idiomas',
                    duration: '6h',
                    updatedAt: '2025-08-28',
                },
            ];

            setStats(demoStats);
            setLeads(demoLeads);
            setTeachers(demoTeachers);
            setTrails(demoTrails);
            setContents(demoContents);

            saveJSON(k('institution_stats'), demoStats);
            saveJSON(k('institution_leads'), demoLeads);
            saveJSON(k('institution_teachers'), demoTeachers);
            saveJSON(k('institution_trails'), demoTrails);
            saveJSON(k('institution_contents'), demoContents);
        }
    }, [userId, router]);

    // Persist updates
    useEffect(
        () => saveJSON(keyFor('institution_stats', userId), stats),
        [stats, userId]
    );
    useEffect(
        () => saveJSON(keyFor('institution_leads', userId), leads),
        [leads, userId]
    );
    useEffect(
        () => saveJSON(keyFor('institution_teachers', userId), teachers),
        [teachers, userId]
    );
    useEffect(
        () => saveJSON(keyFor('institution_trails', userId), trails),
        [trails, userId]
    );
    useEffect(
        () => saveJSON(keyFor('institution_contents', userId), contents),
        [contents, userId]
    );

    // Derived (Leads + Metas)
    const leadStats = useMemo(() => {
        const total = leads.length;
        const novo = leads.filter(l => l.status === 'novo').length;
        const qual = leads.filter(l => l.status === 'qualificado').length;
        const conv = leads.filter(l => l.status === 'convertido').length;
        const perd = leads.filter(l => l.status === 'perdido').length;
        const convRate = total ? Math.round((conv / total) * 100) : 0;
        return { total, novo, qual, conv, perd, convRate };
    }, [leads]);

    const completedCourses = Math.round(
        (stats.completionRate / 100) * stats.activeCourses * 10
    );
    const goalTarget = 10;
    const goalProgress = Math.min(
        100,
        Math.round((completedCourses / goalTarget) * 100)
    );
    const goalUnlocked = completedCourses >= goalTarget;

    const filteredLeads = useMemo(() => {
        const q = leadQuery.trim().toLowerCase();
        return leads
            .filter(l =>
                leadFilterStatus === 'todos'
                    ? true
                    : l.status === leadFilterStatus
            )
            .filter(l =>
                !q
                    ? true
                    : [l.name, l.email, l.interest, l.source]
                          .filter(Boolean)
                          .some(v => String(v).toLowerCase().includes(q))
            )
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    }, [leads, leadQuery, leadFilterStatus]);

    // Actions
    function addTrail() {
        if (!trailForm.title) return;
        const t: Trail = {
            id: crypto.randomUUID?.() || Math.random().toString(),
            title: trailForm.title!,
            level: (trailForm.level as Trail['level']) || 'Iniciante',
            courses: Number(trailForm.courses) || 1,
            enrolled: Number(trailForm.enrolled) || 0,
            progressAvg: Number(trailForm.progressAvg) || 0,
        };
        setTrails(p => [t, ...p]);
        setTrailForm({
            level: 'Iniciante',
            courses: 1,
            enrolled: 0,
            progressAvg: 0,
        });
    }

    function addTeacher() {
        if (!teacherForm.name || !teacherForm.email || !teacherForm.area)
            return;
        const t: Teacher = {
            id: crypto.randomUUID?.() || Math.random().toString(),
            name: teacherForm.name!,
            email: teacherForm.email!,
            area: teacherForm.area!,
            since: new Date().getFullYear().toString(),
        };
        setTeachers(p => [t, ...p]);
        setTeacherForm({});
    }

    function addLeadManual() {
        if (
            !leadForm.name ||
            !leadForm.email ||
            !leadForm.interest ||
            !leadForm.source
        )
            return;
        const l: Lead = {
            id: crypto.randomUUID?.() || Math.random().toString(),
            name: leadForm.name!,
            email: leadForm.email!,
            interest: leadForm.interest!,
            source: leadForm.source!,
            createdAt: new Date().toISOString(),
            status: (leadForm.status as LeadStatus) || 'novo',
        };
        setLeads(p => [l, ...p]);
        setLeadForm({ status: 'novo' });
    }

    async function generateLeadsFromPlatform() {
        setIsGenerating(true);
        // simula enriquecer leads com dados dos cursos/trilhas gratuitas
        const batch = generateNewLeadsBatch(8);
        // animação: empilha no topo com entrada
        setLeads(prev => [...batch, ...prev]);
        // opcionalmente poderíamos mostrar um brinde visual
        setTimeout(() => setIsGenerating(false), 1200);
    }

    function updateLeadStatus(id: string, status: LeadStatus) {
        setLeads(prev => prev.map(l => (l.id === id ? { ...l, status } : l)));
    }

    function removeLead(id: string) {
        setLeads(prev => prev.filter(l => l.id !== id));
    }

    function exportCSV() {
        const header = [
            'id',
            'name',
            'email',
            'interest',
            'source',
            'createdAt',
            'status',
        ].join(',');
        const rows = leads.map(l =>
            [l.id, l.name, l.email, l.interest, l.source, l.createdAt, l.status]
                .map(c => `"${String(c).replaceAll('"', '"')}"`)
                .join(',')
        );
        const csv = [header, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads_${userId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const pct = (n: number) => `${Math.max(0, Math.min(100, Math.round(n)))}%`;
    const currencyBRL = (n: number) =>
        n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Dashboard Institucional
                            </h1>
                            <p className="text-slate-600">
                                Bem-vindo, {displayUser.name}
                            </p>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">
                                Total de Estudantes
                            </CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">
                                {stats.totalStudents.toLocaleString()}
                            </div>
                            <p className="text-xs text-blue-600 mt-1">
                                +12% este mês
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-700">
                                Cursos Ativos
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900">
                                {stats.activeCourses}
                            </div>
                            <p className="text-xs text-purple-600 mt-1">
                                +3 novos cursos
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">
                                Taxa de Conclusão
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900">
                                {stats.completionRate}%
                            </div>
                            <Progress
                                value={stats.completionRate}
                                className="mt-2"
                            />
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-700">
                                Leads (Conversão)
                            </CardTitle>
                            <Award className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900">
                                {leadStats.convRate}%
                            </div>
                            <p className="text-xs text-orange-600 mt-1">
                                {leadStats.conv} convertidos de{' '}
                                {leadStats.total}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs value={tab} onValueChange={setTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                        >
                            Visão Geral
                        </TabsTrigger>
                        {/* <TabsTrigger
                            value="trilhas"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                        >
                            Trilhas
                        </TabsTrigger> */}
                        <TabsTrigger
                            value="professores"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                        >
                            Professores
                        </TabsTrigger>
                        <TabsTrigger
                            value="leads"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                        >
                            Leads
                        </TabsTrigger>
                        <TabsTrigger
                            value="metas"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                        >
                            Financeiro
                        </TabsTrigger>
                        {/* <TabsTrigger
                            value="conteudos"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                        >
                            Conteúdos
                        </TabsTrigger> */}
                    </TabsList>

                    {/* OVERVIEW */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                        Destaques Recentes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                        <div className="p-1 bg-blue-100 rounded-full">
                                            <UserCheck className="h-3 w-3 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">
                                                15 alunos concluíram "React
                                                Avançado" nesta semana
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                há 4 horas
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                        <div className="p-1 bg-green-100 rounded-full">
                                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">
                                                Taxa de conclusão média subiu
                                                para {stats.completionRate}%
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                há 1 dia
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Ações Rápidas</CardTitle>
                                    <CardDescription>
                                        Gerencie sua instituição
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid sm:grid-cols-2 gap-3">
                                    <Button
                                        onClick={() => setTab('leads')}
                                        className="justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Gerar Lead
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="justify-start border-purple-200 hover:bg-purple-50"
                                        onClick={() => setTab('professores')}
                                    >
                                        <Users className="mr-2 h-4 w-4" />
                                        Cadastrar Professor
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="justify-start border-green-200 hover:bg-green-50"
                                        onClick={() => setTab('metas')}
                                    >
                                        <BarChart3 className="mr-2 h-4 w-4" />
                                        Ver Metas
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="justify-start border-blue-200 hover:bg-blue-50"
                                        onClick={() => setTab('trilhas')}
                                    >
                                        <GraduationCap className="mr-2 h-4 w-4" />
                                        Voucher Aluno
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* TRILHAS */}
                    <TabsContent value="trilhas" className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Gerenciamento de Trilhas</CardTitle>
                                <CardDescription>
                                    Crie e administre trilhas (o nome da
                                    instituição aparece nas trilhas).
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>
                                            Título da Trilha (exibido como:{' '}
                                            {displayUser.name} • Título)
                                        </Label>
                                        <Input
                                            value={trailForm.title || ''}
                                            onChange={e =>
                                                setTrailForm(p => ({
                                                    ...p,
                                                    title: e.target.value,
                                                }))
                                            }
                                            placeholder="Ex.: Trilha Back-end"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nível</Label>
                                        <Select
                                            value={trailForm.level as string}
                                            onValueChange={v =>
                                                setTrailForm(p => ({
                                                    ...p,
                                                    level: v as any,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Iniciante">
                                                    Iniciante
                                                </SelectItem>
                                                <SelectItem value="Intermediário">
                                                    Intermediário
                                                </SelectItem>
                                                <SelectItem value="Avançado">
                                                    Avançado
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nº de Cursos</Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={trailForm.courses ?? 1}
                                            onChange={e =>
                                                setTrailForm(p => ({
                                                    ...p,
                                                    courses: Number(
                                                        e.target.value
                                                    ),
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alunos Inscritos</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            value={trailForm.enrolled ?? 0}
                                            onChange={e =>
                                                setTrailForm(p => ({
                                                    ...p,
                                                    enrolled: Number(
                                                        e.target.value
                                                    ),
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Média de Progresso (%)</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={trailForm.progressAvg ?? 0}
                                            onChange={e =>
                                                setTrailForm(p => ({
                                                    ...p,
                                                    progressAvg: Number(
                                                        e.target.value
                                                    ),
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <Button
                                    onClick={addTrail}
                                    className="w-full sm:w-auto"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Adicionar Trilha
                                </Button>

                                <Separator className="my-2" />

                                {trails.length === 0 ? (
                                    <EmptyState
                                        icon={GraduationCap}
                                        title="Nenhuma trilha"
                                        description="Crie sua primeira trilha para começar."
                                        cta="Criar Trilha"
                                        onClick={addTrail}
                                    />
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {trails.map(t => (
                                            <Card
                                                key={t.id}
                                                className="border-0 shadow-md hover:shadow-lg transition"
                                            >
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base flex items-center justify-between">
                                                        <span>
                                                            {displayUser.name} •{' '}
                                                            {t.title}
                                                        </span>
                                                        <Badge variant="secondary">
                                                            {t.level}
                                                        </Badge>
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {t.courses} cursos •{' '}
                                                        {t.enrolled} alunos
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-sm text-slate-700 mb-2">
                                                        Progresso médio
                                                    </div>
                                                    <Progress
                                                        value={t.progressAvg}
                                                    />
                                                    <div className="mt-2 text-sm font-medium">
                                                        {pct(t.progressAvg)}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* PROFESSORES */}
                    <TabsContent value="professores" className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Gestão de Professores</CardTitle>
                                <CardDescription>
                                    Cadastre e gerencie professores vinculados.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <Label>Nome</Label>
                                        <Input
                                            value={teacherForm.name || ''}
                                            onChange={e =>
                                                setTeacherForm(p => ({
                                                    ...p,
                                                    name: e.target.value,
                                                }))
                                            }
                                            placeholder="Ex.: Ana Ferreira"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            value={teacherForm.email || ''}
                                            onChange={e =>
                                                setTeacherForm(p => ({
                                                    ...p,
                                                    email: e.target.value,
                                                }))
                                            }
                                            placeholder="prof@instituicao.edu"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Área</Label>
                                        <Input
                                            value={teacherForm.area || ''}
                                            onChange={e =>
                                                setTeacherForm(p => ({
                                                    ...p,
                                                    area: e.target.value,
                                                }))
                                            }
                                            placeholder="Ex.: Front-end"
                                        />
                                    </div>
                                </div>
                                <Button
                                    onClick={addTeacher}
                                    className="w-full sm:w-auto"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Cadastrar Professor
                                </Button>

                                <Separator className="my-2" />

                                {teachers.length === 0 ? (
                                    <EmptyState
                                        icon={Users}
                                        title="Nenhum professor"
                                        description="Cadastre professores para associar às trilhas e cursos."
                                    />
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {teachers.map(t => (
                                            <Card
                                                key={t.id}
                                                className="border-0 shadow-md"
                                            >
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base">
                                                        {t.name}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {t.email}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-center justify-between text-sm text-slate-600">
                                                        <span>
                                                            Área:{' '}
                                                            <span className="font-medium text-slate-800">
                                                                {t.area}
                                                            </span>
                                                        </span>
                                                        <span>
                                                            Desde {t.since}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* LEADS */}
                    <TabsContent value="leads" className="space-y-6">
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Gerar via Plataforma (mock) */}
                            <Card className="border-0 shadow-lg lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-purple-600" />
                                        Gerar Leads (Mock)
                                    </CardTitle>
                                    <CardDescription>
                                        Leads coletados de cursos/trilhas
                                        gratuitas.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button
                                        disabled={isGenerating}
                                        onClick={generateLeadsFromPlatform}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                        {isGenerating
                                            ? 'Gerando...'
                                            : 'Gerar Novos Leads'}
                                    </Button>

                                    <Separator />

                                    {/* Form manual opcional */}
                                    <div className="space-y-2">
                                        <Label>Nome</Label>
                                        <Input
                                            value={leadForm.name || ''}
                                            onChange={e =>
                                                setLeadForm(p => ({
                                                    ...p,
                                                    name: e.target.value,
                                                }))
                                            }
                                            placeholder="Nome completo"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            value={leadForm.email || ''}
                                            onChange={e =>
                                                setLeadForm(p => ({
                                                    ...p,
                                                    email: e.target.value,
                                                }))
                                            }
                                            placeholder="email@exemplo.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Interesse</Label>
                                        <Input
                                            value={leadForm.interest || ''}
                                            onChange={e =>
                                                setLeadForm(p => ({
                                                    ...p,
                                                    interest: e.target.value,
                                                }))
                                            }
                                            placeholder="Ex.: Trilha Front-end"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Origem</Label>
                                        <Input
                                            value={leadForm.source || ''}
                                            onChange={e =>
                                                setLeadForm(p => ({
                                                    ...p,
                                                    source: e.target.value,
                                                }))
                                            }
                                            placeholder="Landing Page / Instagram / Indicação..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <Select
                                            value={
                                                (leadForm.status as string) ||
                                                'novo'
                                            }
                                            onValueChange={v =>
                                                setLeadForm(p => ({
                                                    ...p,
                                                    status: v as LeadStatus,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="novo">
                                                    Novo
                                                </SelectItem>
                                                <SelectItem value="qualificado">
                                                    Qualificado
                                                </SelectItem>
                                                <SelectItem value="convertido">
                                                    Convertido
                                                </SelectItem>
                                                <SelectItem value="perdido">
                                                    Perdido
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button
                                        onClick={addLeadManual}
                                        className="w-full"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Adicionar Lead Manual
                                    </Button>

                                    <Separator />

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="p-3 rounded-lg bg-slate-50">
                                            <div className="text-slate-500">
                                                Total
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {leadStats.total}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50">
                                            <div className="text-slate-500">
                                                Conversão
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {leadStats.convRate}%
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50">
                                            <div className="text-slate-500">
                                                Qualificados
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {leadStats.qual}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50">
                                            <div className="text-slate-500">
                                                Perdidos
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {leadStats.perd}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Listagem e Gestão */}
                            <Card className="border-0 shadow-lg lg:col-span-2">
                                <CardHeader className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>
                                                Todos os Leads Gerados
                                            </CardTitle>
                                            <CardDescription>
                                                Listagem completa com filtros e
                                                busca.
                                            </CardDescription>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={exportCSV}
                                            className="gap-2"
                                        >
                                            <Download className="h-4 w-4" />
                                            Exportar CSV
                                        </Button>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-3 pt-2">
                                        <div className="relative">
                                            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input
                                                className="pl-9"
                                                placeholder="Buscar por nome, email, interesse, origem..."
                                                value={leadQuery}
                                                onChange={e =>
                                                    setLeadQuery(e.target.value)
                                                }
                                            />
                                        </div>
                                        <Select
                                            value={leadFilterStatus}
                                            onValueChange={v =>
                                                setLeadFilterStatus(v as any)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Filtrar por status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="todos">
                                                    Todos
                                                </SelectItem>
                                                <SelectItem value="novo">
                                                    Novo
                                                </SelectItem>
                                                <SelectItem value="qualificado">
                                                    Qualificado
                                                </SelectItem>
                                                <SelectItem value="convertido">
                                                    Convertido
                                                </SelectItem>
                                                <SelectItem value="perdido">
                                                    Perdido
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {filteredLeads.length === 0 ? (
                                        <EmptyState
                                            icon={SearchIcon}
                                            title="Nenhum lead encontrado"
                                            description="Ajuste os filtros ou gere novos leads."
                                        />
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            Nome
                                                        </TableHead>
                                                        <TableHead>
                                                            Email
                                                        </TableHead>
                                                        <TableHead>
                                                            Interesse
                                                        </TableHead>
                                                        <TableHead>
                                                            Origem
                                                        </TableHead>
                                                        <TableHead>
                                                            Data
                                                        </TableHead>
                                                        <TableHead>
                                                            Status
                                                        </TableHead>
                                                        <TableHead className="text-right">
                                                            Ações
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <AnimatePresence
                                                        initial={false}
                                                    >
                                                        {filteredLeads.map(
                                                            l => (
                                                                <motion.tr
                                                                    key={l.id}
                                                                    initial={{
                                                                        opacity: 0,
                                                                        y: -8,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        y: 0,
                                                                    }}
                                                                    exit={{
                                                                        opacity: 0,
                                                                        y: 8,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.25,
                                                                    }}
                                                                    className="hover:bg-slate-50"
                                                                >
                                                                    <TableCell className="font-medium">
                                                                        {l.name}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            l.email
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            l.interest
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            l.source
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {new Date(
                                                                            l.createdAt
                                                                        ).toLocaleString()}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Badge
                                                                            variant={
                                                                                l.status ===
                                                                                'perdido'
                                                                                    ? 'destructive'
                                                                                    : l.status ===
                                                                                      'novo'
                                                                                    ? 'secondary'
                                                                                    : 'default'
                                                                            }
                                                                        >
                                                                            {
                                                                                l.status
                                                                            }
                                                                        </Badge>
                                                                    </TableCell>
                                                                    <TableCell className="text-right space-x-2">
                                                                        <Select
                                                                            onValueChange={v =>
                                                                                updateLeadStatus(
                                                                                    l.id,
                                                                                    v as LeadStatus
                                                                                )
                                                                            }
                                                                        >
                                                                            <SelectTrigger className="h-8 w-[140px]">
                                                                                <SelectValue placeholder="Alterar status" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="novo">
                                                                                    Marcar
                                                                                    como
                                                                                    Novo
                                                                                </SelectItem>
                                                                                <SelectItem value="qualificado">
                                                                                    Marcar
                                                                                    como
                                                                                    Qualificado
                                                                                </SelectItem>
                                                                                <SelectItem value="convertido">
                                                                                    Marcar
                                                                                    como
                                                                                    Convertido
                                                                                </SelectItem>
                                                                                <SelectItem value="perdido">
                                                                                    Marcar
                                                                                    como
                                                                                    Perdido
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                removeLead(
                                                                                    l.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <XCircle className="h-4 w-4 mr-1" />{' '}
                                                                            Remover
                                                                        </Button>
                                                                    </TableCell>
                                                                </motion.tr>
                                                            )
                                                        )}
                                                    </AnimatePresence>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* METAS */}
                    <TabsContent value="metas" className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-blue-600" />
                                    Metas e Benefícios
                                </CardTitle>
                                <CardDescription>
                                    Ex.: ao concluir 10 cursos, a instituição
                                    ganha desconto na mensalidade.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <Card className="border-0 shadow-md">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">
                                                Cursos Concluídos
                                            </CardTitle>
                                            <CardDescription>
                                                Progresso estimado
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold">
                                                {completedCourses}
                                            </div>
                                            <Progress
                                                value={goalProgress}
                                                className="mt-2"
                                            />
                                            <div className="text-sm text-slate-600 mt-2">
                                                {pct(goalProgress)} de{' '}
                                                {goalTarget}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-0 shadow-md">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">
                                                Benefício
                                            </CardTitle>
                                            <CardDescription>
                                                Desconto potencial
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold">
                                                {goalUnlocked ? '15%' : '0%'}
                                            </div>
                                            <div className="text-sm text-slate-600 mt-2">
                                                {goalUnlocked
                                                    ? 'Meta alcançada!'
                                                    : 'Conclua a meta para desbloquear.'}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-0 shadow-md">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">
                                                Projeção
                                            </CardTitle>
                                            <CardDescription>
                                                Economia estimada
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold">
                                                {goalUnlocked
                                                    ? currencyBRL(350)
                                                    : currencyBRL(0)}
                                            </div>
                                            <div className="text-sm text-slate-600 mt-2">
                                                com base no plano atual
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Separator />

                                <div className="rounded-xl border bg-white p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Flag className="h-4 w-4 text-purple-600" />
                                        <span className="font-medium">
                                            Como acelerar
                                        </span>
                                    </div>
                                    <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                                        <li>
                                            Ative campanhas para gerar{' '}
                                            {Math.max(1, 10 - completedCourses)}{' '}
                                            conclusões adicionais.
                                        </li>
                                        <li>
                                            Crie uma trilha curta de alta
                                            demanda (ex.: "Git & Deploy") para
                                            elevar a taxa de conclusão.
                                        </li>
                                        <li>
                                            Engaje professores com metas
                                            semanais e relatórios de progresso.
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* CONTEÚDOS */}
                    <TabsContent value="conteudos" className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Conteúdos Disponíveis</CardTitle>
                                <CardDescription>
                                    Catálogo de conteúdos para suas trilhas e
                                    cursos.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {contents.length === 0 ? (
                                    <EmptyState
                                        icon={BookOpen}
                                        title="Sem conteúdos"
                                        description="Adicione conteúdos ao catálogo para aparecerem aqui."
                                    />
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {contents.map(c => (
                                            <Card
                                                key={c.id}
                                                className="border-0 shadow-md hover:shadow-lg transition"
                                            >
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base">
                                                        {c.title}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {c.category} •{' '}
                                                        {c.duration}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-xs text-slate-500">
                                                        Atualizado em{' '}
                                                        {new Date(
                                                            c.updatedAt
                                                        ).toLocaleDateString()}
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        className="mt-3 w-full"
                                                    >
                                                        Vincular a uma Trilha
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Toast/Highlight animado quando gerar leads */}
                <AnimatePresence>
                    {isGenerating && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                        >
                            <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 shadow-xl">
                                Novos leads chegando...
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// --------------------------------------------------
// components/institution/LeadTypes.ts
// --------------------------------------------------
export type LeadStatus = 'novo' | 'qualificado' | 'convertido' | 'perdido';

export type Lead = {
    id: string;
    name: string;
    email: string;
    interest: string; // curso/trilha de interesse
    source: string; // origem
    createdAt: string; // ISO
    status: LeadStatus;
};

export type Teacher = {
    id: string;
    name: string;
    email: string;
    area: string;
    since: string; // ano
};

export type Trail = {
    id: string;
    title: string;
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    courses: number;
    enrolled: number;
    progressAvg: number; // %
};

export type ContentItem = {
    id: string;
    title: string;
    category: string;
    duration: string;
    updatedAt: string;
};

// --------------------------------------------------
// components/institution/EmptyState.tsx
// --------------------------------------------------
export function EmptyState({
    icon: Icon,
    title,
    description,
    cta,
    onClick,
}: {
    icon: any;
    title: string;
    description: string;
    cta?: string;
    onClick?: () => void;
}) {
    return (
        <div className="text-center py-12">
            <Icon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {title}
            </h3>
            <p className="text-slate-600 mb-4">{description}</p>
            {cta && (
                <Button
                    onClick={onClick}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                    {cta}
                </Button>
            )}
        </div>
    );
}

// --------------------------------------------------
// components/institution/mock/leadMock.ts
// --------------------------------------------------

const names = [
    'Maria Silva',
    'João Santos',
    'Bianca Rocha',
    'Pedro Lima',
    'Ana Ferreira',
    'Carlos Souza',
    'Lucas Almeida',
    'Juliana Salm',
    'Rúbia Mattos',
    'Elis Regina',
];
const sources = [
    'Landing Page',
    'Indicação',
    'Instagram',
    'Evento',
    'YouTube',
    'Blog',
];
const interests = [
    'Curso React',
    'Trilha Front-end',
    'Trilha Dados',
    'Curso Node',
    'Curso Inglês Tech',
    'Curso Git & Deploy',
];
const statuses: LeadStatus[] = ['novo', 'qualificado', 'convertido', 'perdido'];

function rand<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}
function emailFromName(n: string): string {
    return `${n.toLowerCase().replace(/[^a-z]+/g, '.')}@exemplo.com`;
}

export function generateInitialLeadHistory(
    daysBack = 45,
    perDayAvg = 2
): Lead[] {
    const out: Lead[] = [];
    const now = Date.now();
    for (let d = daysBack; d >= 0; d--) {
        const day = new Date(now - d * 24 * 60 * 60 * 1000);
        const count = Math.max(
            1,
            Math.round(perDayAvg + (Math.random() * 2 - 1))
        );
        for (let i = 0; i < count; i++) {
            const name = rand(names);
            out.push({
                id: crypto.randomUUID?.() || Math.random().toString(),
                name,
                email: emailFromName(name),
                interest: rand(interests),
                source: rand(sources),
                createdAt: new Date(
                    day.getTime() + Math.random() * 8 * 60 * 60 * 1000
                ).toISOString(),
                status: rand(statuses),
            });
        }
    }
    // mais recentes primeiro
    return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function generateNewLeadsBatch(count = 6): Lead[] {
    const out: Lead[] = [];
    for (let i = 0; i < count; i++) {
        const name = rand(names);
        out.push({
            id: crypto.randomUUID?.() || Math.random().toString(),
            name,
            email: emailFromName(name),
            interest: rand(interests),
            source: rand(sources),
            createdAt: new Date().toISOString(),
            status: rand(statuses),
        });
    }
    return out;
}

// --------------------------------------------------
// lib/storage.ts
// --------------------------------------------------
export function keyFor(base: string, userId: string) {
    return `${base}_${userId}`;
}

export function loadJSON<T = any>(k: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(k);
        return raw ? (JSON.parse(raw) as T) : null;
    } catch {
        return null;
    }
}

export function saveJSON(k: string, v: any) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(k, JSON.stringify(v));
    } catch {}
}
