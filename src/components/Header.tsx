import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Button from "./Button";

const Header = () => {
  const { user, loading, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground/5">
      <div className="px-5 md:px-20 py-5 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl md:text-3xl font-bold italic">
            Lucas
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {loading ? (
              <span className="text-sm text-foreground/50">...</span>
            ) : user ? (
              <>
                <span className="hidden md:inline text-sm text-foreground/70 font-serif">
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
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="transparent" showArrow={false} className="text-xs py-2 px-5">
                    ENTRAR
                  </Button>
                </Link>
                <a href="#newsletter">
                  <Button variant="filled" showArrow={false} className="text-xs py-2 px-5">
                    SUBSCRIBE
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
