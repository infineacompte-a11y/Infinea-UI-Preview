import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Zap,
  Heart,
  BookOpen,
  Target,
  Brain,
  ChevronRight,
  Check,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import InFineaLogo from "@/components/InFineaLogo";

export default function LandingPage() {
  const features = [
    {
      icon: Clock,
      title: "2-15 minutes",
      description: "Des micro-actions pour chaque instant libre, puisées dans une bibliothèque en perpétuelle évolution",
    },
    {
      icon: Zap,
      title: "IA qui vous connait",
      description: "Des suggestions personnalisées selon vos habitudes, votre énergie et le moment de la journée",
    },
    {
      icon: TrendingUp,
      title: "Capital-Temps",
      description: "Chaque session enrichit votre profil. Plus vous agissez, plus l'IA devient pertinente",
    },
  ];

  const categories = [
    {
      icon: BookOpen,
      name: "Apprentissage",
      color: "text-[#459492]",
      bg: "category-card-learning",
      examples: ["Vocabulaire", "Lecture", "Concepts"],
    },
    {
      icon: Target,
      name: "Productivité",
      color: "text-[#E48C75]",
      bg: "category-card-productivity",
      examples: ["Planning", "Emails", "Brainstorm"],
    },
    {
      icon: Heart,
      name: "Bien-être",
      color: "text-[#5DB786]",
      bg: "category-card-well-being",
      examples: ["Respiration", "Méditation", "Étirements"],
    },
  ];

  const pricingPlans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "",
      features: [
        "Accès aux micro-actions de base",
        "Suggestions IA limitées",
        "Suivi de progression",
        "3 catégories d'actions",
      ],
      cta: "Commencer",
      popular: false,
    },
    {
      name: "Premium",
      price: "6,99€",
      period: "/mois",
      features: [
        "700+ actions (11 catégories)",
        "IA avancée avec suggestions personnalisées",
        "Suggestion proactive au bon moment",
        "Bouclier de Streak (1x/semaine)",
        "Analytics avancées & insights",
        "20 badges Premium",
      ],
      cta: "Découvrir Premium",
      popular: true,
      link: "/pricing",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-[#E2E6EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <InFineaLogo size={32} withText animate />
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-[#667085] hover:text-[#141E24] transition-colors">
                Fonctionnalités
              </a>
              <Link to="/pricing" className="text-[#667085] hover:text-[#141E24] transition-colors">
                Tarifs
              </Link>
              <Link to="/login">
                <Button variant="ghost" data-testid="nav-login-btn">Connexion</Button>
              </Link>
              <Link to="/register">
                <Button data-testid="nav-register-btn" className="rounded-full">
                  Commencer gratuitement
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Link to="/login">
                <Button size="sm" data-testid="mobile-login-btn">Connexion</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section — Dark teal gradient with white text for visual impact */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-gradient-to-br from-[#275255] via-[#275255] to-[#459492]">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(85,179,174,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(93,183,134,0.1),transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#55B3AE]" />
              <span className="text-sm text-white/90">Une IA qui apprend de vous, une bibliothèque qui grandit sans cesse</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white animate-fade-in stagger-1">
              Investissez vos
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55B3AE] via-[#7DD3D0] to-[#5DB786]"> instants perdus</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto animate-fade-in stagger-2">
              Transformez votre temps disponible en micro-victoires. Une bibliothèque de micro-actions en perpétuelle évolution,
              portée par une IA qui s'adapte à vos habitudes, votre énergie et votre rythme.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-3">
              <Link to="/register">
                <Button size="lg" className="rounded-full px-8 h-12 text-base bg-white text-[#275255] hover:bg-white/90 btn-lift" data-testid="hero-cta-btn">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-white/30 text-white hover:bg-white/10 hover:text-white" data-testid="hero-learn-more-btn">
                  En savoir plus
                </Button>
              </a>
            </div>
          </div>

          {/* Stats — white badge cards on hero */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-20 max-w-3xl mx-auto animate-fade-in stagger-4">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl py-4 px-3 border border-white/10">
              <div className="text-3xl md:text-4xl font-heading font-bold text-white">2-15</div>
              <div className="text-sm text-white/60 mt-1">minutes/session</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl py-4 px-3 border border-white/10">
              <div className="text-3xl md:text-4xl font-heading font-bold text-white">700+</div>
              <div className="text-sm text-white/60 mt-1">micro-actions et +</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl py-4 px-3 border border-white/10">
              <div className="text-3xl md:text-4xl font-heading font-bold text-white">100%</div>
              <div className="text-sm text-white/60 mt-1">RGPD conforme</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section — white background */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6 text-[#141E24]">
                Le temps, votre ressource la plus précieuse
              </h2>
              <p className="text-[#667085] text-lg mb-8">
                Chaque jour, des dizaines de minutes de temps disponible s'envolent : transports,
                files d'attente, pauses entre réunions. Ces moments fragmentés semblent trop courts
                pour être utiles.
              </p>
              <div className="space-y-4">
                {[
                  "2 à 15 minutes perdues, plusieurs fois par jour",
                  "Trop court pour être productif, trop long pour ne rien faire",
                  "Surcharge cognitive face aux nombreuses apps",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                    </div>
                    <span className="text-[#667085]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1579689314629-4e0bdad946e3?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                  alt="Commuter looking out train window"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section — soft teal background for visual rhythm */}
      <section id="features" className="py-24 px-4 bg-[#F0F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-[#141E24]">
              La solution InFinea
            </h2>
            <p className="text-[#667085] text-lg max-w-2xl mx-auto">
              Une bibliothèque infinie de micro-actions, une IA qui apprend de vous. Que faire maintenant ? InFinea sait.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, i) => (
              <Card key={i} className="bg-white shadow-md hover:shadow-lg rounded-2xl border border-[#E2E6EA]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#275255]/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#275255]" />
                  </div>
                  <h3 className="font-heading text-xl font-medium mb-2 text-[#141E24]">{feature.title}</h3>
                  <p className="text-[#667085]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Card key={i} className="bg-white shadow-md hover:shadow-lg rounded-2xl border border-[#E2E6EA]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <cat.icon className={`w-8 h-8 ${cat.color} mb-4`} />
                  <h3 className="font-heading text-xl font-medium mb-3 text-[#141E24]">{cat.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.examples.map((ex, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-[#F8FAFB] border border-[#E2E6EA] text-sm text-[#667085]">
                        {ex}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — white background */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-[#141E24]">
              Comment ça marche
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Ouvrez l'app", desc: "En moins de 60 secondes" },
              { step: "02", title: "Indiquez votre temps", desc: "De 2 à 15 minutes" },
              { step: "03", title: "Choisissez l'énergie", desc: "Basse, moyenne ou haute" },
              { step: "04", title: "Agissez !", desc: "L'IA vous guide" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-heading font-bold text-[#459492] mb-4">{item.step}</div>
                <h3 className="font-heading text-lg font-medium mb-2 text-[#141E24]">{item.title}</h3>
                <p className="text-[#667085] text-sm">{item.desc}</p>
                {i < 3 && (
                  <ChevronRight className="hidden md:block absolute top-10 -right-4 w-8 h-8 text-[#459492]/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section — soft teal background */}
      <section id="pricing" className="py-24 px-4 bg-[#F0F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-[#141E24]">
              Tarifs simples et transparents
            </h2>
            <p className="text-[#667085] text-lg">
              Commencez gratuitement, passez Premium pour une IA qui s'adapte à vous
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Card
                key={i}
                className={`relative bg-white shadow-md hover:shadow-lg rounded-2xl transition-all duration-300 ${plan.popular ? "border-2 border-[#459492] shadow-lg" : "border border-[#E2E6EA]"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-[#E48C75] text-white text-sm font-medium shadow-sm">
                      Populaire
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl font-semibold mb-2 text-[#141E24]">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-heading font-bold text-[#141E24]">{plan.price}</span>
                    <span className="text-[#667085]">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-[#5DB786] flex-shrink-0" />
                        <span className="text-[#667085]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.link || "/register"}>
                    <Button
                      className={`w-full rounded-full ${plan.popular ? "" : "bg-[#F0F7F7] text-[#275255] hover:bg-[#E2E6EA]"}`}
                      data-testid={`pricing-${plan.name.toLowerCase()}-btn`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — dark gradient for impact */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#275255] via-[#275255] to-[#459492]">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Subtle decorative glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(85,179,174,0.15),transparent_60%)]" />
          <div className="relative">
            <Brain className="w-16 h-16 text-[#55B3AE] mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-white">
              Prêt à investir vos instants perdus ?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Commencez dès maintenant à transformer votre temps en Capital-Temps.
            </p>
            <Link to="/register">
              <Button size="lg" className="rounded-full px-8 h-12 text-base bg-white text-[#275255] hover:bg-white/90 btn-lift animate-pulse-glow" data-testid="final-cta-btn">
                Commencer maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer — dark primary background for contrast */}
      <footer className="py-12 px-4 bg-[#275255]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <InFineaLogo size={32} withText />
            <div className="flex items-center gap-6 text-sm text-white/70">
              <span>&copy; 2025 InFinea</span>
              <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
              <Link to="/cgu" className="hover:text-white transition-colors">CGU</Link>
              <a href="mailto:Infinea.compte@gmail.com" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
