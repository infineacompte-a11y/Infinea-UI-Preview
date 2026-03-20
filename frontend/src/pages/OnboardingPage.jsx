import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  ChevronLeft,
  Target,
  BookOpen,
  Heart,
  Sparkles,
  Loader2,
  Sun,
  Moon,
  Sunrise,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { API, useAuth, authFetch } from "@/App";
import InFineaLogo from "@/components/InFineaLogo";

const STEPS = [
  { id: "goals", title: "Vos objectifs", subtitle: "Qu'aimeriez-vous améliorer ?" },
  { id: "availability", title: "Disponibilités", subtitle: "Quand êtes-vous le plus disponible ?" },
  { id: "energy", title: "Votre énergie", subtitle: "Comment décririez-vous votre énergie typique ?" },
  { id: "interests", title: "Vos intérêts", subtitle: "Quels domaines vous intéressent ?" },
];

const GOALS = [
  { id: "learn_new_skills", label: "Apprendre de nouvelles compétences", icon: BookOpen },
  { id: "boost_productivity", label: "Booster ma productivité", icon: Target },
  { id: "reduce_stress", label: "Réduire mon stress", icon: Heart },
  { id: "build_habits", label: "Construire de bonnes habitudes", icon: Sparkles },
];

const TIME_SLOTS = [
  { id: "morning", label: "Matin", sublabel: "6h - 12h", icon: Sunrise },
  { id: "afternoon", label: "Après-midi", sublabel: "12h - 18h", icon: Sun },
  { id: "evening", label: "Soir", sublabel: "18h - 23h", icon: Moon },
];

const ENERGY_LEVELS = [
  { id: "low", label: "Plutôt basse", description: "Je préfère des activités calmes", icon: BatteryLow },
  { id: "medium", label: "Moyenne", description: "Un bon équilibre effort/repos", icon: BatteryMedium },
  { id: "high", label: "Élevée", description: "Je suis prêt pour des défis", icon: BatteryFull },
];

const INTERESTS = [
  { id: "learning", label: "Apprentissage", color: "text-[#2F7DBA] bg-[#2F7DBA]/10" },
  { id: "productivity", label: "Productivité", color: "text-[#C97A3D] bg-[#C97A3D]/10" },
  { id: "well_being", label: "Bien-être", color: "text-[#5DB786] bg-[#5DB786]/10" },
  { id: "creativity", label: "Créativité", color: "text-[#55B3AE] bg-[#55B3AE]/10" },
  { id: "fitness", label: "Forme physique", color: "text-[#E48C75] bg-[#E48C75]/10" },
  { id: "mindfulness", label: "Pleine conscience", color: "text-[#459492] bg-[#459492]/10" },
  { id: "leadership", label: "Leadership", color: "text-[#7B8FA1] bg-[#7B8FA1]/10" },
  { id: "finance", label: "Finance", color: "text-[#2E9B6A] bg-[#2E9B6A]/10" },
  { id: "relations", label: "Relations", color: "text-[#C4806E] bg-[#C4806E]/10" },
  { id: "mental_health", label: "Santé mentale", color: "text-[#6EAAA8] bg-[#6EAAA8]/10" },
  { id: "entrepreneurship", label: "Entrepreneuriat", color: "text-[#D4956B] bg-[#D4956B]/10" },
];

export default function OnboardingPage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(null);

  const [profile, setProfile] = useState({
    goals: [],
    preferred_times: [],
    energy_level: "medium",
    interests: [],
  });

  const toggleArrayItem = (field, item) => {
    setProfile((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const canAdvance = () => {
    switch (STEPS[currentStep].id) {
      case "goals":
        return profile.goals.length > 0;
      case "availability":
        return profile.preferred_times.length > 0;
      case "energy":
        return true;
      case "interests":
        return profile.interests.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await authFetch(`${API}/onboarding/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error("Erreur");

      const data = await response.json();
      // Update auth context so ProtectedRoute knows onboarding is done
      setUser((prev) => ({ ...prev, user_profile: data.user_profile || profile, onboarding_completed: true }));
      setWelcomeMessage(data.welcome_message || data.first_recommendation || "Bienvenue sur InFinea ! Prêt(e) à transformer vos moments perdus en micro-victoires ?");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde du profil");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    navigate("/dashboard");
  };

  // Welcome screen after onboarding complete
  if (welcomeMessage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-[#459492]/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#459492]" />
          </div>
          <h1 className="font-heading text-3xl font-bold mb-4">
            Bienvenue, {user?.name?.split(" ")[0] || "Utilisateur"} !
          </h1>
          <Card className="mb-8 text-left">
            <CardContent className="p-6">
              <p className="text-sm leading-relaxed">{welcomeMessage}</p>
            </CardContent>
          </Card>
          <Button onClick={handleFinish} className="w-full h-12 rounded-xl">
            Commencer mes micro-actions
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="flex items-center justify-between px-4 h-16">
          <InFineaLogo size={32} withText animate />
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            Passer
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-border">
        <div
          className="h-full bg-[#459492] transition-all duration-300"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 pt-24 pb-32">
        <div className="max-w-lg w-full animate-fade-in">
          {/* Step Header */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              {currentStep + 1} / {STEPS.length}
            </Badge>
            <h1 className="font-heading text-2xl font-bold mb-2">
              {STEPS[currentStep].title}
            </h1>
            <p className="text-muted-foreground">{STEPS[currentStep].subtitle}</p>
          </div>

          {/* Step Content */}
          {STEPS[currentStep].id === "goals" && (
            <div className="grid gap-3">
              {GOALS.map((goal) => {
                const Icon = goal.icon;
                const selected = profile.goals.includes(goal.id);
                return (
                  <Card
                    key={goal.id}
                    className={`cursor-pointer transition-all ${
                      selected ? "border-[#459492] bg-[#459492]/5" : "hover:border-[#459492]/50"
                    }`}
                    onClick={() => toggleArrayItem("goals", goal.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selected ? "bg-[#459492] text-white" : "bg-muted"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="flex-1 font-medium">{goal.label}</span>
                      {selected && <Check className="w-5 h-5 text-[#459492]" />}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {STEPS[currentStep].id === "availability" && (
            <div className="grid gap-3">
              {TIME_SLOTS.map((slot) => {
                const Icon = slot.icon;
                const selected = profile.preferred_times.includes(slot.id);
                return (
                  <Card
                    key={slot.id}
                    className={`cursor-pointer transition-all ${
                      selected ? "border-[#459492] bg-[#459492]/5" : "hover:border-[#459492]/50"
                    }`}
                    onClick={() => toggleArrayItem("preferred_times", slot.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selected ? "bg-[#459492] text-white" : "bg-muted"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{slot.label}</p>
                        <p className="text-sm text-muted-foreground">{slot.sublabel}</p>
                      </div>
                      {selected && <Check className="w-5 h-5 text-[#459492]" />}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {STEPS[currentStep].id === "energy" && (
            <div className="grid gap-3">
              {ENERGY_LEVELS.map((level) => {
                const Icon = level.icon;
                const selected = profile.energy_level === level.id;
                return (
                  <Card
                    key={level.id}
                    className={`cursor-pointer transition-all ${
                      selected ? "border-[#459492] bg-[#459492]/5" : "hover:border-[#459492]/50"
                    }`}
                    onClick={() => setProfile((p) => ({ ...p, energy_level: level.id }))}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selected ? "bg-[#459492] text-white" : "bg-muted"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{level.label}</p>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                      {selected && <Check className="w-5 h-5 text-[#459492]" />}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {STEPS[currentStep].id === "interests" && (
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS.map((interest) => {
                const selected = profile.interests.includes(interest.id);
                return (
                  <Card
                    key={interest.id}
                    className={`cursor-pointer transition-all ${
                      selected ? "border-[#459492] bg-[#459492]/5" : "hover:border-[#459492]/50"
                    }`}
                    onClick={() => toggleArrayItem("interests", interest.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${interest.color}`}>
                        {selected ? <Check className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </div>
                      <p className="text-sm font-medium">{interest.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass p-4">
        <div className="max-w-lg mx-auto flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack} className="h-12 rounded-xl px-6">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Retour
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 h-12 rounded-xl"
            disabled={!canAdvance() || isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : currentStep === STEPS.length - 1 ? (
              <>
                Terminer
                <Check className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Suivant
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
