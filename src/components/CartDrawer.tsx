import { Link } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, formatEuro } from "@/context/CartContext";

interface CartDrawerProps {
  triggerClassName?: string;
  variant?: "street" | "traiteur";
}

const CartDrawer = ({ triggerClassName, variant = "street" }: CartDrawerProps) => {
  const { items, totalCount, totalPrice, addItem, removeItem, setQty, clear } = useCart();

  const accentText = variant === "street" ? "text-primary" : "text-traiteur-forest";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label={`Mon panier (${totalCount} articles)`}
          className={
            triggerClassName ??
            "relative flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 hover:bg-muted transition-colors"
          }
        >
          <ShoppingBag size={18} className={accentText} />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold font-body flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl">Mon panier</SheetTitle>
          <SheetDescription className="font-body">
            {totalCount === 0
              ? "Votre panier est vide pour l'instant."
              : `${totalCount} article${totalCount > 1 ? "s" : ""} dans votre sélection.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 space-y-3">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
              <ShoppingBag size={42} className="mb-3 opacity-40" />
              <p className="font-body text-sm">Ajoutez vos plats préférés depuis la carte.</p>
            </div>
          )}

          {items.map((item) => (
            <div
              key={item.key}
              className="flex items-start justify-between gap-3 rounded-xl bg-muted/40 p-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm font-semibold text-foreground truncate">
                  {item.name}
                </p>
                <p className="font-body text-xs text-muted-foreground capitalize">
                  {item.category} · {item.price}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => removeItem(item.key)}
                  className="w-7 h-7 rounded-full bg-background hover:bg-destructive/15 hover:text-destructive flex items-center justify-center transition-colors"
                  aria-label="Réduire"
                >
                  <Minus size={13} />
                </button>
                <span className="font-heading text-sm font-bold w-5 text-center">
                  {item.qty}
                </span>
                <button
                  onClick={() =>
                    addItem({
                      key: item.key,
                      name: item.name,
                      price: item.price,
                      category: item.category,
                    })
                  }
                  className="w-7 h-7 rounded-full bg-primary/15 text-primary hover:bg-primary/25 flex items-center justify-center transition-colors"
                  aria-label="Ajouter"
                >
                  <Plus size={13} />
                </button>
                <button
                  onClick={() => setQty(item.key, 0)}
                  className="ml-1 w-7 h-7 rounded-full hover:bg-destructive/15 hover:text-destructive flex items-center justify-center transition-colors"
                  aria-label="Supprimer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter className="border-t pt-4 flex-col gap-3 sm:flex-col sm:space-x-0">
          <div className="flex items-center justify-between w-full">
            <span className="font-body text-sm text-muted-foreground">Total</span>
            <span className="font-heading text-xl font-bold text-foreground">
              {formatEuro(totalPrice)}
            </span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Button asChild className="w-full" disabled={totalCount === 0}>
              <Link to="/commande">Passer commande</Link>
            </Button>
            <Button asChild variant="outline" className="w-full" disabled={totalCount === 0}>
              <Link to="/panier">Voir le détail</Link>
            </Button>
            {items.length > 0 && (
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={clear}
              >
                Vider le panier
              </Button>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;