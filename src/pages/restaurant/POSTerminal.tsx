import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Minus, Plus, Trash2, Printer, SplitSquareHorizontal, CreditCard, Banknote, X, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  options?: string;
}

const categories = ["All", "Burgers", "Pizza", "Drinks", "Salads", "Desserts"];

const products = [
  { id: "1", name: "Classic Burger", price: 12.50, category: "Burgers" },
  { id: "2", name: "Cheese Burger", price: 14.00, category: "Burgers" },
  { id: "3", name: "Double Burger", price: 17.50, category: "Burgers" },
  { id: "4", name: "Margherita", price: 11.00, category: "Pizza" },
  { id: "5", name: "Pepperoni", price: 13.00, category: "Pizza" },
  { id: "6", name: "Quattro Formaggi", price: 14.50, category: "Pizza" },
  { id: "7", name: "Coca Cola", price: 3.50, category: "Drinks" },
  { id: "8", name: "Sparkling Water", price: 2.50, category: "Drinks" },
  { id: "9", name: "Fresh Juice", price: 5.00, category: "Drinks" },
  { id: "10", name: "Caesar Salad", price: 9.50, category: "Salads" },
  { id: "11", name: "Tiramisu", price: 7.00, category: "Desserts" },
  { id: "12", name: "Crème Brûlée", price: 8.00, category: "Desserts" },
];

export default function POSTerminal() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [customerCount, setCustomerCount] = useState("2");
  const [discount, setDiscount] = useState(0);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  const filtered = products.filter(p =>
    (selectedCategory === "All" || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItem = (product: typeof products[0]) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setOrderItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const removeItem = (id: string) => setOrderItems(prev => prev.filter(i => i.id !== id));

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmount = subtotal * (discount / 100);
  const tax = (subtotal - discountAmount) * 0.1;
  const total = subtotal - discountAmount + tax;

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-6 bg-background">
      {/* LEFT: Menu */}
      <div className="flex-1 flex flex-col border-r overflow-hidden">
        {/* Search + Categories */}
        <div className="p-4 border-b space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 rounded-xl h-11 bg-muted/50 border-0 text-base" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(c => (
              <Button key={c} variant={selectedCategory === c ? "default" : "outline"} size="sm" className={cn("rounded-xl shrink-0", selectedCategory === c && "gradient-warm text-primary-foreground border-0")} onClick={() => setSelectedCategory(c)}>
                {c}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map(p => (
              <button key={p.id} onClick={() => addItem(p)} className="p-4 rounded-2xl bg-card border-2 border-transparent hover:border-primary/30 hover:shadow-card transition-all text-left active:scale-95">
                <p className="font-semibold text-sm text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.category}</p>
                <p className="text-base font-bold text-primary mt-2">€{p.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Order Panel */}
      <div className="w-[380px] flex flex-col bg-card">
        {/* Table & Customer */}
        <div className="p-4 border-b space-y-3">
          <div className="flex gap-2">
            <Select value={selectedTable} onValueChange={setSelectedTable}>
              <SelectTrigger className="rounded-xl flex-1 h-11"><SelectValue placeholder="Select table *" /></SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <SelectItem key={n} value={String(n)}>Table {n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="number" value={customerCount} onChange={e => setCustomerCount(e.target.value)} className="w-20 rounded-xl h-11 text-center" placeholder="Pax" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Server: <span className="font-semibold text-foreground">Ahmed K.</span></p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> POS 1
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {orderItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <ShoppingBag className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm">Tap products to add</p>
            </div>
          ) : (
            orderItems.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">€{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-7 w-7 rounded-lg" onClick={() => updateQty(item.id, -1)}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-7 text-center text-sm font-bold">{item.qty}</span>
                  <Button variant="outline" size="icon" className="h-7 w-7 rounded-lg" onClick={() => updateQty(item.id, 1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm font-bold w-16 text-right">€{(item.price * item.qty).toFixed(2)}</p>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive shrink-0" onClick={() => removeItem(item.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Note */}
        {showNote && (
          <div className="px-4 pb-2">
            <Input placeholder="Order note..." value={note} onChange={e => setNote(e.target.value)} className="rounded-xl text-sm" />
          </div>
        )}

        {/* Totals */}
        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
          {discount > 0 && <div className="flex justify-between text-sm text-primary"><span>Discount ({discount}%)</span><span>-€{discountAmount.toFixed(2)}</span></div>}
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax (10%)</span><span>€{tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t"><span>Total</span><span>€{total.toFixed(2)}</span></div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t space-y-3">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 gap-1.5" onClick={() => setShowNote(!showNote)}>
              <StickyNote className="w-4 h-4" /> Note
            </Button>
            <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 gap-1.5" onClick={() => setDiscount(d => d === 0 ? 10 : 0)}>
              % Discount
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0">
              <Printer className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button className="rounded-xl h-14 flex flex-col gap-0.5 bg-emerald-600 hover:bg-emerald-700 text-white border-0">
              <Banknote className="w-5 h-5" />
              <span className="text-xs">Cash</span>
            </Button>
            <Button className="rounded-xl h-14 flex flex-col gap-0.5 bg-blue-600 hover:bg-blue-700 text-white border-0">
              <CreditCard className="w-5 h-5" />
              <span className="text-xs">Card</span>
            </Button>
            <Button className="rounded-xl h-14 flex flex-col gap-0.5" variant="outline">
              <SplitSquareHorizontal className="w-5 h-5" />
              <span className="text-xs">Split</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}
