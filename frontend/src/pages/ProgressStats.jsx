import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Target,
  Heart,
  Sparkles,
  TrendingUp,
  Flame,
  Clock,
  Loader2,
  Palette,
  Dumbbell,
  Leaf,
  Users,
  MessageCircle,
  Brain,
  Rocket,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { API, authFetch } from "@/App";
import Sidebar from "@/components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import PremiumAnalytics from "@/components/PremiumAnalytics";
import ShareDialog from "@/components/ShareDialog";

const categoryColors = {
  learning: "#2F7DBA",
  productivity: "#C97A3D",
  well_being: "#5DB786",
  creativity: "#55B3AE",
  fitness: "#E48C75",
  mindfulness: "#459492",
  leadership: "#7B8FA1",
  finance: "#2E9B6A",
  relations: "#C4806E",
  mental_health: "#6EAAA8",
  entrepreneurship: "#D4956B",
};

const categoryLabels = {
  learning: "Apprentissage",
  productivity: "Productivité",
  well_being: "Bien-être",
  creativity: "Créativité",
  fitness: "Fitness",
  mindfulness: "Mindfulness",
  leadership: "Leadership",
  finance: "Finance",
  relations: "Relations",
  mental_health: "Santé mentale",
  entrepreneurship: "Entrepreneuriat",
};

export default function ProgressStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await authFetch(`${API}/stats`);
      if (!response.ok) throw new Error("Erreur");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      toast.error("Impossible de charger les statistiques");
    } finally {
      setIsLoading(false);
    }
  };

  const pieData = stats
    ? Object.entries(stats.sessions_by_category || {}).map(([key, value]) => ({
        name: categoryLabels[key] || key,
        value,
        color: categoryColors[key] || "#459492",
      }))
    : [];

  const barData = stats
    ? Object.entries(stats.time_by_category || {}).map(([key, value]) => ({
        name: categoryLabels[key] || key,
        minutes: value,
        fill: categoryColors[key] || "#459492",
      }))
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 lg:pt-8 px-4 lg:px-8 pb-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-semibold mb-2" data-testid="progress-title">
                Votre Capital-Temps
              </h1>
              <p className="text-muted-foreground">
                Suivez votre progression et vos accomplissements
              </p>
            </div>
            {stats && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 shrink-0"
                onClick={() => setShareOpen(true)}
              >
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
            )}
            <ShareDialog open={shareOpen} onOpenChange={setShareOpen} shareType="weekly_recap" />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="stat-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-heading font-bold" data-testid="total-time">
                          {stats?.total_time_invested || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">minutes totales</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="stat-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#5DB786]/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-[#5DB786]" />
                      </div>
                      <div>
                        <p className="text-2xl font-heading font-bold" data-testid="total-sessions">
                          {stats?.total_sessions || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">sessions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="stat-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#C97A3D]/10 flex items-center justify-center">
                        <Flame className="w-6 h-6 text-[#C97A3D]" />
                      </div>
                      <div>
                        <p className="text-2xl font-heading font-bold" data-testid="streak-days">
                          {stats?.streak_days || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">jours streak</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="stat-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#2F7DBA]/10 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-[#2F7DBA]" />
                      </div>
                      <div>
                        <p className="text-2xl font-heading font-bold">
                          {Math.round((stats?.total_time_invested || 0) / 60)}h
                        </p>
                        <p className="text-xs text-muted-foreground">heures investies</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Time by Category */}
                <Card className="hover:border-[#459492]/20 transition-all">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg">Temps par catégorie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {barData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                          <XAxis dataKey="name" tick={{ fill: "#9A9A9A", fontSize: 12 }} />
                          <YAxis tick={{ fill: "#9A9A9A", fontSize: 12 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#121212",
                              border: "1px solid #262626",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="minutes" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                        <p>Pas encore de données</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Sessions Distribution */}
                <Card className="hover:border-[#459492]/20 transition-all">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg">Répartition des sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pieData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#121212",
                              border: "1px solid #262626",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                        <p>Pas encore de données</p>
                      </div>
                    )}
                    <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-4">
                      {pieData.map((entry, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-muted-foreground">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Premium Analytics */}
              <PremiumAnalytics />

              {/* Recent Sessions */}
              <Card className="hover:border-[#459492]/20 transition-all">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Sessions récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats?.recent_sessions?.length > 0 ? (
                    <div className="space-y-3">
                      {stats.recent_sessions.map((session, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#1A1A1A]/50 border border-[#262626]/50 hover:border-[#459492]/20 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${categoryColors[session.category]}20` }}
                            >
                              {(() => {
                                const iconMap = {
                                  learning: <BookOpen className="w-5 h-5 text-[#2F7DBA]" />,
                                  productivity: <Target className="w-5 h-5 text-[#C97A3D]" />,
                                  well_being: <Heart className="w-5 h-5 text-[#5DB786]" />,
                                  creativity: <Palette className="w-5 h-5 text-[#55B3AE]" />,
                                  fitness: <Dumbbell className="w-5 h-5 text-[#E48C75]" />,
                                  mindfulness: <Leaf className="w-5 h-5 text-[#459492]" />,
                                  leadership: <Users className="w-5 h-5 text-[#7B8FA1]" />,
                                  finance: <TrendingUp className="w-5 h-5 text-[#2E9B6A]" />,
                                  relations: <MessageCircle className="w-5 h-5 text-[#C4806E]" />,
                                  mental_health: <Brain className="w-5 h-5 text-[#6EAAA8]" />,
                                  entrepreneurship: <Rocket className="w-5 h-5 text-[#D4956B]" />,
                                };
                                return iconMap[session.category] || <Sparkles className="w-5 h-5 text-primary" />;
                              })()}
                            </div>
                            <div>
                              <p className="font-medium">{session.action_title}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(session.completed_at).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {session.actual_duration} min
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>Aucune session complétée</p>
                      <Link to="/dashboard">
                        <Button variant="link" className="mt-2">
                          Commencer une session
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
