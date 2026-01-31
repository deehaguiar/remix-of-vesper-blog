import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import Button from "@/components/Button";

const Admin = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && user && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, adminLoading, user, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl font-serif">Carregando...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-foreground/10">
        <div className="px-5 md:px-20 py-5 md:py-6">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl md:text-3xl font-bold">
              Painel Admin
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/70 font-serif">
                {user.email}
              </span>
              <Button
                variant="transparent"
                showArrow={false}
                className="text-xs py-2 px-5"
                onClick={() => signOut()}
              >
                SAIR
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 md:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-accent-yellow/10 border-2 border-accent-yellow rounded-lg p-8 mb-8">
            <h2 className="font-serif text-2xl font-bold mb-2">
              Bem-vindo ao Painel de Administração
            </h2>
            <p className="text-foreground/70">
              Você está logado como administrador.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background border-2 border-foreground/10 rounded-lg p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground/50 mb-2">
                Status
              </h3>
              <p className="text-3xl font-bold text-status-success">Ativo</p>
            </div>
            <div className="bg-background border-2 border-foreground/10 rounded-lg p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground/50 mb-2">
                Função
              </h3>
              <p className="text-3xl font-bold text-accent-yellow">Admin</p>
            </div>
            <div className="bg-background border-2 border-foreground/10 rounded-lg p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground/50 mb-2">
                Email
              </h3>
              <p className="text-lg font-medium truncate">{user.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="filled" onClick={() => navigate("/")}>
              VOLTAR AO SITE
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
