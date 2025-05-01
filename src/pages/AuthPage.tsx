
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // If user is authenticated, redirect to home
  if (!loading && user) {
    return <Navigate to="/" />;
  }

  const handleLogin = () => {
    // Handled by the AuthContext
  };

  const handleSignup = () => {
    setActiveTab("login");
  };

  return (
    <Layout>
      <div className="container max-w-md py-12">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <TabsContent value="login">
              <LoginForm
                onLogin={handleLogin}
                onSwitchToSignup={() => setActiveTab("signup")}
              />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm
                onSignup={handleSignup}
                onSwitchToLogin={() => setActiveTab("login")}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AuthPage;
