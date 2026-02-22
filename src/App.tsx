import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminUsers from "./pages/admin/AdminUsers";
import { RestaurantLayout } from "./components/restaurant/RestaurantLayout";
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import RestaurantBranches from "./pages/restaurant/RestaurantBranches";
import RestaurantCategories from "./pages/restaurant/RestaurantCategories";
import RestaurantProducts from "./pages/restaurant/RestaurantProducts";
import RestaurantOptions from "./pages/restaurant/RestaurantOptions";
import RestaurantOrders from "./pages/restaurant/RestaurantOrders";
import RestaurantAnalytics from "./pages/restaurant/RestaurantAnalytics";
import RestaurantLanguages from "./pages/restaurant/RestaurantLanguages";
import RestaurantAppearance from "./pages/restaurant/RestaurantAppearance";
import RestaurantSubscription from "./pages/restaurant/RestaurantSubscription";
import RestaurantSettings from "./pages/restaurant/RestaurantSettings";
import POSManagement from "./pages/restaurant/POSManagement";
import POSServers from "./pages/restaurant/POSServers";
import POSTables from "./pages/restaurant/POSTables";
import POSTerminal from "./pages/restaurant/POSTerminal";
import POSReports from "./pages/restaurant/POSReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demo" element={<Demo />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/restaurants" element={<AdminLayout><AdminRestaurants /></AdminLayout>} />
          <Route path="/admin/subscriptions" element={<AdminLayout><AdminSubscriptions /></AdminLayout>} />
          <Route path="/admin/payments" element={<AdminLayout><AdminPayments /></AdminLayout>} />
          <Route path="/admin/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />
          <Route path="/admin/support" element={<AdminLayout><AdminSupport /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
          <Route path="/admin/logs" element={<AdminLayout><AdminLogs /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />

          {/* Restaurant Owner Routes */}
          <Route path="/restaurant" element={<RestaurantLayout><RestaurantDashboard /></RestaurantLayout>} />
          <Route path="/restaurant/branches" element={<RestaurantLayout><RestaurantBranches /></RestaurantLayout>} />
          <Route path="/restaurant/categories" element={<RestaurantLayout><RestaurantCategories /></RestaurantLayout>} />
          <Route path="/restaurant/products" element={<RestaurantLayout><RestaurantProducts /></RestaurantLayout>} />
          <Route path="/restaurant/options" element={<RestaurantLayout><RestaurantOptions /></RestaurantLayout>} />
          <Route path="/restaurant/orders" element={<RestaurantLayout><RestaurantOrders /></RestaurantLayout>} />
          <Route path="/restaurant/analytics" element={<RestaurantLayout><RestaurantAnalytics /></RestaurantLayout>} />
          <Route path="/restaurant/languages" element={<RestaurantLayout><RestaurantLanguages /></RestaurantLayout>} />
          <Route path="/restaurant/appearance" element={<RestaurantLayout><RestaurantAppearance /></RestaurantLayout>} />
          <Route path="/restaurant/subscription" element={<RestaurantLayout><RestaurantSubscription /></RestaurantLayout>} />
          <Route path="/restaurant/settings" element={<RestaurantLayout><RestaurantSettings /></RestaurantLayout>} />
          <Route path="/restaurant/pos" element={<RestaurantLayout><POSManagement /></RestaurantLayout>} />
          <Route path="/restaurant/pos/servers" element={<RestaurantLayout><POSServers /></RestaurantLayout>} />
          <Route path="/restaurant/pos/tables" element={<RestaurantLayout><POSTables /></RestaurantLayout>} />
          <Route path="/restaurant/pos/terminal" element={<RestaurantLayout><POSTerminal /></RestaurantLayout>} />
          <Route path="/restaurant/pos/reports" element={<RestaurantLayout><POSReports /></RestaurantLayout>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
