import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import logoBordeaux from "@/assets/logo-krousel-bordeaux.svg";

const Auth = () => {
  const navigate = useNavigate();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handle = async (fn: () => Promise<void>, msg: string) => {
    setSubmitting(true);
    try {
      await fn();
      toast({ title: msg });
      navigate("/profil");
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background flex flex-col"
    >
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b-2 border-primary/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2 btn-bounce" aria-label="Retour">
            <img src={logoBordeaux} alt="K'rousel" className="h-8 w-auto" />
          </Link>
          <Link to="/" className="font-body text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Retour
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Bienvenue</h1>
            <p className="font-body text-sm text-muted-foreground">
              Connectez-vous pour retrouver votre panier et vos préférences.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="signin">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Inscription</TabsTrigger>
              </TabsList>

              <Button
                type="button"
                variant="outline"
                className="w-full mb-4"
                disabled={submitting}
                onClick={() => handle(signInWithGoogle, "Connecté avec Google (démo)")}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.83z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335"/>
                </svg>
                Continuer avec Google
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                <span className="relative bg-card px-2 text-xs uppercase tracking-wider text-muted-foreground mx-auto block w-fit">ou</span>
              </div>

              <TabsContent value="signin" className="space-y-3 mt-0">
                <div className="space-y-1.5">
                  <Label htmlFor="signin-email" className="font-body text-xs">Email</Label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="signin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signin-pwd" className="font-body text-xs">Mot de passe</Label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="signin-pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" />
                  </div>
                </div>
                <Button
                  className="w-full mt-2"
                  disabled={submitting || !email || !password}
                  onClick={() => handle(() => signInWithEmail(email, password), "Connecté !")}
                >
                  Se connecter
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-3 mt-0">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-name" className="font-body text-xs">Nom</Label>
                  <div className="relative">
                    <UserIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="signup-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-email" className="font-body text-xs">Email</Label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-pwd" className="font-body text-xs">Mot de passe</Label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="signup-pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" />
                  </div>
                </div>
                <Button
                  className="w-full mt-2"
                  disabled={submitting || !email || !password}
                  onClick={() => handle(() => signUpWithEmail(email, password, name), "Compte créé !")}
                >
                  Créer mon compte
                </Button>
              </TabsContent>
            </Tabs>

            <p className="text-center font-body text-[11px] text-muted-foreground mt-6">
              Démo locale — l'authentification réelle sera activée plus tard.
            </p>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Auth;